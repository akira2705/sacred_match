/**
 * Connection requests — like / pass / super-like
 * Block user + safety report
 * Discovery / match scoring
 */
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
router.use(requireAuth);

// ─── Discovery — GET /connections/discover ────────────────────────────────────
// Returns a scored, paginated list of potential matches for the authenticated user
router.get("/discover", async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const page = Math.max(0, Number(request.query.page ?? 0));
    const limit = Math.min(30, Number(request.query.limit ?? 10));

    // IDs the user has already interacted with (sent or received connection)
    const interacted = await prisma.connection.findMany({
      where: { OR: [{ requesterId: userId }, { recipientId: userId }] },
      select: { requesterId: true, recipientId: true },
    });
    const excludeIds = new Set([
      userId,
      ...interacted.map((c) => c.requesterId),
      ...interacted.map((c) => c.recipientId),
    ]);

    // Blocked users
    const blocked = await prisma.blockedUser.findMany({
      where: { OR: [{ blockerId: userId }, { blockedId: userId }] },
      select: { blockerId: true, blockedId: true },
    });
    blocked.forEach((b) => { excludeIds.add(b.blockerId); excludeIds.add(b.blockedId); });

    const candidates = await prisma.user.findMany({
      where: {
        id: { notIn: Array.from(excludeIds) },
        status: "ACTIVE",
      },
      orderBy: { createdAt: "desc" },
      skip: page * limit,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            city: true,
            state: true,
            gender: true,
            occupation: true,
            educationLevel: true,
            denomination: true,
            visibility: true,
          },
        },
        photos: {
          where: { isPrimary: true },
          select: { url: true },
          take: 1,
        },
        genotypeInfo: {
          select: { genotype: true, visibility: true },
        },
      },
    });

    // Simple compatibility scoring (can be extended with ML)
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profile: { select: { gender: true, state: true } },
        preferences: true,
        genotypeInfo: { select: { genotype: true } },
      },
    });

    const scored = candidates.map((candidate) => {
      let score = 50; // baseline

      // Location affinity
      if (currentUser?.profile?.state && candidate.profile?.state === currentUser.profile.state) {
        score += 15;
      }

      // Genotype compatibility hint (basic)
      const myGenotype = currentUser?.genotypeInfo?.genotype;
      const theirGenotype =
        candidate.genotypeInfo?.visibility !== "PRIVATE" ? candidate.genotypeInfo?.genotype : null;
      if (myGenotype && theirGenotype) {
        const risky = (["SS", "AS"] as const).includes(myGenotype as "SS" | "AS") &&
          (["SS", "AS"] as const).includes(theirGenotype as "SS" | "AS");
        if (!risky) score += 20;
        else score -= 10;
      }

      // Profile completeness
      if (candidate.profile?.bio) score += 5;
      if (candidate.photos.length > 0) score += 10;

      return { ...candidate, compatibilityScore: Math.min(100, Math.max(0, score)) };
    });

    scored.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    return response.json({ ok: true, data: scored, meta: { page, limit } });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /connections — like / pass / super-like ─────────────────────────────
const connectionSchema = z.object({
  recipientId: z.string().min(1),
  decision: z.enum(["LIKE", "PASS", "SUPER_LIKE"]),
});

router.post("/", async (request, response, next) => {
  try {
    const requesterId = request.user!.sub;
    const { recipientId, decision } = connectionSchema.parse(request.body);

    if (requesterId === recipientId) {
      return response.status(400).json({ ok: false, error: "Cannot connect with yourself" });
    }

    const existing = await prisma.connection.findUnique({
      where: { requesterId_recipientId: { requesterId, recipientId } },
    });

    if (existing) {
      return response.status(409).json({ ok: false, error: "Connection already exists" });
    }

    // Check if recipient already liked this user — if so, it's a mutual match → ACCEPTED
    const reverseConnection = await prisma.connection.findUnique({
      where: { requesterId_recipientId: { requesterId: recipientId, recipientId: requesterId } },
    });

    const isMutualMatch = reverseConnection?.decision === "LIKE" || reverseConnection?.decision === "SUPER_LIKE";

    const connection = await prisma.connection.create({
      data: {
        requesterId,
        recipientId,
        decision,
        status: decision === "PASS" ? "DECLINED" : isMutualMatch ? "ACCEPTED" : "PENDING",
      },
    });

    // If mutual match, update the reverse connection and create a conversation
    if (isMutualMatch && decision !== "PASS") {
      await prisma.connection.update({
        where: { id: reverseConnection!.id },
        data: { status: "ACCEPTED" },
      });

      await prisma.conversation.create({
        data: { connectionId: connection.id },
      });
    }

    return response.status(201).json({
      ok: true,
      message: isMutualMatch && decision !== "PASS" ? "It's a match! 🎉" : "Response recorded",
      data: { id: connection.id, status: connection.status, isMatch: isMutualMatch && decision !== "PASS" },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /connections — list connections ──────────────────────────────────────
router.get("/", async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const status = request.query.status as string | undefined;

    const where: Record<string, unknown> = {
      OR: [{ requesterId: userId }, { recipientId: userId }],
    };
    if (status) where.status = status;

    const connections = await prisma.connection.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        requester: { select: { id: true, firstName: true, lastName: true, photos: { where: { isPrimary: true }, take: 1 } } },
        recipient: { select: { id: true, firstName: true, lastName: true, photos: { where: { isPrimary: true }, take: 1 } } },
        conversation: { select: { id: true } },
      },
    });

    return response.json({ ok: true, data: connections });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /connections/block ───────────────────────────────────────────────────
const blockSchema = z.object({
  blockedId: z.string().min(1),
  reason: z.string().max(300).optional(),
});

router.post("/block", async (request, response, next) => {
  try {
    const blockerId = request.user!.sub;
    const { blockedId, reason } = blockSchema.parse(request.body);

    if (blockerId === blockedId) {
      return response.status(400).json({ ok: false, error: "Cannot block yourself" });
    }

    await prisma.blockedUser.upsert({
      where: { blockerId_blockedId: { blockerId, blockedId } },
      create: { blockerId, blockedId, reason: reason ?? null },
      update: { reason: reason ?? null },
    });

    // Also decline any pending connections
    await prisma.connection.updateMany({
      where: {
        OR: [
          { requesterId: blockerId, recipientId: blockedId },
          { requesterId: blockedId, recipientId: blockerId },
        ],
        status: { in: ["PENDING", "ACCEPTED"] },
      },
      data: { status: "BLOCKED" },
    });

    return response.json({ ok: true, message: "User blocked" });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /connections/report ─────────────────────────────────────────────────
const reportSchema = z.object({
  reportedUserId: z.string().min(1),
  reason: z.string().min(5).max(200),
  description: z.string().max(1000).optional(),
});

router.post("/report", async (request, response, next) => {
  try {
    const reporterId = request.user!.sub;
    const payload = reportSchema.parse(request.body);

    if (reporterId === payload.reportedUserId) {
      return response.status(400).json({ ok: false, error: "Cannot report yourself" });
    }

    const report = await prisma.safetyReport.create({
      data: {
        reporterId,
        reportedUserId: payload.reportedUserId,
        reason: payload.reason,
        description: payload.description ?? null,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Report submitted. Our safety team will review it.",
      data: { id: report.id },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as connectionsRouter };

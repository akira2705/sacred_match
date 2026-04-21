import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

// All admin routes require authentication + ADMIN role
router.use(requireAuth);
router.use(requireRole("ADMIN"));

// ─── GET /admin/verifications ─────────────────────────────────────────────────
// List pending verification submissions for review
router.get("/verifications", async (request, response, next) => {
  try {
    const status = (request.query.status as string) ?? "PENDING";
    const type = request.query.type as string | undefined;
    const page = Math.max(0, Number(request.query.page ?? 0));
    const limit = Math.min(50, Number(request.query.limit ?? 20));

    const where: Record<string, unknown> = { status };
    if (type) where.type = type;

    const [records, total] = await Promise.all([
      prisma.verificationRecord.findMany({
        where,
        orderBy: { createdAt: "asc" },
        skip: page * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              createdAt: true,
            },
          },
        },
      }),
      prisma.verificationRecord.count({ where }),
    ]);

    return response.json({
      ok: true,
      data: records,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /admin/verifications/:id ────────────────────────────────────────────
router.get("/verifications/:id", async (request, response, next) => {
  try {
    const record = await prisma.verificationRecord.findUnique({
      where: { id: request.params.id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            status: true,
            createdAt: true,
            profile: true,
          },
        },
      },
    });

    if (!record) {
      return response.status(404).json({ ok: false, error: "Verification record not found" });
    }

    return response.json({ ok: true, data: record });
  } catch (error) {
    return next(error);
  }
});

// ─── PATCH /admin/verifications/:id ──────────────────────────────────────────
// Approve or reject a verification submission
const reviewSchema = z.object({
  action: z.enum(["approve", "reject"]),
  notes: z.string().max(500).optional(),
});

router.patch("/verifications/:id", async (request, response, next) => {
  try {
    const adminId = request.user!.sub;
    const { action, notes } = reviewSchema.parse(request.body);

    const record = await prisma.verificationRecord.findUnique({
      where: { id: request.params.id },
      select: { id: true, userId: true, type: true, status: true },
    });

    if (!record) {
      return response.status(404).json({ ok: false, error: "Verification record not found" });
    }

    if (record.status !== "PENDING") {
      return response.status(409).json({ ok: false, error: `Record is already ${record.status}` });
    }

    const newStatus = action === "approve" ? "VERIFIED" : "REJECTED";

    const updated = await prisma.verificationRecord.update({
      where: { id: record.id },
      data: {
        status: newStatus,
        verifiedAt: action === "approve" ? new Date() : null,
        metadata: {
          reviewedBy: adminId,
          reviewedAt: new Date().toISOString(),
          action,
          notes: notes ?? null,
        },
      },
    });

    // Log the admin action
    await prisma.auditLog.create({
      data: {
        userId: adminId,
        action: `verification.${action}`,
        entityType: "VerificationRecord",
        entityId: record.id,
        metadata: { targetUserId: record.userId, type: record.type, notes },
      },
    });

    return response.json({
      ok: true,
      message: `Verification ${action === "approve" ? "approved" : "rejected"} successfully`,
      data: { id: updated.id, status: updated.status, verifiedAt: updated.verifiedAt },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /admin/users ─────────────────────────────────────────────────────────
// List users with filters
router.get("/users", async (request, response, next) => {
  try {
    const page = Math.max(0, Number(request.query.page ?? 0));
    const limit = Math.min(100, Number(request.query.limit ?? 25));
    const search = request.query.search as string | undefined;
    const status = request.query.status as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: page * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          status: true,
          createdAt: true,
          lastSeenAt: true,
          _count: { select: { verificationRecords: true, sentConnections: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return response.json({
      ok: true,
      data: users,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── PATCH /admin/users/:id/status ───────────────────────────────────────────
// Suspend, ban, or warn a user
const userActionSchema = z.object({
  action: z.enum(["suspend", "deactivate", "activate", "warn"]),
  reason: z.string().max(500).optional(),
});

router.patch("/users/:id/status", async (request, response, next) => {
  try {
    const adminId = request.user!.sub;
    const { action, reason } = userActionSchema.parse(request.body);

    const target = await prisma.user.findUnique({
      where: { id: request.params.id },
      select: { id: true, status: true, email: true },
    });

    if (!target) {
      return response.status(404).json({ ok: false, error: "User not found" });
    }

    const statusMap: Record<string, string> = {
      suspend: "SUSPENDED",
      deactivate: "DEACTIVATED",
      activate: "ACTIVE",
    };

    const updateData: Record<string, unknown> = {};
    if (action !== "warn") {
      updateData.status = statusMap[action];
    }

    if (action !== "warn") {
      await prisma.user.update({ where: { id: target.id }, data: updateData });
    }

    await prisma.auditLog.create({
      data: {
        userId: adminId,
        action: `admin.user.${action}`,
        entityType: "User",
        entityId: target.id,
        metadata: { reason: reason ?? null, previousStatus: target.status },
      },
    });

    return response.json({
      ok: true,
      message: `User ${action} action applied`,
      data: { userId: target.id, action },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /admin/reports ───────────────────────────────────────────────────────
// List safety reports
router.get("/reports", async (request, response, next) => {
  try {
    const page = Math.max(0, Number(request.query.page ?? 0));
    const limit = Math.min(50, Number(request.query.limit ?? 20));
    const status = (request.query.status as string) ?? "OPEN";

    const [reports, total] = await Promise.all([
      prisma.safetyReport.findMany({
        where: { status: status as any },
        orderBy: { createdAt: "desc" },
        skip: page * limit,
        take: limit,
        include: {
          reporter: { select: { id: true, firstName: true, lastName: true, email: true } },
          reportedUser: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      prisma.safetyReport.count({ where: { status: status as any } }),
    ]);

    return response.json({
      ok: true,
      data: reports,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── PATCH /admin/reports/:id ─────────────────────────────────────────────────
// Resolve or dismiss a safety report
const reportActionSchema = z.object({
  action: z.enum(["resolve", "dismiss", "escalate"]),
  notes: z.string().max(500).optional(),
});

router.patch("/reports/:id", async (request, response, next) => {
  try {
    const adminId = request.user!.sub;
    const { action, notes } = reportActionSchema.parse(request.body);

    const report = await prisma.safetyReport.findUnique({
      where: { id: request.params.id },
    });

    if (!report) {
      return response.status(404).json({ ok: false, error: "Report not found" });
    }

    const statusMap: Record<string, string> = {
      resolve: "RESOLVED",
      dismiss: "DISMISSED",
      escalate: "UNDER_REVIEW",
    };

    await prisma.safetyReport.update({
      where: { id: report.id },
      data: { status: statusMap[action] as any },
    });

    await prisma.auditLog.create({
      data: {
        userId: adminId,
        action: `admin.report.${action}`,
        entityType: "SafetyReport",
        entityId: report.id,
        metadata: { notes: notes ?? null },
      },
    });

    return response.json({
      ok: true,
      message: `Report ${action}d successfully`,
      data: { reportId: report.id, status: statusMap[action] },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /admin/stats ─────────────────────────────────────────────────────────
// Real stats from DB for the admin dashboard
router.get("/stats", async (_request, response, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      pendingVerifications,
      openReports,
      totalIntakes,
      newUsersThisWeek,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.verificationRecord.count({ where: { status: "PENDING" } }),
      prisma.safetyReport.count({ where: { status: "OPEN" } }),
      (prisma as any).intakeSubmission.count(),
      prisma.user.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return response.json({
      ok: true,
      data: {
        totalUsers,
        activeUsers,
        pendingVerifications,
        openReports,
        totalIntakes,
        newUsersThisWeek,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── Blog posts CRUD ─────────────────────────────────────────────────────────
const blogPostSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10).max(500),
  body: z.string().min(20),
  category: z.string().min(2).max(60),
  coverImageUrl: z.string().url().optional().nullable(),
  readTimeMinutes: z.number().int().min(1).max(60).default(5),
  isPublished: z.boolean().default(false),
});

router.get("/content/posts", async (request, response, next) => {
  try {
    const published = request.query.published;
    const where: Record<string, unknown> = {};
    if (published !== undefined) where.isPublished = published === "true";

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return response.json({ ok: true, data: posts });
  } catch (error) { return next(error); }
});

router.post("/content/posts", async (request, response, next) => {
  try {
    const data = blogPostSchema.parse(request.body);
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });
    return response.status(201).json({ ok: true, data: post });
  } catch (error) { return next(error); }
});

router.put("/content/posts/:id", async (request, response, next) => {
  try {
    const data = blogPostSchema.partial().parse(request.body);
    const post = await prisma.blogPost.update({
      where: { id: request.params.id },
      data: {
        ...data,
        ...(data.isPublished !== undefined && data.isPublished
          ? { publishedAt: new Date() }
          : {}),
      },
    });
    return response.json({ ok: true, data: post });
  } catch (error) { return next(error); }
});

router.delete("/content/posts/:id", async (request, response, next) => {
  try {
    await prisma.blogPost.delete({ where: { id: request.params.id } });
    return response.json({ ok: true, message: "Post deleted" });
  } catch (error) { return next(error); }
});

// ─── FAQs CRUD ────────────────────────────────────────────────────────────────
const faqSchema = z.object({
  question: z.string().min(10).max(300),
  answer: z.string().min(10).max(2000),
  category: z.string().min(2).max(60),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

router.get("/content/faqs", async (request, response, next) => {
  try {
    const faqs = await prisma.faqEntry.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
    return response.json({ ok: true, data: faqs });
  } catch (error) { return next(error); }
});

router.post("/content/faqs", async (request, response, next) => {
  try {
    const data = faqSchema.parse(request.body);
    const faq = await prisma.faqEntry.create({ data });
    return response.status(201).json({ ok: true, data: faq });
  } catch (error) { return next(error); }
});

router.put("/content/faqs/:id", async (request, response, next) => {
  try {
    const data = faqSchema.partial().parse(request.body);
    const faq = await prisma.faqEntry.update({ where: { id: request.params.id }, data });
    return response.json({ ok: true, data: faq });
  } catch (error) { return next(error); }
});

router.delete("/content/faqs/:id", async (request, response, next) => {
  try {
    await prisma.faqEntry.delete({ where: { id: request.params.id } });
    return response.json({ ok: true, message: "FAQ deleted" });
  } catch (error) { return next(error); }
});

export { router as adminRouter };

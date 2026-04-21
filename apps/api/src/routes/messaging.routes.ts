/**
 * Messaging — real-time conversations
 * GET  /messaging/conversations
 * GET  /messaging/conversations/:id/messages
 * POST /messaging/conversations/:id/messages
 */
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
router.use(requireAuth);

// ─── GET /messaging/conversations ────────────────────────────────────────────
router.get("/conversations", async (request, response, next) => {
  try {
    const userId = request.user!.sub;

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                photos: { where: { isPrimary: true }, take: 1, select: { url: true } },
              },
            },
          },
        },
        messages: {
          orderBy: { sentAt: "desc" },
          take: 1,
          select: { id: true, body: true, senderId: true, sentAt: true, status: true },
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    return response.json({ ok: true, data: conversations });
  } catch (error) {
    return next(error);
  }
});

// ─── GET /messaging/conversations/:id/messages ────────────────────────────────
router.get("/conversations/:id/messages", async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const { id } = request.params;
    const page = Math.max(0, Number(request.query.page ?? 0));
    const limit = Math.min(50, Number(request.query.limit ?? 30));

    // Verify the user is a participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversationId: id, userId },
    });
    if (!participant) {
      return response.status(403).json({ ok: false, error: "Not a participant in this conversation" });
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { conversationId: id },
        orderBy: { sentAt: "desc" },
        skip: page * limit,
        take: limit,
        select: {
          id: true,
          body: true,
          senderId: true,
          sentAt: true,
          deliveredAt: true,
          readAt: true,
          status: true,
        },
      }),
      prisma.message.count({ where: { conversationId: id } }),
    ]);

    // Mark unread messages as delivered
    await prisma.message.updateMany({
      where: {
        conversationId: id,
        senderId: { not: userId },
        deliveredAt: null,
      },
      data: { deliveredAt: new Date(), status: "DELIVERED" },
    });

    return response.json({
      ok: true,
      data: messages.reverse(), // chronological order
      meta: { total, page, limit },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /messaging/conversations/:id/messages ───────────────────────────────
const sendMessageSchema = z.object({
  body: z.string().min(1).max(2000),
});

router.post("/conversations/:id/messages", async (request, response, next) => {
  try {
    const senderId = request.user!.sub;
    const { id: conversationId } = request.params;
    const { body } = sendMessageSchema.parse(request.body);

    // Verify participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversationId, userId: senderId },
    });
    if (!participant) {
      return response.status(403).json({ ok: false, error: "Not a participant in this conversation" });
    }

    const message = await prisma.message.create({
      data: { conversationId, senderId, body, status: "SENT" },
      select: { id: true, body: true, senderId: true, sentAt: true, status: true },
    });

    // Bump conversation updatedAt for ordering
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return response.status(201).json({ ok: true, data: message });
  } catch (error) {
    return next(error);
  }
});

// ─── PATCH /messaging/conversations/:id/messages/:msgId/read ──────────────────
router.patch("/conversations/:convId/messages/:msgId/read", async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const { convId, msgId } = request.params;

    const msg = await prisma.message.findUnique({ where: { id: msgId } });
    if (!msg || msg.conversationId !== convId) {
      return response.status(404).json({ ok: false, error: "Message not found" });
    }
    if (msg.senderId === userId) {
      return response.status(400).json({ ok: false, error: "Cannot mark your own message as read" });
    }

    await prisma.message.update({
      where: { id: msgId },
      data: { readAt: new Date(), status: "READ" },
    });

    return response.json({ ok: true, message: "Marked as read" });
  } catch (error) {
    return next(error);
  }
});

export { router as messagingRouter };

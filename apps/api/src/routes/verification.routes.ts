import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// ─── GET /verification/status ────────────────────────────────────────────────
// Returns a structured overview of the user's verification progress
router.get("/status", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;

    const records = await prisma.verificationRecord.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Build a map of type → latest record
    const byType: Record<string, { status: string; verifiedAt: Date | null; createdAt: Date }> = {};
    for (const rec of records) {
      if (!byType[rec.type]) {
        byType[rec.type] = {
          status: rec.status,
          verifiedAt: rec.verifiedAt,
          createdAt: rec.createdAt,
        };
      }
    }

    const required = ["EMAIL", "PHONE", "GOVERNMENT_ID", "PHOTO", "INTENT", "QUESTIONNAIRE"];
    const steps = required.map((type) => ({
      type,
      status: byType[type]?.status ?? "NOT_STARTED",
      verifiedAt: byType[type]?.verifiedAt ?? null,
      completedAt: byType[type]?.createdAt ?? null,
    }));

    const verifiedCount = steps.filter((s) => s.status === "VERIFIED").length;
    const overallProgress = Math.round((verifiedCount / required.length) * 100);

    return response.json({
      ok: true,
      data: {
        steps,
        verifiedCount,
        totalRequired: required.length,
        overallProgress,
        isFullyVerified: verifiedCount === required.length,
      },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /verification/intent ───────────────────────────────────────────────
// Save intent wall answers (marriage readiness declaration)
const intentSchema = z.object({
  isReadyForMarriage: z.boolean(),
  timelineMonths: z.number().int().min(1).max(60).optional(),
  familyApprovalObtained: z.boolean().optional(),
  previousMarriages: z.number().int().min(0).max(10).optional(),
  hasChildren: z.boolean().optional(),
  openToPartnerWithChildren: z.boolean().optional(),
  additionalNotes: z.string().max(500).optional(),
});

router.post("/intent", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = intentSchema.parse(request.body);

    const record = await prisma.verificationRecord.create({
      data: {
        userId,
        type: "INTENT" as any,
        status: "PENDING",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: payload as any,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Intent answers saved",
      data: { id: record.id, status: record.status },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /verification/questionnaire ────────────────────────────────────────
// Save the 12-question marriage readiness questionnaire
const questionnaireSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1).max(50),
        question: z.string().max(300),
        answer: z.union([z.string(), z.boolean(), z.number()]),
      })
    )
    .min(1)
    .max(20),
});

router.post("/questionnaire", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = questionnaireSchema.parse(request.body);

    const record = await prisma.verificationRecord.create({
      data: {
        userId,
        type: "QUESTIONNAIRE" as any,
        status: "PENDING",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: { answers: payload.answers, submittedAt: new Date().toISOString() } as any,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Questionnaire saved",
      data: { id: record.id, status: record.status },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /verification/documents ────────────────────────────────────────────
// Save ID document metadata (file upload happens separately via /upload)
const documentsSchema = z.object({
  documentType: z.enum(["NIN", "PASSPORT", "DRIVERS_LICENSE", "VOTERS_CARD"]),
  documentNumber: z.string().min(3).max(50).optional(),
  issuingCountry: z.string().max(60).default("Nigeria"),
  expiryDate: z.string().optional(),
  // Storage references (set by frontend after upload to S3/Cloudinary)
  frontFileKey: z.string().max(500).optional(),
  backFileKey: z.string().max(500).optional(),
});

router.post("/documents", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = documentsSchema.parse(request.body);

    const record = await prisma.verificationRecord.create({
      data: {
        userId,
        type: "GOVERNMENT_ID",
        status: "PENDING",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: payload as any,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Document metadata saved. Awaiting admin review.",
      data: { id: record.id, status: record.status },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /verification/liveness ─────────────────────────────────────────────
// Save selfie + liveness video file references (uploaded via /upload)
const livenessSchema = z.object({
  selfieFileKey: z.string().max(500),
  videoFileKey: z.string().max(500).optional(),
  deviceInfo: z.string().max(200).optional(),
});

router.post("/liveness", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = livenessSchema.parse(request.body);

    const record = await prisma.verificationRecord.create({
      data: {
        userId,
        type: "LIVENESS" as any,
        status: "PENDING",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: { ...payload, submittedAt: new Date().toISOString() } as any,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Liveness check submitted. Awaiting review.",
      data: { id: record.id, status: record.status },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as verificationRouter };

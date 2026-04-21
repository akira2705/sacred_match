import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const router = Router();

const intakeSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z '-]+$/, "First name can only contain letters, spaces, hyphens or apostrophes"),
  lastName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z '-]+$/, "Last name can only contain letters, spaces, hyphens or apostrophes"),
  email: z.string().email(),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^(\+234|0)[789][01]\d{8}$/.test(v.replace(/\s+/g, "")),
      "Phone must use a valid Nigerian format"
    ),
  state: z.string().max(60).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  ageRange: z.enum(["18-24", "25-30", "31-35", "36-40", "41-50", "50+"]).optional(),
  intent: z.string().max(200).optional(),
  genotypeAwareness: z.boolean().default(false),
  referrer: z.string().max(200).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// POST /intake — save intake form to DB
router.post("/", async (request, response, next) => {
  try {
    const payload = intakeSchema.parse(request.body);

    const ipAddress =
      (request.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
      request.socket.remoteAddress ??
      null;

    const submission = await (prisma as any).intakeSubmission.create({
      data: {
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        email: payload.email.toLowerCase().trim(),
        phone: payload.phone?.replace(/\s+/g, "") ?? null,
        state: payload.state ?? null,
        gender: payload.gender ?? null,
        ageRange: payload.ageRange ?? null,
        intent: payload.intent ?? null,
        genotypeAwareness: payload.genotypeAwareness,
        referrer: payload.referrer ?? null,
        ipAddress,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: (payload.metadata ?? undefined) as any,
      },
    });

    return response.status(201).json({
      ok: true,
      message: "Thank you! We'll be in touch soon.",
      data: { id: submission.id, createdAt: submission.createdAt },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as intakeRouter };

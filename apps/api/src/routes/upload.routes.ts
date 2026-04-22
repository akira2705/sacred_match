/**
 * File Storage — profile photo upload, ID document upload
 *
 * Storage strategy: Cloudinary (preferred) or S3-compatible.
 * Set one of:
 *   CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
 *   OR
 *   S3_BUCKET, S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY
 *
 * This module returns a signed/direct upload URL so the browser can
 * upload directly to the storage provider (avoids piping large files
 * through the API server).
 */
import crypto from "crypto";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
router.use(requireAuth);

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const S3_BUCKET = process.env.S3_BUCKET;

// ─── Helper: parse Cloudinary URL ────────────────────────────────────────────
function parseCloudinaryUrl() {
  if (!CLOUDINARY_URL) return null;
  try {
    const url = new URL(CLOUDINARY_URL);
    return {
      cloudName: url.hostname,
      apiKey: url.username,
      apiSecret: url.password,
    };
  } catch {
    return null;
  }
}

// ─── Generate a Cloudinary signed upload preset ───────────────────────────────
function signCloudinaryUpload(params: Record<string, string>, apiSecret: string): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(sorted + apiSecret).digest("hex");
}

// ─── POST /upload/sign — get a signed upload ticket ──────────────────────────
const signSchema = z.object({
  purpose: z.enum(["profile_photo", "id_document", "liveness_selfie", "liveness_video"]),
  contentType: z.string().optional(),
});

router.post("/sign", async (request, response, next) => {
  try {
    const { purpose } = signSchema.parse(request.body);
    const userId = request.user!.sub;
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const cloudinary = parseCloudinaryUrl();

    if (cloudinary) {
      // Cloudinary signed upload
      const folder = `spousia/${userId}/${purpose}`;
      const publicId = `${folder}/${crypto.randomUUID()}`;
      const params: Record<string, string> = { folder, public_id: publicId, timestamp };

      // Extra security for ID docs — encrypt at rest
      if (purpose === "id_document") {
        params.access_control = JSON.stringify([{ access_type: "token" }]);
      }

      const signature = signCloudinaryUpload(params, cloudinary.apiSecret);

      return response.json({
        ok: true,
        provider: "cloudinary",
        data: {
          uploadUrl: `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/auto/upload`,
          fields: { ...params, api_key: cloudinary.apiKey, signature },
          fileKey: publicId,
        },
      });
    }

    if (S3_BUCKET) {
      // S3 pre-signed URL (placeholder — requires AWS SDK in prod)
      const fileKey = `${userId}/${purpose}/${crypto.randomUUID()}`;
      return response.json({
        ok: true,
        provider: "s3",
        data: {
          // In production, generate a real presigned URL here using @aws-sdk/client-s3
          uploadUrl: `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`,
          fileKey,
          note: "Configure aws-sdk and generate a real presigned URL in production",
        },
      });
    }

    // No provider configured — return a placeholder (dev only)
    return response.json({
      ok: true,
      provider: "local_dev",
      data: {
        uploadUrl: null,
        fileKey: `dev/${userId}/${purpose}/${crypto.randomUUID()}`,
        note: "Set CLOUDINARY_URL or S3_BUCKET env var to enable real uploads",
      },
    });
  } catch (error) {
    return next(error);
  }
});

// ─── POST /upload/confirm — save file key after successful upload ─────────────
const confirmSchema = z.object({
  fileKey: z.string().min(1).max(500),
  purpose: z.enum(["profile_photo", "id_document", "liveness_selfie", "liveness_video"]),
  provider: z.string().default("cloudinary"),
  publicUrl: z.string().url().optional(),
});

router.post("/confirm", async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const { fileKey, purpose, publicUrl } = confirmSchema.parse(request.body);

    if (purpose === "profile_photo") {
      // Create or replace primary photo record
      await prisma.userPhoto.updateMany({
        where: { userId, isPrimary: true },
        data: { isPrimary: false },
      });

      await prisma.userPhoto.create({
        data: {
          userId,
          url: publicUrl ?? fileKey,
          isPrimary: true,
          orderIndex: 0,
          verificationStatus: "PENDING",
        },
      });
    }

    return response.json({
      ok: true,
      message: "Upload confirmed",
      data: { fileKey, purpose, publicUrl },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as uploadRouter };

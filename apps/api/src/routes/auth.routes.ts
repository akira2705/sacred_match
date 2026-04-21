import crypto from "crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";
import { sendEmail, buildOtpEmail, buildPasswordResetEmail } from "../lib/email";
import { verifyFirebaseToken } from "../lib/firebase-admin";

function generateNumericOtp(length = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

const router = Router();

const nigerianPhoneSchema = z
  .string()
  .min(10)
  .transform((value) => value.replace(/\s+/g, ""))
  .refine((value) => /^(\+234|0)[789][01]\d{8}$/.test(value), "Phone must use a valid Nigerian format");

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-z -]+$/, "First name can only contain letters, spaces, and hyphens"),
    lastName: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-z -]+$/, "Last name can only contain letters, spaces, and hyphens"),
    email: z.string().email(),
    phone: nigerianPhoneSchema,
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post("/register", async (request, response, next) => {
  try {
    const payload = registerSchema.parse(request.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: payload.email.toLowerCase() }, { phone: payload.phone }]
      }
    });

    if (existingUser) {
      return response.status(409).json({
        ok: false,
        error: "Email or phone number already registered"
      });
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);

    const user = await prisma.user.create({
      data: {
        email: payload.email.toLowerCase(),
        phone: payload.phone,
        passwordHash,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        status: "ACTIVE",
        profile: {
          create: {
            country: "Nigeria"
          }
        },
        preferences: {
          create: {
            preferredAgeMin: 24,
            preferredAgeMax: 40
          }
        },
        notificationSetting: {
          create: {}
        }
      },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        status: true,
        createdAt: true
      }
    });

    return response.status(201).json({
      ok: true,
      message: "Account created successfully",
      data: user
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const payload = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email.toLowerCase()
      }
    });

    if (!user) {
      return response.status(401).json({
        ok: false,
        error: "Invalid credentials"
      });
    }

    const passwordMatches = await bcrypt.compare(payload.password, user.passwordHash);

    if (!passwordMatches) {
      return response.status(401).json({
        ok: false,
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] }
    );

    return response.json({
      ok: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireAuth, async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: request.user!.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return response.status(404).json({ ok: false, error: "User not found" });
    }

    return response.json({ ok: true, data: user });
  } catch (error) {
    return next(error);
  }
});

// ─── OTP: send ───────────────────────────────────────────────────────────────
const otpSendSchema = z.object({
  channel: z.enum(["email", "sms"]).default("email"),
  purpose: z.enum(["verification", "login"]).default("verification"),
});

router.post("/otp/send", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = otpSendSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, phone: true },
    });
    if (!user) return response.status(404).json({ ok: false, error: "User not found" });

    // Invalidate any recent unexpired OTPs for same user+channel+purpose
    await (prisma as any).otpToken.updateMany({
      where: { userId, channel: payload.channel, purpose: payload.purpose, usedAt: null },
      data: { usedAt: new Date() },
    });

    const otp = generateNumericOtp(6);
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await (prisma as any).otpToken.create({
      data: { userId, channel: payload.channel, purpose: payload.purpose, otpHash, expiresAt },
    });

    if (payload.channel === "email") {
      const emailContent = buildOtpEmail(user.firstName, otp);
      await sendEmail({ to: user.email, ...emailContent });
    }
    // SMS channel: integrate an SMS provider here (e.g. Termii for Nigeria)

    return response.json({
      ok: true,
      message: `OTP sent to your ${payload.channel}`,
      // In dev, return OTP for testing convenience
      ...(process.env.NODE_ENV !== "production" ? { debug_otp: otp } : {}),
    });
  } catch (error) {
    return next(error);
  }
});

// ─── OTP: verify ─────────────────────────────────────────────────────────────
const otpVerifySchema = z.object({
  otp: z.string().length(6),
  channel: z.enum(["email", "sms"]).default("email"),
  purpose: z.enum(["verification", "login"]).default("verification"),
});

router.post("/otp/verify", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = otpVerifySchema.parse(request.body);

    const latestToken = await (prisma as any).otpToken.findFirst({
      where: {
        userId,
        channel: payload.channel,
        purpose: payload.purpose,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!latestToken) {
      return response.status(400).json({ ok: false, error: "No valid OTP found. Please request a new one." });
    }

    // Rate limit: max 5 attempts
    if (latestToken.attempts >= 5) {
      return response.status(429).json({ ok: false, error: "Too many attempts. Please request a new OTP." });
    }

    await (prisma as any).otpToken.update({ where: { id: latestToken.id }, data: { attempts: { increment: 1 } } });

    const matches = await bcrypt.compare(payload.otp, latestToken.otpHash);
    if (!matches) {
      return response.status(400).json({ ok: false, error: "Incorrect OTP. Please try again." });
    }

    // Mark as used
    await (prisma as any).otpToken.update({ where: { id: latestToken.id }, data: { usedAt: new Date() } });

    // If this was an email verification, create/update a VerificationRecord
    if (payload.purpose === "verification" && payload.channel === "email") {
      await prisma.verificationRecord.upsert({
        where: {
          // Use a compound logic: find existing EMAIL record or create
          id: (
            await prisma.verificationRecord.findFirst({ where: { userId, type: "EMAIL" } })
          )?.id ?? "nonexistent",
        },
        create: { userId, type: "EMAIL", status: "VERIFIED", verifiedAt: new Date() },
        update: { status: "VERIFIED", verifiedAt: new Date() },
      });
    }

    return response.json({ ok: true, message: "OTP verified successfully" });
  } catch (error) {
    return next(error);
  }
});

// ─── Password: forgot ─────────────────────────────────────────────────────────
router.post("/password/forgot", async (request, response, next) => {
  try {
    const schema = z.object({ email: z.string().email() });
    const { email } = schema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, firstName: true },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return response.json({ ok: true, message: "If that email is registered, a reset link has been sent." });
    }

    // Invalidate existing tokens
    await (prisma as any).passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const rawToken = generateSecureToken();
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await (prisma as any).passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const WEB_URL = process.env.CORS_ORIGIN?.split(",")[0]?.trim() ?? "http://localhost:3000";
    const resetUrl = `${WEB_URL}/reset-password?token=${rawToken}`;

    const emailContent = buildPasswordResetEmail(user.firstName, resetUrl);
    await sendEmail({ to: user.email, ...emailContent });

    return response.json({ ok: true, message: "If that email is registered, a reset link has been sent." });
  } catch (error) {
    return next(error);
  }
});

// ─── Password: reset ──────────────────────────────────────────────────────────
const passwordResetSchema = z.object({
  token: z.string().min(10),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/\d/, "Password must include a number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character"),
});

router.post("/password/reset", async (request, response, next) => {
  try {
    const { token, newPassword } = passwordResetSchema.parse(request.body);

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const resetRecord = await (prisma as any).passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: { select: { id: true, email: true } } },
    });

    if (!resetRecord || resetRecord.usedAt || resetRecord.expiresAt < new Date()) {
      return response.status(400).json({ ok: false, error: "Reset link is invalid or has expired." });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.$transaction([
      prisma.user.update({ where: { id: resetRecord.userId }, data: { passwordHash } }),
      (prisma as any).passwordResetToken.update({ where: { id: resetRecord.id }, data: { usedAt: new Date() } }),
    ]);

    return response.json({ ok: true, message: "Password reset successfully. You can now log in." });
  } catch (error) {
    return next(error);
  }
});

// ─── Google Sign-In ──────────────────────────────────────────────────────────
const googleSchema = z.object({
  idToken: z.string().min(1),
  phone: z.string().optional(), // required only when creating a new account
});

router.post("/google", async (request, response, next) => {
  try {
    const { idToken, phone } = googleSchema.parse(request.body);

    // Verify Firebase ID token
    const decoded = await verifyFirebaseToken(idToken);
    const email = decoded.email?.toLowerCase();

    if (!email) {
      return response.status(400).json({ ok: false, error: "Google account has no email address." });
    }

    // Find existing user by email
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // New user — phone is required to satisfy the unique constraint
      if (!phone) {
        return response.status(200).json({
          ok: false,
          needsPhone: true,
          email,
          message: "Please provide your phone number to complete sign-up.",
        });
      }

      const nigerianPhone = phone.replace(/\s+/g, "");
      if (!/^(\+234|0)[789][01]\d{8}$/.test(nigerianPhone)) {
        return response.status(400).json({ ok: false, error: "Enter a valid Nigerian phone number." });
      }

      const existingPhone = await prisma.user.findUnique({ where: { phone: nigerianPhone } });
      if (existingPhone) {
        return response.status(409).json({ ok: false, error: "This phone number is already registered." });
      }

      const displayName = decoded.name ?? email.split("@")[0];
      const [firstName, ...rest] = displayName.split(" ");

      user = await prisma.user.create({
        data: {
          email,
          phone: nigerianPhone,
          passwordHash: crypto.randomBytes(32).toString("hex"), // unusable — Google users authenticate via Firebase
          firstName: firstName || "Member",
          lastName: rest.join(" ") || "User",
          status: "ACTIVE",
          profile: { create: { country: "Nigeria" } },
          preferences: { create: { preferredAgeMin: 24, preferredAgeMax: 40 } },
          notificationSetting: { create: {} },
        },
      });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] },
    );

    return response.json({
      ok: true,
      message: "Login successful",
      data: {
        token,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as authRouter };

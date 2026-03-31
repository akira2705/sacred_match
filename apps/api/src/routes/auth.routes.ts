import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { prisma } from "../lib/prisma";

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

export { router as authRouter };

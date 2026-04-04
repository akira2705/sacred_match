import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ ok: false, error: "Authentication required" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
    request.user = payload;
    return next();
  } catch {
    return response.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

export function requireRole(role: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      return response.status(401).json({ ok: false, error: "Authentication required" });
    }

    if (request.user.role !== role) {
      return response.status(403).json({ ok: false, error: "Insufficient permissions" });
    }

    return next();
  };
}

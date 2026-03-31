import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return response.json({
      ok: true,
      status: "healthy",
      services: {
        api: "up",
        database: "up"
      },
      timestamp: new Date().toISOString()
    });
  } catch {
    return response.status(503).json({
      ok: false,
      status: "degraded",
      services: {
        api: "up",
        database: "down"
      },
      timestamp: new Date().toISOString()
    });
  }
});

export { router as healthRouter };

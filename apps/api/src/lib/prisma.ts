import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

declare global {
  // eslint-disable-next-line no-var
  var __sacredMatchPrisma__: PrismaClient | undefined;
}

export const prisma =
  global.__sacredMatchPrisma__ ??
  new PrismaClient({
    log: ["warn", "error"]
  });

if (process.env.NODE_ENV !== "production") {
  global.__sacredMatchPrisma__ = prisma;
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function getDatabaseTarget() {
  try {
    const parsed = new URL(env.DATABASE_URL);

    return {
      host: parsed.hostname,
      port: parsed.port || "5432",
      database: parsed.pathname.replace(/^\//, "") || "postgres"
    };
  } catch {
    return {
      host: "unknown",
      port: "unknown",
      database: "unknown"
    };
  }
}

export async function connectPrismaWithRetry(attempts = 10, delayMs = 2000) {
  const target = getDatabaseTarget();

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch (error) {
      if (attempt === attempts) {
        const causeMessage = error instanceof Error ? error.message : "Unknown database error";

        throw new Error(
          `Prisma could not connect to PostgreSQL at ${target.host}:${target.port}/${target.database}. ${causeMessage}. Start Docker Desktop and run \`npm run dev:api\`, or update DATABASE_URL to a reachable PostgreSQL instance.`
        );
      }

      console.warn(
        `Waiting for PostgreSQL at ${target.host}:${target.port}/${target.database} (${attempt}/${attempts})...`
      );
      await sleep(delayMs);
    }
  }
}

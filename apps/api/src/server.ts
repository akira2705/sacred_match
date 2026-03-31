import { createApp } from "./app";
import { env } from "./config/env";
import { connectPrismaWithRetry, prisma } from "./lib/prisma";

export async function startServer() {
  await connectPrismaWithRetry();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`Sacred Match API listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  return server;
}

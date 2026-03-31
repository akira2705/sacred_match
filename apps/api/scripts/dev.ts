import dotenv from "dotenv";
import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";

const apiDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(apiDir, "..", "..");
const isWindows = process.platform === "win32";

dotenv.config({ path: path.join(apiDir, ".env") });

function getCommand(command: string) {
  return isWindows ? `${command}.cmd` : command;
}

function shouldUseShell(command: string) {
  return isWindows && /\.(cmd|bat)$/i.test(command);
}

function runCommand(
  command: string,
  args: string[],
  options: {
    cwd: string;
    env?: NodeJS.ProcessEnv;
    quiet?: boolean;
  }
) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: options.quiet ? "pipe" : "inherit",
      shell: shouldUseShell(command)
    });

    let stderr = "";

    if (options.quiet) {
      child.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
      });
    }

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `${command} ${args.join(" ")} exited with code ${code ?? "unknown"}${stderr ? `\n${stderr.trim()}` : ""}`
        )
      );
    });
  });
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function canReachDockerDaemon() {
  try {
    await runCommand("docker", ["info"], { cwd: repoRoot, quiet: true });
    return true;
  } catch {
    return false;
  }
}

function getDatabaseTarget() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Copy apps/api/.env.example to apps/api/.env and try again.");
  }

  const parsed = new URL(databaseUrl);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 5432),
    database: parsed.pathname.replace(/^\//, "") || "postgres"
  };
}

async function waitForPort(host: string, port: number, attempts = 30, delayMs = 2000) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const reachable = await new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host, port });

      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });

      socket.once("error", () => {
        socket.destroy();
        resolve(false);
      });

      socket.setTimeout(1500, () => {
        socket.destroy();
        resolve(false);
      });
    });

    if (reachable) {
      return;
    }

    console.log(`Waiting for PostgreSQL at ${host}:${port} (${attempt}/${attempts})...`);
    await sleep(delayMs);
  }

  throw new Error(`PostgreSQL did not become reachable at ${host}:${port} in time.`);
}

async function ensureLocalInfrastructure() {
  const { host } = getDatabaseTarget();

  if (!["localhost", "127.0.0.1"].includes(host)) {
    return;
  }

  const dockerReady = await canReachDockerDaemon();

  if (!dockerReady) {
    throw new Error(
      "Docker Desktop is not running, so Prisma cannot reach the local PostgreSQL service on localhost:5432. Start Docker Desktop and rerun `npm run dev:api`, or point DATABASE_URL at a running PostgreSQL instance."
    );
  }

  await runCommand("docker", ["compose", "up", "-d", "db", "redis"], { cwd: repoRoot });
}

async function prepareDatabase() {
  const { host, port, database } = getDatabaseTarget();

  console.log(`Preparing PostgreSQL database ${database} on ${host}:${port}...`);
  await ensureLocalInfrastructure();
  await waitForPort(host, port);
  await runCommand(getCommand("npm"), ["run", "prisma:generate"], { cwd: apiDir });
  await runCommand(getCommand("npm"), ["run", "prisma:migrate"], { cwd: apiDir });
  await runCommand(getCommand("npm"), ["run", "prisma:seed"], { cwd: apiDir });
}

async function startWatcher() {
  await new Promise<void>((resolve, reject) => {
    const command = getCommand("npm");
    const child = spawn(command, ["run", "dev:watch"], {
      cwd: apiDir,
      env: process.env,
      stdio: "inherit",
      shell: shouldUseShell(command)
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0 || code === null) {
        resolve();
        return;
      }

      reject(new Error(`npm run dev:watch exited with code ${code}`));
    });
  });
}

async function main() {
  await prepareDatabase();
  await startWatcher();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

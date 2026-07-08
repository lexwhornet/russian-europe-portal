import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "";

const globalForDb = globalThis as typeof globalThis & {
  __neonPool?: Pool;
};

function getPool() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (!globalForDb.__neonPool) {
    globalForDb.__neonPool = new Pool({ connectionString: databaseUrl });
  }
  return globalForDb.__neonPool;
}

// Lazy proxy: db calls will only connect when actually used at runtime,
// not during the build step.
export const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    return (getPool() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const db = drizzle({ client: pool });

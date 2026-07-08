import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL || "";

function getClient() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  return neon(databaseUrl);
}

// Lazy proxy so db is only created at runtime, not build time
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const client = getClient();
    const d = drizzle({ client });
    return (d as unknown as Record<string | symbol, unknown>)[prop];
  },
});

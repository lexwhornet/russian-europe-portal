import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";

let _db: NeonHttpDatabase | null = null;

export function getDb(): NeonHttpDatabase {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");
  const client: NeonQueryFunction<false, false> = neon(url);
  _db = drizzle({ client });
  return _db;
}

// Proxy that lazily initializes db on first property access
export const db: NeonHttpDatabase = new Proxy({} as NeonHttpDatabase, {
  get(_target, prop, receiver) {
    const real = getDb();
    const val = Reflect.get(real, prop, receiver);
    return typeof val === "function" ? val.bind(real) : val;
  },
});

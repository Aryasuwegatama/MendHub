import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Only initialize DB if DATABASE_URL is provided; otherwise export null for UI-only mode
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql, { schema });
}

export { db };

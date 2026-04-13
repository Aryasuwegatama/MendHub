import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Always initialize DB — DATABASE_URL must be set in .env.local and Vercel env vars
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

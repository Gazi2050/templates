import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema.js";
import { logger } from "../utils/logger.js";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(DATABASE_URL);

export const db = drizzle(sql, { schema });

export const connectDB = async () => {
  try {
    // simple connectivity check
    await sql`select 1`;
    logger.success("Neon PostgreSQL connected successfully");
  } catch (err) {
    logger.error("Neon PostgreSQL connection error:", err);
    process.exit(1);
  }
};

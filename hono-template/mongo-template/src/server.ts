import dotenv from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "./utils/logger.js";
import { connectDB } from "./db/db.js";

dotenv.config();

const app = new Hono();

connectDB();

app.get("/", (c) => c.redirect("/api"));

app.get("/api", (c) => {
  const response = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Server is running!!!",
    version: "1.0.0",
  };
  return c.json(response);
});

const port = Number(process.env.PORT) || 5000;

serve({
  fetch: app.fetch,
  port,
});

logger.success(`🚀 Server running at http://localhost:${port}/api`);

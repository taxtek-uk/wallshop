// server/api/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { handleDemo } from "../routes/demo";
import { handleQuote } from "../../api/quote";
import { handleContact } from "../../api/contact";
import { handleSubscribe } from "../../api/subscribe";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health checks
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/env-check", (_req, res) => {
    res.json({
      message: "Environment variables check",
      resend_api_key_exists: !!process.env.RESEND_API_KEY,
      resend_api_key_length: process.env.RESEND_API_KEY?.length || 0,
      node_env: process.env.NODE_ENV || "not set",
      timestamp: new Date().toISOString(),
    });
  });

  // Routes
  app.get("/api/demo", handleDemo);
  app.post("/api/send-quote", handleQuote);
  app.post("/api/contact", handleContact);
  app.post("/api/subscribe", handleSubscribe);

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Global error handler caught:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    }
  });

  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Route not found",
      path: req.originalUrl,
      method: req.method,
    });
  });

  return app;
}

// ✅ Add default export so we can `import app from ...`
export default createServer;

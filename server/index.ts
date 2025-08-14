import dotenv from "dotenv";

// Load environment variables from .env file FIRST
dotenv.config();

import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleQuote } from "./routes/quote";
import { handleContact } from "./routes/contact";
import { handleSubscribe } from "./routes/subscribe";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Environment check endpoint
  app.get("/api/env-check", (_req, res) => {
    res.json({
      message: "Environment variables check",
      resend_api_key_exists: !!process.env.RESEND_API_KEY,
      resend_api_key_length: process.env.RESEND_API_KEY?.length || 0,
      node_env: process.env.NODE_ENV || 'not set',
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/demo", handleDemo);
  
  // Resend integration routes
  app.post("/api/send-quote", handleQuote);
  app.post("/api/contact", handleContact);
  app.post("/api/subscribe", handleSubscribe);

  // Global error handler - ensures JSON responses for all errors
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error handler caught:', err);
    console.error('Request URL:', req.url);
    console.error('Request method:', req.method);
    
    // Set JSON content type if not already set
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  });

  // Catch-all for undefined routes
  app.use('*', (req: express.Request, res: express.Response) => {
    console.log('Undefined route accessed:', req.method, req.originalUrl);
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({
      error: 'Route not found',
      path: req.originalUrl,
      method: req.method
    });
  });

  return app;
}

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

  app.get("/api/demo", handleDemo);
  
  // Resend integration routes
  app.post("/api/send-quote", handleQuote);
  app.post("/api/contact", handleContact);
  app.post("/api/subscribe", handleSubscribe);

  return app;
}

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("🧪 Test API called");
  
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    return res.status(200).json({
      success: true,
      message: "Test API is working!",
      timestamp: new Date().toISOString(),
      method: req.method,
      hasResendKey: !!process.env.RESEND_API_KEY,
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'unknown'
    });
  } catch (error) {
    console.error("Test API error:", error);
    return res.status(500).json({
      error: "Test failed",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
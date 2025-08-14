// Catch-all Vercel Serverless Function to forward all /api/* routes to Express
import type { IncomingMessage, ServerResponse } from 'http';
import { createServer } from '../server/api';

// Create the Express app once (cold start)
const app = createServer();

// Export the handler for Vercel (compatible signature)
export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Delegate handling to the Express app
  app(req as any, res as any);
}
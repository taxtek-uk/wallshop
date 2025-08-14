// This is the entry point for Vercel to run your Express app as a Serverless Function
import type { IncomingMessage, ServerResponse } from 'http';
import { createServer } from '../server/api';

// Create the Express app
const app = createServer();

// Export the handler for Vercel (compatible signature)
export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Delegate handling to the Express app
  // Casts ensure compatibility with Express types without extra deps
  app(req as any, res as any);
}
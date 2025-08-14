// api/[...server].ts
import { createServer } from '../server/api/index';

// Create the Express app
const app = createServer();

// Export a Vercel-compatible handler
export default (req: any, res: any) => {
  app(req, res);
};

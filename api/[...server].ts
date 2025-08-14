// api/[...server].ts
import serverless from "serverless-http";
import { createServer } from "../server/api/index";

const app = createServer();

export default serverless(app);

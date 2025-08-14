// server.ts
import { createServer } from "./server/api/index";

const app = createServer();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// api/env-check.ts
export default function handler(req, res) {
  return res.status(200).json({
    status: 'ok',
    env: process.env.NODE_ENV,
  });
}
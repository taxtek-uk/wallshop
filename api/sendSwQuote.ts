// /api/sendSwQuote.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * ENV REQUIRED (set in Vercel Project Settings → Environment Variables)
 * - RESEND_API_KEY=...
 * - FROM_EMAIL="The Wall Shop <stephen@thewallshop.co.uk>"  // or a verified domain/sender in Resend
 * - TO_EMAIL="stephen@thewallshop.co.uk"                    // where you receive the leads
 *
 * Optional:
 * - CC_EMAIL, BCC_EMAIL
 *
 * Frontend: POST JSON payload from SwQuoteModal submit() to /api/sendSwQuote
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic CORS allow-list (adjust origin if you want to restrict strictly)
const ALLOWED_ORIGINS = [
  "https://www.thewallshop.co.uk",
  "https://thewallshop.co.uk",
  "http://localhost:5173", // Vite dev
  "http://127.0.0.1:5173",
];

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

type Payload = {
  dimensions?: {
    widthMm: number;
    heightMm: number;
    moduleWidth: number;
    usableWidth: number;
    slotCount: number;
  };
  accessories?: {
    tv?: boolean;
    fireplace?: boolean;
    soundbar?: boolean;
    shelvingQty?: number;
  };
  gaming?: {
    mode?: "single" | "dual" | null;
    options?: string[]; // keys selected
  };
  devices?: string[]; // keys selected
  style?: {
    category?: string | null;
    finish?: { id: string; name: string; img?: string } | null;
  };
  aiSEO?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  domain?: string;
  // Optionally collect contact fields from the modal in future:
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
};

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function sanitizePayload(input: any): Payload {
  const p: Payload = {};
  if (input && typeof input === "object") {
    const d = input.dimensions || {};
    const a = input.accessories || {};
    const g = input.gaming || {};
    const s = input.style || {};
    const seo = input.aiSEO || {};
    const c = input.contact || {};

    p.dimensions = {
      widthMm: isFiniteNumber(d.widthMm) ? d.widthMm : 0,
      heightMm: isFiniteNumber(d.heightMm) ? d.heightMm : 0,
      moduleWidth: isFiniteNumber(d.moduleWidth) ? d.moduleWidth : 0,
      usableWidth: isFiniteNumber(d.usableWidth) ? d.usableWidth : 0,
      slotCount: isFiniteNumber(d.slotCount) ? d.slotCount : 0,
    };

    p.accessories = {
      tv: !!a.tv,
      fireplace: !!a.fireplace,
      soundbar: !!a.soundbar,
      shelvingQty: isFiniteNumber(a.shelvingQty) ? a.shelvingQty : 0,
    };

    p.gaming = {
      mode: g.mode === "dual" ? "dual" : g.mode === "single" ? "single" : null,
      options: Array.isArray(g.options) ? g.options.map(String) : [],
    };

    p.devices = Array.isArray(input.devices) ? input.devices.map(String) : [];

    p.style = {
      category: s.category ? String(s.category) : null,
      finish: s.finish
        ? {
            id: String(s.finish.id || ""),
            name: String(s.finish.name || ""),
            img: s.finish.img ? String(s.finish.img) : undefined,
          }
        : null,
    };

    p.aiSEO = {
      title: seo.title ? String(seo.title) : undefined,
      description: seo.description ? String(seo.description) : undefined,
      keywords: seo.keywords ? String(seo.keywords) : undefined,
    };

    p.domain = input.domain ? String(input.domain) : undefined;

    p.contact = {
      name: c.name ? String(c.name) : undefined,
      email: c.email ? String(c.email) : undefined,
      phone: c.phone ? String(c.phone) : undefined,
      message: c.message ? String(c.message) : undefined,
    };
  }
  return p;
}

function renderHtmlEmail(p: Payload) {
  const d = p.dimensions!;
  const a = p.accessories!;
  const g = p.gaming!;
  const s = p.style!;
  const devices = p.devices || [];

  const fmt = (n: number) => new Intl.NumberFormat("en-GB").format(n);

  return /* html */ `
  <div style="font-family:Inter,Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
    <h2 style="margin:0 0 8px">New Smart Wall Quote</h2>
    <div style="font-size:13px;color:#555;margin-bottom:16px">
      Domain: <strong>${p.domain || "thewallshop.co.uk"}</strong>
    </div>

    ${
      p.contact?.email || p.contact?.name || p.contact?.phone
        ? `
      <h3 style="margin:16px 0 8px">Contact</h3>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        ${p.contact?.name ? `<tr><td><strong>Name</strong></td><td>${escapeHtml(p.contact.name)}</td></tr>` : ""}
        ${p.contact?.email ? `<tr><td><strong>Email</strong></td><td>${escapeHtml(p.contact.email)}</td></tr>` : ""}
        ${p.contact?.phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(p.contact.phone)}</td></tr>` : ""}
        ${p.contact?.message ? `<tr><td><strong>Message</strong></td><td>${escapeHtml(p.contact.message)}</td></tr>` : ""}
      </table>
      `
        : ""
    }

    <h3 style="margin:16px 0 8px">Dimensions</h3>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
      <tr><td><strong>Width (mm)</strong></td><td>${fmt(d.widthMm)}</td></tr>
      <tr><td><strong>Height (mm)</strong></td><td>${fmt(d.heightMm)}</td></tr>
      <tr><td><strong>Module Width (mm)</strong></td><td>${fmt(d.moduleWidth)}</td></tr>
      <tr><td><strong>Usable Width (mm)</strong></td><td>${fmt(d.usableWidth)}</td></tr>
      <tr><td><strong>Slot Count</strong></td><td>${fmt(d.slotCount)}</td></tr>
    </table>

    <h3 style="margin:16px 0 8px">Accessories</h3>
    <ul style="margin:0 0 12px 16px;padding:0;font-size:14px">
      ${a.tv ? "<li>TV Module</li>" : ""}
      ${a.fireplace ? "<li>Electric Fireplace</li>" : ""}
      ${a.soundbar ? "<li>Soundbar</li>" : ""}
      ${a.shelvingQty ? `<li>Shelving × ${fmt(a.shelvingQty)}</li>` : ""}
      ${!a.tv && !a.fireplace && !a.soundbar && !a.shelvingQty ? "<li>None</li>" : ""}
    </ul>

    <h3 style="margin:16px 0 8px">Gaming</h3>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
      <tr><td><strong>Mode</strong></td><td>${g.mode ? (g.mode === "dual" ? "Dual Screen" : "Single Screen") : "Not selected"}</td></tr>
      <tr><td><strong>Options</strong></td><td>${(g.options || []).join(", ") || "None"}</td></tr>
    </table>

    <h3 style="margin:16px 0 8px">Devices</h3>
    <div style="font-size:14px">
      ${devices.length ? devices.join(", ") : "None"}
    </div>

    <h3 style="margin:16px 0 8px">Style</h3>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
      <tr><td><strong>Category</strong></td><td>${s.category || "—"}</td></tr>
      <tr><td><strong>Finish</strong></td><td>${
        s.finish ? `${escapeHtml(s.finish.name)} (${escapeHtml(s.finish.id)})` : "—"
      }</td></tr>
    </table>
    ${
      s.finish?.img
        ? `<div style="margin-top:8px"><img src="${s.finish.img}" alt="${escapeHtml(
            s.finish.name
          )}" style="max-width:260px;border-radius:12px;border:1px solid #eee"/></div>`
        : ""
    }

    ${
      p.aiSEO?.title || p.aiSEO?.description || p.aiSEO?.keywords
        ? `
      <h3 style="margin:16px 0 8px">AI-SEO (from modal)</h3>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        ${p.aiSEO?.title ? `<tr><td><strong>Title</strong></td><td>${escapeHtml(p.aiSEO.title)}</td></tr>` : ""}
        ${p.aiSEO?.description ? `<tr><td><strong>Description</strong></td><td>${escapeHtml(p.aiSEO.description)}</td></tr>` : ""}
        ${p.aiSEO?.keywords ? `<tr><td><strong>Keywords</strong></td><td>${escapeHtml(p.aiSEO.keywords)}</td></tr>` : ""}
      </table>
      `
        : ""
    }

    <p style="margin-top:20px;font-size:12px;color:#666">
      Sent from thewallshop.co.uk • Headquarters: SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK •
      Phone: +44 141 739 3377 (Mon–Fri, 9:00 AM–6:00 PM PST)
    </p>
  </div>
  `;
}

function renderTextEmail(p: Payload) {
  const d = p.dimensions!;
  const a = p.accessories!;
  const g = p.gaming!;
  const s = p.style!;
  return [
    "New Smart Wall Quote",
    `Domain: ${p.domain || "thewallshop.co.uk"}`,
    "",
    "Contact:",
    p.contact?.name ? `- Name: ${p.contact.name}` : "",
    p.contact?.email ? `- Email: ${p.contact.email}` : "",
    p.contact?.phone ? `- Phone: ${p.contact.phone}` : "",
    p.contact?.message ? `- Message: ${p.contact.message}` : "",
    "",
    "Dimensions:",
    `- Width (mm): ${d.widthMm}`,
    `- Height (mm): ${d.heightMm}`,
    `- Module Width (mm): ${d.moduleWidth}`,
    `- Usable Width (mm): ${d.usableWidth}`,
    `- Slot Count: ${d.slotCount}`,
    "",
    "Accessories:",
    a.tv ? "- TV" : "",
    a.fireplace ? "- Electric Fireplace" : "",
    a.soundbar ? "- Soundbar" : "",
    a.shelvingQty ? `- Shelving × ${a.shelvingQty}` : "",
    !a.tv && !a.fireplace && !a.soundbar && !a.shelvingQty ? "- None" : "",
    "",
    "Gaming:",
    `- Mode: ${g.mode || "Not selected"}`,
    `- Options: ${(g.options || []).join(", ") || "None"}`,
    "",
    "Devices:",
    (p.devices || []).join(", ") || "None",
    "",
    "Style:",
    `- Category: ${s.category || "-"}`,
    `- Finish: ${s.finish ? `${s.finish.name} (${s.finish.id})` : "-"}`,
    s.finish?.img ? `- Image: ${s.finish.img}` : "",
    "",
    "AI-SEO:",
    p.aiSEO?.title ? `- Title: ${p.aiSEO.title}` : "",
    p.aiSEO?.description ? `- Description: ${p.aiSEO.description}` : "",
    p.aiSEO?.keywords ? `- Keywords: ${p.aiSEO.keywords}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(str: string) {
  // ES5+ compatible escaping without using String.prototype.replaceAll
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (ch) => map[ch]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Validate env
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }
  const from = process.env.FROM_EMAIL || "The Wall Shop <no-reply@thewallshop.co.uk>";
  const to = process.env.TO_EMAIL || "stephen@thewallshop.co.uk";
  const cc = process.env.CC_EMAIL;
  const bcc = process.env.BCC_EMAIL;

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const payload = sanitizePayload(body);

    // Basic required checks: width/height must exist
    if (!payload.dimensions || payload.dimensions.widthMm <= 0 || payload.dimensions.heightMm <= 0) {
      return res.status(400).json({ error: "Invalid dimensions" });
    }

    const subject = `Smart Wall Quote — ${payload.style?.finish?.name ? payload.style.finish.name : "New Submission"} (${payload.dimensions.slotCount} slots)`;

    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
      subject,
      html: renderHtmlEmail(payload),
      text: renderTextEmail(payload),
      headers: {
        "X-TheWallShop-Form": "SwQuoteModal",
      },
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email send failed", details: error });
    }

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (e: any) {
    console.error("sendSwQuote error:", e);
    return res.status(400).json({ error: "Bad Request", details: String(e?.message || e) });
  }
}

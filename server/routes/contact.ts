// server/handlers/handleContact.ts
import { Request, Response } from "express";
import { Resend } from "resend";

/**
 * Contact form handler — corporate/professional version
 * - Clean, accessible email template (no emojis, no FA icons)
 * - Plain-text fallback
 * - Input validation + sanitisation
 * - Minimal PII in logs
 * - Consistent JSON responses
 *
 * Brand details (The Wall Shop)
 * Domain: thewallshop.co.uk
 * Email: info@thewallshop.co.uk
 * Phone: +44 141 739 3377 (Mon–Fri, 9:00–18:00 PST)
 * HQ: SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
 */
export async function handleContact(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json");

  try {
    // --- Environment checks (do not log secrets) ---
    const hasKey = Boolean(process.env.RESEND_API_KEY);
    if (!hasKey) {
      return res.status(500).json({
        error: "Email service not configured",
        details: "Missing RESEND_API_KEY environment variable",
      });
    }

    // --- Extract + normalise body ---
    const rawName = safeString(req.body?.name);
    const rawEmail = safeString(req.body?.email);
    const rawReason = safeString(req.body?.reason);
    const rawMessage = safeString(req.body?.message);

    const name = truncate(stripTags(rawName.trim()), 120);
    const email = rawEmail.trim().toLowerCase();
    const reason = truncate(stripTags(rawReason.trim()), 160);
    const message = truncate(stripTagsMultiline(rawMessage.trim()), 8000);

    // --- Validate required fields ---
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Please provide a valid email address.";
    if (!reason) errors.reason = "Subject is required.";
    if (!message) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        fields: errors,
      });
    }

    // --- Build email content (HTML + Text) ---
    const esc = escapeHtml;
    const timestamp = new Date();

    // Preheader (hidden in most clients but boosts deliverability/clarity)
    const preheader =
      "New enquiry submitted via The Wall Shop contact form. Please review the details below.";

    // Brand palette (subtle, no gradients)
    const c = {
      bg: "#ffffff",
      text: "#111827",
      mutedText: "#6B7280",
      key: "#374151",
      border: "#E5E7EB",
      brandDark: "#231c14",
      brandGold: "#b89773",
      panel: "#F9FAFB",
      badgeBg: "#F3F4F6",
      link: "#0F766E",
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Contact — The Wall Shop</title>
<style>
  /* Basic reset for safer rendering */
  body { margin:0; padding:0; background:${c.panel}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  a { color:${c.link}; text-decoration:none; }
  a:hover { text-decoration:underline; }
  .container { max-width:680px; margin:0 auto; background:${c.bg}; }
  .header { padding:28px 28px 22px; border-bottom:1px solid ${c.border}; }
  .brand { display:flex; align-items:center; gap:12px; }
  .brand-badge {
    width:44px; height:44px; border-radius:10px;
    background:${c.brandDark}; color:#fff; display:flex; align-items:center; justify-content:center;
    font-weight:700; font-size:18px; letter-spacing:0.5px;
  }
  .brand-title { margin:0; font-size:18px; line-height:1.2; color:${c.brandDark}; font-weight:800; }
  .brand-sub { margin:2px 0 0; font-size:12px; color:${c.mutedText}; }

  .preheader { display:none; visibility:hidden; opacity:0; height:0; overflow:hidden; mso-hide:all; font-size:1px; color:transparent; }
  .content { padding:28px; color:${c.text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  .title { margin:0 0 16px; font-size:20px; line-height:1.3; color:${c.text}; font-weight:800; }
  .subtitle { margin:0 0 24px; font-size:14px; color:${c.mutedText}; }

  .card { background:#fff; border:1px solid ${c.border}; border-radius:12px; padding:20px; margin-bottom:16px; }
  .kv { width:100%; border-collapse:collapse; }
  .kv th, .kv td { text-align:left; vertical-align:top; padding:10px 0; border-bottom:1px solid ${c.border}; font-size:14px; }
  .kv th { color:${c.key}; width:120px; font-weight:600; }
  .kv tr:last-child th, .kv tr:last-child td { border-bottom:none; }

  .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:${c.badgeBg}; color:${c.key}; font-size:12px; font-weight:600; }

  .message { white-space:pre-wrap; line-height:1.7; font-size:15px; color:${c.text}; }

  .meta { padding:16px 20px; font-size:12px; color:${c.mutedText}; background:${c.panel}; border:1px solid ${c.border}; border-radius:12px; }

  .actions { padding-top:8px; }
  .btn {
    display:inline-block; padding:12px 18px; border-radius:10px; font-weight:700; font-size:14px; border:1px solid ${c.brandDark};
    background:${c.brandDark}; color:#fff;
  }
  .btn.secondary {
    background:#fff; color:${c.brandDark}; border-color:${c.border};
  }

  .footer { padding:22px 28px 28px; border-top:1px solid ${c.border}; color:${c.mutedText}; font-size:12px; }
  .foot-strong { color:${c.key}; font-weight:700; }
  .brand-gold { color:${c.brandGold}; font-weight:600; }
</style>
</head>
<body>
<span class="preheader">${esc(preheader)}</span>
<div class="container">

  <!-- Header -->
  <div class="header">
    <div class="brand">
      <div class="brand-badge">TWS</div>
      <div>
        <p class="brand-title">The Wall Shop</p>
        <p class="brand-sub">Premium wall solutions & smart home technology</p>
      </div>
    </div>
  </div>

  <!-- Body -->
  <div class="content">
    <h1 class="title">New enquiry received</h1>
    <p class="subtitle">A customer submitted the contact form at thewallshop.co.uk. The details are below.</p>

    <div class="card">
      <table class="kv" role="presentation" aria-label="Contact details">
        <tr>
          <th scope="row">Name</th>
          <td>${esc(name)}</td>
        </tr>
        <tr>
          <th scope="row">Email</th>
          <td><a href="mailto:${esc(email)}">${esc(email)}</a></td>
        </tr>
        <tr>
          <th scope="row">Subject</th>
          <td><span class="badge">${esc(reason)}</span></td>
        </tr>
      </table>
    </div>

    <div class="card">
      <div class="message">${esc(message)}</div>
    </div>

    <div class="meta">
      Received: ${esc(
        timestamp.toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      )}<br/>
      Source: <span class="foot-strong">thewallshop.co.uk/contact</span>
    </div>

    <div class="actions" style="margin-top:16px;">
      <a class="btn" href="mailto:${esc(
        email
      )}?subject=${encodeURIComponent("Re: " + reason + " — The Wall Shop")}">Reply</a>
      <a class="btn secondary" style="margin-left:8px"
         href="mailto:info@thewallshop.co.uk?subject=${encodeURIComponent(
           "Fwd: Contact — " + reason
         )}&body=${encodeURIComponent(
           `Customer Details:\nName: ${name}\nEmail: ${email}\nSubject: ${reason}\n\nMessage:\n${message}`
         )}">
         Forward internally
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="foot-strong">The Wall Shop <span class="brand-gold">·</span> thewallshop.co.uk</div>
    <div>SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</div>
    <div>+44 141 739 3377 · Mon–Fri, 9:00–18:00 PST · <a href="mailto:info@thewallshop.co.uk">info@thewallshop.co.uk</a></div>
    <div style="margin-top:8px;">You are receiving this because your address is configured to receive contact form submissions.</div>
  </div>

</div>
</body>
</html>`;

    const text = [
      "New enquiry received — The Wall Shop",
      "",
      `Name   : ${name}`,
      `Email  : ${email}`,
      `Subject: ${reason}`,
      "",
      "Message:",
      message,
      "",
      `Received: ${timestamp.toLocaleString("en-GB")}`,
      "Source  : thewallshop.co.uk/contact",
      "",
      "Reply: " + `mailto:${email}?subject=${encodeURIComponent("Re: " + reason + " — The Wall Shop")}`,
    ].join("\n");

    // --- Send via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    const { data, error } = await resend.emails.send({
      from: "The Wall Shop <no-reply@thewallshop.co.uk>",
      to: ["stephen@thewallshop.co.uk"], // adjust recipients as needed
      replyTo: email,
      subject: `Contact — ${reason} (${name})`,
      html,
      text,
    });

    if (error) {
      // Avoid echoing remote error details to client
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.json({
      success: true,
      message: "Contact form submitted successfully",
      id: data?.id,
    });
  } catch (err) {
    // Avoid leaking stack traces to client; return clean JSON
    const msg = err instanceof Error ? err.message : "Unknown server error";
    return res.status(500).json({
      error: "Failed to process contact form",
      details: msg,
    });
  }
}

/* ----------------------- Utilities ----------------------- */

function safeString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function isValidEmail(v: string): boolean {
  // Simple but robust email validation for server-side
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(v);
}

function stripTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function stripTagsMultiline(input: string): string {
  // Remove tags and normalise line breaks
  return stripTags(input).replace(/\r\n?/g, "\n");
}

function truncate(input: string, max: number): string {
  return input.length > max ? input.slice(0, max) : input;
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

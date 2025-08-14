// server/handlers/handleQuote.ts
import { Request, Response } from "express";
import { Resend } from "resend";

/**
 * Quote request handler — corporate/professional version
 * - No emojis/icons; clean, accessible layout
 * - Plain-text fallback for deliverability
 * - Input validation + sanitisation
 * - Minimal PII in logs
 * - Consistent JSON responses
 *
 * Brand: The Wall Shop (thewallshop.co.uk)
 * Email: info@thewallshop.co.uk
 * Phone: +44 141 739 3377 (Mon–Fri, 9:00–18:00 PST)
 * HQ: SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
 */
export async function handleQuote(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json");

  try {
    // --- Environment checks (do not log secrets) ---
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "Email service not configured",
        details: "Missing RESEND_API_KEY environment variable",
      });
    }

    // --- Extract + normalise body (coerce to strings; trim) ---
    const name = truncate(stripTags(safeString(req.body?.name).trim()), 120);
    const email = safeString(req.body?.email).trim().toLowerCase();
    const phone = truncate(stripTags(safeString(req.body?.phone).trim()), 40);
    const address = truncate(stripTagsMultiline(safeString(req.body?.address).trim()), 500);
    const projectType = truncate(stripTags(safeString(req.body?.projectType).trim()), 100);
    const area = truncate(stripTags(safeString(req.body?.area).trim()), 32);
    const urgency = normaliseUrgency(safeString(req.body?.urgency).trim());
    const message = truncate(stripTagsMultiline(safeString(req.body?.message).trim()), 8000);

    // selectedProduct may be an object; defend against arbitrary payloads
    const rawProduct = req.body?.selectedProduct ?? null;
    const selectedProduct = normaliseProduct(rawProduct);

    // --- Normalise pricing arrays from QuoteModal ---
    type ModuleItem = { name: string; size?: string; quantity: number; price: number };
    type WallCovering = { name: string; type?: string; area: number; price: number };
    type SmartDevice = { name: string; category?: string; quantity: number; price: number };
    type Accessory = { name: string; category?: string; quantity: number; price: number; suppliedBy?: "client" | "wallshop" };

    const toNum = (v: any): number => {
      const n = Number(v);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    };

    const normStr = (v: any, max = 200) => truncate(stripTags(safeString(v).trim()), max);

    const normaliseModules = (arr: any): ModuleItem[] =>
      Array.isArray(arr)
        ? arr
            .map((x) => ({
              name: normStr(x?.name, 160),
              size: normStr(x?.size, 40) || undefined,
              quantity: Math.max(0, Math.floor(toNum(x?.quantity))),
              price: toNum(x?.price),
            }))
            .filter((x) => x.name && x.quantity > 0)
        : [];

    const normaliseCoverings = (arr: any): WallCovering[] =>
      Array.isArray(arr)
        ? arr
            .map((x) => ({
              name: normStr(x?.name, 160),
              type: normStr(x?.type, 60) || undefined,
              area: toNum(x?.area),
              price: toNum(x?.price),
            }))
            .filter((x) => x.name && x.area > 0)
        : [];

    const normaliseDevices = (arr: any): SmartDevice[] =>
      Array.isArray(arr)
        ? arr
            .map((x) => ({
              name: normStr(x?.name, 160),
              category: normStr(x?.category, 60) || undefined,
              quantity: Math.max(0, Math.floor(toNum(x?.quantity))),
              price: toNum(x?.price),
            }))
            .filter((x) => x.name && x.quantity > 0)
        : [];

    const normaliseAccessories = (arr: any): Accessory[] =>
      Array.isArray(arr)
        ? arr
            .map((x) => ({
              name: normStr(x?.name, 160),
              category: normStr(x?.category, 60) || undefined,
              quantity: Math.max(0, Math.floor(toNum(x?.quantity))),
              price: toNum(x?.price),
              suppliedBy: (safeString(x?.suppliedBy) === "client" ? "client" : "wallshop") as "client" | "wallshop",
            }))
            .filter((x) => x.name && x.quantity > 0)
        : [];

    const modules = normaliseModules(req.body?.modules);
    const wallCoverings = normaliseCoverings(req.body?.wallCoverings);
    const smartDevices = normaliseDevices(req.body?.smartDevices);
    const accessories = normaliseAccessories(req.body?.accessories);

    // --- Validate required fields ---
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Please provide a valid email address.";
    if (!phone) errors.phone = "Phone is required.";
    else if (!isValidPhone(phone)) errors.phone = "Please provide a valid phone number.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: "Validation failed", fields: errors });
    }

    // --- Pricing calculations ---
    const VAT_RATE = 0.2; // 20% UK VAT
    const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

    const sum = (ns: number[]) => ns.reduce((a, b) => a + b, 0);

    const moduleSubtotal = sum(modules.map((m) => m.price * m.quantity));
    const coveringSubtotal = sum(wallCoverings.map((w) => w.price * w.area));
    const deviceSubtotal = sum(smartDevices.map((d) => d.price * d.quantity));
    const accessorySubtotal = sum(accessories.filter((a) => a.suppliedBy !== "client").map((a) => a.price * a.quantity));

    const netSubtotal = moduleSubtotal + coveringSubtotal + deviceSubtotal + accessorySubtotal;
    const vatAmount = +(netSubtotal * VAT_RATE).toFixed(2);
    const grossTotal = +(netSubtotal + vatAmount).toFixed(2);

    const formatMoney = (n: number) => currency.format(Math.round(n * 100) / 100);

    // --- Build email content (HTML + Text) ---
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
      headerBg: "#0f172a",
      tableHeadBg: "#f8fafc",
    };

    const esc = escapeHtml;
    const timestamp = new Date();
    const preheader =
      "New quote request submitted via The Wall Shop. Review customer details and project requirements below.";

    // Build pricing tables
    const tableStyles = `width:100%; border-collapse:collapse; font-size:14px;`;
    const thTdCommon = `padding:10px 8px; border-bottom:1px solid ${c.border}; text-align:left; vertical-align:top;`;
    const thStyle = `${thTdCommon} color:${c.key}; font-weight:700; background:${c.tableHeadBg};`;
    const tdStyle = `${thTdCommon} color:${c.text};`;

    const renderModules = modules.length
      ? `
      <div class="card">
        <h2 style="margin:0 0 12px; font-size:16px; color:${c.key};">Modules</h2>
        <table role="presentation" aria-label="Modules" style="${tableStyles}">
          <thead>
            <tr>
              <th style="${thStyle}">Item</th>
              <th style="${thStyle}">Details</th>
              <th style="${thStyle}">Qty</th>
              <th style="${thStyle}">Unit</th>
              <th style="${thStyle}; text-align:right;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${modules
              .map((m) => {
                const line = m.price * m.quantity;
                return `<tr>
                    <td style="${tdStyle}">${esc(m.name)}</td>
                    <td style="${tdStyle}">${m.size ? esc(m.size) : "-"}</td>
                    <td style="${tdStyle}">${m.quantity}</td>
                    <td style="${tdStyle}">${formatMoney(m.price)}</td>
                    <td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(line)}</td>
                  </tr>`;
              })
              .join("")}
            <tr>
              <td colspan="4" style="${tdStyle}; text-align:right; font-weight:700;">Subtotal</td>
              <td style="${tdStyle}; text-align:right; font-weight:700;">${formatMoney(moduleSubtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>`
      : "";

    const renderCoverings = wallCoverings.length
      ? `
      <div class="card">
        <h2 style="margin:0 0 12px; font-size:16px; color:${c.key};">Wall Coverings</h2>
        <table role="presentation" aria-label="Wall coverings" style="${tableStyles}">
          <thead>
            <tr>
              <th style="${thStyle}">Item</th>
              <th style="${thStyle}">Type</th>
              <th style="${thStyle}">Area</th>
              <th style="${thStyle}">Unit</th>
              <th style="${thStyle}; text-align:right;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${wallCoverings
              .map((w) => {
                const line = w.price * w.area;
                return `<tr>
                    <td style="${tdStyle}">${esc(w.name)}</td>
                    <td style="${tdStyle}">${w.type ? esc(w.type) : "-"}</td>
                    <td style="${tdStyle}">${w.area.toFixed(2)} m²</td>
                    <td style="${tdStyle}">${formatMoney(w.price)} / m²</td>
                    <td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(line)}</td>
                  </tr>`;
              })
              .join("")}
            <tr>
              <td colspan="4" style="${tdStyle}; text-align:right; font-weight:700;">Subtotal</td>
              <td style="${tdStyle}; text-align:right; font-weight:700;">${formatMoney(coveringSubtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>`
      : "";

    const renderDevices = smartDevices.length
      ? `
      <div class="card">
        <h2 style="margin:0 0 12px; font-size:16px; color:${c.key};">Smart Devices</h2>
        <table role="presentation" aria-label="Smart devices" style="${tableStyles}">
          <thead>
            <tr>
              <th style="${thStyle}">Item</th>
              <th style="${thStyle}">Category</th>
              <th style="${thStyle}">Qty</th>
              <th style="${thStyle}">Unit</th>
              <th style="${thStyle}; text-align:right;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${smartDevices
              .map((d) => {
                const line = d.price * d.quantity;
                return `<tr>
                    <td style="${tdStyle}">${esc(d.name)}</td>
                    <td style="${tdStyle}">${d.category ? esc(d.category) : "-"}</td>
                    <td style="${tdStyle}">${d.quantity}</td>
                    <td style="${tdStyle}">${formatMoney(d.price)}</td>
                    <td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(line)}</td>
                  </tr>`;
              })
              .join("")}
            <tr>
              <td colspan="4" style="${tdStyle}; text-align:right; font-weight:700;">Subtotal</td>
              <td style="${tdStyle}; text-align:right; font-weight:700;">${formatMoney(deviceSubtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>`
      : "";

    const renderAccessories = accessories.length
      ? `
      <div class="card">
        <h2 style="margin:0 0 12px; font-size:16px; color:${c.key};">Accessories</h2>
        <table role="presentation" aria-label="Accessories" style="${tableStyles}">
          <thead>
            <tr>
              <th style="${thStyle}">Item</th>
              <th style="${thStyle}">Category</th>
              <th style="${thStyle}">Qty</th>
              <th style="${thStyle}">Unit</th>
              <th style="${thStyle}">Supplied By</th>
              <th style="${thStyle}; text-align:right;">Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${accessories
              .map((a) => {
                const billable = a.suppliedBy !== "client";
                const line = billable ? a.price * a.quantity : 0;
                return `<tr>
                    <td style="${tdStyle}">${esc(a.name)}</td>
                    <td style="${tdStyle}">${a.category ? esc(a.category) : "-"}</td>
                    <td style="${tdStyle}">${a.quantity}</td>
                    <td style="${tdStyle}">${billable ? formatMoney(a.price) : "-"}</td>
                    <td style="${tdStyle}">${a.suppliedBy === "client" ? "Client" : "The Wall Shop"}</td>
                    <td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(line)}</td>
                  </tr>`;
              })
              .join("")}
            <tr>
              <td colspan="5" style="${tdStyle}; text-align:right; font-weight:700;">Subtotal (billable)</td>
              <td style="${tdStyle}; text-align:right; font-weight:700;">${formatMoney(accessorySubtotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>`
      : "";

    const renderSummary = `
      <div class="card" style="background:${c.panel};">
        <h2 style="margin:0 0 12px; font-size:16px; color:${c.key};">Summary</h2>
        <table role="presentation" aria-label="Totals" style="${tableStyles}">
          <tbody>
            <tr><td style="${tdStyle}">Modules</td><td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(moduleSubtotal)}</td></tr>
            <tr><td style="${tdStyle}">Wall Coverings</td><td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(coveringSubtotal)}</td></tr>
            <tr><td style="${tdStyle}">Smart Devices</td><td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(deviceSubtotal)}</td></tr>
            <tr><td style="${tdStyle}">Accessories (billable)</td><td style="${tdStyle}; text-align:right; font-weight:600;">${formatMoney(accessorySubtotal)}</td></tr>
            <tr><td colspan="2" style="${tdStyle}"></td></tr>
            <tr><td style="${tdStyle}; font-weight:700;">Subtotal</td><td style="${tdStyle}; text-align:right; font-weight:700;">${formatMoney(netSubtotal)}</td></tr>
            <tr><td style="${tdStyle};">VAT (20%)</td><td style="${tdStyle}; text-align:right;">${formatMoney(vatAmount)}</td></tr>
            <tr><td style="${tdStyle}; font-weight:800; border-top:2px solid ${c.border};">Total</td><td style="${tdStyle}; text-align:right; font-weight:800; border-top:2px solid ${c.border};">${formatMoney(grossTotal)}</td></tr>
          </tbody>
        </table>
      </div>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Quote Request — The Wall Shop</title>
<style>
  body { margin:0; padding:0; background:${c.panel}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  a { color:${c.link}; text-decoration:none; } a:hover { text-decoration:underline; }
  .container { max-width:720px; margin:0 auto; background:${c.bg}; }
  .header { padding:28px 28px 22px; border-bottom:1px solid ${c.border}; background:${c.headerBg}; }
  .brand { display:flex; align-items:center; gap:12px; }
  .brand-badge { width:44px; height:44px; border-radius:10px; background:${c.brandGold}; color:#0f172a; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px; letter-spacing:0.5px; }
  .brand-title { margin:0; font-size:18px; line-height:1.2; color:#ffffff; font-weight:800; }
  .brand-sub { margin:2px 0 0; font-size:12px; color:#cbd5e1; }
  .preheader { display:none; visibility:hidden; opacity:0; height:0; overflow:hidden; mso-hide:all; font-size:1px; color:transparent; }
  .content { padding:28px; color:${c.text}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif; }
  .title { margin:0 0 16px; font-size:20px; font-weight:800; color:${c.text}; }
  .subtitle { margin:0 0 24px; font-size:14px; color:${c.mutedText}; }
  .card { background:#fff; border:1px solid ${c.border}; border-radius:12px; padding:20px; margin-bottom:16px; }
  .kv { width:100%; border-collapse:collapse; }
  .kv th,.kv td { text-align:left; vertical-align:top; padding:10px 0; border-bottom:1px solid ${c.border}; font-size:14px; }
  .kv th { color:${c.key}; width:140px; font-weight:600; }
  .kv tr:last-child th,.kv tr:last-child td { border-bottom:none; }
  .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:${c.badgeBg}; color:${c.key}; font-size:12px; font-weight:600; text-transform:capitalize; }
  .message { white-space:pre-wrap; line-height:1.7; font-size:15px; color:${c.text}; }
  .meta { padding:16px 20px; font-size:12px; color:${c.mutedText}; background:${c.panel}; border:1px solid ${c.border}; border-radius:12px; }
  .footer { padding:22px 28px 28px; border-top:1px solid ${c.border}; color:${c.mutedText}; font-size:12px; }
  .foot-strong { color:${c.key}; font-weight:700; }
  .brand-gold { color:${c.brandGold}; font-weight:600; }
  .btns { margin-top:12px; }
  .btn { display:inline-block; padding:12px 18px; border-radius:10px; font-weight:700; font-size:14px; border:1px solid ${c.brandDark}; background:${c.brandDark}; color:#fff; }
  .btn + .btn { margin-left:8px; }
  .btn.secondary { background:#fff; color:${c.brandDark}; border-color:${c.border}; }
</style>
</head>
<body>
<span class="preheader">${esc(preheader)}</span>
<div class="container">
  <div class="header">
    <div class="brand">
      <div class="brand-badge">TWS</div>
      <div>
        <p class="brand-title">The Wall Shop</p>
        <p class="brand-sub">Premium wall solutions & smart home technology</p>
      </div>
    </div>
  </div>

  <div class="content">
    <h1 class="title">New quote request</h1>
    <p class="subtitle">A customer submitted a quote request at thewallshop.co.uk. Details are below.</p>

    <div class="card">
      <table class="kv" role="presentation" aria-label="Customer details">
        <tr><th scope="row">Name</th><td>${esc(name)}</td></tr>
        <tr><th scope="row">Email</th><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><th scope="row">Phone</th><td><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
        ${address ? `<tr><th scope="row">Address</th><td>${esc(address)}</td></tr>` : ``}
      </table>
    </div>

    <div class="card">
      <table class="kv" role="presentation" aria-label="Project details">
        ${projectType ? `<tr><th scope="row">Project type</th><td>${esc(projectType)}</td></tr>` : ``}
        ${area ? `<tr><th scope="row">Area</th><td>${esc(area)} m²</td></tr>` : ``}
        <tr><th scope="row">Urgency</th><td><span class="badge">${esc(urgency)}</span></td></tr>
      </table>
    </div>

    ${selectedProduct ? `<div class="card">
      <table class="kv" role="presentation" aria-label="Selected product">
        <tr><th scope="row">Product</th><td>${esc(selectedProduct.name)}</td></tr>
        ${selectedProduct.sku ? `<tr><th scope="row">SKU</th><td>${esc(selectedProduct.sku)}</td></tr>` : ``}
        ${selectedProduct.price ? `<tr><th scope="row">Price</th><td>${esc(selectedProduct.price)}</td></tr>` : ``}
        ${selectedProduct.url ? `<tr><th scope="row">Link</th><td><a href="${esc(selectedProduct.url)}">${esc(selectedProduct.url)}</a></td></tr>` : ``}
      </table>
    </div>` : ``}

    ${renderModules}
    ${renderCoverings}
    ${renderDevices}
    ${renderAccessories}
    ${renderSummary}

    ${message ? `<div class="card"><div class="message">${esc(message)}</div></div>` : ``}

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
      Source: <span class="foot-strong">thewallshop.co.uk/quote</span>
      <div class="btns">
        <a class="btn" href="mailto:${esc(email)}?subject=${encodeURIComponent("Re: Your quote request — The Wall Shop")}">Reply</a>
        <a class="btn secondary" href="mailto:info@thewallshop.co.uk?subject=${encodeURIComponent(
          "Fwd: Quote request — " + (projectType || name)
        )}&body=${encodeURIComponent(buildForwardBody({ name, email, phone, address, projectType, area, urgency, message, selectedProduct }))}">Forward internally</a>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="foot-strong">The Wall Shop <span class="brand-gold">·</span> thewallshop.co.uk</div>
    <div>SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</div>
    <div>+44 141 739 3377 · Mon–Fri, 9:00–18:00 PST · <a href="mailto:info@thewallshop.co.uk">info@thewallshop.co.uk</a></div>
    <div style="margin-top:8px;">You are receiving this because your address is configured to receive quote requests.</div>
  </div>
</div>
</body>
</html>`;

    const textLines: string[] = [
      "New quote request — The Wall Shop",
      "",
      `Name   : ${name}`,
      `Email  : ${email}`,
      `Phone  : ${phone}`,
      address ? `Address: ${address}` : "",
      projectType ? `Project: ${projectType}` : "",
      area ? `Area   : ${area} m²` : "",
      `Urgency: ${urgency}`,
      selectedProduct
        ? [
            "",
            "Selected product:",
            `  Name : ${selectedProduct.name}`,
            selectedProduct.sku ? `  SKU  : ${selectedProduct.sku}` : "",
            selectedProduct.price ? `  Price: ${selectedProduct.price}` : "",
            selectedProduct.url ? `  Link : ${selectedProduct.url}` : "",
          ].join("\n")
        : "",
    ].filter(Boolean) as string[];

    if (modules.length) {
      textLines.push("", "Modules:");
      modules.forEach((m) => textLines.push(`  - ${m.name}${m.size ? ` (${m.size})` : ""} x${m.quantity} @ ${formatMoney(m.price)} = ${formatMoney(m.price * m.quantity)}`));
      textLines.push(`  Subtotal: ${formatMoney(moduleSubtotal)}`);
    }

    if (wallCoverings.length) {
      textLines.push("", "Wall Coverings:");
      wallCoverings.forEach((w) => textLines.push(`  - ${w.name}${w.type ? ` [${w.type}]` : ""} ${w.area.toFixed(2)} m² @ ${formatMoney(w.price)}/m² = ${formatMoney(w.price * w.area)}`));
      textLines.push(`  Subtotal: ${formatMoney(coveringSubtotal)}`);
    }

    if (smartDevices.length) {
      textLines.push("", "Smart Devices:");
      smartDevices.forEach((d) => textLines.push(`  - ${d.name}${d.category ? ` [${d.category}]` : ""} x${d.quantity} @ ${formatMoney(d.price)} = ${formatMoney(d.price * d.quantity)}`));
      textLines.push(`  Subtotal: ${formatMoney(deviceSubtotal)}`);
    }

    if (accessories.length) {
      textLines.push("", "Accessories:");
      accessories.forEach((a) => {
        const billable = a.suppliedBy !== "client";
        const line = billable ? a.price * a.quantity : 0;
        textLines.push(`  - ${a.name}${a.category ? ` [${a.category}]` : ""} x${a.quantity} ${billable ? `@ ${formatMoney(a.price)} = ${formatMoney(line)}` : `(Client supplied)`}`);
      });
      textLines.push(`  Subtotal (billable): ${formatMoney(accessorySubtotal)}`);
    }

    textLines.push(
      "",
      `Subtotal: ${formatMoney(netSubtotal)}`,
      `VAT (20%): ${formatMoney(vatAmount)}`,
      `Total: ${formatMoney(grossTotal)}`,
      "",
      message ? ["Message:", message, ""].join("\n") : "",
      `Received: ${timestamp.toLocaleString("en-GB")}`,
      "Source  : thewallshop.co.uk/quote",
      "",
      "Reply: " + `mailto:${email}?subject=${encodeURIComponent("Re: Your quote request — The Wall Shop")}`
    );

    const text = textLines.filter(Boolean).join("\n");

    // --- Send via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const { data, error } = await resend.emails.send({
      from: "The Wall Shop <quotes@thewallshop.co.uk>",
      to: ["info@thewallshop.co.uk", "stephen@thewallshop.co.uk"], // adjust as needed
      cc: [email], // keep client in the loop
      replyTo: email,
      subject: buildSubject({ name, projectType, selectedProduct }),
      html,
      text,
    });

    if (error) {
      return res.status(502).json({ error: "Failed to send quote request" });
    }

    return res.json({
      success: true,
      message: "Quote request sent successfully",
      id: data?.id,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown server error";
    return res.status(500).json({ error: "Failed to process quote request", details: msg });
  }
}

/* ----------------------- Utilities ----------------------- */

function safeString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function stripTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function stripTagsMultiline(input: string): string {
  return stripTags(input).replace(/\r\n?/g, "\n");
}

function truncate(input: string, max: number): string {
  return input.length > max ? input.slice(0, max) : input;
}

function isValidEmail(v: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(v);
}

function isValidPhone(v: string): boolean {
  // Accepts +, spaces, dashes, dots, parentheses; digits 7–20
  const cleaned = v.replace(/[^\d]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 20;
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normaliseUrgency(u: string): "urgent" | "standard" | "flexible" {
  const val = u.toLowerCase();
  if (["urgent", "high", "asap", "immediate"].includes(val)) return "urgent";
  if (["flexible", "low"].includes(val)) return "flexible";
  return "standard";
}

type ProductLite = { name: string; price?: string; sku?: string; url?: string } | null;

function normaliseProduct(p: any): ProductLite {
  if (!p || typeof p !== "object") return null;
  const name = truncate(stripTags(safeString(p.name).trim()), 160);
  if (!name) return null;
  const price = truncate(stripTags(safeString(p.price).trim()), 60);
  const sku = truncate(stripTags(safeString(p.sku).trim()), 60);
  const url = safeUrl(safeString(p.url).trim());
  return { name, ...(price && { price }), ...(sku && { sku }), ...(url && { url }) };
}

function safeUrl(u: string): string | undefined {
  try {
    if (!u) return undefined;
    const parsed = new URL(u);
    if (!/^https?:$/.test(parsed.protocol)) return undefined;
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function buildSubject({
  name,
  projectType,
  selectedProduct,
}: {
  name: string;
  projectType?: string;
  selectedProduct?: ProductLite;
}): string {
  const parts = ["Quote request"];
  if (projectType) parts.push(`— ${projectType}`);
  if (selectedProduct?.name) parts.push(`— ${selectedProduct.name}`);
  parts.push(`(${name})`);
  return parts.join(" ");
}

function buildForwardBody(input: {
  name: string;
  email: string;
  phone: string;
  address?: string;
  projectType?: string;
  area?: string;
  urgency: string;
  message?: string;
  selectedProduct?: ProductLite;
}): string {
  const lines = [
    "Customer Details:",
    `Name   : ${input.name}`,
    `Email  : ${input.email}`,
    `Phone  : ${input.phone}`,
    input.address ? `Address: ${input.address}` : "",
    "",
    "Project:",
    input.projectType ? `  Type : ${input.projectType}` : "",
    input.area ? `  Area : ${input.area} m²` : "",
    `  Urgency: ${input.urgency}`,
    "",
    input.selectedProduct
      ? [
          "Selected Product:",
          `  Name : ${input.selectedProduct.name}`,
          input.selectedProduct.sku ? `  SKU  : ${input.selectedProduct.sku}` : "",
          input.selectedProduct.price ? `  Price: ${input.selectedProduct.price}` : "",
          input.selectedProduct.url ? `  Link : ${input.selectedProduct.url}` : "",
          "",
        ].join("\n")
      : "",
    input.message ? ["Message:", input.message, ""].join("\n") : "",
    "—",
    "Forwarded from thewallshop.co.uk/quote",
  ].filter(Boolean);
  return lines.join("\n");
}

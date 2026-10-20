import { SITE_URL } from "./site";

export type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  acceptedTerms: boolean;
  receivedAt: Date;
};

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const BODY_FONT = `-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;
const MONO_FONT = `ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;
const PAGE = "#F4F4F4";
const CARD = "#FFFFFF";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const BORDER = "#E0E6ED";

// Header-safe: no CR/LF or other control chars, single spaces, max 100 chars.
function cleanSubject(value: string): string {
  return value.replace(/\p{Cc}+/gu, " ").replace(/\s+/g, " ").trim().slice(0, 100);
}

function formatReceived(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function buildContactEmail(input: ContactEmailInput) {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone?.trim() || "";
  const company = input.company?.trim() || "";
  const message = input.message.trim();
  const received = formatReceived(input.receivedAt);
  const firstName = name.split(/\s+/)[0];

  const subject = cleanSubject(`Message from ${name}${company ? ` · ${company}` : ""}`);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=Re:%20${encodeURIComponent(subject)}`;
  const preheader = message.replace(/\s+/g, " ").slice(0, 90);
  const footer = `Sent from the contact form at xircons.dev. Terms ${input.acceptedTerms ? "accepted" : "not accepted"}.`;

  const label = `font-family:${MONO_FONT};font-size:11px;line-height:16px;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};`;
  const value = `font-family:${BODY_FONT};font-size:15px;line-height:22px;font-weight:500;color:${INK};`;
  const link = `color:${INK};text-decoration:underline;`;

  const specRow = (key: string, html: string) => `
              <tr>
                <td width="96" valign="top" bgcolor="${CARD}" style="width:96px;padding:12px 0;border-top:1px solid ${BORDER};background:${CARD};${label}">${key}</td>
                <td valign="top" bgcolor="${CARD}" style="padding:12px 0;border-top:1px solid ${BORDER};background:${CARD};${value}">${html}</td>
              </tr>`;

  const rows = [
    specRow("Email", `<a href="mailto:${escapeHtml(encodeURIComponent(email))}" style="${link}">${escapeHtml(email)}</a>`),
    phone && specRow("Phone", `<a href="tel:${escapeHtml(encodeURIComponent(phone))}" style="${link}">${escapeHtml(phone)}</a>`),
    company && specRow("Company", escapeHtml(company)),
  ].join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escapeHtml(subject)}</title>
</head>
<body bgcolor="${PAGE}" style="margin:0;padding:0;background:${PAGE};color:${INK};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE}" style="background:${PAGE};">
  <tr>
    <td align="center" bgcolor="${PAGE}" style="padding:32px 16px;background:${PAGE};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD}" style="max-width:600px;background:${CARD};border:1px solid ${BORDER};">
        <tr>
          <td bgcolor="${CARD}" style="padding:20px 32px;border-bottom:1px solid ${BORDER};background:${CARD};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" bgcolor="${CARD}" style="background:${CARD};"><img src="${SITE_URL}/email/logo.png" width="36" height="36" alt="xircons.dev" style="display:block;width:36px;height:36px;border:0;"></td>
                <td align="right" valign="middle" bgcolor="${CARD}" style="background:${CARD};${label}">${escapeHtml(received)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD}" style="padding:32px 32px 8px;background:${CARD};">
            <div style="font-family:${BODY_FONT};font-size:28px;line-height:1.1;letter-spacing:-0.02em;font-weight:700;color:${INK};">${escapeHtml(name)}</div>${
              company
                ? `
            <div style="padding-top:6px;font-family:${BODY_FONT};font-size:15px;line-height:22px;color:${MUTED};">${escapeHtml(company)}</div>`
                : ""
            }
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD}" style="padding:16px 32px 0;background:${CARD};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${BORDER};">${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD}" style="padding:32px 32px 0;background:${CARD};">
            <div style="padding-bottom:12px;${label}">Message</div>
            <div style="border-left:2px solid ${INK};padding-left:16px;font-family:${BODY_FONT};font-size:16px;line-height:1.6;color:${INK};white-space:pre-wrap;">${escapeHtml(message).replace(/\r?\n/g, "<br>")}</div>
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD}" style="padding:32px;background:${CARD};">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${INK}" style="background:${INK};">
                  <a href="${escapeHtml(replyHref)}" style="display:inline-block;padding:14px 24px;font-family:${BODY_FONT};font-size:15px;line-height:20px;font-weight:600;color:#FFFFFF;text-decoration:none;background:${INK};">Reply to ${escapeHtml(firstName)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD}" style="padding:20px 32px;border-top:1px solid ${BORDER};background:${CARD};font-family:${BODY_FONT};font-size:12px;line-height:18px;color:${MUTED};">${escapeHtml(footer)}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    name,
    ...(company ? [company] : []),
    "",
    `Received: ${received}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    ...(company ? [`Company: ${company}`] : []),
    "",
    "Message:",
    message,
    "",
    "--",
    footer,
  ].join("\n");

  return { subject, html, text };
}

/** Branded HTML + plain text for portfolio contact notifications. */

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export function buildContactSubject({name, subject}: ContactEmailPayload) {
  const topic = subject?.trim();
  if (topic) return `New inquiry from ${name} — ${topic}`;
  return `New inquiry from ${name}`;
}

export function buildContactText({name, email, subject, message}: ContactEmailPayload) {
  const lines = [
    "New portfolio inquiry",
    "────────────────────",
    `Name: ${name}`,
    `Email: ${email}`,
  ];
  if (subject?.trim()) lines.push(`Subject: ${subject.trim()}`);
  lines.push("", "Message:", message.trim(), "", "—", "Earl Balitcha Portfolio");
  return lines.join("\n");
}

/** Dark, lavender-accented email matching the live portfolio look. */
export function buildContactHtml({
  name,
  email,
  subject,
  message,
}: ContactEmailPayload) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = subject?.trim() ? escapeHtml(subject.trim()) : "";
  const safeMessage = escapeHtml(message.trim())
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br/>");

  const topicRow = safeSubject
    ? `<tr>
        <td style="padding:0 0 14px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#9B8AFB;">Subject</p>
          <p style="margin:0;font-size:15px;line-height:1.5;color:#f2f2f2;">${safeSubject}</p>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-collapse:separate;">
          <tr>
            <td style="padding:0 0 20px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:#9B8AFB;">Portfolio · Contact</p>
            </td>
          </tr>
          <tr>
            <td style="background:#101010;border:1px solid rgba(255,255,255,0.1);border-radius:14px;overflow:hidden;">
              <div style="height:3px;background:linear-gradient(90deg,#9B8AFB,#A78BFA,#C084FC);"></div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 28px 8px;">
                    <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">New inquiry received</h1>
                    <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#a3a3a3;">Someone reached out through your portfolio contact form.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 28px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                      <tr>
                        <td style="padding:0 0 14px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#9B8AFB;">From</p>
                          <p style="margin:0;font-size:15px;line-height:1.5;color:#f2f2f2;">${safeName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 14px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#9B8AFB;">Email</p>
                          <p style="margin:0;font-size:15px;line-height:1.5;">
                            <a href="mailto:${safeEmail}" style="color:#C4B5FD;text-decoration:none;">${safeEmail}</a>
                          </p>
                        </td>
                      </tr>
                      ${topicRow}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 28px;">
                    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:18px;">
                      <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#9B8AFB;">Message</p>
                      <div style="font-size:15px;line-height:1.65;color:#e5e5e5;">${safeMessage}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#737373;">Reply directly to this email to respond to ${safeName}.</p>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#525252;">Earl Balitcha · Full Stack Developer</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

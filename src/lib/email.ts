type RegistrationEmail = {
  to: string;
  name: string;
  code: string;
};

export type EmailResult = {
  sent: boolean;
  skipped: boolean;
};

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendRegistrationEmail({
  to,
  name,
  code,
}: RegistrationEmail): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { sent: false, skipped: true };
  }

  const safeName = escapeHtml(name);
  const safeCode = escapeHtml(code);

  const text = [
    `Hi ${name},`,
    "",
    "Your registration for Ogbor Youth Tech Fest 2026 is complete.",
    "",
    `Your registration code is: ${code}`,
    "",
    "Present this code at the festival entrance for fast check-in.",
    "",
    "See you there!",
    "Ogbor Youth Tech Fest 2026",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#050b06;line-height:1.6">
      <p style="color:#00592d;font-weight:700;letter-spacing:.08em;font-size:12px">
        OGBOR YOUTH TECH FEST 2026
      </p>
      <h1 style="font-size:24px;margin:8px 0 16px">Hi ${safeName},</h1>
      <p>Your registration is complete. Present the code below at the festival entrance for fast check-in.</p>
      <div style="margin:24px 0;padding:18px;border:2px dashed #00592d;background:#fae01a1a">
        <div style="font-size:12px;font-weight:700;letter-spacing:.08em">YOUR REGISTRATION CODE</div>
        <div style="font-size:28px;font-weight:800;letter-spacing:.06em;color:#00592d">${safeCode}</div>
      </div>
      <p>Keep this email handy. See you there!</p>
      <p style="color:#63655c;font-size:12px">Ogbor Youth Tech Fest 2026</p>
    </div>
  `;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Your Ogbor Youth Tech Fest 2026 registration code",
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the registration email:", response.status);
      return { sent: false, skipped: false };
    }

    return { sent: true, skipped: false };
  } catch (error) {
    console.error("Failed to send the registration email:", error);
    return { sent: false, skipped: false };
  }
}

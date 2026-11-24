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
    `Hello ${name}!`,
    "",
    "Thank you for registering for Ogbor Youth Tech Fest 2026!",
    "",
    "We noticed that your registration confirmation email may not have reached your inbox. Not to worry, we've got you covered!",
    "",
    "Your registration was successfully received, and we're sharing your official Registration ID with you here:",
    "",
    "YOUR REGISTRATION ID:",
    code,
    "",
    "Please save this message and keep your Registration ID safe. You will need it for identification and check-in at the event.",
    "",
    "Date: Monday, 30 November 2026",
    "Venue: Word of Faith Group of Schools, 39 Umuola Road, Ogbor Hill, Aba",
    "Time: 10am",
    "",
    "Please keep your Registration ID safe. You may need it when checking in at the event. It will also help our team locate your registration if you contact us.",
    "",
    "Get ready to explore practical digital skills, Artificial Intelligence, career opportunities, entrepreneurship and ways to earn through skills.",
    "",
    "Questions? Contact us at 08063917367 or send an email to ogboryouthtechfest@gmail.com.",
    "",
    "We look forward to seeing you!",
    "",
    "The Ogbor Youth Tech Fest Team",
    "",
    "UNLOCKING A NEW DIGITAL ERA.",
  ].join("\n");

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#050b06;line-height:1.6">
      <p style="color:#00592d;font-weight:700;letter-spacing:.08em;font-size:12px">
        OGBOR YOUTH TECH FEST 2026
      </p>
      <h1 style="font-size:24px;margin:8px 0 16px">Hello ${safeName}!</h1>
      <p>Thank you for registering for Ogbor Youth Tech Fest 2026!</p>
      <p>We noticed that your registration confirmation email may not have reached your inbox. Not to worry, we've got you covered!</p>
      <p>Your registration was successfully received, and we're sharing your official Registration ID with you here:</p>
      <div style="margin:24px 0;padding:18px;border:2px dashed #00592d;background:#fae01a1a">
        <div style="font-size:12px;font-weight:700;letter-spacing:.08em">YOUR REGISTRATION ID:</div>
        <div style="font-size:28px;font-weight:800;letter-spacing:.06em;color:#00592d">${safeCode}</div>
      </div>
      <p>Please save this message and keep your Registration ID safe. You will need it for identification and check-in at the event.</p>
      <div style="margin:24px 0;padding:18px;background:#f5f5ef">
        <p style="margin:0 0 8px"><strong>Date:</strong> Monday, 30 November 2026</p>
        <p style="margin:0 0 8px"><strong>Venue:</strong> Word of Faith Group of Schools, 39 Umuola Road, Ogbor Hill, Aba</p>
        <p style="margin:0"><strong>Time:</strong> 10am</p>
      </div>
      <p>Please keep your Registration ID safe. You may need it when checking in at the event. It will also help our team locate your registration if you contact us.</p>
      <p>Get ready to explore practical digital skills, Artificial Intelligence, career opportunities, entrepreneurship and ways to earn through skills.</p>
      <p>Questions? Contact us at <a href="tel:08063917367" style="color:#00592d">08063917367</a> or send an email to <a href="mailto:ogboryouthtechfest@gmail.com" style="color:#00592d">ogboryouthtechfest@gmail.com</a>.</p>
      <p>We look forward to seeing you!</p>
      <p>The Ogbor Youth Tech Fest Team</p>
      <p style="margin-top:24px;color:#00592d;font-size:12px;font-weight:700;letter-spacing:.08em">UNLOCKING A NEW DIGITAL ERA.</p>
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
        subject: "Your Ogbor Youth Tech Fest 2026 Registration ID",
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

export type BulkEmailOptions = {
  to: string[];
  subject: string;
  text: string;
  html: string;
};

export async function sendBulkEmail({
  to,
  subject,
  text,
  html,
}: BulkEmailOptions): Promise<{ sent: number; failed: number; errors: string[] }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { sent: 0, failed: to.length, errors: ["Email not configured"] };
  }

  if (to.length === 0) {
    return { sent: 0, failed: 0, errors: ["No recipients"] };
  }

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  // Send in batches to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < to.length; i += batchSize) {
    const batch = to.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (email) => {
        try {
          const response = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [email],
              subject,
              text,
              html,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            failed++;
            errors.push(`${email}: ${errorData.message || response.status}`);
          } else {
            sent++;
          }
        } catch (error) {
          failed++;
          errors.push(`${email}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      })
    );

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < to.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return { sent, failed, errors };
}

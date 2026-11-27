import {
  buildEventEmailHtml,
  WHATSAPP_COMMUNITY_URL,
} from "@/lib/event-email-template";

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

  const text = [
    `Hello ${name}!`,
    "",
    "Thank you for registering for Ogbor Youth Tech Fest 2026!",
    "",
    "We can't wait to welcome you to an exciting experience filled with technology, innovation and new opportunities.",
    "",
    "Your registration was successfully received, and we're sharing your official Registration ID with you here:",
    "",
    "YOUR REGISTRATION ID:",
    code,
    "",
    "🚨 Important reminder: Please come with your registration code. You will need it for check-in at the entrance.",
    "",
    "Please save this message and keep your Registration ID safe.",
    "",
    "Date: Monday, 30 November 2026",
    "Venue: Word of Faith Group of Schools, 39 Umuola Road, Ogbor Hill, Aba",
    "Time: 10am",
    "",
    "Get ready to explore practical digital skills, Artificial Intelligence, career opportunities, entrepreneurship and ways to earn through skills.",
    "",
    "Join our WhatsApp community for updates and reminders:",
    WHATSAPP_COMMUNITY_URL,
    "",
    "Questions? Contact us at 08063917367 or send an email to ogboryouthtechfest@gmail.com.",
    "",
    "We look forward to seeing you!",
    "",
    "The Ogbor Youth Tech Fest Team",
  ].join("\n");

  const html = buildEventEmailHtml({ name, code });

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

/** Replace every `{{name}}` with the recipient's name. Escape it for HTML. */
function replaceNamePlaceholder(
  template: string,
  name: string,
  escape: boolean,
): string {
  const value = escape ? escapeHtml(name) : name;
  return template.replace(/\{\{\s*name\s*\}\}/gi, () => value);
}

export type EmailAttachment = {
  filename: string;
  /** Base64-encoded file content, as expected by the Resend HTTP API. */
  content: string;
  contentId?: string;
  contentType?: string;
};

/** Convert our attachment shape to the snake_case fields used by Resend. */
function toResendAttachments(attachments: EmailAttachment[]) {
  return attachments.map(({ filename, content, contentId, contentType }) => ({
    filename,
    content,
    ...(contentId ? { content_id: contentId } : {}),
    ...(contentType ? { content_type: contentType } : {}),
  }));
}

export type BulkRecipient = {
  email: string;
  name: string;
};

export type BulkEmailOptions = {
  to: string[];
  subject: string;
  /** Only the selected message format is sent; the other is left out. */
  text?: string;
  html?: string;
  attachments?: EmailAttachment[];
  /** Recipient names used to personalize `{{name}}` in the message. */
  recipients?: BulkRecipient[];
};

export async function sendBulkEmail({
  to,
  subject,
  text,
  html,
  attachments,
  recipients,
}: BulkEmailOptions): Promise<{ sent: number; failed: number; errors: string[] }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { sent: 0, failed: to.length, errors: ["Email not configured"] };
  }

  if (to.length === 0) {
    return { sent: 0, failed: 0, errors: ["No recipients"] };
  }

  const audience: BulkRecipient[] =
    recipients ?? to.map((email) => ({ email, name: "there" }));

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  // Send in batches to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < audience.length; i += batchSize) {
    const batch = audience.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async ({ email, name }) => {
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
              ...(text
                ? { text: replaceNamePlaceholder(text, name, false) }
                : {}),
              ...(html
                ? { html: replaceNamePlaceholder(html, name, true) }
                : {}),
              ...(attachments && attachments.length > 0
                ? { attachments: toResendAttachments(attachments) }
                : {}),
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
    if (i + batchSize < audience.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return { sent, failed, errors };
}

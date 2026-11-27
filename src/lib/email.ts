import {
  buildEventEmailHtml,
  WHATSAPP_COMMUNITY_URL,
} from "@/lib/event-email-template";

export type RegistrationEmail = {
  to: string;
  name: string;
  code: string;
};

export type EmailResult = {
  sent: boolean;
  skipped: boolean;
  /** Provider error detail, when the send was rejected. */
  error?: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_BATCH_API_URL = "https://api.resend.com/emails/batch";
const BATCH_LIMIT = 100;

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

function buildRegistrationEmailPayload(
  { to, name, code }: RegistrationEmail,
  from: string,
) {
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

  return {
    from,
    to: [to],
    subject: "Your Ogbor Youth Tech Fest 2026 Registration ID",
    text,
    html: buildEventEmailHtml({ name, code }),
  };
}

async function readResendError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      name?: string;
      message?: string;
    };
    if (data.message) {
      return data.name ? `${data.name}: ${data.message}` : data.message;
    }
  } catch {
    // Fall back to the raw status when the provider did not return JSON.
  }
  return `Resend returned ${response.status}`;
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

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        buildRegistrationEmailPayload({ to, name, code }, from),
      ),
    });

    if (!response.ok) {
      const error = await readResendError(response);
      console.error("Resend rejected the registration email:", error);
      return { sent: false, skipped: false, error };
    }

    return { sent: true, skipped: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send the registration email:", error);
    return { sent: false, skipped: false, error: message };
  }
}

export type RegistrationBatchResult = {
  sent: number;
  failed: number;
  skipped: number;
  errors: string[];
};

/**
 * Send registration-code emails with Resend's batch endpoint. Up to 100
 * personalized emails go in one API request, avoiding the 10 requests/second
 * per-team rate limit that applies when sending each email separately.
 */
export async function sendRegistrationEmailsBatch(
  emails: RegistrationEmail[],
): Promise<RegistrationBatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return {
      sent: 0,
      failed: 0,
      skipped: emails.length,
      errors: ["Email not configured"],
    };
  }

  const result: RegistrationBatchResult = {
    sent: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  for (let index = 0; index < emails.length; index += BATCH_LIMIT) {
    const chunk = emails.slice(index, index + BATCH_LIMIT);

    try {
      const response = await fetch(RESEND_BATCH_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          chunk.map((email) => buildRegistrationEmailPayload(email, from)),
        ),
      });

      if (!response.ok) {
        const error = await readResendError(response);
        result.failed += chunk.length;
        result.errors.push(`batch of ${chunk.length} emails: ${error}`);
        continue;
      }

      const data = (await response.json().catch(() => ({}))) as {
        data?: Array<{ id?: string; message?: string }>;
      };
      const items = Array.isArray(data.data) ? data.data : [];

      chunk.forEach((email, itemIndex) => {
        const item = items[itemIndex];
        if (item?.id) {
          result.sent++;
        } else {
          result.failed++;
          result.errors.push(
            `${email.to}: ${item?.message ?? "email provider rejected the message"}`,
          );
        }
      });
    } catch (error) {
      result.failed += chunk.length;
      const message = error instanceof Error ? error.message : "Unknown error";
      result.errors.push(`batch request failed: ${message}`);
    }
  }

  return result;
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

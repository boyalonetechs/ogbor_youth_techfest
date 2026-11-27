import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthenticated, ADMIN_COOKIE } from "@/lib/admin-auth";
import { getPool } from "@/lib/db";
import {
  sendBulkEmail,
  isEmailConfigured,
  type BulkRecipient,
  type EmailAttachment,
} from "@/lib/email";
import {
  EMAIL_IMAGE_MAX_BYTES,
  EMAIL_IMAGE_CONTENT_ID,
  isAllowedEmailImage,
  safeEmailImageFilename,
} from "@/lib/email-attachment";

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE);
    const authenticated = isAdminAuthenticated(cookie?.value);

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 },
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return badRequest("Invalid form data.");
    }

    let to: string[];
    try {
      const parsed: unknown = JSON.parse(String(formData.get("to") ?? ""));
      if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
        return badRequest("No recipients provided");
      }
      to = parsed;
    } catch {
      return badRequest("No recipients provided");
    }
    if (to.length === 0) {
      return badRequest("No recipients provided");
    }

    const subject = String(formData.get("subject") ?? "").trim();
    const rawText = String(formData.get("text") ?? "").trim();
    const rawHtml = String(formData.get("html") ?? "").trim();
    const requestedFormat = String(formData.get("format") ?? "");

    let format: "text" | "html";
    if (requestedFormat === "text" || requestedFormat === "html") {
      format = requestedFormat;
    } else if (rawHtml && !rawText) {
      format = "html"; // backward compatibility with older clients
    } else {
      format = "text";
    }

    if (!subject) {
      return badRequest("Subject is required");
    }
    if (format === "html" && !rawHtml) {
      return badRequest("HTML message is required");
    }
    if (format === "text" && !rawText) {
      return badRequest("Plain text message is required");
    }

    const text = format === "text" ? rawText : "";
    const html = format === "html" ? rawHtml : "";

    // Resolve names from the database rather than trusting the browser, so
    // every `{{name}}` placeholder uses the registered attendee's real name.
    let recipients: BulkRecipient[];
    try {
      const result = await getPool().query<{ email: string; full_name: string }>(
        `SELECT lower(email) AS email, full_name
         FROM attendee_registrations
         WHERE lower(email) = ANY($1::text[])`,
        [to.map((email) => email.toLowerCase())],
      );
      const names = new Map(
        result.rows.map((row) => [row.email, row.full_name.trim() || "there"]),
      );
      recipients = to.map((email) => ({
        email,
        name: names.get(email.toLowerCase()) ?? "there",
      }));
    } catch (error) {
      console.error("Failed to look up recipient names:", error);
      recipients = to.map((email) => ({ email, name: "there" }));
    }

    const attachments: EmailAttachment[] = [];
    const image = formData.get("image");
    if (image !== null) {
      if (!(image instanceof File)) {
        return badRequest("Invalid image attachment.");
      }
      if (image.size === 0) {
        return badRequest("The selected image is empty.");
      }
      if (!isAllowedEmailImage(image)) {
        return badRequest("Only PNG, JPEG, GIF and WEBP images are supported.");
      }
      if (image.size > EMAIL_IMAGE_MAX_BYTES) {
        return badRequest("The image must be 5 MB or smaller.");
      }

      attachments.push({
        filename: safeEmailImageFilename(image.name, image.type),
        content: Buffer.from(await image.arrayBuffer()).toString("base64"),
        contentId: EMAIL_IMAGE_CONTENT_ID,
        contentType: image.type,
      });
    }

    const result = await sendBulkEmail({
      to,
      subject,
      text,
      html,
      attachments,
      recipients,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Bulk email error:", error);
    return NextResponse.json(
      { error: "Failed to send bulk email" },
      { status: 500 },
    );
  }
}

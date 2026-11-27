/**
 * Shared rules for the optional image attachment on bulk emails.
 *
 * Safe to import from both client components and server route handlers so the
 * browser and the API enforce the exact same limits.
 */

/** 5 MB raw image → ~6.7 MB after Base64, well under Resend's 40 MB limit. */
export const EMAIL_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

/** Use `<img src="cid:inline-image">` in the HTML message to show it inline. */
export const EMAIL_IMAGE_CONTENT_ID = "inline-image";

export const EMAIL_IMAGE_ACCEPT = "image/png,image/jpeg,image/gif,image/webp";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

export function isAllowedEmailImage(file: { type: string }): boolean {
  return Object.prototype.hasOwnProperty.call(ALLOWED_TYPES, file.type);
}

/** Strip paths, control characters and quotes before sending a filename to Resend. */
export function safeEmailImageFilename(name: string, mimeType: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base
    .replace(/[\u0000-\u001f\u007f<>:"/\\|?*]/g, "_")
    .trim()
    .slice(0, 90);
  const stem = cleaned.replace(/\.[^.]+$/, "").trim() || "image";
  const extension = ALLOWED_TYPES[mimeType] ?? "img";
  return `${stem}.${extension}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

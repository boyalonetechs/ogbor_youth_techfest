"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Registration } from "@/lib/registrations";
import { buildEventEmailHtml } from "@/lib/event-email-template";
import {
  EMAIL_IMAGE_ACCEPT,
  EMAIL_IMAGE_MAX_BYTES,
  formatBytes,
  isAllowedEmailImage,
} from "@/lib/email-attachment";
import "./admin-dashboard.css";

type RecipientFilter = "all" | "verified" | "unverified";
type MessageFormat = "text" | "html";

type AdminComposeProps = {
  registrations: Registration[];
};

type SelectedImage = {
  file: File;
  previewUrl: string;
};

export default function AdminCompose({ registrations }: AdminComposeProps) {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [format, setFormat] = useState<MessageFormat>("text");
  const [image, setImage] = useState<SelectedImage | null>(null);
  const imageRef = useRef<SelectedImage | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<RecipientFilter>("all");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    sent: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const recipientRows =
    filter === "all"
      ? registrations
      : registrations.filter((r) =>
          filter === "verified" ? r.verified_at : !r.verified_at,
        );
  const recipientEmails = recipientRows
    .map((r) => r.email)
    .filter((email): email is string => Boolean(email && email.includes("@")));

  useEffect(
    () => () => {
      if (imageRef.current) URL.revokeObjectURL(imageRef.current.previewUrl);
    },
    [],
  );

  function selectImage(next: SelectedImage | null) {
    if (imageRef.current) URL.revokeObjectURL(imageRef.current.previewUrl);
    imageRef.current = next;
    setImage(next);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setError("");
    if (!file) {
      selectImage(null);
      return;
    }
    if (!isAllowedEmailImage(file)) {
      setError("Only PNG, JPEG, GIF and WEBP images are supported.");
      event.target.value = "";
      selectImage(null);
      return;
    }
    if (file.size > EMAIL_IMAGE_MAX_BYTES) {
      setError("The image must be 5 MB or smaller.");
      event.target.value = "";
      selectImage(null);
      return;
    }
    selectImage({ file, previewUrl: URL.createObjectURL(file) });
  }

  function clearImage() {
    selectImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function applyEventTemplate() {
    setFormat("html");
    setSubject("You're Invited! Ogbor Youth Tech Fest 2026");
    setHtml(buildEventEmailHtml({ name: "{{name}}" }));
    setError("");
    setResult(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (recipientEmails.length === 0) {
      setError("No valid email recipients found for the selected group.");
      return;
    }

    const message = (format === "html" ? html : text).trim();
    if (!subject.trim() || !message) {
      setError(
        format === "html"
          ? "Subject and HTML message are required."
          : "Subject and plain text message are required.",
      );
      return;
    }

    setSending(true);
    try {
      const formData = new FormData();
      formData.set("to", JSON.stringify(recipientEmails));
      formData.set("subject", subject.trim());
      formData.set("format", format);
      formData.set(format, message);
      if (image) formData.set("image", image.file);

      const response = await fetch("/api/admin/send-bulk-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Failed to send emails.");
        return;
      }

      const data = (await response.json()) as {
        sent: number;
        failed: number;
        errors: string[];
      };
      setResult(data);
      if (data.failed === 0) {
        setSubject("");
        setText("");
        setHtml("");
        clearImage();
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="oytf-admin-shell">
      <div className="oytf-admin-main">
        <header className="oytf-admin-header">
          <div>
            <span className="oytf-admin-eyebrow">OGBOR YOUTH TECH FEST 2026</span>
            <h1>BULK MAIL COMPOSER</h1>
            <p>Write a message and send it to a group of registered attendees.</p>
          </div>
          <div className="oytf-admin-header-actions">
            <Link href="/admin" className="oytf-button oytf-button--outline">
              ← BACK TO REGISTRATIONS
            </Link>
          </div>
        </header>

        <section className="oytf-compose-panel">
          <form onSubmit={handleSubmit} className="oytf-compose-form">
            <label htmlFor="compose-recipients">Send to</label>
            <select
              id="compose-recipients"
              value={filter}
              onChange={(event) => setFilter(event.target.value as RecipientFilter)}
            >
              <option value="all">All registrations ({registrations.length})</option>
              <option value="verified">
                Verified attendees ({registrations.filter((r) => r.verified_at).length})
              </option>
              <option value="unverified">
                Unverified attendees ({registrations.filter((r) => !r.verified_at).length})
              </option>
            </select>
            <p className="oytf-compose-recipient-count">
              {recipientEmails.length} valid email address
              {recipientEmails.length === 1 ? "" : "es"} will receive this message.
            </p>

            <button
              type="button"
              className="oytf-button oytf-button--outline oytf-compose-template"
              onClick={applyEventTemplate}
              disabled={sending}
            >
              USE EVENT TEMPLATE
            </button>

            <label htmlFor="compose-subject">Subject</label>
            <input
              id="compose-subject"
              type="text"
              value={subject}
              placeholder="Email subject"
              onChange={(event) => setSubject(event.target.value)}
              required
            />

            <label htmlFor="compose-format">Message format</label>
            <select
              id="compose-format"
              value={format}
              onChange={(event) => setFormat(event.target.value as MessageFormat)}
            >
              <option value="text">Plain text message</option>
              <option value="html">HTML message</option>
            </select>

            {format === "text" ? (
              <>
                <label htmlFor="compose-text">Plain text message</label>
                <textarea
                  id="compose-text"
                  value={text}
                  placeholder="Write your message in plain text…"
                  rows={8}
                  onChange={(event) => setText(event.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="compose-html">HTML message</label>
                <textarea
                  id="compose-html"
                  value={html}
                  placeholder="<p>Write your message in HTML…</p>"
                  rows={8}
                  onChange={(event) => setHtml(event.target.value)}
                  required
                />
              </>
            )}

            <p className="oytf-compose-hint">
              Add <code>{"{{name}}"}</code> anywhere in the message to insert
              each recipient&apos;s registered name.
            </p>

            <label htmlFor="compose-image">Image attachment (optional)</label>
            <input
              id="compose-image"
              ref={imageInputRef}
              type="file"
              accept={EMAIL_IMAGE_ACCEPT}
              onChange={handleImageChange}
              disabled={sending}
            />
            <p className="oytf-compose-hint">
              PNG, JPEG, GIF or WEBP, up to 5 MB.
              {format === "html" && (
                <>
                  {" "}To show the image inside the email, add{" "}
                  <code>&lt;img src=&quot;cid:inline-image&quot; /&gt;</code> to
                  the HTML message.
                </>
              )}
            </p>
            {image && (
              <div className="oytf-compose-attachment">
                <Image
                  src={image.previewUrl}
                  alt="Selected attachment preview"
                  width={56}
                  height={56}
                  unoptimized
                />
                <div className="oytf-compose-attachment-info">
                  <strong>{image.file.name}</strong>
                  <span>{formatBytes(image.file.size)}</span>
                </div>
                <button
                  type="button"
                  className="oytf-compose-remove"
                  onClick={clearImage}
                  disabled={sending}
                >
                  Remove
                </button>
              </div>
            )}

            {error && (
              <p className="oytf-admin-error" role="alert">{error}</p>
            )}
            {result && (
              <div
                className={`oytf-admin-mail-result${result.failed > 0 ? " has-errors" : ""}`}
                role="status"
              >
                <p>
                  Sent: <strong>{result.sent}</strong> · Failed:{" "}
                  <strong>{result.failed}</strong>
                </p>
                {result.errors.length > 0 && (
                  <ul>
                    {result.errors.slice(0, 10).map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                    {result.errors.length > 10 && (
                      <li>…and {result.errors.length - 10} more</li>
                    )}
                  </ul>
                )}
              </div>
            )}

            <div className="oytf-compose-actions">
              <button type="submit" className="oytf-button" disabled={sending}>
                {sending
                  ? "SENDING…"
                  : `SEND TO ${recipientEmails.length} RECIPIENT${recipientEmails.length === 1 ? "" : "S"}`}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

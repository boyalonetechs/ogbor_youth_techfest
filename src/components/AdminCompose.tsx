"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Registration } from "@/lib/registrations";
import "./admin-dashboard.css";

type RecipientFilter = "all" | "verified" | "unverified";

type AdminComposeProps = {
  registrations: Registration[];
};

export default function AdminCompose({ registrations }: AdminComposeProps) {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (recipientEmails.length === 0) {
      setError("No valid email recipients found for the selected group.");
      return;
    }

    if (!subject.trim() || !text.trim() || !html.trim()) {
      setError("Subject, plain text message, and HTML message are all required.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/admin/send-bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmails,
          subject: subject.trim(),
          text: text.trim(),
          html: html.trim(),
        }),
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

            <label htmlFor="compose-subject">Subject</label>
            <input
              id="compose-subject"
              type="text"
              value={subject}
              placeholder="Email subject"
              onChange={(event) => setSubject(event.target.value)}
              required
            />

            <label htmlFor="compose-text">Plain text message</label>
            <textarea
              id="compose-text"
              value={text}
              placeholder="Write your message in plain text…"
              rows={8}
              onChange={(event) => setText(event.target.value)}
              required
            />

            <label htmlFor="compose-html">HTML message</label>
            <textarea
              id="compose-html"
              value={html}
              placeholder="<p>Write your message in HTML…</p>"
              rows={8}
              onChange={(event) => setHtml(event.target.value)}
              required
            />

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

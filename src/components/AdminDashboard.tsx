"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Registration } from "@/lib/registrations";
import "./admin-dashboard.css";

type AdminDashboardProps = {
  initialRegistrations: Registration[];
  configured: boolean;
  authenticated: boolean;
  today: string;
};

type SortKey =
  | "created_desc"
  | "created_asc"
  | "name_asc"
  | "name_desc"
  | "code_asc"
  | "verified_first";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "created_desc", label: "Newest first" },
  { value: "created_asc", label: "Oldest first" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
  { value: "code_asc", label: "Code A–Z" },
  { value: "verified_first", label: "Verified first" },
];

const COLUMNS: { key: keyof Registration; label: string }[] = [
  { key: "verification_code", label: "Code" },
  { key: "full_name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "age_range", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "residence", label: "Location" },
  { key: "current_description", label: "Status" },
  { key: "digital_skills", label: "Digital skills" },
  { key: "skill_level", label: "Skill level" },
  { key: "follow_up_training", label: "Follow-up" },
  { key: "learning_styles", label: "How they learn" },
  { key: "device_access", label: "Access" },
  { key: "digital_earnings", label: "Earnings" },
  { key: "event_hopes", label: "Hopes" },
  { key: "heard_about", label: "Heard about" },
  { key: "friends_invited", label: "Bringing" },
  { key: "future_updates", label: "Future info" },
  { key: "reminder_channel", label: "Reminders" },
  { key: "additional_info", label: "Notes" },
  { key: "email_sent_note", label: "Email sent" },
  { key: "created_at", label: "Registered" },
  { key: "verified_at", label: "Verified" },
];

function displayValue(value: Registration[keyof Registration]): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join("; ");
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

function csvCell(value: Registration[keyof Registration]): string {
  const text = displayValue(value).replace(/"/g, '""');
  return `"${text}"`;
}

type RecipientFilter = "all" | "filtered" | "verified" | "unverified";

export default function AdminDashboard({
  initialRegistrations,
  configured,
  authenticated,
  today,
}: AdminDashboardProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const registrations = initialRegistrations;
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("created_desc");
  const [lookupResult, setLookupResult] = useState<Registration | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailText, setMailText] = useState("");
  const [mailHtml, setMailHtml] = useState("");
  const [mailRecipientFilter, setMailRecipientFilter] = useState<RecipientFilter>("filtered");
  const [mailSending, setMailSending] = useState(false);
  const [mailResult, setMailResult] = useState<{ sent: number; failed: number; errors: string[] } | null>(null);
  const [mailError, setMailError] = useState("");

  const phase = !configured ? "error" : !authenticated ? "locked" : "ready";

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setBusy(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setLoginError(data.error ?? "Could not sign in.");
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      setLoginError("Could not reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleSendBulkEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMailError("");
    setMailResult(null);

    const emails = recipientEmails;
    if (emails.length === 0) {
      setMailError("No valid email recipients found for the selected filter.");
      return;
    }

    if (!mailSubject.trim() || !mailText.trim() || !mailHtml.trim()) {
      setMailError("Subject, text content, and HTML content are required.");
      return;
    }

    setMailSending(true);
    try {
      const response = await fetch("/api/admin/send-bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emails,
          subject: mailSubject.trim(),
          text: mailText.trim(),
          html: mailHtml.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setMailError(data.error ?? "Failed to send emails.");
        return;
      }

      const result = (await response.json()) as {
        sent: number;
        failed: number;
        errors: string[];
      };
      setMailResult(result);
      if (result.failed === 0) {
        setMailSubject("");
        setMailText("");
        setMailHtml("");
      }
    } catch {
      setMailError("Could not reach the server. Try again.");
    } finally {
      setMailSending(false);
    }
  }

  function openMailModal() {
    setMailModalOpen(true);
    setMailError("");
    setMailResult(null);
  }

  function closeMailModal() {
    setMailModalOpen(false);
    setMailSubject("");
    setMailText("");
    setMailHtml("");
    setMailError("");
    setMailResult(null);
  }

  function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanCode = codeInput.trim().toUpperCase();
    if (!cleanCode) return;

    const match = registrations.find(
      (row) => row.verification_code.toUpperCase() === cleanCode,
    );

    if (!match) {
      setLookupResult(null);
      setLookupError("No registration found for that code.");
      return;
    }

    setLookupResult(match);
    setLookupError("");
    setSelectedCode(match.verification_code);
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return registrations;
    return registrations.filter((row) =>
      [row.full_name, row.email, row.phone, row.verification_code].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [registrations, search]);

  const stats = useMemo(
    () => ({
      total: registrations.length,
      verified: registrations.filter((row) => row.verified_at).length,
      today: today
        ? registrations.filter((row) => row.created_at.startsWith(today)).length
        : 0,
    }),
    [registrations, today],
  );

  const sorted = useMemo(() => {
    const rows = [...filtered];

    switch (sortBy) {
      case "created_asc":
        return rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
      case "name_asc":
        return rows.sort((a, b) => a.full_name.localeCompare(b.full_name));
      case "name_desc":
        return rows.sort((a, b) => b.full_name.localeCompare(a.full_name));
      case "code_asc":
        return rows.sort((a, b) =>
          a.verification_code.localeCompare(b.verification_code),
        );
      case "verified_first":
        return rows.sort((a, b) => {
          const verifiedDifference =
            Number(Boolean(b.verified_at)) - Number(Boolean(a.verified_at));
          return verifiedDifference || b.created_at.localeCompare(a.created_at);
        });
      case "created_desc":
      default:
        return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
  }, [filtered, sortBy]);

  const sheetRegistrations = sorted;

  const recipientRows =
    mailRecipientFilter === "all"
      ? registrations
      : mailRecipientFilter === "filtered"
        ? filtered
        : registrations.filter((r) =>
            mailRecipientFilter === "verified" ? r.verified_at : !r.verified_at,
          );
  const recipientEmails = recipientRows
    .map((r) => r.email)
    .filter((email): email is string => Boolean(email && email.includes("@")));

  function downloadCsv() {
    const header = COLUMNS.map((column) => csvCell(column.label)).join(",");
    const rows = sorted.map((row) =>
      COLUMNS.map((column) => csvCell(row[column.key])).join(","),
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "oytf-attendee-registrations.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (phase === "locked") {
    return (
      <div className="oytf-admin-state">
        <form className="oytf-admin-login" onSubmit={handleLogin}>
          <span>ADMIN ACCESS</span>
          <h2>Registrations dashboard</h2>
          <p>Enter the admin password to view attendee registrations.</p>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {loginError && <p className="oytf-admin-error" role="alert">{loginError}</p>}
          <button className="oytf-button" type="submit" disabled={busy}>
            {busy ? "SIGNING IN…" : "SIGN IN"} <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="oytf-admin-state">
        <div className="oytf-admin-login">
          <span>ADMIN ACCESS</span>
          <h2>Setup needed</h2>
          <p>Set DATABASE_URL and ADMIN_PASSWORD in .env.local, then restart the app.</p>
          <button className="oytf-button" type="button" onClick={() => router.refresh()}>
            RETRY <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="oytf-admin-shell">
      <div className="oytf-admin-main">
        <header className="oytf-admin-header">
          <div>
            <span className="oytf-admin-eyebrow">OGBOR YOUTH TECH FEST 2026</span>
            <h1>ATTENDEE REGISTRATIONS</h1>
            <p>Enter a registration code to look up the attendee instantly.</p>
          </div>
          <div className="oytf-admin-header-actions">
            <button
              type="button"
              className="oytf-button oytf-button--outline"
              aria-expanded={searchOpen}
              aria-controls="admin-search-panel"
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? "HIDE SEARCH" : "SEARCH"}{" "}
              <span aria-hidden="true">{searchOpen ? "×" : "⌕"}</span>
            </button>
            <button type="button" className="oytf-button oytf-button--outline" onClick={downloadCsv}>
              DOWNLOAD CSV <span aria-hidden="true">↓</span>
            </button>
            <button type="button" className="oytf-button oytf-button--outline" onClick={openMailModal}>
              COMPOSE EMAIL <span aria-hidden="true">✉</span>
            </button>
            <button type="button" className="oytf-admin-signout" onClick={() => void handleLogout()}>
              Sign out
            </button>
          </div>
        </header>

        <div className="oytf-admin-stats">
          <div><strong>{stats.total}</strong><span>Total registered</span></div>
          <div><strong>{stats.today}</strong><span>Registered today</span></div>
          <div><strong>{stats.verified}</strong><span>Verified on site</span></div>
        </div>

        {searchOpen && (
          <section id="admin-search-panel" className="oytf-admin-search-panel">
            <label htmlFor="admin-search">Filter the sheet</label>
            <input
              id="admin-search"
              type="search"
              value={search}
              placeholder="Search name, email, phone or code…"
              onChange={(event) => setSearch(event.target.value)}
            />
            <span>
              {filtered.length} of {registrations.length} rows
            </span>
          </section>
        )}

        <section className="oytf-admin-verify">
          <div>
            <h2>FIND A REGISTRATION</h2>
            <p>Type or paste a code to see the matching attendee.</p>
          </div>
          <form className="oytf-admin-verify-actions" onSubmit={handleLookup}>
            <input
              type="text"
              value={codeInput}
              placeholder="OYTF-2026-0091"
              aria-label="Registration code"
              onChange={(event) => setCodeInput(event.target.value)}
            />
            <button type="submit" className="oytf-button">
              FIND <span aria-hidden="true">↗</span>
            </button>
          </form>
          {lookupError && (
            <p className="oytf-admin-error" role="alert">{lookupError}</p>
          )}
        </section>

        <div className="oytf-admin-sheet">
          <div className="oytf-admin-sheet-bar">
            <span>REGISTRATION SHEET</span>
            <label className="oytf-admin-sort">
              Sort by
              <select
                value={sortBy}
                aria-label="Sort registrations"
                onChange={(event) => setSortBy(event.target.value as SortKey)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <span>
              {sheetRegistrations.length} row
              {sheetRegistrations.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="oytf-admin-sheet-scroll">
            <table>
              <thead>
                <tr>
                  {COLUMNS.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetRegistrations.map((row) => (
                  <tr
                    key={row.verification_code}
                    className={row.verification_code === selectedCode ? "is-active" : ""}
                    onClick={() => setSelectedCode(row.verification_code)}
                  >
                    {COLUMNS.map((column) => (
                      <td key={column.key}>
                        {column.key === "verified_at" && row.verified_at ? (
                          <span className="oytf-admin-pill">Verified</span>
                        ) : (
                          displayValue(row[column.key])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {sheetRegistrations.length === 0 && (
              <p className="oytf-admin-empty">No registrations yet.</p>
            )}
          </div>
        </div>

        {lookupResult && (
          <div
            className="oytf-admin-modal-backdrop"
            role="presentation"
            onClick={() => setLookupResult(null)}
          >
            <div
              className="oytf-admin-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lookup-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="oytf-admin-modal-close"
                aria-label="Close registration details"
                onClick={() => setLookupResult(null)}
              >
                ×
              </button>
              <span className="oytf-admin-eyebrow">REGISTRATION FOUND</span>
              <h2 id="lookup-title">{lookupResult.full_name}</h2>
              <p className="oytf-admin-modal-code">{lookupResult.verification_code}</p>
              <dl className="oytf-admin-modal-grid">
                <div>
                  <dt>Email</dt>
                  <dd>{lookupResult.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{lookupResult.phone}</dd>
                </div>
                <div>
                  <dt>Registered</dt>
                  <dd>{new Date(lookupResult.created_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{lookupResult.verified_at ? "Verified" : "Not verified"}</dd>
                </div>
              </dl>
              {lookupResult.additional_info && (
                <p className="oytf-admin-modal-note">
                  {lookupResult.additional_info}
                </p>
              )}
              <button
                type="button"
                className="oytf-button oytf-button--outline"
                onClick={() => setLookupResult(null)}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {mailModalOpen && (
          <div
            className="oytf-admin-modal-backdrop"
            role="presentation"
            onClick={closeMailModal}
          >
            <div
              className="oytf-admin-modal oytf-admin-mail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mail-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="oytf-admin-modal-close"
                aria-label="Close mail composer"
                onClick={closeMailModal}
              >
                ×
              </button>
              <span className="oytf-admin-eyebrow">BULK MAIL COMPOSER</span>
              <h2 id="mail-title">Send an email to attendees</h2>
              <p className="oytf-admin-mail-intro">
                Compose a message and send it to a group of registered attendees.
              </p>

              <form className="oytf-admin-mail-form" onSubmit={handleSendBulkEmail}>
                <label htmlFor="mail-recipients">Send to</label>
                <select
                  id="mail-recipients"
                  value={mailRecipientFilter}
                  onChange={(event) => setMailRecipientFilter(event.target.value as RecipientFilter)}
                >
                  <option value="all">All registrations ({registrations.length})</option>
                  <option value="filtered">Filtered results ({filtered.length})</option>
                  <option value="verified">Verified attendees ({registrations.filter((r) => r.verified_at).length})</option>
                  <option value="unverified">Unverified attendees ({registrations.filter((r) => !r.verified_at).length})</option>
                </select>
                <p className="oytf-admin-mail-recipients">
                  Recipients: {recipientEmails.length} valid email address
                  {recipientEmails.length === 1 ? "" : "es"}
                </p>

                <label htmlFor="mail-subject">Subject</label>
                <input
                  id="mail-subject"
                  type="text"
                  value={mailSubject}
                  placeholder="Email subject"
                  onChange={(event) => setMailSubject(event.target.value)}
                  required
                />

                <label htmlFor="mail-text">Plain text message</label>
                <textarea
                  id="mail-text"
                  value={mailText}
                  placeholder="Write your message in plain text…"
                  rows={5}
                  onChange={(event) => setMailText(event.target.value)}
                  required
                />

                <label htmlFor="mail-html">HTML message</label>
                <textarea
                  id="mail-html"
                  value={mailHtml}
                  placeholder="<p>Write your message in HTML…</p>"
                  rows={5}
                  onChange={(event) => setMailHtml(event.target.value)}
                  required
                />

                {mailError && (
                  <p className="oytf-admin-error" role="alert">{mailError}</p>
                )}
                {mailResult && (
                  <div
                    className={`oytf-admin-mail-result${mailResult.failed > 0 ? " has-errors" : ""}`}
                    role="status"
                  >
                    <p>
                      Sent: <strong>{mailResult.sent}</strong> · Failed:{" "}
                      <strong>{mailResult.failed}</strong>
                    </p>
                    {mailResult.errors.length > 0 && (
                      <ul>
                        {mailResult.errors.slice(0, 10).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {mailResult.errors.length > 10 && (
                          <li>…and {mailResult.errors.length - 10} more</li>
                        )}
                      </ul>
                    )}
                  </div>
                )}

                <div className="oytf-admin-mail-actions">
                  <button
                    type="submit"
                    className="oytf-button"
                    disabled={mailSending}
                  >
                    {mailSending
                      ? "SENDING…"
                      : `SEND TO ${recipientEmails.length} RECIPIENT${recipientEmails.length === 1 ? "" : "S"}`}{" "}
                    <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="oytf-button oytf-button--outline"
                    onClick={closeMailModal}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

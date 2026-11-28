"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Registration } from "@/lib/registrations";
import type { VolunteerRegistration } from "@/lib/volunteer-registrations";
import VolunteerSheet, {
  downloadVolunteerCsv,
  filterVolunteerRows,
  type VolunteerSortKey,
} from "@/components/VolunteerSheet";
import "./admin-dashboard.css";

type AdminDashboardProps = {
  initialRegistrations: Registration[];
  initialVolunteers: VolunteerRegistration[];
  configured: boolean;
  authenticated: boolean;
  today: string;
};

type ActiveSheet = "attendee" | "volunteer";

type SendCodesSummary = {
  total: number;
  sent: number;
  failed: number;
  skipped: number;
  errors: string[];
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

export default function AdminDashboard({
  initialRegistrations,
  initialVolunteers,
  configured,
  authenticated,
  today,
}: AdminDashboardProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const registrations = initialRegistrations;
  const volunteers = initialVolunteers;
  const [activeSheet, setActiveSheet] = useState<ActiveSheet | null>(null);
  const [volunteerSortBy, setVolunteerSortBy] =
    useState<VolunteerSortKey>("created_desc");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("created_desc");
  const [lookupResult, setLookupResult] = useState<Registration | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [busy, setBusy] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [confirmSendCodes, setConfirmSendCodes] = useState(false);
  const [sendingCodes, setSendingCodes] = useState(false);
  const [sendCodesError, setSendCodesError] = useState("");
  const [sendCodesSummary, setSendCodesSummary] = useState<SendCodesSummary | null>(
    null,
  );

  const phase = !configured ? "error" : !authenticated ? "locked" : "ready";

  function openSheet(sheet: ActiveSheet) {
    setActiveSheet(sheet);
    setSearch("");
    setSearchOpen(false);
    setCodeInput("");
    setLookupResult(null);
    setLookupError("");
    setSelectedCode("");
  }

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

  async function handleSendCodes() {
    setSendingCodes(true);
    setSendCodesError("");
    setSendCodesSummary(null);

    try {
      const response = await fetch("/api/admin/send-registration-codes", {
        method: "POST",
      });
      const data = (await response.json().catch(() => ({}))) as Partial<SendCodesSummary> & {
        error?: string;
      };

      if (!response.ok) {
        setSendCodesError(data.error ?? "Could not send registration codes.");
        setConfirmSendCodes(false);
        return;
      }

      setSendCodesSummary({
        total: data.total ?? 0,
        sent: data.sent ?? 0,
        failed: data.failed ?? 0,
        skipped: data.skipped ?? 0,
        errors: Array.isArray(data.errors) ? data.errors : [],
      });
      setConfirmSendCodes(false);
    } catch {
      setSendCodesError("Could not reach the server. Try again.");
      setConfirmSendCodes(false);
    } finally {
      setSendingCodes(false);
    }
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

  const stats = useMemo(() => {
    const attendeeEmails = new Set(
      registrations.map((row) => row.email.trim().toLowerCase()).filter(Boolean),
    );
    const volunteerEmails = new Set(
      volunteers.map((row) => row.email.trim().toLowerCase()).filter(Boolean),
    );
    const uniqueEmails = new Set([...attendeeEmails, ...volunteerEmails]);
    const sharedEmails = [...attendeeEmails].filter((email) =>
      volunteerEmails.has(email),
    ).length;

    const todayAttendeeEmails = new Set(
      registrations
        .filter((row) => today && row.created_at.startsWith(today))
        .map((row) => row.email.trim().toLowerCase())
        .filter(Boolean),
    );
    const todayVolunteerEmails = new Set(
      volunteers
        .filter((row) => today && row.created_at.startsWith(today))
        .map((row) => row.email.trim().toLowerCase())
        .filter(Boolean),
    );

    return {
      total: uniqueEmails.size,
      today: new Set([...todayAttendeeEmails, ...todayVolunteerEmails]).size,
      verified: registrations.filter((row) => row.verified_at).length,
      attendees: registrations.length,
      volunteers: volunteers.length,
      shared: sharedEmails,
    };
  }, [registrations, volunteers, today]);

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

  function downloadCsv() {
    if (!activeSheet) return;

    if (activeSheet === "volunteer") {
      downloadVolunteerCsv(volunteers, search, volunteerSortBy);
      return;
    }

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
            <h1>REGISTRATION DASHBOARD</h1>
            <p>
              {!activeSheet
                ? "Choose a sheet below to view registrations."
                : activeSheet === "attendee"
                  ? "Enter a registration code to look up the attendee instantly."
                  : "Review the people who applied to help at the event."}
            </p>
          </div>
          <div className="oytf-admin-header-actions">
            {activeSheet && (
              <>
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
                <button
                  type="button"
                  className="oytf-button oytf-button--outline"
                  onClick={downloadCsv}
                >
                  DOWNLOAD CSV <span aria-hidden="true">↓</span>
                </button>
              </>
            )}
            <button
              type="button"
              className="oytf-button oytf-button--outline"
              aria-expanded={optionsOpen}
              aria-controls="admin-options-menu"
              onClick={() => setOptionsOpen((open) => !open)}
            >
              {optionsOpen ? "HIDE OPTIONS" : "OPTIONS"}{" "}
              <span aria-hidden="true">{optionsOpen ? "×" : "⚙"}</span>
            </button>
            <Link href="/volunteer-admin" className="oytf-button oytf-button--outline">
              MANUAL ENTRY <span aria-hidden="true">＋</span>
            </Link>
            <a href="/admin/compose" className="oytf-button oytf-button--outline">
              COMPOSE EMAIL <span aria-hidden="true">✉</span>
            </a>
            <button type="button" className="oytf-admin-signout" onClick={() => void handleLogout()}>
              Sign out
            </button>

            {optionsOpen && (
              <div id="admin-options-menu" className="oytf-admin-options">
                <span className="oytf-admin-eyebrow">EMAIL OPTIONS</span>
                <p>
                  Send every attendee the code saved on their own registration
                  row. Each code goes only to its matching email address.
                </p>
                <button
                  type="button"
                  className="oytf-button"
                  onClick={() => setConfirmSendCodes(true)}
                  disabled={sendingCodes || registrations.length === 0}
                >
                  {sendingCodes
                    ? "SENDING CODES…"
                    : `SEND ${registrations.length} REGISTRATION CODE${registrations.length === 1 ? "" : "S"}`}{" "}
                  <span aria-hidden="true">✉</span>
                </button>
                {sendCodesError && (
                  <p className="oytf-admin-error" role="alert">{sendCodesError}</p>
                )}
                {sendCodesSummary && (
                  <p
                    className={
                      sendCodesSummary.failed + sendCodesSummary.skipped > 0
                        ? "oytf-admin-error"
                        : "oytf-admin-success"
                    }
                    role="status"
                  >
                    Sent {sendCodesSummary.sent} of {sendCodesSummary.total} codes.
                    {sendCodesSummary.failed > 0 && ` ${sendCodesSummary.failed} failed.`}
                    {sendCodesSummary.skipped > 0 && ` ${sendCodesSummary.skipped} skipped.`}
                    {sendCodesSummary.errors.length > 0 &&
                      ` ${sendCodesSummary.errors.slice(0, 3).join(" | ")}`}
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="oytf-admin-stats">
          <div>
            <strong>{stats.total}</strong>
            <span>Total registered people</span>
            <small>Unique email across both sheets</small>
          </div>
          <div><strong>{stats.today}</strong><span>Registered today</span></div>
          <div><strong>{stats.verified}</strong><span>Verified on site</span></div>
        </div>

        <div className="oytf-admin-sheet-picker" role="group" aria-label="Choose a sheet">
          <button
            type="button"
            className={`oytf-admin-sheet-picker__button ${activeSheet === "attendee" ? "is-active" : ""}`}
            aria-pressed={activeSheet === "attendee"}
            onClick={() => openSheet("attendee")}
          >
            <span className="oytf-admin-sheet-picker__label">ATTENDEE SHEET</span>
            <strong>{stats.attendees}</strong>
            <span className="oytf-admin-sheet-picker__note">
              Registration records · click to open
            </span>
          </button>
          <button
            type="button"
            className={`oytf-admin-sheet-picker__button ${activeSheet === "volunteer" ? "is-active" : ""}`}
            aria-pressed={activeSheet === "volunteer"}
            onClick={() => openSheet("volunteer")}
          >
            <span className="oytf-admin-sheet-picker__label">VOLUNTEER SHEET</span>
            <strong>{stats.volunteers}</strong>
            <span className="oytf-admin-sheet-picker__note">
              Volunteer applications · click to open
            </span>
            {stats.shared > 0 && (
              <em>
                {stats.shared} also registered to attend — counted once above
              </em>
            )}
          </button>
        </div>

        {activeSheet && searchOpen && (
          <section id="admin-search-panel" className="oytf-admin-search-panel">
            <label htmlFor="admin-search">Filter the sheet</label>
            <input
              id="admin-search"
              type="search"
              value={search}
              placeholder={
                activeSheet === "attendee"
                  ? "Search name, email, phone or code…"
                  : "Search code, name, email, WhatsApp, team or skill…"
              }
              onChange={(event) => setSearch(event.target.value)}
            />
            <span>
              {activeSheet === "attendee"
                ? `${filtered.length} of ${registrations.length} rows`
                : `${filterVolunteerRows(volunteers, search).length} of ${volunteers.length} rows`}
            </span>
          </section>
        )}

        {activeSheet === "attendee" && (
          <section className="oytf-admin-verify mt-10">
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
        )}

        {activeSheet === "attendee" ? (
        <div className="oytf-admin-sheet oytf-admin-sheet--attendee">
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
        ) : activeSheet === "volunteer" ? (
          <VolunteerSheet
            volunteers={volunteers}
            search={search}
            sortBy={volunteerSortBy}
            onSortChange={setVolunteerSortBy}
          />
        ) : null}

        {activeSheet === "attendee" && lookupResult && (
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

        {confirmSendCodes && (
          <div
            className="oytf-admin-modal-backdrop"
            role="presentation"
            onClick={() => setConfirmSendCodes(false)}
          >
            <div
              className="oytf-admin-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="send-codes-confirm-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="oytf-admin-modal-close"
                aria-label="Cancel sending registration codes"
                onClick={() => setConfirmSendCodes(false)}
              >
                ×
              </button>
              <span className="oytf-admin-eyebrow">CONFIRM BULK SEND</span>
              <h2 id="send-codes-confirm-title">Send registration codes?</h2>
              <p className="oytf-admin-modal-note">
                This will email {registrations.length} attendees. Every code is
                paired with the email saved on the same registration row, so no
                attendee receives another person&apos;s code.
              </p>
              <div className="oytf-admin-confirm-actions">
                <button
                  type="button"
                  className="oytf-button oytf-button--outline"
                  onClick={() => setConfirmSendCodes(false)}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  className="oytf-button"
                  onClick={() => void handleSendCodes()}
                  disabled={sendingCodes}
                >
                  {sendingCodes ? "SENDING…" : "YES, SEND CODES"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

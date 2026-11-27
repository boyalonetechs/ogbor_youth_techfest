"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ATTENDEE_OPTIONS } from "@/lib/attendee";
import {
  emptyManualAttendeeForm,
  validateManualAttendeeForm,
  type ManualAttendeeFieldErrors,
  type ManualAttendeeFormValues,
} from "@/lib/manual-attendee";
import "./admin-dashboard.css";

type ManualRegistrationDashboardProps = {
  configured: boolean;
  authenticated: boolean;
};

type RegistrationResult = {
  fullName: string;
  email: string;
  verificationCode: string;
};

const FIELD_CLASS =
  "w-full border border-brand-ink/25 bg-brand-paper px-3.5 py-3 font-rounded text-xs leading-relaxed text-brand-ink outline-none transition-all focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/15";

export default function ManualRegistrationDashboard({
  configured,
  authenticated,
}: ManualRegistrationDashboardProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [values, setValues] = useState<ManualAttendeeFormValues>(
    emptyManualAttendeeForm,
  );
  const [errors, setErrors] = useState<ManualAttendeeFieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const phase = !configured ? "error" : !authenticated ? "locked" : "ready";

  function update(name: keyof ManualAttendeeFormValues, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
    setSubmitError("");
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setLoginBusy(true);
    try {
      const response = await fetch("/api/volunteer-admin/login", {
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
      setLoginBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/volunteer-admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const validation = validateManualAttendeeForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      const first = Object.keys(validation.errors)[0];
      document.getElementById(`manual-${first}`)?.focus();
      return;
    }

    setSubmitBusy(true);
    try {
      const response = await fetch("/api/manual-attendee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        errors?: ManualAttendeeFieldErrors;
        verificationCode?: string;
      };

      if (!response.ok || !data.verificationCode) {
        if (data.errors && typeof data.errors === "object") setErrors(data.errors);
        setSubmitError(
          data.error ?? "Could not register this attendee. Please try again.",
        );
        return;
      }

      setErrors({});
      setResult({
        fullName: validation.data.fullName,
        email: validation.data.email,
        verificationCode: data.verificationCode,
      });
      setCopied(false);
      setValues(emptyManualAttendeeForm());
    } catch {
      setSubmitError("Could not reach the server. Please try again.");
    } finally {
      setSubmitBusy(false);
    }
  }

  function registerAnother() {
    setResult(null);
    setErrors({});
    setSubmitError("");
    setCopied(false);
  }

  async function copyCode() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.verificationCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (phase === "locked") {
    return (
      <div className="oytf-admin-state">
        <form className="oytf-admin-login" onSubmit={handleLogin}>
          <span>MANUAL REGISTRATION ACCESS</span>
          <h2>Register an attendee</h2>
          <p>
            Enter the manual registration password to add attendees who signed
            up off-site. This is the volunteer admin password, not the attendee
            dashboard password.
          </p>
          <label htmlFor="manual-admin-password">Password</label>
          <input
            id="manual-admin-password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {loginError && (
            <p className="oytf-admin-error" role="alert">{loginError}</p>
          )}
          <button className="oytf-button" type="submit" disabled={loginBusy}>
            {loginBusy ? "SIGNING IN…" : "SIGN IN"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="oytf-admin-state">
        <div className="oytf-admin-login">
          <span>MANUAL REGISTRATION ACCESS</span>
          <h2>Setup needed</h2>
          <p>
            Set <code>DATABASE_URL</code> and{" "}
            <code>VOLUNTEER_ADMIN_PASSWORD</code> in your environment, then
            create the attendee table with{" "}
            <code>db/attendee_registrations.sql</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="oytf-admin-shell">
      <div className="oytf-admin-main">
        <header className="oytf-admin-header">
          <div>
            <span className="oytf-admin-eyebrow">PRIVATE · MANUAL ENTRY</span>
            <h1>MANUAL REGISTRATION</h1>
            <p>
              Add an attendee who registered off-site. Only the details needed
              for entry are asked.
            </p>
          </div>
          <div className="oytf-admin-header-actions">
            <Link href="/admin" className="oytf-button oytf-button--outline">
              REGISTRATION DASHBOARD <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="oytf-admin-signout"
              onClick={() => void handleLogout()}
            >
              Sign out
            </button>
          </div>
        </header>

        {result ? (
          <section className="oytf-manual-result" aria-live="polite">
            <span className="oytf-admin-eyebrow">REGISTRATION SAVED</span>
            <h2>{result.fullName}</h2>
            <p>
              {result.email} is now in the attendee sheet. Give this code to the
              attendee for entry. It was not emailed from this portal.
            </p>
            <div className="oytf-manual-code">
              <span>VERIFICATION CODE</span>
              <strong>{result.verificationCode}</strong>
            </div>
            <div className="oytf-manual-actions">
              <button type="button" className="oytf-button" onClick={() => void copyCode()}>
                {copied ? "COPIED ✓" : "COPY CODE"} <span aria-hidden="true">⧉</span>
              </button>
              <button
                type="button"
                className="oytf-button oytf-button--outline"
                onClick={registerAnother}
              >
                REGISTER ANOTHER PERSON <span aria-hidden="true">+</span>
              </button>
            </div>
          </section>
        ) : (
          <form className="oytf-manual-form" onSubmit={handleSubmit} noValidate>
            <div className="oytf-manual-form-heading">
              <div>
                <h2>Attendee details</h2>
                <p>
                  The code is generated when you save. Unasked questions stay
                  empty in the full registration record.
                </p>
              </div>
              <span>7 questions</span>
            </div>

            <div className="oytf-manual-grid">
              <div className="oytf-manual-field oytf-manual-field--wide">
                <label htmlFor="manual-fullName">Full name *</label>
                <input
                  id="manual-fullName"
                  type="text"
                  value={values.fullName}
                  autoComplete="name"
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.fullName)}
                  onChange={(event) => update("fullName", event.target.value)}
                />
                {errors.fullName && <small role="alert">{errors.fullName}</small>}
              </div>

              <div className="oytf-manual-field">
                <label htmlFor="manual-email">Email address *</label>
                <input
                  id="manual-email"
                  type="email"
                  value={values.email}
                  autoComplete="email"
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(event) => update("email", event.target.value)}
                />
                {errors.email && <small role="alert">{errors.email}</small>}
              </div>

              <div className="oytf-manual-field">
                <label htmlFor="manual-phone">Phone number *</label>
                <input
                  id="manual-phone"
                  type="tel"
                  value={values.phone}
                  autoComplete="tel"
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.phone)}
                  onChange={(event) => update("phone", event.target.value)}
                />
                {errors.phone && <small role="alert">{errors.phone}</small>}
              </div>

              <div className="oytf-manual-field">
                <label htmlFor="manual-ageRange">Age range *</label>
                <select
                  id="manual-ageRange"
                  value={values.ageRange}
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.ageRange)}
                  onChange={(event) => update("ageRange", event.target.value)}
                >
                  <option value="">Select an age range</option>
                  {ATTENDEE_OPTIONS.ageRanges.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.ageRange && <small role="alert">{errors.ageRange}</small>}
              </div>

              <div className="oytf-manual-field">
                <label htmlFor="manual-residence">Where they live *</label>
                <select
                  id="manual-residence"
                  value={values.residence}
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.residence)}
                  onChange={(event) => update("residence", event.target.value)}
                >
                  <option value="">Select a location</option>
                  {ATTENDEE_OPTIONS.residences.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.residence && <small role="alert">{errors.residence}</small>}
              </div>

              <div className="oytf-manual-field">
                <label htmlFor="manual-description">How they describe themselves *</label>
                <select
                  id="manual-description"
                  value={values.description}
                  className={FIELD_CLASS}
                  aria-invalid={Boolean(errors.description)}
                  onChange={(event) => update("description", event.target.value)}
                >
                  <option value="">Select a description</option>
                  {ATTENDEE_OPTIONS.descriptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.description && <small role="alert">{errors.description}</small>}
              </div>

              {values.description === "Other" && (
                <div className="oytf-manual-field">
                  <label htmlFor="manual-otherDescription">Please describe *</label>
                  <input
                    id="manual-otherDescription"
                    type="text"
                    value={values.otherDescription}
                    className={FIELD_CLASS}
                    aria-invalid={Boolean(errors.otherDescription)}
                    onChange={(event) =>
                      update("otherDescription", event.target.value)
                    }
                  />
                  {errors.otherDescription && (
                    <small role="alert">{errors.otherDescription}</small>
                  )}
                </div>
              )}

              <div className="oytf-manual-field oytf-manual-field--wide">
                <label htmlFor="manual-additionalInfo">Notes (optional)</label>
                <textarea
                  id="manual-additionalInfo"
                  rows={3}
                  value={values.additionalInfo}
                  className={`${FIELD_CLASS} resize-y`}
                  placeholder="Anything the team should know about this registration"
                  onChange={(event) => update("additionalInfo", event.target.value)}
                />
              </div>
            </div>

            {submitError && (
              <p className="oytf-admin-error" role="alert">{submitError}</p>
            )}

            <div className="oytf-manual-actions">
              <button type="submit" className="oytf-button" disabled={submitBusy}>
                {submitBusy ? "SAVING…" : "REGISTER ATTENDEE"}{" "}
                <span aria-hidden="true">→</span>
              </button>
              <span>No code is emailed from this portal.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

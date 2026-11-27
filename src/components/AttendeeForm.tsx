"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  ATTENDEE_OPTIONS,
  emptyAttendeeForm,
  validateAttendeeForm,
  type AttendeeFieldErrors,
  type AttendeeFormValues,
} from "@/lib/attendee";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/E8rZzCsqfZNIXzy4jsXJvH?s=cl&p=a&iam=2";

// Give attendees a moment to see/copy their code before opening WhatsApp.
const WHATSAPP_REDIRECT_SECONDS = 8;

const FIELD_CLASS =
  "w-full rounded-none border border-brand-ink/25 bg-brand-paper px-4 py-3.5 font-rounded text-sm leading-relaxed text-brand-ink outline-none placeholder:text-brand-ink/40 transition-all focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/15";

const CHOICE_BASE =
  "relative flex min-h-12 cursor-pointer items-center gap-3.5 border px-4 py-3 font-rounded text-sm font-semibold leading-snug transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-forest";

const CHOICE_IDLE =
  "border-brand-ink/20 bg-brand-paper text-brand-ink/75 hover:border-brand-forest hover:bg-brand-forest/5";

const CHOICE_SELECTED =
  "border-brand-forest bg-brand-forest/10 text-brand-ink font-bold shadow-xs";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-3 border border-brand-ink bg-brand-ink px-8 py-4 font-rounded text-xs font-extrabold uppercase tracking-[0.14em] text-brand-paper transition-all hover:bg-brand-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest disabled:cursor-wait disabled:opacity-60";

const OUTLINE_BUTTON =
  "inline-flex items-center justify-center gap-3 border border-brand-ink/25 bg-transparent px-6 py-4 font-rounded text-xs font-extrabold uppercase tracking-[0.14em] text-brand-ink transition-all hover:border-brand-forest hover:bg-brand-forest/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest";

const EXCLUSIVE_ACCESS_OPTIONS: readonly string[] = [
  "All of the above",
  "None of these right now",
];

const SECTIONS = [
  { id: "about", label: "About you" },
  { id: "background", label: "Your background" },
  { id: "skills", label: "Skills & interests" },
  { id: "participation", label: "Participation" },
  { id: "hopes", label: "What you hope to gain" },
  { id: "mobilisation", label: "Mobilisation" },
  { id: "connected", label: "Stay connected" },
] as const;

type FieldName = keyof AttendeeFormValues;
type ListFieldName = Extract<
  FieldName,
  "digitalSkills" | "learningStyles" | "access" | "hopes" | "heardAbout"
>;



type QuestionProps = {
  n: number;
  title: string;
  name: FieldName;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Question({
  n,
  title,
  name,
  required,
  hint,
  error,
  children,
}: QuestionProps) {
  return (
    <section
      id={name}
      tabIndex={-1}
      className="scroll-mt-32 border-t border-brand-ink/10 pt-8 first:border-t-0 first:pt-0 xl:scroll-mt-10"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xs font-black tabular-nums tracking-widest text-brand-forest">
          {String(n).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            id={`${name}-label`}
            className="font-display text-base font-extrabold leading-snug tracking-tight text-brand-ink sm:text-lg"
          >
            {title}{" "}
            {required && (
              <span className="ml-0.5 text-brand-forest" aria-hidden="true">
                *
              </span>
            )}
          </h3>
          {hint && (
            <p className="mt-1.5 max-w-2xl font-rounded text-xs leading-relaxed text-brand-muted">
              {hint}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 pl-0 sm:pl-7">
        <div className="min-w-0">{children}</div>
        {error && (
          <p
            className="mt-2.5 flex items-center gap-1.5 font-rounded text-xs font-bold text-red-700"
            id={`${name}-error`}
            role="alert"
          >
            <span aria-hidden="true">⚠️</span> {error}
          </p>
        )}
      </div>
    </section>
  );
}

function FormSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32 border-t border-brand-ink/15 pt-10 first:border-t-0 first:pt-0 xl:scroll-mt-10"
    >
      <div className="mb-8 border-b border-brand-ink/10 pb-3">
        <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-brand-forest">
          {title}
        </h4>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function FormIntro({ large = false }: { large?: boolean }) {
  return (
    <div className="border-b border-brand-ink/15 pb-8 lg:pb-10">
      <span className="mb-4 inline-block bg-brand-forest/10 px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest">
        Ogbor Youth Tech Fest 2026
      </span>
      <h2
        className={`font-display font-black uppercase tracking-tight text-brand-ink ${
          large ? "text-4xl lg:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        Save your{" "}
        <span className="text-brand-forest underline decoration-2 underline-offset-4">
          spot.
        </span>
      </h2>
      <p className="mt-4 max-w-xl font-rounded text-sm leading-relaxed text-brand-muted">
        Complete the registration details below to secure your place at the
        festival. Fields marked with an asterisk (
        <span className="font-bold text-brand-forest">*</span>) are mandatory.
      </p>
    </div>
  );
}

type TextFieldProps = {
  n: number;
  name: Exclude<FieldName, ListFieldName>;
  title: string;
  value: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
};

function TextField({
  n,
  name,
  title,
  value,
  type = "text",
  placeholder,
  hint,
  required,
  autoComplete,
  error,
  onChange,
}: TextFieldProps) {
  return (
    <Question
      n={n}
      name={name}
      title={title}
      required={required}
      hint={hint}
      error={error}
    >
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-labelledby={`${name}-label`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={FIELD_CLASS}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </Question>
  );
}

type OtherConfig = {
  name: FieldName;
  label: string;
  trigger: string;
  value: string;
  error?: string;
};

function OtherField({
  other,
  onChange,
}: {
  other: OtherConfig;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div className="mt-4 border-l-2 border-brand-forest bg-brand-forest/5 p-4 pl-4">
      <label
        htmlFor={other.name}
        className="mb-2 block font-rounded text-xs font-extrabold uppercase tracking-wider text-brand-ink"
      >
        {other.label}
      </label>
      <input
        id={other.name}
        name={other.name}
        type="text"
        value={other.value}
        aria-invalid={Boolean(other.error)}
        aria-describedby={other.error ? `${other.name}-error` : undefined}
        className={FIELD_CLASS}
        onChange={(event) => onChange(other.name, event.target.value)}
      />
      {other.error && (
        <p
          className="mt-2 font-rounded text-xs font-bold text-red-700"
          id={`${other.name}-error`}
          role="alert"
        >
          {other.error}
        </p>
      )}
    </div>
  );
}

type SingleChoiceProps = {
  n: number;
  name: Exclude<FieldName, ListFieldName>;
  title: string;
  options: readonly string[];
  value: string;
  error?: string;
  other?: OtherConfig;
  onChange: (name: FieldName, value: string) => void;
};

function SingleChoiceQuestion({
  n,
  name,
  title,
  options,
  value,
  error,
  other,
  onChange,
}: SingleChoiceProps) {
  const showOther = other ? value === other.trigger : false;

  return (
    <Question n={n} name={name} title={title} required error={error}>
      <div
        className="grid gap-2.5 sm:grid-cols-2"
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              className={`${CHOICE_BASE} ${
                selected ? CHOICE_SELECTED : CHOICE_IDLE
              }`}
              key={option}
              htmlFor={`${name}-${slug(option)}`}
            >
              <input
                id={`${name}-${slug(option)}`}
                type="radio"
                name={name}
                value={option}
                checked={selected}
                className="sr-only"
                onChange={() => onChange(name, option)}
              />
              <span
                aria-hidden="true"
                className={`grid size-4 shrink-0 place-items-center rounded-full border transition-all ${
                  selected
                    ? "border-brand-forest bg-brand-forest ring-2 ring-brand-forest/20"
                    : "border-brand-ink/40 bg-brand-paper"
                }`}
              >
                {selected && (
                  <span className="size-1.5 rounded-full bg-brand-paper" />
                )}
              </span>
              <span className="flex-1">{option}</span>
            </label>
          );
        })}
      </div>
      {other && showOther && <OtherField other={other} onChange={onChange} />}
    </Question>
  );
}

type MultiChoiceProps = {
  n: number;
  name: ListFieldName;
  title: string;
  options: readonly string[];
  value: string[];
  error?: string;
  other?: OtherConfig;
  onToggle: (name: ListFieldName, option: string, checked: boolean) => void;
  onChange: (name: FieldName, value: string) => void;
};

function MultiChoiceQuestion({
  n,
  name,
  title,
  options,
  value,
  error,
  other,
  onToggle,
  onChange,
}: MultiChoiceProps) {
  const showOther = other ? value.includes(other.trigger) : false;

  return (
    <Question n={n} name={name} title={title} required error={error}>
      <div
        className="grid gap-2.5 sm:grid-cols-2"
        role="group"
        aria-labelledby={`${name}-label`}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <label
              className={`${CHOICE_BASE} ${
                selected ? CHOICE_SELECTED : CHOICE_IDLE
              }`}
              key={option}
              htmlFor={`${name}-${slug(option)}`}
            >
              <input
                id={`${name}-${slug(option)}`}
                type="checkbox"
                name={name}
                value={option}
                checked={selected}
                className="sr-only"
                onChange={(event) =>
                  onToggle(name, option, event.target.checked)
                }
              />
              <span
                aria-hidden="true"
                className={`grid size-4 shrink-0 place-items-center border transition-all ${
                  selected
                    ? "border-brand-forest bg-brand-forest ring-2 ring-brand-forest/20"
                    : "border-brand-ink/40 bg-brand-paper"
                }`}
              >
                {selected && <span className="size-2 bg-brand-paper" />}
              </span>
              <span className="flex-1">{option}</span>
            </label>
          );
        })}
      </div>
      {other && showOther && <OtherField other={other} onChange={onChange} />}
    </Question>
  );
}

export default function AttendeeForm() {
  const [values, setValues] = useState<AttendeeFormValues>(emptyAttendeeForm);
  const [errors, setErrors] = useState<AttendeeFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(
    WHATSAPP_REDIRECT_SECONDS,
  );
  const [redirectCancelled, setRedirectCancelled] = useState(false);

  useEffect(() => {
    if (status !== "success" || redirectCancelled || redirectSeconds <= 0) {
      return;
    }

    if (redirectSeconds === 1) {
      window.location.assign(WHATSAPP_URL);
      return;
    }

    const timer = window.setTimeout(
      () => setRedirectSeconds((seconds) => seconds - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [status, redirectCancelled, redirectSeconds]);

  const setField = (name: FieldName, value: string | string[]) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const toggleChoice = (
    name: ListFieldName,
    option: string,
    checked: boolean,
  ) => {
    setValues((previous) => {
      const current = previous[name];

      if (name === "access") {
        if (checked && EXCLUSIVE_ACCESS_OPTIONS.includes(option)) {
          return { ...previous, access: [option] };
        }
        return {
          ...previous,
          access: checked
            ? [
                ...current.filter(
                  (item) =>
                    item !== option && !EXCLUSIVE_ACCESS_OPTIONS.includes(item),
                ),
                option,
              ]
            : current.filter((item) => item !== option),
        };
      }

      return {
        ...previous,
        [name]: checked
          ? [...current.filter((item) => item !== option), option]
          : current.filter((item) => item !== option),
      };
    });
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");

    const validation = validateAttendeeForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      const firstInvalid = Object.keys(validation.errors)[0];
      if (firstInvalid) {
        window.requestAnimationFrame(() => {
          document.getElementById(firstInvalid)?.focus();
        });
      }
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/attendee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        verificationCode?: string;
        emailSent?: boolean;
        emailSkipped?: boolean;
        error?: string;
        errors?: AttendeeFieldErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        setServerError(
          result.error ?? "Something went wrong. Please try again.",
        );
        setStatus("idle");
        return;
      }

      setVerificationCode(result.verificationCode ?? "");
      setEmailDelivered(Boolean(result.emailSent));
      setCopied(false);
      setRedirectSeconds(WHATSAPP_REDIRECT_SECONDS);
      setRedirectCancelled(false);
      setShowSuccessModal(true);
      setStatus("success");
    } catch {
      setServerError(
        "We could not reach the server. Check your connection and try again.",
      );
      setStatus("idle");
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const joinWhatsApp = () => {
    window.location.assign(WHATSAPP_URL);
  };

  const redirectNotice = () => {
    if (redirectCancelled) return null;

    return (
      <div
        className="mt-5 flex flex-col gap-3 border border-brand-forest/25 bg-brand-sun/10 p-3 sm:flex-row sm:items-center sm:justify-between"
        role="status"
      >
        <p className="font-rounded text-xs leading-relaxed text-brand-muted">
          Redirecting to our WhatsApp community in{" "}
          <strong className="text-brand-forest">{redirectSeconds}</strong>{" "}
          {redirectSeconds === 1 ? "second" : "seconds"}. Your code stays
          available here.
        </p>
        <button
          type="button"
          className="border border-brand-ink/25 bg-brand-paper px-3 py-1.5 font-rounded text-[11px] font-bold text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest"
          onClick={() => setRedirectCancelled(true)}
        >
          STAY HERE
        </button>
      </div>
    );
  };

  if (status === "success") {
    const firstName = values.fullName.trim().split(/\s+/)[0] || "there";

    if (showSuccessModal) {
      return (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-brand-ink/70 p-4 backdrop-blur-sm sm:p-6">
          <div
            className="relative w-full max-w-xl border-2 border-brand-ink bg-brand-paper p-6 shadow-[10px_10px_0_#00592D] sm:p-9"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-success-title"
          >
            <button
              type="button"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-brand-ink/20 font-display text-lg font-black text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest"
              aria-label="Close registration details"
              onClick={() => setShowSuccessModal(false)}
            >
              ×
            </button>

            <span className="inline-block bg-brand-forest/10 px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest">
              Registration complete
            </span>
            <h2
              id="registration-success-title"
              className="mt-4 pr-8 font-display text-3xl font-black uppercase leading-none tracking-tight text-brand-ink sm:text-4xl"
            >
              You&apos;re registered,{" "}
              <span className="text-brand-forest">{firstName}.</span>
            </h2>
            <p className="mt-3 font-rounded text-sm leading-relaxed text-brand-muted">
              {emailDelivered
                ? `We've emailed your registration code to ${values.email}.`
                : "Save this code now — we couldn't email it automatically."}
            </p>

            <div className="mt-6 flex flex-col gap-4 border-2 border-dashed border-brand-forest bg-brand-sun/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block font-rounded text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-muted">
                  Your registration code
                </span>
                <strong className="mt-1 block font-display text-3xl font-black tracking-wider text-brand-forest sm:text-4xl">
                  {verificationCode}
                </strong>
              </div>
              <button
                type="button"
                className={OUTLINE_BUTTON}
                onClick={() => void copyCode()}
              >
                {copied ? "Copied ✓" : "Copy code"}
              </button>
            </div>

            <p className="mt-5 font-rounded text-sm leading-relaxed text-brand-muted">
              Present this code at the festival entrance for fast check-in.
            </p>

            {redirectNotice()}

            <div className="mt-6 flex flex-col gap-3.5 sm:flex-row">
              <button
                type="button"
                className={PRIMARY_BUTTON}
                onClick={joinWhatsApp}
              >
                Join WhatsApp Community Now{" "}
                <span aria-hidden="true">↗</span>
              </button>
              <Link href="/" className={OUTLINE_BUTTON}>
                Return Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="mx-auto max-w-2xl border border-brand-ink bg-brand-paper p-8 shadow-[8px_8px_0_#00592D] sm:p-12"
        role="status"
      >
        <span className="mb-4 inline-block bg-brand-forest/10 px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest">
          Registration complete
        </span>
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-brand-ink sm:text-5xl">
          Thank you for <span className="text-brand-forest">registering.</span>
        </h2>

        <p className="mt-5 font-rounded text-sm leading-relaxed text-brand-muted">
          {emailDelivered
            ? `Your registration code was emailed to ${values.email}.`
            : "Save your registration code — we couldn't email it automatically."}
        </p>

        <div className="mt-8 flex flex-col gap-5 border-2 border-dashed border-brand-forest bg-brand-sun/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="block font-rounded text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              Your registration code
            </span>
            <strong className="mt-1 block font-display text-3xl font-black tracking-wider text-brand-forest sm:text-4xl">
              {verificationCode}
            </strong>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className={OUTLINE_BUTTON}
              onClick={() => void copyCode()}
            >
              {copied ? "Copied ✓" : "Copy code"}
            </button>
            <button
              type="button"
              className={OUTLINE_BUTTON}
              onClick={() => setShowSuccessModal(true)}
            >
              View details
            </button>
          </div>
        </div>

        {redirectNotice()}

        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
          <button
            type="button"
            className={PRIMARY_BUTTON}
            onClick={joinWhatsApp}
          >
            Join WhatsApp Community Now <span aria-hidden="true">↗</span>
          </button>
          <Link href="/" className={OUTLINE_BUTTON}>
            Return Home
          </Link>
        </div>

        <p className="mt-8 border-t border-brand-ink/15 pt-6 font-rounded text-xs font-extrabold text-brand-forest">
          Get ready to discover, learn, connect, and take your next step!
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Fixed horizontal section bar for Mobile & Tablet (< xl) */}
      <nav
        aria-label="Registration sections"
        className="fixed inset-x-0 top-16 z-40 border-b border-brand-ink/15 bg-brand-paper/95 py-4 hidden backdrop-blur-sm xl:hidden"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-8">
          {SECTIONS.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 border border-brand-ink/15 bg-brand-paper px-3 py-1.5 font-rounded text-[11px] font-bold text-brand-ink/80 transition-colors hover:border-brand-forest hover:text-brand-forest"
            >
              <span className="font-display text-[10px] font-black tabular-nums text-brand-forest">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main layout grid: reserves left column space on xl while keeping nav fixed */}
      <div className="grid pt-0 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-14 xl:pt-0">
        <aside className="hidden xl:block">
          <div className="fixed top-30 w-[260px] max-h-[calc(100vh-5rem)] overflow-y-auto pr-4">
            <div className="mb-6">
              <h3 className="mt-1 font-display text-base font-black tracking-tight text-brand-ink">
                Sections
              </h3>
            </div>
            <nav
              aria-label="Registration sections"
              className="space-y-1 border-l-2 border-brand-ink/10 pl-3"
            >
              {SECTIONS.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-3 py-2 font-rounded text-xs font-bold text-brand-ink/70 transition-colors hover:text-brand-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest"
                >
                  <span className="font-display text-[10px] font-black tabular-nums text-brand-forest group-hover:underline">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    {section.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Form container */}
        <div className="border lg:-translate-y-10 border-brand-ink bg-brand-paper shadow-[8px_8px_0_#050B06]">
          <form
            className="p-6 font-rounded text-brand-ink sm:p-10 lg:p-14"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-10 xl:hidden">
              <FormIntro />
            </div>

            <div className="mb-12 hidden xl:block">
              <FormIntro large />
            </div>

            <div className="space-y-12">
              <FormSection id="about" title="About you">
                <TextField
                  n={1}
                  name="fullName"
                  title="Full Name"
                  value={values.fullName}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  error={errors.fullName}
                  onChange={setField}
                />
                <TextField
                  n={2}
                  name="email"
                  title="Email Address"
                  value={values.email}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  hint="Please enter an active email address you check regularly. Your unique verification code will be generated upon successful submission."
                  error={errors.email}
                  onChange={setField}
                />
                <TextField
                  n={3}
                  name="phone"
                  title="Mobile Phone Number"
                  value={values.phone}
                  type="tel"
                  placeholder="0800 000 0000"
                  autoComplete="tel"
                  required
                  error={errors.phone}
                  onChange={setField}
                />
              </FormSection>

              <FormSection id="background" title="Your background">
                <SingleChoiceQuestion
                  n={4}
                  name="ageRange"
                  title="Age Range"
                  options={ATTENDEE_OPTIONS.ageRanges}
                  value={values.ageRange}
                  error={errors.ageRange}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={5}
                  name="gender"
                  title="Gender"
                  options={ATTENDEE_OPTIONS.genders}
                  value={values.gender}
                  error={errors.gender}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={6}
                  name="residence"
                  title="What part of Ogbor-Hill do you reside?"
                  options={ATTENDEE_OPTIONS.residences}
                  value={values.residence}
                  error={errors.residence}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={7}
                  name="description"
                  title="What best describes you?"
                  options={ATTENDEE_OPTIONS.descriptions}
                  value={values.description}
                  error={errors.description}
                  other={{
                    name: "otherDescription",
                    label: "Please specify your description",
                    trigger: "Other",
                    value: values.otherDescription,
                    error: errors.otherDescription,
                  }}
                  onChange={setField}
                />
              </FormSection>

              <FormSection id="skills" title="Skills & interests">
                <MultiChoiceQuestion
                  n={8}
                  name="digitalSkills"
                  title="Which digital skill are you interested in learning?"
                  options={ATTENDEE_OPTIONS.digitalSkills}
                  value={values.digitalSkills}
                  error={errors.digitalSkills}
                  other={{
                    name: "otherSkill",
                    label: "Other skill (please specify)",
                    trigger: "Other",
                    value: values.otherSkill,
                    error: errors.otherSkill,
                  }}
                  onToggle={toggleChoice}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={9}
                  name="skillLevel"
                  title="How would you describe your current digital skills level?"
                  options={ATTENDEE_OPTIONS.skillLevels}
                  value={values.skillLevel}
                  error={errors.skillLevel}
                  onChange={setField}
                />
              </FormSection>

              <FormSection id="participation" title="Participation">
                <SingleChoiceQuestion
                  n={10}
                  name="followUp"
                  title="Would you join a follow-up training if one is offered after the event?"
                  options={ATTENDEE_OPTIONS.followUp}
                  value={values.followUp}
                  error={errors.followUp}
                  onChange={setField}
                />
                <MultiChoiceQuestion
                  n={11}
                  name="learningStyles"
                  title="How would you like to learn?"
                  options={ATTENDEE_OPTIONS.learningStyles}
                  value={values.learningStyles}
                  error={errors.learningStyles}
                  onToggle={toggleChoice}
                  onChange={setField}
                />
                <MultiChoiceQuestion
                  n={12}
                  name="access"
                  title="Which of these do you have access to?"
                  options={ATTENDEE_OPTIONS.access}
                  value={values.access}
                  error={errors.access}
                  onToggle={toggleChoice}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={13}
                  name="earnings"
                  title="Have you ever earned money from a digital skill?"
                  options={ATTENDEE_OPTIONS.earnings}
                  value={values.earnings}
                  error={errors.earnings}
                  onChange={setField}
                />
              </FormSection>

              <FormSection id="hopes" title="What you hope to gain">
                <MultiChoiceQuestion
                  n={14}
                  name="hopes"
                  title="What do you hope to gain from this event?"
                  options={ATTENDEE_OPTIONS.hopes}
                  value={values.hopes}
                  error={errors.hopes}
                  onToggle={toggleChoice}
                  onChange={setField}
                />
              </FormSection>

              <FormSection
                id="mobilisation"
                title="Mobilisation and participation"
              >
                <MultiChoiceQuestion
                  n={15}
                  name="heardAbout"
                  title="How did you hear about Ogbor Youth Tech Fest?"
                  options={ATTENDEE_OPTIONS.heardAbout}
                  value={values.heardAbout}
                  error={errors.heardAbout}
                  other={{
                    name: "otherHeardAbout",
                    label: "Please tell us how you heard about us",
                    trigger: "Other",
                    value: values.otherHeardAbout,
                    error: errors.otherHeardAbout,
                  }}
                  onToggle={toggleChoice}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={16}
                  name="friends"
                  title="How many friends or people can you bring with you?"
                  options={ATTENDEE_OPTIONS.friends}
                  value={values.friends}
                  error={errors.friends}
                  onChange={setField}
                />
              </FormSection>

              <FormSection id="connected" title="Stay connected">
                <SingleChoiceQuestion
                  n={17}
                  name="futureInfo"
                  title="Would you like to receive information about future training, internships, and digital skills opportunities?"
                  options={ATTENDEE_OPTIONS.futureInfo}
                  value={values.futureInfo}
                  error={errors.futureInfo}
                  onChange={setField}
                />
                <SingleChoiceQuestion
                  n={18}
                  name="reminders"
                  title="How would you like to receive reminders about the event?"
                  options={ATTENDEE_OPTIONS.reminders}
                  value={values.reminders}
                  error={errors.reminders}
                  onChange={setField}
                />
                <Question
                  n={19}
                  name="additionalInfo"
                  title="Additional information or questions"
                  error={errors.additionalInfo}
                >
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={values.additionalInfo}
                    placeholder="Anything else you would like us to know?"
                    aria-labelledby="additionalInfo-label"
                    aria-invalid={Boolean(errors.additionalInfo)}
                    aria-describedby={
                      errors.additionalInfo ? "additionalInfo-error" : undefined
                    }
                    className={`${FIELD_CLASS} min-h-32 resize-y`}
                    onChange={(event) =>
                      setField("additionalInfo", event.target.value)
                    }
                  />
                </Question>
              </FormSection>
            </div>

            {serverError && (
              <div
                className="mt-8 border-l-4 border-red-700 bg-red-50 p-4"
                role="alert"
              >
                <p className="font-rounded text-xs font-bold leading-relaxed text-red-700">
                  {serverError}
                </p>
              </div>
            )}

            <div className="mt-12 flex flex-col gap-6 border-t border-brand-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className={PRIMARY_BUTTON}
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Submitting Registration…"
                  : "Submit Registration"}
                <span aria-hidden="true">
                  {status === "submitting" ? "⏳" : "→"}
                </span>
              </button>
              <p className="max-w-xs font-rounded text-xs leading-relaxed text-brand-muted">
                By submitting, you agree to receive communications regarding
                Ogbor Youth Tech Fest 2026.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

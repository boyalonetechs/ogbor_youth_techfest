"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  VOLUNTEER_OPTIONS,
  VOLUNTEER_STEP_FIELDS,
  emptyVolunteerForm,
  validateVolunteerForm,
  validateVolunteerStep,
  type VolunteerFieldErrors,
  type VolunteerFormValues,
} from "@/lib/volunteer";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/JcAaVxB96QU9YGxY2eQq1x?s=cl&p=a&iam=2";

const TOTAL_STEPS = 6;

const STEP_TITLES = [
  "CALL FOR VOLUNTEERS",
  "ABOUT YOU",
  "MOTIVATION FOR VOLUNTEERING",
  "CHOOSE YOUR TEAMS",
  "STRENGTHS, INTERESTS AND SKILLS",
  "THANK YOU",
] as const;

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

type FieldName = keyof VolunteerFormValues;

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
}: {
  n: number;
  title: string;
  name: FieldName;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={name}
      tabIndex={-1}
      className="scroll-mt-32 border-t border-brand-ink/10 pt-8 first:border-t-0 first:pt-0"
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

type ChangeHandler = (name: FieldName, value: string) => void;

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
}: {
  n: number;
  name: FieldName;
  title: string;
  value: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onChange: ChangeHandler;
}) {
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
        aria-labelledby={`${name}-label`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={FIELD_CLASS}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </Question>
  );
}

function TextAreaField({
  n,
  name,
  title,
  value,
  placeholder,
  hint,
  error,
  onChange,
}: {
  n: number;
  name: FieldName;
  title: string;
  value: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  onChange: ChangeHandler;
}) {
  return (
    <Question n={n} name={name} title={title} hint={hint} error={error}>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        placeholder={placeholder}
        aria-labelledby={`${name}-label`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${FIELD_CLASS} min-h-28 resize-y`}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </Question>
  );
}

function SingleChoiceQuestion({
  n,
  name,
  title,
  options,
  value,
  hint,
  error,
  onChange,
}: {
  n: number;
  name: FieldName;
  title: string;
  options: readonly string[];
  value: string;
  hint?: string;
  error?: string;
  onChange: ChangeHandler;
}) {
  return (
    <Question
      n={n}
      name={name}
      title={title}
      required
      hint={hint}
      error={error}
    >
      <div
        className="grid gap-2.5"
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              className={`${CHOICE_BASE} ${selected ? CHOICE_SELECTED : CHOICE_IDLE}`}
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
    </Question>
  );
}

function MultiChoiceQuestion({
  n,
  name,
  title,
  options,
  value,
  hint,
  error,
  otherSkill,
  otherSkillError,
  onToggle,
  onChange,
}: {
  n: number;
  name: "skills";
  title: string;
  options: readonly string[];
  value: string[];
  hint?: string;
  error?: string;
  otherSkill: string;
  otherSkillError?: string;
  onToggle: (option: string, checked: boolean) => void;
  onChange: ChangeHandler;
}) {
  const showOther = value.includes("Other");

  return (
    <Question n={n} name={name} title={title} required hint={hint} error={error}>
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
              className={`${CHOICE_BASE} ${selected ? CHOICE_SELECTED : CHOICE_IDLE}`}
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
                onChange={(event) => onToggle(option, event.target.checked)}
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

      {showOther && (
        <div className="mt-4 border-l-2 border-brand-forest bg-brand-forest/5 p-4">
          <label
            htmlFor="otherSkill"
            className="mb-2 block font-rounded text-xs font-extrabold uppercase tracking-wider text-brand-ink"
          >
            Other skill
          </label>
          <input
            id="otherSkill"
            name="otherSkill"
            type="text"
            value={otherSkill}
            aria-invalid={Boolean(otherSkillError)}
            aria-describedby={otherSkillError ? "otherSkill-error" : undefined}
            className={FIELD_CLASS}
            onChange={(event) => onChange("otherSkill", event.target.value)}
          />
          {otherSkillError && (
            <p
              className="mt-2 font-rounded text-xs font-bold text-red-700"
              id="otherSkill-error"
              role="alert"
            >
              {otherSkillError}
            </p>
          )}
        </div>
      )}
    </Question>
  );
}

export default function VolunteerForm() {
  const [values, setValues] = useState<VolunteerFormValues>(emptyVolunteerForm);
  const [errors, setErrors] = useState<VolunteerFieldErrors>({});
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToTop() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function update(name: FieldName, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function toggleSkill(option: string, checked: boolean) {
    setValues((previous) => ({
      ...previous,
      skills: checked
        ? [...previous.skills, option]
        : previous.skills.filter((skill) => skill !== option),
    }));
    setErrors((previous) => {
      if (!previous.skills) return previous;
      const next = { ...previous };
      delete next.skills;
      return next;
    });
  }

  function focusFirstField(fieldErrors: VolunteerFieldErrors) {
    const first = Object.keys(fieldErrors)[0] as FieldName | undefined;
    if (first) document.getElementById(first)?.focus();
  }

  function stepForField(field: FieldName): number {
    const index = VOLUNTEER_STEP_FIELDS.findIndex((fields) =>
      fields.includes(field),
    );
    return index >= 0 ? index + 1 : 2;
  }

  async function submitApplication() {
    const validation = validateVolunteerForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      const first = Object.keys(validation.errors)[0] as FieldName;
      setStep(stepForField(first));
      scrollToTop();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        errors?: VolunteerFieldErrors;
      };

      if (!response.ok) {
        const fieldErrors =
          data.errors && typeof data.errors === "object" ? data.errors : {};
        setErrors(fieldErrors);
        setServerError(
          data.error ?? "Could not send your application. Please try again.",
        );
        const first = Object.keys(fieldErrors)[0] as FieldName | undefined;
        if (first) setStep(stepForField(first));
        scrollToTop();
        return;
      }

      setErrors({});
      setServerError("");
      setStatus("success");
      setStep(TOTAL_STEPS);
      scrollToTop();
    } catch {
      setServerError("Could not reach the server. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    if (step === TOTAL_STEPS - 1) {
      void submitApplication();
      return;
    }

    const stepErrors = validateVolunteerStep(values, step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((previous) => ({ ...previous, ...stepErrors }));
      focusFirstField(stepErrors);
      return;
    }

    setErrors({});
    setStep((current) => current + 1);
    scrollToTop();
  }

  return (
    <div
      ref={formRef}
      className="border-2 border-brand-ink bg-brand-paper shadow-[10px_10px_0_#00592D]"
    >
      <div className="border-b-2 border-brand-ink bg-brand-ink px-6 py-5 text-brand-paper sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.18em] text-brand-sun">
            Section {step} of {TOTAL_STEPS}
          </span>
          <span className="font-display text-[10px] font-black uppercase tracking-[0.14em] text-brand-paper/70">
            Ogbor Youth Tech Fest 2026
          </span>
        </div>
        <h1 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
          {STEP_TITLES[step - 1]}
        </h1>
        <div className="mt-4 grid grid-cols-6 gap-1.5" aria-hidden="true">
          {STEP_TITLES.map((title, index) => (
            <span
              key={title}
              className={`h-1 ${index < step ? "bg-brand-sun" : "bg-brand-paper/25"}`}
            />
          ))}
        </div>
      </div>

      <form noValidate onSubmit={handleSubmit} className="px-6 py-10 sm:px-10 sm:py-14">
        {step === 1 && (
          <div className="space-y-6 font-rounded text-sm leading-relaxed text-brand-ink">
            <span className="inline-block bg-brand-forest/10 px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest">
              Call for volunteers
            </span>
            <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl">
              Got a skill, some time, and a heart for tech in Ogbor-Hill?
            </h2>
            <p className="max-w-2xl">
              Join the team behind Ogbor Youth Tech Fest 2026.
            </p>
            <p className="max-w-2xl">
              You do not need to be a tech expert. Maybe you design flyers, take
              good photos, talk easily to people, keep records neatly, or you are
              simply the one everyone calls when something needs to get done. All
              of that counts here.
            </p>
            <p className="max-w-2xl">
              Ogbor Youth Tech Fest exists to show young people in Aba how to
              build digital skills, use AI, find career opportunities, start
              businesses, and earn from what they know. We have different teams,
              from publicity and photography to ushering and ICT support, so there
              is a place for what you already do well.
            </p>
            <dl className="grid gap-3 border-y-2 border-brand-ink py-5 sm:grid-cols-3">
              <div>
                <dt className="font-display text-[9px] font-black uppercase tracking-[0.14em] text-brand-forest">
                  Event date
                </dt>
                <dd className="mt-1 font-bold">Monday, 30 November 2026</dd>
              </div>
              <div>
                <dt className="font-display text-[9px] font-black uppercase tracking-[0.14em] text-brand-forest">
                  Venue
                </dt>
                <dd className="mt-1 font-bold">
                  Church of God Mission International, 39 Umuola Road, Ogbor Hill,
                  Aba, Abia State
                </dd>
              </div>
              <div>
                <dt className="font-display text-[9px] font-black uppercase tracking-[0.14em] text-brand-forest">
                  Time
                </dt>
                <dd className="mt-1 font-bold">10:00 AM</dd>
              </div>
            </dl>
            <p className="max-w-2xl font-bold">
              Fill this form, tell us where you shine, and we will match you to a
              team.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <p className="font-rounded text-xs leading-relaxed text-brand-muted">
              Tell us how to reach you and the T-shirt size that will fit you.
            </p>
            <TextField
              n={1}
              name="fullName"
              title="Full Name"
              value={values.fullName}
              required
              autoComplete="name"
              placeholder="Your full name"
              error={errors.fullName}
              onChange={update}
            />
            <TextField
              n={2}
              name="email"
              title="Email Address"
              type="email"
              value={values.email}
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
              onChange={update}
            />
            <TextField
              n={3}
              name="whatsapp"
              title="WhatsApp Number"
              type="tel"
              value={values.whatsapp}
              required
              autoComplete="tel"
              placeholder="+234 800 000 0000"
              error={errors.whatsapp}
              onChange={update}
            />
            <SingleChoiceQuestion
              n={4}
              name="shirtSize"
              title="What is your size for T-shirts?"
              options={VOLUNTEER_OPTIONS.shirtSizes}
              value={values.shirtSize}
              error={errors.shirtSize}
              onChange={update}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <p className="font-rounded text-xs leading-relaxed text-brand-muted">
              A little about your experience helping at events.
            </p>
            <SingleChoiceQuestion
              n={5}
              name="previousVolunteering"
              title="Have you volunteered or helped organise an event before?"
              hint="First time? No problem. We will train you."
              options={VOLUNTEER_OPTIONS.previousVolunteering}
              value={values.previousVolunteering}
              error={errors.previousVolunteering}
              onChange={update}
            />
            {values.previousVolunteering.startsWith("Yes") && (
              <TextAreaField
                n={6}
                name="previousDetails"
                title="If yes, tell us what you did and where."
                value={values.previousDetails}
                placeholder="For example: ushered at a school concert, helped with church outreach…"
                error={errors.previousDetails}
                onChange={update}
              />
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <p className="font-rounded text-xs leading-relaxed text-brand-muted">
              Pick the team where you would shine most. We will match you to a
              team after reviewing applications.
            </p>
            <SingleChoiceQuestion
              n={7}
              name="team"
              title="Which team would you like to join?"
              options={VOLUNTEER_OPTIONS.teams}
              value={values.team}
              error={errors.team}
              onChange={update}
            />
            <SingleChoiceQuestion
              n={8}
              name="reassignment"
              title="Are you happy to be moved to another team if we need you elsewhere?"
              options={VOLUNTEER_OPTIONS.reassignment}
              value={values.reassignment}
              error={errors.reassignment}
              onChange={update}
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8">
            <p className="font-rounded text-xs leading-relaxed text-brand-muted">
              Tick everything that applies and tell us how strong your best skill
              is.
            </p>
            <MultiChoiceQuestion
              n={9}
              name="skills"
              title="Which of these skills do you have? Tick all that apply"
              options={VOLUNTEER_OPTIONS.skills}
              value={values.skills}
              error={errors.skills}
              otherSkill={values.otherSkill}
              otherSkillError={errors.otherSkill}
              onToggle={toggleSkill}
              onChange={update}
            />
            <SingleChoiceQuestion
              n={10}
              name="skillLevel"
              title="How would you rate your skill level in your strongest area?"
              options={VOLUNTEER_OPTIONS.skillLevels}
              value={values.skillLevel}
              error={errors.skillLevel}
              onChange={update}
            />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-7 font-rounded text-sm leading-relaxed text-brand-ink">
            <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl">
              Thank you for giving your time.
            </h2>
            <p className="max-w-2xl">
              Ogbor Youth Tech Fest 2026 just got stronger. Your volunteer
              application has been received.
            </p>
            <p className="max-w-2xl">
              Please click the link below to join our Volunteer WhatsApp group to
              stay connected with other volunteers and the planning committee for
              the event.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={PRIMARY_BUTTON}
            >
              JOIN VOLUNTEER WHATSAPP GROUP <span aria-hidden="true">↗</span>
            </a>
            <p className="break-all font-mono text-xs text-brand-muted">
              {WHATSAPP_URL}
            </p>
            <Link href="/" className={OUTLINE_BUTTON}>
              RETURN HOME <span aria-hidden="true">←</span>
            </Link>
          </div>
        )}

        {step < TOTAL_STEPS && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-brand-ink pt-6">
            {step > 1 ? (
              <button
                type="button"
                className={OUTLINE_BUTTON}
                onClick={() => {
                  setErrors({});
                  setStep((current) => current - 1);
                  scrollToTop();
                }}
              >
                <span aria-hidden="true">←</span> BACK
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className={PRIMARY_BUTTON}
              disabled={status === "submitting"}
            >
              {step === 5
                ? status === "submitting"
                  ? "SENDING…"
                  : "SUBMIT APPLICATION"
                : "CONTINUE"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {serverError && (
          <p className="mt-5 font-rounded text-xs font-bold text-red-700" role="alert">
            ⚠️ {serverError}
          </p>
        )}
      </form>
    </div>
  );
}

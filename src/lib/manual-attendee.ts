/**
 * The short attendee form used by the manual registration portal.
 *
 * These are the fields an organiser needs to register someone at the door:
 * contact details, who they are, and where they are from. The rest of the
 * attendee questionnaire is left empty so entry stays quick.
 */

import { ATTENDEE_OPTIONS } from "@/lib/attendee";

export type ManualAttendeeFormValues = {
  fullName: string;
  email: string;
  phone: string;
  ageRange: string;
  residence: string;
  description: string;
  otherDescription: string;
  additionalInfo: string;
};

export type ManualAttendeeFieldErrors = Partial<
  Record<keyof ManualAttendeeFormValues, string>
>;

export type ManualAttendeeValidationResult =
  | { ok: true; data: ManualAttendeeFormValues }
  | { ok: false; errors: ManualAttendeeFieldErrors };

export function emptyManualAttendeeForm(): ManualAttendeeFormValues {
  return {
    fullName: "",
    email: "",
    phone: "",
    ageRange: "",
    residence: "",
    description: "",
    otherDescription: "",
    additionalInfo: "",
  };
}

function readString(
  source: Record<string, unknown>,
  key: keyof ManualAttendeeFormValues,
  maxLength = 500,
): string {
  const value = source[key];
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function validateManualAttendeeForm(
  input: unknown,
): ManualAttendeeValidationResult {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};

  const data: ManualAttendeeFormValues = {
    fullName: readString(source, "fullName", 200),
    email: readString(source, "email", 320).toLowerCase(),
    phone: readString(source, "phone", 40),
    ageRange: readString(source, "ageRange"),
    residence: readString(source, "residence"),
    description: readString(source, "description"),
    otherDescription: readString(source, "otherDescription", 200),
    additionalInfo: readString(source, "additionalInfo", 2000),
  };

  const errors: ManualAttendeeFieldErrors = {};

  const requiredFields: readonly (keyof ManualAttendeeFormValues)[] = [
    "fullName",
    "email",
    "phone",
    "ageRange",
    "residence",
    "description",
  ];

  for (const field of requiredFields) {
    if (!data[field]) errors[field] = "This field is required.";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    if (!/^[+\d()\s-]+$/.test(data.phone) || digits.length < 7) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  const singleChoiceFields = {
    ageRange: ATTENDEE_OPTIONS.ageRanges,
    residence: ATTENDEE_OPTIONS.residences,
    description: ATTENDEE_OPTIONS.descriptions,
  } as const;

  for (const [field, options] of Object.entries(singleChoiceFields)) {
    const key = field as keyof typeof singleChoiceFields;
    const allowed: readonly string[] = options;
    if (data[key] && !allowed.includes(data[key])) {
      errors[key] = "Choose one of the listed options.";
    }
  }

  if (data.description === "Other" && !data.otherDescription) {
    errors.otherDescription = "Please tell us how you would describe yourself.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

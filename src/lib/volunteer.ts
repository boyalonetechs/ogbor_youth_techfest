/**
 * Shared volunteer registration field definitions and validation.
 *
 * Safe to import from both the browser form and the server route handler so
 * both enforce the same rules.
 */

export const VOLUNTEER_OPTIONS = {
  shirtSizes: ["Small", "Medium", "Large", "XL", "XXL"],
  previousVolunteering: [
    "Yes, several times",
    "Yes, once or twice",
    "No, this will be my first time",
  ],
  teams: [
    "Publicity and Digital Marketing – Promoting the event online and managing social media",
    "Community and Youth Mobilisation – Reaching churches, schools, youth groups, community leaders, and young people",
    "Partnerships and Sponsorship – Sponsor outreach, stakeholder engagement, and partnership follow-ups",
    "Registration and Data Management – Participant registration, records, check-in, and attendance",
    "Media, Photography and Videography – Covering the event through photos, video, and content",
    "Graphics and Creative Design – Flyers, banners, digital content, and other event materials",
    "Logistics and Venue Management –Venue setup, seating, materials, signage, and equipment",
    "Protocol and Guest Relations – Welcoming guests, dignitaries, speakers, and partners",
    "Welfare and Hospitality – Refreshments, volunteer welfare, and guest hospitality",
    "Safety, Security and First Aid – Safety arrangements, emergency coordination, and first aid, subject to relevant training",
    "General Volunteer Support – Helping wherever extra hands are needed",
  ],
  reassignment: [
    "Yes, put me wherever I am needed",
    "I prefer to stay in my chosen team only",
  ],
  skills: [
    "Graphic design (Canva, Photoshop, CorelDRAW)",
    "Photography",
    "Video recording and editing",
    "Content writing or copywriting",
    "Data analytics",
    "Digital Marketing",
    "Other",
  ],
  skillLevels: [
    "Beginner, still learning",
    "Intermediate, I can do it with little help",
    "Advanced, I do this regularly or professionally",
  ],
} as const;

export type VolunteerFormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  shirtSize: string;
  previousVolunteering: string;
  previousDetails: string;
  team: string;
  reassignment: string;
  skills: string[];
  otherSkill: string;
  skillLevel: string;
};

export type VolunteerFieldErrors = Partial<Record<keyof VolunteerFormValues, string>>;

export type ValidationResult =
  | { ok: true; data: VolunteerFormValues }
  | { ok: false; errors: VolunteerFieldErrors };

export function emptyVolunteerForm(): VolunteerFormValues {
  return {
    fullName: "",
    email: "",
    whatsapp: "",
    shirtSize: "",
    previousVolunteering: "",
    previousDetails: "",
    team: "",
    reassignment: "",
    skills: [],
    otherSkill: "",
    skillLevel: "",
  };
}

/** Which questions live on each visible step (steps 1 and 6 have no inputs). */
export const VOLUNTEER_STEP_FIELDS: readonly (readonly (keyof VolunteerFormValues)[])[] = [
  [],
  ["fullName", "email", "whatsapp", "shirtSize"],
  ["previousVolunteering", "previousDetails"],
  ["team", "reassignment"],
  ["skills", "otherSkill", "skillLevel"],
  [],
];

const REQUIRED_TEXT_FIELDS: readonly (keyof VolunteerFormValues)[] = [
  "fullName",
  "email",
  "whatsapp",
  "shirtSize",
  "previousVolunteering",
  "team",
  "reassignment",
  "skillLevel",
];

function readString(
  source: Record<string, unknown>,
  key: keyof VolunteerFormValues,
  maxLength = 500,
): string {
  const value = source[key];
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function readStringList(source: Record<string, unknown>, key: "skills"): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];

  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (trimmed) unique.add(trimmed);
  }
  return [...unique];
}

function isOneOf(value: string, options: readonly string[]): boolean {
  return options.includes(value);
}

function normalize(input: unknown): VolunteerFormValues {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};

  return {
    fullName: readString(source, "fullName", 200),
    email: readString(source, "email", 320).toLowerCase(),
    whatsapp: readString(source, "whatsapp", 40),
    shirtSize: readString(source, "shirtSize"),
    previousVolunteering: readString(source, "previousVolunteering"),
    previousDetails: readString(source, "previousDetails", 2000),
    team: readString(source, "team", 300),
    reassignment: readString(source, "reassignment"),
    skills: readStringList(source, "skills"),
    otherSkill: readString(source, "otherSkill", 200),
    skillLevel: readString(source, "skillLevel"),
  };
}

function collectErrors(data: VolunteerFormValues): VolunteerFieldErrors {
  const errors: VolunteerFieldErrors = {};

  for (const field of REQUIRED_TEXT_FIELDS) {
    if (!data[field]) errors[field] = "This field is required.";
  }

  if (data.skills.length === 0) {
    errors.skills = "Choose at least one skill, or select Other.";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.whatsapp) {
    const digits = data.whatsapp.replace(/\D/g, "");
    if (!/^[+\d()\s-]+$/.test(data.whatsapp) || digits.length < 7) {
      errors.whatsapp = "Enter a valid WhatsApp number.";
    }
  }

  const singleChoiceFields = {
    shirtSize: VOLUNTEER_OPTIONS.shirtSizes,
    previousVolunteering: VOLUNTEER_OPTIONS.previousVolunteering,
    team: VOLUNTEER_OPTIONS.teams,
    reassignment: VOLUNTEER_OPTIONS.reassignment,
    skillLevel: VOLUNTEER_OPTIONS.skillLevels,
  } as const;

  for (const [field, options] of Object.entries(singleChoiceFields)) {
    const key = field as keyof typeof singleChoiceFields;
    if (data[key] && !isOneOf(data[key], options)) {
      errors[key] = "Choose one of the listed options.";
    }
  }

  if (
    data.skills.length > 0 &&
    !data.skills.every((skill) => isOneOf(skill, VOLUNTEER_OPTIONS.skills))
  ) {
    errors.skills = "Choose only options from the list.";
  }

  if (
    data.previousVolunteering.startsWith("Yes") &&
    !data.previousDetails
  ) {
    errors.previousDetails = "Tell us what you did and where.";
  }

  if (data.skills.includes("Other") && !data.otherSkill) {
    errors.otherSkill = "Please tell us which skill you have in mind.";
  }

  return errors;
}

/** Validate just one visible step of the form. */
export function validateVolunteerStep(
  input: unknown,
  step: number,
): VolunteerFieldErrors {
  const data = normalize(input);
  const errors = collectErrors(data);
  const fields = VOLUNTEER_STEP_FIELDS[step - 1] ?? [];

  const stepErrors: VolunteerFieldErrors = {};
  for (const field of fields) {
    if (errors[field]) stepErrors[field] = errors[field];
  }
  return stepErrors;
}

export function validateVolunteerForm(input: unknown): ValidationResult {
  const data = normalize(input);
  const errors = collectErrors(data);

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

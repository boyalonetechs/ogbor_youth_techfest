/**
 * Shared attendee registration field definitions and validation.
 *
 * This module is safe to import from both client components and server route
 * handlers, so the browser and the API enforce the exact same rules.
 */

export const ATTENDEE_OPTIONS = {
  ageRanges: [
    "Under 15",
    "15–18 years",
    "19–24 years",
    "25–30 years",
    "31 years and above",
  ],
  genders: ["Male", "Female", "Prefer not to say"],
  residences: [
    "Ehere",
    "Ovom",
    "Umuola (Egbelu & Okpulor)",
    "Waterside (Aba River Bridge)",
    "Opobo Road",
    "Ikot Ekpene Road Axis",
    "Ukaegbu Road",
    "Outside Ogbor Hill",
  ],
  descriptions: [
    "Secondary school student",
    "Undergraduate",
    "Graduate",
    "NYSC corps member",
    "Job seeker",
    "Entrepreneur/business owner",
    "Employed professional",
    "Other",
  ],
  digitalSkills: [
    "Artificial Intelligence (AI)",
    "Graphic Design",
    "Video Editing and Content Creation",
    "Web Development",
    "Frontend/Backend Development",
    "Data Analytics",
    "UI/UX and Product Design",
    "Digital Marketing",
    "Social Media Management",
    "Computer Appreciation",
    "Entrepreneurship and Business Technology",
    "I am not sure yet",
    "Other",
  ],
  skillLevels: [
    "Beginner — I am just starting",
    "Basic — I know a few things",
    "Intermediate — I have some practical experience",
    "Advanced — I can use my skills professionally",
  ],
  followUp: [
    "Yes, physical classes in Aba",
    "Yes, online classes only",
    "Yes, either one",
    "Maybe",
    "No",
  ],
  learningStyles: [
    "Hands-on workshops",
    "Short talks and panel discussions",
    "One-on-one mentoring",
    "Live demos",
    "Meeting employers and business owners",
    "Exhibitions and product showcases",
  ],
  access: [
    "Smartphone",
    "Laptop or desktop",
    "Regular internet or data",
    "All of the above",
    "None of these right now",
  ],
  earnings: [
    "Yes, I earn from it regularly",
    "Only once or a few times",
    "Not yet, but I want to",
    "Not interested in earning from it right now",
  ],
  hopes: [
    "Discover a skill or career path",
    "Learn about AI and emerging technologies",
    "Get a job or internship opportunity",
    "Start or grow a business",
    "Learn how to earn from digital skills",
    "Meet mentors and industry professionals",
    "Access future training opportunities",
    "Build useful professional connections",
  ],
  heardAbout: [
    "Church or religious organisation",
    "School or educational institution",
    "WhatsApp",
    "Facebook or Instagram",
    "Community leader/association",
    "Friend or family",
    "DP Hub & Tech",
    "Youth group/association",
    "Radio",
    "Other",
  ],
  friends: ["1 to 2", "3 to 5", "Group of 6 or more", "None"],
  futureInfo: ["Yes, please contact me", "No, only contact me about this event"],
  reminders: ["WhatsApp", "SMS", "Email", "Any of the above"],
} as const;

export type AttendeeFormValues = {
  fullName: string;
  email: string;
  phone: string;
  ageRange: string;
  gender: string;
  residence: string;
  description: string;
  otherDescription: string;
  digitalSkills: string[];
  otherSkill: string;
  skillLevel: string;
  followUp: string;
  learningStyles: string[];
  access: string[];
  earnings: string;
  hopes: string[];
  heardAbout: string[];
  otherHeardAbout: string;
  friends: string;
  futureInfo: string;
  reminders: string;
  additionalInfo: string;
};

export type AttendeeFieldErrors = Partial<Record<keyof AttendeeFormValues, string>>;

export type ValidationResult =
  | { ok: true; data: AttendeeFormValues }
  | { ok: false; errors: AttendeeFieldErrors };

export function emptyAttendeeForm(): AttendeeFormValues {
  return {
    fullName: "",
    email: "",
    phone: "",
    ageRange: "",
    gender: "",
    residence: "",
    description: "",
    otherDescription: "",
    digitalSkills: [],
    otherSkill: "",
    skillLevel: "",
    followUp: "",
    learningStyles: [],
    access: [],
    earnings: "",
    hopes: [],
    heardAbout: [],
    otherHeardAbout: "",
    friends: "",
    futureInfo: "",
    reminders: "",
    additionalInfo: "",
  };
}

const REQUIRED_TEXT_FIELDS: readonly (keyof AttendeeFormValues)[] = [
  "fullName",
  "email",
  "phone",
  "ageRange",
  "gender",
  "residence",
  "description",
  "skillLevel",
  "followUp",
  "earnings",
  "friends",
  "futureInfo",
  "reminders",
];

const REQUIRED_LIST_FIELDS: readonly (keyof AttendeeFormValues)[] = [
  "digitalSkills",
  "learningStyles",
  "access",
  "hopes",
  "heardAbout",
];

function readString(
  source: Record<string, unknown>,
  key: keyof AttendeeFormValues,
  maxLength = 500,
): string {
  const value = source[key];
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function readStringList(
  source: Record<string, unknown>,
  key: keyof AttendeeFormValues,
): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];

  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (trimmed) unique.add(trimmed);
    if (unique.size === 30) break;
  }
  return [...unique];
}

function isOneOf(value: string, options: readonly string[]): boolean {
  return options.includes(value);
}

function isListValid(values: string[], options: readonly string[]): boolean {
  return values.length > 0 && values.every((value) => isOneOf(value, options));
}

export function validateAttendeeForm(input: unknown): ValidationResult {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};

  const data: AttendeeFormValues = {
    fullName: readString(source, "fullName", 200),
    email: readString(source, "email", 320).toLowerCase(),
    phone: readString(source, "phone", 40),
    ageRange: readString(source, "ageRange"),
    gender: readString(source, "gender"),
    residence: readString(source, "residence"),
    description: readString(source, "description"),
    otherDescription: readString(source, "otherDescription", 200),
    digitalSkills: readStringList(source, "digitalSkills"),
    otherSkill: readString(source, "otherSkill", 200),
    skillLevel: readString(source, "skillLevel"),
    followUp: readString(source, "followUp"),
    learningStyles: readStringList(source, "learningStyles"),
    access: readStringList(source, "access"),
    earnings: readString(source, "earnings"),
    hopes: readStringList(source, "hopes"),
    heardAbout: readStringList(source, "heardAbout"),
    otherHeardAbout: readString(source, "otherHeardAbout", 200),
    friends: readString(source, "friends"),
    futureInfo: readString(source, "futureInfo"),
    reminders: readString(source, "reminders"),
    additionalInfo: readString(source, "additionalInfo", 2000),
  };

  const errors: AttendeeFieldErrors = {};

  for (const field of REQUIRED_TEXT_FIELDS) {
    if (!data[field]) errors[field] = "This field is required.";
  }

  for (const field of REQUIRED_LIST_FIELDS) {
    if (data[field].length === 0) errors[field] = "Choose at least one option.";
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
    gender: ATTENDEE_OPTIONS.genders,
    residence: ATTENDEE_OPTIONS.residences,
    description: ATTENDEE_OPTIONS.descriptions,
    skillLevel: ATTENDEE_OPTIONS.skillLevels,
    followUp: ATTENDEE_OPTIONS.followUp,
    earnings: ATTENDEE_OPTIONS.earnings,
    friends: ATTENDEE_OPTIONS.friends,
    futureInfo: ATTENDEE_OPTIONS.futureInfo,
    reminders: ATTENDEE_OPTIONS.reminders,
  } as const;

  for (const [field, options] of Object.entries(singleChoiceFields)) {
    const key = field as keyof typeof singleChoiceFields;
    if (data[key] && !isOneOf(data[key], options)) {
      errors[key] = "Choose one of the listed options.";
    }
  }

  const listChoiceFields = {
    digitalSkills: ATTENDEE_OPTIONS.digitalSkills,
    learningStyles: ATTENDEE_OPTIONS.learningStyles,
    access: ATTENDEE_OPTIONS.access,
    hopes: ATTENDEE_OPTIONS.hopes,
    heardAbout: ATTENDEE_OPTIONS.heardAbout,
  } as const;

  for (const [field, options] of Object.entries(listChoiceFields)) {
    const key = field as keyof typeof listChoiceFields;
    if (data[key].length > 0 && !isListValid(data[key], options)) {
      errors[key] = "Choose only options from the list.";
    }
  }

  if (data.description === "Other" && !data.otherDescription) {
    errors.otherDescription = "Please tell us how you would describe yourself.";
  }
  if (data.digitalSkills.includes("Other") && !data.otherSkill) {
    errors.otherSkill = "Please tell us which skill you have in mind.";
  }
  if (data.heardAbout.includes("Other") && !data.otherHeardAbout) {
    errors.otherHeardAbout = "Please tell us how you heard about the event.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

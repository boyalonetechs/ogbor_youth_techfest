import { getPool } from "@/lib/db";

export type Registration = {
  id: string | number;
  verification_code: string;
  full_name: string;
  email: string;
  phone: string;
  age_range: string;
  gender: string;
  residence: string;
  current_description: string;
  other_description: string;
  digital_skills: string[];
  other_skill: string;
  skill_level: string;
  follow_up_training: string;
  learning_styles: string[];
  device_access: string[];
  digital_earnings: string;
  event_hopes: string[];
  heard_about: string[];
  other_heard_about: string;
  friends_invited: string;
  future_updates: string;
  reminder_channel: string;
  additional_info: string;
  email_sent_note: string;
  verified_at: string | null;
  created_at: string;
};

function toIsoString(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

/**
 * Load registrations with timestamps normalized to ISO strings so server-rendered
 * pages and JSON responses both hand the client the same shape.
 */
export async function getAttendeeRegistrations(): Promise<Registration[]> {
  const result = await getPool().query<Registration>(
    `SELECT * FROM attendee_registrations ORDER BY created_at DESC`,
  );

  return result.rows.map((row) => ({
    ...row,
    created_at: toIsoString(row.created_at),
    verified_at:
      row.verified_at === null || row.verified_at === undefined
        ? null
        : toIsoString(row.verified_at),
  }));
}

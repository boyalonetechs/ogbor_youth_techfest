import { getPool } from "@/lib/db";

export type VolunteerRegistration = {
  id: string | number;
  full_name: string;
  email: string;
  whatsapp: string;
  shirt_size: string;
  previous_volunteering: string;
  previous_details: string;
  team: string;
  reassignment: string;
  skills: string[];
  other_skill: string;
  skill_level: string;
  created_at: string;
};

function toIsoString(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

/** Load volunteer applications with timestamps normalized to ISO strings. */
export async function getVolunteerRegistrations(): Promise<VolunteerRegistration[]> {
  const result = await getPool().query<VolunteerRegistration>(
    `SELECT * FROM volunteer_registrations ORDER BY created_at DESC`,
  );

  return result.rows.map((row) => ({
    ...row,
    created_at: toIsoString(row.created_at),
  }));
}

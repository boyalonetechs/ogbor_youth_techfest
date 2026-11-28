/**
 * Import the exported volunteer Google Sheet into volunteer_registrations.
 *
 * Run with: npm run import:volunteers
 */

import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import { VOLUNTEER_OPTIONS } from "../src/lib/volunteer";

const CSV_PATH = path.join(process.cwd(), "public", "volunteer.csv");
const CODE_PREFIX = "OYTFV-2026-";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

function parseCreatedAt(value: string): string {
  const match =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(
      value.trim(),
    );

  if (!match) return new Date().toISOString();

  const [, month, day, year, hour, minute, second] = match;
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    ),
  ).toISOString();
}

function parseSkills(raw: string): { skills: string[]; otherSkill: string } {
  const knownSkills = VOLUNTEER_OPTIONS.skills.filter(
    (skill) => skill !== "Other",
  ) as readonly string[];
  const rawLower = raw.toLowerCase();
  const skills: string[] = [];
  let remainder = raw;

  for (const skill of knownSkills) {
    if (!rawLower.includes(skill.toLowerCase())) continue;
    skills.push(skill);
    const index = remainder.toLowerCase().indexOf(skill.toLowerCase());
    if (index >= 0) {
      remainder = remainder.slice(0, index) + remainder.slice(index + skill.length);
    }
  }

  const otherSkill = remainder
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(
      (item) =>
        !knownSkills.some((skill) => skill.toLowerCase() === item.toLowerCase()),
    )
    .join(", ")
    .slice(0, 200);

  return { skills, otherSkill };
}

function normalizeReassignment(value: string): string {
  if (value === "I prefer to stay in my first choice only") {
    return "I prefer to stay in my chosen team only";
  }
  return value;
}

function makeCodeGenerator(usedCodes: Set<string>): () => string {
  return () => {
    for (let attempt = 0; attempt < 10_000; attempt += 1) {
      const code = `${CODE_PREFIX}${String(
        Math.floor(Math.random() * 10_000),
      ).padStart(4, "0")}`;
      if (!usedCodes.has(code)) {
        usedCodes.add(code);
        return code;
      }
    }
    throw new Error("Could not generate a unique volunteer code.");
  };
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const csvText = readFileSync(CSV_PATH, "utf8").replace(/^\uFEFF/, "");
  const [header, ...dataRows] = parseCsv(csvText);
  if (!header) throw new Error("The volunteer CSV has no header row.");

  const column = (name: string) =>
    header.findIndex((value) => clean(value) === name);
  const field = (row: string[], name: string) => {
    const index = column(name);
    return index < 0 ? "" : clean(row[index]);
  };

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });
  const client = await pool.connect();

  let backfilled = 0;
  let inserted = 0;
  let skippedDuplicates = 0;
  let skippedInvalid = 0;

  try {
    await client.query("BEGIN");

    const codeRows = await client.query<{ verification_code: string }>(
      `SELECT verification_code FROM volunteer_registrations`,
    );
    const usedCodes = new Set(
      codeRows.rows.map((row) => row.verification_code).filter(Boolean),
    );
    const nextCode = makeCodeGenerator(usedCodes);

    const missingCodes = await client.query<{ id: string }>(
      `SELECT id FROM volunteer_registrations
       WHERE verification_code IS NULL OR verification_code = ''
       ORDER BY id`,
    );
    for (const row of missingCodes.rows) {
      await client.query(
        `UPDATE volunteer_registrations SET verification_code = $1 WHERE id = $2`,
        [nextCode(), row.id],
      );
      backfilled += 1;
    }

    const emailRows = await client.query<{ email: string }>(
      `SELECT lower(email) AS email FROM volunteer_registrations`,
    );
    const usedEmails = new Set(emailRows.rows.map((row) => row.email));

    for (const row of dataRows) {
      const fullName = field(row, "1. Full Name");
      const email = field(row, "2. Email Address").toLowerCase();
      const whatsapp = field(row, "3. WhatsApp Number");
      const shirtSize = field(row, "4. What is your size for T-shirts?");
      const previousVolunteering = field(
        row,
        "5. Have you volunteered or helped organise an event before?",
      );
      const previousDetails = field(
        row,
        "6. If yes, tell us what you did and where.",
      );
      const team = field(row, "7. Which team would you like to join?");
      const reassignment = normalizeReassignment(
        field(
          row,
          "8. Are you happy to be moved to another team if we need you elsewhere?",
        ),
      );
      const { skills, otherSkill } = parseSkills(
        field(row, "9. Which of these skills do you have? Tick all that apply"),
      );
      const skillLevel = field(
        row,
        "10. How would you rate your skill level in your strongest area?",
      );
      const timestamp = field(row, "Timestamp");

      if (
        !fullName ||
        !email ||
        !whatsapp ||
        !previousVolunteering ||
        !team ||
        !reassignment ||
        !skillLevel
      ) {
        skippedInvalid += 1;
        continue;
      }

      if (usedEmails.has(email)) {
        skippedDuplicates += 1;
        continue;
      }

      await client.query(
        `INSERT INTO volunteer_registrations (
           verification_code, full_name, email, whatsapp, shirt_size,
           previous_volunteering, previous_details, team, reassignment,
           skills, other_skill, skill_level, created_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          nextCode(),
          fullName,
          email,
          whatsapp,
          shirtSize,
          previousVolunteering,
          previousDetails,
          team,
          reassignment,
          skills,
          otherSkill,
          skillLevel,
          parseCreatedAt(timestamp),
        ],
      );

      usedEmails.add(email);
      inserted += 1;
    }

    await client.query("COMMIT");
    console.log(
      JSON.stringify(
        {
          rowsInCsv: dataRows.length,
          inserted,
          backfilled,
          skippedDuplicates,
          skippedInvalid,
        },
        null,
        2,
      ),
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

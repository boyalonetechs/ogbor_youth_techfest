-- Ogbor Youth Tech Fest 2026 — volunteer applications
-- Run with: psql "$DATABASE_URL" -f db/volunteer_registrations.sql

CREATE TABLE IF NOT EXISTS volunteer_registrations (
  id BIGSERIAL PRIMARY KEY,
  verification_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  shirt_size TEXT NOT NULL,
  previous_volunteering TEXT NOT NULL,
  previous_details TEXT NOT NULL DEFAULT '',
  team TEXT NOT NULL,
  reassignment TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  other_skill TEXT NOT NULL DEFAULT '',
  skill_level TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS volunteer_registrations_code_unique
  ON volunteer_registrations (verification_code);

CREATE INDEX IF NOT EXISTS volunteer_registrations_email_idx
  ON volunteer_registrations (email);

-- One application per email address, case-insensitive.
CREATE UNIQUE INDEX IF NOT EXISTS volunteer_registrations_email_unique
  ON volunteer_registrations (lower(email));

CREATE INDEX IF NOT EXISTS volunteer_registrations_created_at_idx
  ON volunteer_registrations (created_at DESC);

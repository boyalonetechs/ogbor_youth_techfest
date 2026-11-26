-- Ogbor Youth Tech Fest 2026 — attendee registrations
-- Run with: psql "$DATABASE_URL" -f db/attendee_registrations.sql

CREATE TABLE IF NOT EXISTS attendee_registrations (
  id BIGSERIAL PRIMARY KEY,
  verification_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age_range TEXT NOT NULL,
  gender TEXT NOT NULL,
  residence TEXT NOT NULL,
  current_description TEXT NOT NULL,
  other_description TEXT NOT NULL DEFAULT '',
  digital_skills TEXT[] NOT NULL DEFAULT '{}',
  other_skill TEXT NOT NULL DEFAULT '',
  skill_level TEXT NOT NULL,
  follow_up_training TEXT NOT NULL,
  learning_styles TEXT[] NOT NULL DEFAULT '{}',
  device_access TEXT[] NOT NULL DEFAULT '{}',
  digital_earnings TEXT NOT NULL,
  event_hopes TEXT[] NOT NULL DEFAULT '{}',
  heard_about TEXT[] NOT NULL DEFAULT '{}',
  other_heard_about TEXT NOT NULL DEFAULT '',
  friends_invited TEXT NOT NULL,
  future_updates TEXT NOT NULL,
  reminder_channel TEXT NOT NULL,
  additional_info TEXT NOT NULL DEFAULT '',
  email_sent_note TEXT NOT NULL DEFAULT '',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS attendee_registrations_email_idx
  ON attendee_registrations (email);

-- One registration per email address, case-insensitive.
CREATE UNIQUE INDEX IF NOT EXISTS attendee_registrations_email_unique
  ON attendee_registrations (lower(email));

CREATE INDEX IF NOT EXISTS attendee_registrations_created_at_idx
  ON attendee_registrations (created_at DESC);

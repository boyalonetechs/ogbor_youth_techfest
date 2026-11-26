-- Enforce one registration per email address (case-insensitive).
-- Run with: psql "$DATABASE_URL" -f db/unique_email.sql
--
-- This migration keeps the earliest registration for each email and removes
-- any later duplicates, then adds a unique index on lower(email).

BEGIN;

-- Remove later duplicates, keeping the earliest row per normalized email.
DELETE FROM attendee_registrations
WHERE id IN (
  SELECT id
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (
        PARTITION BY lower(email)
        ORDER BY created_at ASC, id ASC
      ) AS row_number
    FROM attendee_registrations
  ) ranked
  WHERE ranked.row_number > 1
);

-- Case-insensitive uniqueness so Foo@Example.com and foo@example.com collide.
CREATE UNIQUE INDEX IF NOT EXISTS attendee_registrations_email_unique
  ON attendee_registrations (lower(email));

COMMIT;

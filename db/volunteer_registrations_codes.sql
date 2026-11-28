-- Add volunteer verification codes to an existing volunteer_registrations table.
-- Run with: psql "$DATABASE_URL" -f db/volunteer_registrations_codes.sql

ALTER TABLE volunteer_registrations
  ADD COLUMN IF NOT EXISTS verification_code TEXT;

-- Give existing applications a code before making the column required.
WITH numbered AS (
  SELECT
    id,
    row_number() OVER (ORDER BY id) AS position
  FROM volunteer_registrations
  WHERE verification_code IS NULL OR verification_code = ''
)
UPDATE volunteer_registrations AS registration
SET verification_code = 'OYTFV-2026-' || lpad(numbered.position::text, 4, '0')
FROM numbered
WHERE registration.id = numbered.id;

ALTER TABLE volunteer_registrations
  ALTER COLUMN verification_code SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS volunteer_registrations_code_unique
  ON volunteer_registrations (verification_code);

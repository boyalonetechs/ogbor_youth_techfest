-- Prepare the live table for the attendance.csv import.
-- Run from the project root with:
--   url=$(sed -n 's/^DATABASE_URL=//p' .env | head -n 1)
--   psql "$url" -v ON_ERROR_STOP=1 -f db/migrate_attendance_import.sql

ALTER TABLE attendee_registrations
  ADD COLUMN IF NOT EXISTS email_sent_note TEXT NOT NULL DEFAULT '';

DO $$
DECLARE
  has_rows BOOLEAN;
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'attendee_registrations'
      AND column_name = 'device_access'
      AND data_type = 'text'
  ) THEN
    SELECT EXISTS (SELECT 1 FROM attendee_registrations) INTO has_rows;

    ALTER TABLE attendee_registrations DROP COLUMN IF EXISTS device_access_new;
    ALTER TABLE attendee_registrations
      ADD COLUMN device_access_new TEXT[] NOT NULL DEFAULT '{}';

    IF has_rows THEN
      UPDATE attendee_registrations
      SET device_access_new = ARRAY(
        SELECT btrim(item.value)
        FROM unnest(string_to_array(device_access, ',')) AS item(value)
        WHERE btrim(item.value) <> ''
      );
    END IF;

    ALTER TABLE attendee_registrations DROP COLUMN device_access;
    ALTER TABLE attendee_registrations
      RENAME COLUMN device_access_new TO device_access;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'attendee_registrations'
      AND column_name = 'heard_about'
      AND data_type = 'text'
  ) THEN
    SELECT EXISTS (SELECT 1 FROM attendee_registrations) INTO has_rows;

    ALTER TABLE attendee_registrations DROP COLUMN IF EXISTS heard_about_new;
    ALTER TABLE attendee_registrations
      ADD COLUMN heard_about_new TEXT[] NOT NULL DEFAULT '{}';

    IF has_rows THEN
      UPDATE attendee_registrations
      SET heard_about_new = ARRAY(
        SELECT btrim(item.value)
        FROM unnest(string_to_array(heard_about, ',')) AS item(value)
        WHERE btrim(item.value) <> ''
      );
    END IF;

    ALTER TABLE attendee_registrations DROP COLUMN heard_about;
    ALTER TABLE attendee_registrations
      RENAME COLUMN heard_about_new TO heard_about;
  END IF;
END $$;

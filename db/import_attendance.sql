-- Import public/attendance.csv into attendee_registrations.
-- Run from the project root after db/migrate_attendance_import.sql:
--   url=$(sed -n 's/^DATABASE_URL=//p' .env | head -n 1)
--   psql "$url" -v ON_ERROR_STOP=1 -f db/import_attendance.sql

BEGIN;

-- Keep a safe copy of whatever was in the table before this import.
CREATE TABLE IF NOT EXISTS attendee_registrations_import_backup
  AS TABLE attendee_registrations WITH NO DATA;

INSERT INTO attendee_registrations_import_backup
SELECT r.*
FROM attendee_registrations AS r
WHERE NOT EXISTS (
  SELECT 1
  FROM attendee_registrations_import_backup AS b
  WHERE b.id = r.id
);

CREATE TEMP TABLE attendance_import (
  "Registration ID" TEXT,
  "Email Sent" TEXT,
  "Timestamp" TEXT,
  "1. Full Name" TEXT,
  "2. Email Address" TEXT,
  "3. Mobile Phone Number" TEXT,
  "4. Age Range" TEXT,
  "5. Gender" TEXT,
  "6. What part of Ogbor-Hill do you reside?" TEXT,
  "7. What best describes you?" TEXT,
  "8. Which digital skill are you interested in learning?" TEXT,
  "9. How would you describe your current digital skills level?" TEXT,
  "10. Would you join a follow-up training if one is offered after the event?" TEXT,
  "11. How would you like to learn?" TEXT,
  "12. Which of these do you have access to?" TEXT,
  "13. Have you ever earned money from a digital skill?" TEXT,
  "14. What do you hope to gain from this event?" TEXT,
  "15. How did you hear about Ogbor Youth Tech Fest?" TEXT,
  "16. How many friends or people can you bring with you?" TEXT,
  "17. Would you like to receive information about future training, internships, and digital skills opportunities?" TEXT,
  "18. How would you like to receive reminders about the event?" TEXT,
  "19. Additional information or questions" TEXT
);

\copy attendance_import FROM 'public/attendance.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8')

-- CSV timestamps are Nigeria local time; TIMESTAMPTZ stores the UTC instant.
SET LOCAL TIME ZONE 'Africa/Lagos';

INSERT INTO attendee_registrations (
  verification_code,
  full_name,
  email,
  phone,
  age_range,
  gender,
  residence,
  current_description,
  other_description,
  digital_skills,
  other_skill,
  skill_level,
  follow_up_training,
  learning_styles,
  device_access,
  digital_earnings,
  event_hopes,
  heard_about,
  other_heard_about,
  friends_invited,
  future_updates,
  reminder_channel,
  additional_info,
  email_sent_note,
  created_at
)
SELECT
  coalesce(btrim("Registration ID"), ''),
  coalesce(btrim("1. Full Name"), ''),
  coalesce(btrim("2. Email Address"), ''),
  coalesce(btrim("3. Mobile Phone Number"), ''),
  coalesce(btrim("4. Age Range"), ''),
  coalesce(btrim("5. Gender"), ''),
  coalesce(btrim("6. What part of Ogbor-Hill do you reside?"), ''),
  coalesce(btrim("7. What best describes you?"), ''),
  '',
  ARRAY(
    SELECT CASE
      WHEN btrim(item.value) = 'Artificial intelligence'
        THEN 'Artificial Intelligence (AI)'
      WHEN btrim(item.value) = 'and Social media management'
        THEN 'Social Media Management'
      ELSE btrim(item.value)
    END
    FROM unnest(string_to_array(
      "8. Which digital skill are you interested in learning?", ','
    )) AS item(value)
    WHERE btrim(item.value) <> ''
  ),
  '',
  coalesce(btrim("9. How would you describe your current digital skills level?"), ''),
  coalesce(btrim("10. Would you join a follow-up training if one is offered after the event?"), ''),
  ARRAY(
    SELECT btrim(item.value)
    FROM unnest(string_to_array(
      "11. How would you like to learn?", ','
    )) AS item(value)
    WHERE btrim(item.value) <> ''
  ),
  ARRAY(
    SELECT btrim(item.value)
    FROM unnest(string_to_array(
      "12. Which of these do you have access to?", ','
    )) AS item(value)
    WHERE btrim(item.value) <> ''
  ),
  coalesce(btrim("13. Have you ever earned money from a digital skill?"), ''),
  ARRAY(
    SELECT btrim(item.value)
    FROM unnest(string_to_array(
      "14. What do you hope to gain from this event?", ','
    )) AS item(value)
    WHERE btrim(item.value) <> ''
  ),
  ARRAY(
    SELECT btrim(item.value)
    FROM unnest(string_to_array(
      "15. How did you hear about Ogbor Youth Tech Fest?", ','
    )) AS item(value)
    WHERE btrim(item.value) <> ''
  ),
  '',
  coalesce(btrim("16. How many friends or people can you bring with you?"), ''),
  coalesce(btrim("17. Would you like to receive information about future training, internships, and digital skills opportunities?"), ''),
  coalesce(btrim("18. How would you like to receive reminders about the event?"), ''),
  coalesce(btrim("19. Additional information or questions"), ''),
  coalesce(btrim("Email Sent"), ''),
  to_timestamp(coalesce(btrim("Timestamp"), ''), 'MM/DD/YYYY HH24:MI:SS')
FROM attendance_import
WHERE btrim("Registration ID") <> ''
ON CONFLICT (verification_code) DO NOTHING;

COMMIT;

SELECT count(*) AS total_registrations FROM attendee_registrations;
SELECT count(*) AS rows_with_email_sent_note
  FROM attendee_registrations
  WHERE email_sent_note <> '';
SELECT count(*) AS rows_with_multiple_access_options
  FROM attendee_registrations
  WHERE cardinality(device_access) > 1;
SELECT count(*) AS rows_with_multiple_heard_about_options
  FROM attendee_registrations
  WHERE cardinality(heard_about) > 1;

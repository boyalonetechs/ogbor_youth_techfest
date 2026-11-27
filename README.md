# ogbor_youth_techfest

## Attendee registration

The attendee form lives at `/register/attend`. Submissions are validated in the
browser and again on the server, then stored in PostgreSQL through the
`/api/attendee` route handler.

Every successful registration generates a unique code (`OYTF-2026-0091`) that
is stored in the database and shown in a popup with a copy button. When Resend
is configured, the same code is emailed to the attendee. Use it at the event
entrance to look the attendee up from the admin dashboard. Digital skills,
learning styles, device access, event hopes, and heard-about sources are stored
as arrays.

## Volunteer application

The six-step volunteer form lives at `/register/volunteer`. It asks for contact
details, T-shirt size, previous volunteering, preferred team, skills and skill
level. The browser validates each step and the `/api/volunteer` route handler
validates the full submission again before storing it in PostgreSQL. The final
step links to the volunteer WhatsApp group.

## Manual attendee registration

`/volunteer-admin` is now a password-protected manual registration portal. After
signing in with `VOLUNTEER_ADMIN_PASSWORD`, an organiser can add an attendee
using only the details needed at the door: name, email, phone, age range,
location, how they describe themselves, and optional notes. It generates a
verification code immediately and does not send an email from this portal.
It uses its own session cookie, so the attendee dashboard password cannot unlock
it.

## Admin dashboard

`/admin` is protected by `ADMIN_PASSWORD`. It shows both the attendee
registrations and the volunteer applications in one dashboard: two boxes below
the summary open the chosen sheet, each with its own search, sort, detail popup
and CSV export. Attendee code lookup stays in the attendee sheet.

The headline total counts unique people by email across both sheets. If the same
email appears in both attendee registrations and volunteer applications, it is
counted once; the volunteer box shows how many of those overlaps exist.

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set your values:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME
   DATABASE_SSL=false
   ADMIN_PASSWORD=a-long-random-password
   VOLUNTEER_ADMIN_PASSWORD=a-different-long-random-password
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Ogbor Youth Tech Fest <events@example.com>
   ```

   `RESEND_API_KEY` and `EMAIL_FROM` are optional. If either is missing,
   registration still succeeds and the code is shown in the popup, but no email
   is sent.

   For hosted Postgres that requires TLS, use `?sslmode=verify-full` in
   `DATABASE_URL`. The older `sslmode=require` value behaves the same way with
   the current `pg` driver but prints a deprecation warning.

3. Create the table (run this against the same database as `DATABASE_URL`):

   ```bash
   psql "$DATABASE_URL" -f db/attendee_registrations.sql
   psql "$DATABASE_URL" -f db/volunteer_registrations.sql
   ```

4. Optional: import the existing `public/attendance.csv` registrations. The CSV
   registration IDs become verification codes, and timestamps are interpreted as
   Africa/Lagos local time. The import is idempotent and creates a backup table
   before inserting rows.

   ```bash
   url=$(sed -n 's/^DATABASE_URL=//p' .env | head -n 1)
   psql "$url" -v ON_ERROR_STOP=1 -f db/migrate_attendance_import.sql
   psql "$url" -v ON_ERROR_STOP=1 -f db/import_attendance.sql
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

Open `/register/attend` to submit a test registration and confirm the row
appears in the attendee sheet at `/admin`. Open `/register/volunteer` to submit a
test application and confirm it appears in the volunteer sheet at `/admin`.
Sign in at `/volunteer-admin` with `VOLUNTEER_ADMIN_PASSWORD` to manually add an
attendee and confirm the new row appears in the attendee sheet.

Both the registration form and admin dashboard use the project's self-hosted
Next.js fonts (Nunito for body copy and Space Grotesk for headings).

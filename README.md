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

## Admin dashboard

`/admin` has a spreadsheet-style table with category tabs, a sort control, code
lookup (which opens the matching attendee in a popup), search behind a header
toggle, and CSV export. It is protected by a password set in `ADMIN_PASSWORD`.
No attendee list is shown in a permanent sidebar.

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
appears at `/admin`.

Both the registration form and admin dashboard use the project's self-hosted
Next.js fonts (Nunito for body copy and Space Grotesk for headings).

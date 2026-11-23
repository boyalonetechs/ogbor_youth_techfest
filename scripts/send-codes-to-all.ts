import { Pool } from "pg";
import { sendRegistrationEmail, isEmailConfigured } from "@/lib/email";

// Load environment variables
import "dotenv/config";

async function sendAllCodes() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  if (!isEmailConfigured()) {
    console.error("Email not configured (RESEND_API_KEY and/or EMAIL_FROM missing)");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    max: 5,
    connectionTimeoutMillis: 10_000,
  });

  try {
    // Get all registrations
    const result = await pool.query(`
      SELECT verification_code, full_name, email
      FROM attendee_registrations
      ORDER BY created_at ASC
    `);

    const registrations = result.rows;
    console.log(`Found ${registrations.length} registrations to process`);

    let sent = 0;
    let failed = 0;
    let skipped = 0;

    // Send email to each registration
    for (const reg of registrations) {
      if (!reg.email) {
        console.log(`Skipping ${reg.verification_code} (${reg.full_name}) - no email`);
        skipped++;
        continue;
      }

      console.log(`Sending to ${reg.email} (${reg.full_name})...`);
      const result = await sendRegistrationEmail({
        to: reg.email,
        name: reg.full_name,
        code: reg.verification_code,
      });

      if (result.sent) {
        sent++;
        console.log(`  ✓ Sent`);
      } else if (result.skipped) {
        skipped++;
        console.log(`  ⊘ Skipped (email not configured)`);
      } else {
        failed++;
        console.log(`  ✗ Failed`);
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Send summary to boyalonetechs@gmail.com
    console.log(`\nSending summary to boyalonetechs@gmail.com...`);
    const summaryHtml = `
      <div style="font-family:Arial,sans-serif;color:#050b06;line-height:1.6">
        <p style="color:#00592d;font-weight:700;letter-spacing:.08em;font-size:12px">
          OGBOR YOUTH TECH FEST 2026 - REGISTRATION CODES SUMMARY
        </p>
        <h1 style="font-size:24px;margin:8px 0 16px">Registration Codes Sent</h1>
        <p>Total registrations: ${registrations.length}</p>
        <p>Emails sent: ${sent}</p>
        <p>Failed: ${failed}</p>
        <p>Skipped (no email): ${skipped}</p>
        <hr style="border:1px solid #00592d;margin:24px 0">
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:#fae01a;text-align:left">
              <th style="padding:8px;border:1px solid #00592d">Code</th>
              <th style="padding:8px;border:1px solid #00592d">Name</th>
              <th style="padding:8px;border:1px solid #00592d">Email</th>
            </tr>
          </thead>
          <tbody>
            ${registrations.map((reg, i) => `
              <tr style="${i % 2 === 0 ? 'background:#fafaf7' : ''}">
                <td style="padding:8px;border:1px solid #e5e5e5;font-family:monospace">${reg.verification_code}</td>
                <td style="padding:8px;border:1px solid #e5e5e5">${reg.full_name}</td>
                <td style="padding:8px;border:1px solid #e5e5e5">${reg.email || '<em>no email</em>'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    const summaryText = `
Ogbor Youth Tech Fest 2026 - Registration Codes Summary

Total registrations: ${registrations.length}
Emails sent: ${sent}
Failed: ${failed}
Skipped (no email): ${skipped}

${registrations.map((reg) => `${reg.verification_code} | ${reg.full_name} | ${reg.email || 'no email'}`).join("\n")}
    `;

    const apiKey = process.env.RESEND_API_KEY!;
    const from = process.env.EMAIL_FROM!;

    const summaryResult = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["boyalonetechs@gmail.com"],
        subject: "Ogbor Youth Tech Fest 2026 - All Registration Codes Summary",
        text: summaryText,
        html: summaryHtml,
      }),
    });

    if (summaryResult.ok) {
      console.log(`  ✓ Summary sent to boyalonetechs@gmail.com`);
    } else {
      console.error(`  ✗ Failed to send summary: ${summaryResult.status}`);
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Total: ${registrations.length}`);
    console.log(`Sent: ${sent}`);
    console.log(`Failed: ${failed}`);
    console.log(`Skipped: ${skipped}`);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

sendAllCodes();
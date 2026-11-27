/**
 * Branded HTML email for Ogbor Youth Tech Fest 2026.
 *
 * Pure string builder (no server-only imports) so it can be used by the
 * registration email and by the admin bulk composer. `{{name}}` is left in
 * place by default and replaced per recipient when bulk emails are sent.
 *
 * Visual language follows the site: ink black, sun yellow and forest green,
 * square edges, hard borders, and the original 🎉 / 📅 / 📸 emoji headings.
 */

export const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/E8rZzCsqfZNIXzy4jsXJvH?s=cl&p=a&iam=2";

export const EVENT_LOGO_URL = "https://ik.imagekit.io/dphub/dphub/l.png";

const INK = "#050b06";
const SUN = "#fae01a";
const FOREST = "#00592d";
const PAPER = "#ffffff";
const MIST = "#f2f1e8";
const MUTED = "#63655c";
const FOOTER_MUTED = "#a8a99f";

const DISPLAY_FONT = "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif";
const BODY_FONT = "'Nunito', 'Segoe UI', Arial, sans-serif";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export type EventEmailOptions = {
  /** Defaults to the `{{name}}` placeholder used by the bulk composer. */
  name?: string;
  /** When provided, a registration-code panel is added to the message. */
  code?: string;
};

export function buildEventEmailHtml({
  name = "{{name}}",
  code,
}: EventEmailOptions = {}): string {
  const safeName = escapeHtml(name);

  const codePanel = code
    ? `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:${SUN};border:2px solid ${INK};box-shadow:4px 4px 0 ${FOREST};">
            <tr>
              <td align="center" style="padding:22px 18px;">
                <p style="margin:0 0 10px;font-family:${DISPLAY_FONT};font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${INK};">
                  Your registration code
                </p>
                <p style="margin:0;font-family:${DISPLAY_FONT};font-size:30px;font-weight:800;letter-spacing:4px;color:${FOREST};">
                  ${escapeHtml(code)}
                </p>
                <p style="margin:12px 0 0;font-family:${BODY_FONT};font-size:12px;line-height:1.6;color:${INK};">
                  Present this code at the festival entrance for fast check-in.
                </p>
              </td>
            </tr>
          </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ogbor Youth Tech Fest 2026</title>
</head>
<body style="margin:0;padding:0;background-color:${SUN};font-family:${BODY_FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${SUN};padding:28px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${PAPER};border:2px solid ${INK};box-shadow:8px 8px 0 ${FOREST};">
          <tr>
            <td align="center" style="background:${INK};padding:34px 28px 30px;">
              <img src="${EVENT_LOGO_URL}" alt="Ogbor Youth Tech Fest 2026" width="220" style="display:block;max-width:220px;height:auto;margin:0 auto 20px;" />
              <p style="margin:0 0 12px;font-family:${DISPLAY_FONT};font-size:11px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${SUN};">
                DP Hub &amp; Tech by Leadpath presents
              </p>
              <h1 style="margin:0;font-family:${DISPLAY_FONT};font-size:32px;line-height:1.06;font-weight:800;letter-spacing:-1px;color:${PAPER};text-transform:uppercase;">
                Ogbor Youth<br />
                <span style="color:${SUN};">Tech Fest 2026</span>
              </h1>
              <p style="margin:14px 0 0;font-family:${BODY_FONT};font-size:14px;line-height:1.6;color:${MIST};">
                Unlocking Youth Potential in the Digital Era
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 30px 34px;color:${INK};">
              <h2 style="margin:0 0 18px;font-family:${DISPLAY_FONT};font-size:25px;line-height:1.15;font-weight:800;letter-spacing:-0.5px;text-transform:uppercase;color:${INK};">
                🎉 You&apos;re invited!
              </h2>

              <p style="margin:0 0 16px;font-family:${BODY_FONT};font-size:15px;line-height:1.75;color:${INK};">
                Hello <strong style="color:${FOREST};">${safeName}</strong>,
              </p>

              <p style="margin:0 0 18px;font-family:${BODY_FONT};font-size:15px;line-height:1.75;color:${MUTED};">
                Thank you for registering for <strong style="color:${INK};">Ogbor Youth Tech Fest 2026</strong>. We truly appreciate your interest in being part of this exciting experience.
              </p>

${codePanel}
              <p style="margin:0 0 28px;font-family:${BODY_FONT};font-size:15px;line-height:1.75;color:${MUTED};">
                The big day is almost here, and we can&apos;t wait to welcome you. Get ready for technology, innovation, inspiring conversations, networking and new opportunities.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${MIST};border:2px solid ${INK};box-shadow:4px 4px 0 ${INK};">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 18px;font-family:${DISPLAY_FONT};font-size:18px;font-weight:800;color:${INK};">
                      📅 Event details
                    </h3>
                    <p style="margin:0 0 14px;font-family:${BODY_FONT};font-size:15px;line-height:1.7;color:${INK};">
                      <span style="display:block;margin-bottom:3px;font-family:${DISPLAY_FONT};font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${FOREST};">Date</span>
                      Monday, 30th November 2026
                    </p>
                    <p style="margin:0 0 14px;font-family:${BODY_FONT};font-size:15px;line-height:1.7;color:${INK};">
                      <span style="display:block;margin-bottom:3px;font-family:${DISPLAY_FONT};font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${FOREST};">Time</span>
                      10:00 AM
                    </p>
                    <p style="margin:0;font-family:${BODY_FONT};font-size:15px;line-height:1.7;color:${INK};">
                      <span style="display:block;margin-bottom:3px;font-family:${DISPLAY_FONT};font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${FOREST};">Location</span>
                      World of Faith Group of Schools, 39 Umuola Road, Ogbor Hill, Aba, Abia State.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;background:${SUN};border:2px solid ${INK};border-left:6px solid ${FOREST};">
                <tr>
                  <td style="padding:22px 24px;">
                    <h3 style="margin:0 0 10px;font-family:${DISPLAY_FONT};font-size:17px;font-weight:800;color:${INK};">
                      📸 Come early for red carpet pictures!
                    </h3>
                    <p style="margin:0;font-family:${BODY_FONT};font-size:14px;line-height:1.75;color:${INK};">
                      Arrive early so you don&apos;t miss the red carpet. Get your pictures taken, enjoy the atmosphere and make unforgettable memories before the event kicks off!
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;background:${INK};border-left:6px solid ${SUN};">
                <tr>
                  <td style="padding:16px 18px;font-family:${BODY_FONT};font-size:14px;line-height:1.7;color:${PAPER};">
                    <strong style="color:${SUN};">🚨 Important reminder:</strong> Please come with your registration code. You will need it for check-in at the entrance.
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;background:${FOREST};border:2px solid ${INK};">
                <tr>
                  <td align="center" style="padding:24px 20px;">
                    <p style="margin:0 0 16px;font-family:${DISPLAY_FONT};font-size:15px;font-weight:800;color:${PAPER};">
                      Join our WhatsApp community for updates and reminders
                    </p>
                    <a href="${WHATSAPP_COMMUNITY_URL}" style="display:inline-block;border:2px solid ${INK};background:${SUN};color:${INK};font-family:${DISPLAY_FONT};font-size:12px;font-weight:800;letter-spacing:1px;text-decoration:none;text-transform:uppercase;padding:13px 22px;">
                      Join the WhatsApp Community
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 18px;font-family:${BODY_FONT};font-size:15px;line-height:1.75;color:${MUTED};">
                Come ready to learn, connect, explore new possibilities and be inspired. Your presence makes this event even more special.
              </p>

              <p style="margin:0;font-family:${DISPLAY_FONT};font-size:16px;font-weight:800;color:${FOREST};">
                We look forward to seeing you there!
              </p>

              <p style="margin:20px 0 0;font-family:${BODY_FONT};font-size:14px;line-height:1.75;color:${MUTED};">
                Warm regards,<br />
                <strong style="color:${INK};">Ogbor Youth Tech Fest 2026 Team</strong><br />
                Digital Productivity Hub and Tech LTD.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="background:${INK};border-top:2px solid ${SUN};padding:26px 20px;color:${PAPER};">
              <p style="margin:0 0 8px;font-family:${DISPLAY_FONT};font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${SUN};">
                Questions? Contact us
              </p>
              <p style="margin:0;font-family:${BODY_FONT};font-size:12px;line-height:1.8;color:${PAPER};">
                <a href="mailto:ogboryouthtechfest@gmail.com" style="color:${SUN};text-decoration:underline;">ogboryouthtechfest@gmail.com</a>
                <br />
                <a href="tel:+2348063917367" style="color:${SUN};text-decoration:none;">08063917367</a>
              </p>
              <p style="margin:20px 0 0;font-family:${BODY_FONT};font-size:11px;color:${FOOTER_MUTED};">
                © 2026 Ogbor Youth Tech Fest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

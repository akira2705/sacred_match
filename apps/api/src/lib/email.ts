/**
 * Email service — uses Resend in production, logs to console in development.
 * Set RESEND_API_KEY in env to enable real sending.
 */

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "Sacred Match <noreply@sacred-match.ng>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (process.env.NODE_ENV !== "production" || !RESEND_API_KEY) {
    // Dev / no-key: just log
    console.log(`\n📧 [EMAIL] To: ${options.to}`);
    console.log(`   Subject: ${options.subject}`);
    console.log(`   Body: ${options.text ?? options.html.replace(/<[^>]+>/g, "")}\n`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email send failed (${response.status}): ${body}`);
  }
}

export function buildOtpEmail(firstName: string, otp: string): Pick<SendEmailOptions, "subject" | "html" | "text"> {
  return {
    subject: "Your Sacred Match verification code",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#2B1B6E">Your verification code</h2>
        <p>Hi ${firstName},</p>
        <p>Use the code below to verify your account. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size:2rem;font-weight:700;letter-spacing:0.25em;color:#2B1B6E;padding:1rem 0">${otp}</div>
        <p style="color:#888;font-size:0.85rem">If you didn't request this, ignore this email.</p>
      </div>
    `,
    text: `Your Sacred Match verification code is: ${otp}\nExpires in 10 minutes.`,
  };
}

export function buildPasswordResetEmail(firstName: string, resetUrl: string): Pick<SendEmailOptions, "subject" | "html" | "text"> {
  return {
    subject: "Reset your Sacred Match password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#2B1B6E">Reset your password</h2>
        <p>Hi ${firstName},</p>
        <p>Click the link below to reset your password. The link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#2B1B6E;color:#fff;padding:0.75rem 1.5rem;border-radius:9999px;text-decoration:none;font-weight:600">Reset Password</a>
        <p style="color:#888;font-size:0.85rem;margin-top:1rem">If you didn't request a password reset, ignore this email.</p>
      </div>
    `,
    text: `Reset your Sacred Match password here: ${resetUrl}\nExpires in 1 hour.`,
  };
}

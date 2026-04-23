import nodemailer from "nodemailer"

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const transporter = createTransporter()

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset Password</h2>
      <p>Anda menerima email ini karena Anda (atau seseorang) meminta reset password untuk akun Anda.</p>
      <p>Klik tombol di bawah untuk reset password Anda:</p>
      <a href="${resetUrl}" 
         style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
        Reset Password
      </a>
      <p>Atau salin dan paste URL berikut ke browser Anda:</p>
      <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetUrl}</p>
      <p><strong>Link ini akan kadaluarsa dalam 1 jam.</strong></p>
      <p>Jika Anda tidak meminta reset password, abaikan email ini. Password Anda akan tetap aman.</p>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
      <p style="color: #999; font-size: 12px;">Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: "Reset Password - Exliding",
    html,
  })
}

export async function sendAdminInviteEmail(email: string, inviteUrl: string, invitedBy?: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
              
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1e40af,#7c3aed);padding:40px 40px 32px;text-align:center;">
                  <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                    ⚡ Exliding
                  </div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:6px;letter-spacing:2px;text-transform:uppercase;">
                    Admin Dashboard Access
                  </div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 16px;">
                    🎉 Anda Diundang sebagai Admin!
                  </h2>
                  <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 12px;">
                    ${invitedBy ? `<strong style="color:#e4e4e7;">${invitedBy}</strong> telah` : 'Anda telah'} menambahkan <strong style="color:#e4e4e7;">${email}</strong> sebagai <strong style="color:#818cf8;">Admin</strong> di dashboard Exliding.
                  </p>
                  <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 32px;">
                    Klik tombol di bawah untuk mengatur password Anda dan mulai mengakses dashboard admin.
                  </p>

                  <!-- CTA Button -->
                  <div style="text-align:center;margin:0 0 32px;">
                    <a href="${inviteUrl}"
                       style="display:inline-block;background:linear-gradient(135deg,#1e40af,#7c3aed);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:10px;font-weight:700;font-size:16px;letter-spacing:0.3px;">
                      🔐 Atur Password &amp; Masuk
                    </a>
                  </div>

                  <!-- Info box -->
                  <div style="background-color:#0f0f0f;border:1px solid #2a2a2a;border-radius:10px;padding:20px;margin:0 0 24px;">
                    <p style="color:#71717a;font-size:13px;margin:0 0 8px;">Atau salin link berikut ke browser Anda:</p>
                    <p style="color:#818cf8;font-size:12px;word-break:break-all;margin:0;font-family:monospace;">${inviteUrl}</p>
                  </div>

                  <!-- Warning -->
                  <div style="background-color:#1c1917;border-left:3px solid #f59e0b;border-radius:6px;padding:14px 16px;">
                    <p style="color:#fbbf24;font-size:13px;margin:0;font-weight:600;">⚠️ Link ini berlaku selama 24 jam.</p>
                    <p style="color:#78716c;font-size:12px;margin:6px 0 0;">Jika Anda tidak merasa diundang, abaikan email ini.</p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#111111;padding:24px 40px;border-top:1px solid #2a2a2a;text-align:center;">
                  <p style="color:#52525b;font-size:12px;margin:0;">
                    © ${new Date().getFullYear()} Exliding · Email otomatis, jangan dibalas.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: "🎉 Anda Diundang sebagai Admin Exliding",
    html,
  })
}

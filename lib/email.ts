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

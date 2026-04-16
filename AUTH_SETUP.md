# Authentication Setup Guide

This project uses **Auth.js (NextAuth v5)** for authentication with the following features:

- ✅ Login with email/password
- ✅ Register new users
- ✅ Forgot password with email reset link
- ✅ Reset password with token validation
- ✅ Protected routes with middleware
- ✅ Session management with JWT

## 📁 File Structure

```
app/
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts          # Auth.js API handler
│       ├── register/
│       │   └── route.ts          # User registration endpoint
│       ├── forgot-password/
│       │   └── route.ts          # Password reset request endpoint
│       └── reset-password/
│           └── route.ts          # Password reset endpoint
├── (marketing)/
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── forgot-password/
│   │   └── page.tsx              # Forgot password page
│   └── reset-password/
│       └── page.tsx              # Reset password page

components/
└── ui/
    ├── button.tsx                # Button component
    ├── card.tsx                  # Card component
    └── input.tsx                 # Input & Label components

lib/
├── auth.ts                       # Auth.js configuration
├── email.ts                      # Email service for password reset
├── prisma.ts                     # Prisma client
└── utils.ts                      # Utility functions

middleware.ts                     # Route protection middleware
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

All required dependencies are already in `package.json`:
- `next-auth` - Authentication library
- `@auth/prisma-adapter` - Prisma adapter for Auth.js
- `bcryptjs` - Password hashing
- `nodemailer` - Email service

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
DIRECT_URL="postgresql://user:password@localhost:5432/dbname"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Email Server (for password reset emails)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_SECURE="false"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

### 3. Generate Secret Key

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env` file.

### 4. Setup Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```

This will create the following tables:
- `User` - User accounts with email, password, reset token
- `Account` - OAuth accounts (if added later)
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

### 5. Configure Email Service

#### Option A: Gmail SMTP

1. Enable 2-Step Verification in your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Update `.env`:
```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_SECURE="false"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-16-character-app-password"
EMAIL_FROM="your-email@gmail.com"
```

#### Option B: Resend (Recommended for Production)

1. Sign up at https://resend.com
2. Get your API key
3. Update `.env`:
```env
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="465"
EMAIL_SERVER_SECURE="true"
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="your-resend-api-key"
EMAIL_FROM="onboarding@resend.dev"
```

#### Option C: Mailtrap (For Testing)

1. Sign up at https://mailtrap.io
2. Get your SMTP credentials
3. Update `.env` with Mailtrap credentials

### 6. Run the Development Server

```bash
npm run dev
```

Visit:
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Forgot Password: http://localhost:3000/forgot-password

## 🔐 API Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

### Login (via Auth.js)
```typescript
import { signIn } from "next-auth/react"

await signIn("credentials", {
  email: "john@example.com",
  password: "password123",
})
```

## 🛡️ Protected Routes

Routes under `/client` are protected. Unauthenticated users will be redirected to `/login`.

The middleware in `middleware.ts` handles:
- Redirecting unauthenticated users to login
- Redirecting authenticated users away from auth pages
- Preserving the callback URL for post-login redirect

## 🔧 Customization

### Change Password Requirements

Edit validation in:
- `app/api/auth/register/route.ts`
- `app/api/auth/reset-password/route.ts`

### Change Token Expiry

Edit the expiry time in `app/api/auth/forgot-password/route.ts`:

```typescript
const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
```

### Change Reset Email Template

Edit the HTML template in `lib/email.ts`.

## 🧪 Testing the Flow

1. **Register**: Create a new account at `/register`
2. **Login**: Login with your credentials at `/login`
3. **Logout**: Sign out from the dashboard
4. **Forgot Password**: Request a password reset at `/forgot-password`
5. **Check Email**: You'll receive a reset link
6. **Reset Password**: Click the link and set a new password
7. **Login Again**: Login with your new password

## 🐛 Troubleshooting

### "Email atau password salah"
- Make sure the user exists in the database
- Check if password is hashed correctly

### Email not sending
- Verify SMTP credentials
- Check if port is correct (465 for SSL, 587 for TLS)
- For Gmail, ensure "Less secure app access" is enabled or use App Password

### Database connection error
- Verify DATABASE_URL format
- Ensure database exists
- Run `npx prisma migrate dev`

### Invalid token error
- Token expires after 1 hour
- Token can only be used once
- Make sure the full URL from email is copied

## 📚 Additional Resources

- [Auth.js Documentation](https://authjs.dev/)
- [NextAuth.js Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Nodemailer Documentation](https://nodemailer.com/)

## 🔒 Security Best Practices

1. ✅ Passwords are hashed with bcrypt (10 rounds)
2. ✅ Reset tokens are hashed before storing (SHA-256)
3. ✅ Reset tokens expire after 1 hour
4. ✅ Reset tokens can only be used once
5. ✅ Email enumeration protection (same message for valid/invalid emails)
6. ✅ CSRF protection built into Auth.js
7. ✅ JWT sessions with secure cookies

## 🚀 Production Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
DATABASE_URL="your-production-database"
EMAIL_SERVER_*="your-production-email"
```

Remember to:
- Use a strong NEXTAUTH_SECRET
- Use production database (not SQLite)
- Use reliable email service (Resend, SendGrid, AWS SES)
- Enable HTTPS
- Set proper CORS if needed

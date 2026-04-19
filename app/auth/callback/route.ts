import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  let next = searchParams.get("next")

  if (code) {
    const supabase = await createClient()
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && authData.user) {
      // Periksa apakah ini admin yang masuk menggunakan Magic Link dari Supabase Dashboard
      try {
        const payload = await getPayload({ config: configPromise })
        const found = await payload.find({
          collection: "users",
          where: { email: { equals: authData.user.email! } },
          limit: 1,
        })

        if (found.docs.length > 0) {
          const payloadUser = found.docs[0] as any
          
          // Jika admin dan sudah approved, terbitkan payload token otomatis
          if (payloadUser.role === "admin" && payloadUser.status === "approved") {
            const secret = new TextEncoder().encode(process.env.PAYLOAD_SECRET!)
            const token = await new SignJWT({
              id: String(payloadUser.id),
              collection: "users",
              email: payloadUser.email,
            })
              .setProtectedHeader({ alg: "HS256" })
              .setExpirationTime("7d")
              .setIssuedAt()
              .sign(secret)

            const cookieStore = await cookies()
            cookieStore.set("payload-token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 7, // 7 hari
              path: "/",
            })

            // Paksa redirect ke admin karena ini adalah link dashboard
            next = "/admin"
          }
        }
      } catch (err) {
        console.error("Callback payload sync error:", err)
      }

      // Redirect ke tujuan akhir (default /client atau /admin)
      const redirectPath = next ?? "/client"
      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocalEnv = process.env.NODE_ENV === "development"

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectPath}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`)
      } else {
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }
    }
  }

  // Return to login with error if code exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}

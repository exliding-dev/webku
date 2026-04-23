import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: DO NOT remove this line.
  // Refreshes the auth token and keeps the session alive.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protected routes - require authentication
  const protectedRoutes = ["/client"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Auth routes - redirect to /client if already logged in
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin")

  // --- LOGIC CHECKS ---

  // 1. Redirect to /client if authenticated and accessing auth route
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/client", request.url))
  }

  // 2. Redirect to login if not authenticated and accessing protected or admin route
  if ((isProtectedRoute || isAdminRoute) && !user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 3. Email Verification Block
  if (user && !user.email_confirmed_at && (isProtectedRoute || isAdminRoute)) {
    // If accessing protected route but email is not verified, redirect to a generic error or verification page.
    // For now, redirecting to /client (or login) with error. Let's redirect to login with verification warning
    // But since the user is technically logged in via Supabase (if soft-confirm is on), we might want to block access completely.
    const url = new URL("/login?error=email_not_verified", request.url)
    return NextResponse.redirect(url)
  }

  // 4. Admin Dashboard Access Block
  if (isAdminRoute && user) {
    // Check role in public.profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // Not an admin, redirect to /client
      return NextResponse.redirect(new URL("/client", request.url))
    }
  }

  return supabaseResponse
}

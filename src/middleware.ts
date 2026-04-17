import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = 'https://mjlhbhiraheaeijxeedg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbGhiaGlyYWhlYWVpanhlZWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDcyMzAsImV4cCI6MjA5MTkyMzIzMH0.qfxfY-DPhneV3IJQ0ODxA6TYOKV_YiAWcfb4rDi3e9A';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // This will refresh the session if it is expired
  const { data: { user } } = await supabase.auth.getUser()

  // Protection Logic
  const isPathAdmin = request.nextUrl.pathname.startsWith('/admin')

  if (isPathAdmin) {
    if (!user) {
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user is admin
    const { data: adminData, error } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error || !adminData) {
      // Not an admin, redirect home
      console.warn(`Non-admin attempted access: ${user.email}`)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If user is logged in and trying to go to /auth, redirect to home or next
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    const next = request.nextUrl.searchParams.get('next') || '/'
    return NextResponse.redirect(new URL(next, request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

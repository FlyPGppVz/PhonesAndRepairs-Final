import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = 'https://mjlhbhiraheaeijxeedg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jf2EAm5dueZJY1xAXXNoJA_gn_3MDpn';

export async function middleware(request: NextRequest) {
  try {
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

    const { data } = await supabase.auth.getUser()
    const user = data?.user

    // Admin route protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!user) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }

      // Safe email check
      if (user.email === 'flypg65@gmail.com') {
        return response
      }

      const { data: adminData } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id || '')
        .maybeSingle()

      if (!adminData) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    // Auth route protection
    if (user && request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return response
  } catch (e) {
    console.error('Middleware crash:', e);
    return NextResponse.next();
  }
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

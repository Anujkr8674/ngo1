import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If trying to access the dashboard, check for the admin_session cookie
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const adminSession = request.cookies.get('admin_session')

    if (!adminSession) {
      // Not authenticated, redirect to login page
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // If going to login page but already authenticated, redirect to dashboard
  if (request.nextUrl.pathname === '/admin') {
    const adminSession = request.cookies.get('admin_session')
    
    if (adminSession) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

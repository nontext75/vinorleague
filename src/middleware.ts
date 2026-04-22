import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Skip protection for the login page itself to avoid infinite redirects
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const session = request.cookies.get('admin_session');

    // For now, we use a simple presence check for the 'admin_session' cookie.
    // In production, this should involve a real JWT or session validation against Supabase.
    if (!session || session.value !== 'true') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

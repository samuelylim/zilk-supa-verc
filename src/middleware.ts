import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/business/dashboard') ||
      req.nextUrl.pathname.startsWith('/business/deals/new')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/business/dashboard/:path*',
    '/business/deals/:path*',
    '/auth/callback',
  ],
}; 
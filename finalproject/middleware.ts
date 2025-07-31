import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'supersecret';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
  });
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/admin' || req.nextUrl.pathname.startsWith('/admin/')) {
    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Basic ')) {
      return unauthorized();
    }

    const base64Credentials = auth.split(' ')[1];
    let credentials = '';

    if (typeof atob !== 'undefined') {
      try {
        credentials = atob(base64Credentials);
      } catch {}
    } else {
      try {
        credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      } catch {}
    }

    const [user, pass] = (credentials || '').split(':');

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      return NextResponse.next();
    }
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};



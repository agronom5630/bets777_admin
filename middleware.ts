// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const loginPath = '/login';
//   const authToken = request.cookies.get('authToken')?.value;

//   if (!authToken && request.nextUrl.pathname !== loginPath) {
//     return NextResponse.redirect(new URL(loginPath, request.url));
//   }

//   if (authToken && request.nextUrl.pathname === loginPath) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const loginPath = '/login';
  const authToken = request.cookies.get('authToken')?.value;

  if (!authToken && request.nextUrl.pathname !== loginPath) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  if (authToken && request.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

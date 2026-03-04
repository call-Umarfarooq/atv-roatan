import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Protect all /admin/* routes
//   if (pathname.startsWith('/admin')) {
//     const session = request.cookies.get('admin_session');

//     if (!session || session.value !== process.env.ADMIN_SESSION_SECRET) {
//       // Redirect to home with a flag to trigger the login modal
//       const homeUrl = new URL('/?admin_gate=1', request.url);
//       return NextResponse.redirect(homeUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };

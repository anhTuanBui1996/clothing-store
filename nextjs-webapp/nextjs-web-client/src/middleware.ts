import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookies = request.cookies;
  return NextResponse.next();
  let loginRedirectURL = new URL("/login", request.url);
  loginRedirectURL.searchParams.set("isRedirected", "true");
  return NextResponse.redirect(loginRedirectURL);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|signin).*)",
  ],
};

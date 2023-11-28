import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthentication } from "./app/_utils/service/AuthService";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // try {
  //   const result = await getAuthentication();
  //   if (result?.ok && result.status === 200) {
  //     return NextResponse.next();
  //   } else {
  //     const loginWithReturnUrl = new URL("/login", request.url);
  //     loginWithReturnUrl.searchParams.set("returnPage", request.nextUrl.pathname);
  //     return NextResponse.redirect(loginWithReturnUrl);
  //   }
  // } catch (err) {
  //   const loginWithReturnUrlErrored = new URL("/login", request.url);
  //   loginWithReturnUrlErrored.searchParams.set("returnPage", request.nextUrl.pathname);
  //   loginWithReturnUrlErrored.searchParams.set("error", "true");
  //   return NextResponse.redirect(loginWithReturnUrlErrored);
  // }
  const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|login).*)",
  ],
};

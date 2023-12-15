import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthentication } from "./app/_dataModels/serverActions/AuthService";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const tokenFromCookies = request.cookies.get("jwt")?.value;
    const result = await getAuthentication(tokenFromCookies || "");
    if (result === 200) {
      const response = NextResponse.next();
      return response;
    } else {
      const loginWithReturnUrl = new URL("/login", url);
      loginWithReturnUrl.searchParams.set(
        "returnPage",
        request.nextUrl.pathname
      );
      const response = NextResponse.redirect(loginWithReturnUrl);
      if (response.cookies.has("jwt")) {
        response.cookies.delete("jwt");
      }
      return response;
    }
  } catch (err) {
    const loginWithReturnUrlErrored = new URL("/login", request.url);
    loginWithReturnUrlErrored.searchParams.set(
      "returnPage",
      request.nextUrl.pathname
    );
    return NextResponse.redirect(loginWithReturnUrlErrored);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|login).*)",
  ],
};

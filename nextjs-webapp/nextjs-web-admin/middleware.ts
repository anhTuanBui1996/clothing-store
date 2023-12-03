import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import useAuth from "./app/_utils/service/AuthService";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const { getAuthentication } = useAuth();
    const url = request.nextUrl;
    const tokenFromSearchParams = url.searchParams.get("token");
    const tokenFromCookies = request.cookies.get("jwt")?.value;
    const result = await getAuthentication(
      tokenFromSearchParams || tokenFromCookies || ""
    );
    if (result?.ok && result?.status === 200) {
      if (url.searchParams.has("token")) {
        url.searchParams.delete("token");
      }
      if (tokenFromSearchParams) {
        const response = NextResponse.redirect(url);
        // if (!response.cookies.has("jwt")) {
        //   response.cookies.set("jwt", tokenFromSearchParams);
        // }
        return response;
      } else {
        const response = NextResponse.next();
        return response;
      }
    } else {
      const loginWithReturnUrl = new URL("/login", request.url);
      loginWithReturnUrl.searchParams.set(
        "returnPage",
        request.nextUrl.pathname
      );
      return NextResponse.redirect(loginWithReturnUrl);
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

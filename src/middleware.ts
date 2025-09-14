import { NextRequest, NextResponse } from "next/server";
import { PREFIX, STATIC_URLS, tokenName } from "./shared";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenName)?.value;

  const { pathname } = request.nextUrl;

  if (!token && pathname !== STATIC_URLS.login) {
    // unauthenticated trying to access protected page
    return NextResponse.redirect(new URL(STATIC_URLS.login, request.url));
  }

  if (token && pathname.startsWith(PREFIX.auth)) {
    // authenticated user should not see login/register again
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // dashboard
    "/auth/:path*",
    "/blog/:path*",
    // "/deals/:path*",
    // "/tasks/:path*",
    // "/blogs/:path*",
  ],
};

import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value; // Get JWT token from cookies

  const protectedRoutes = ["/blogs", "/trips", "/users", "/home"]; // Routes that require authentication

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/:path*", "/trips/:path*", "/users/:path*", "/home/:path*"], // Apply middleware to these paths
};

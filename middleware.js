import { NextResponse } from "next/server";

export function middleware(request) {
  const isAdmin = request.cookies.get("admin")?.value === "1";
  const isLogin = request.nextUrl.pathname === "/login";

  if (request.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin/voitures", request.url));
  }

  return NextResponse.next();
}
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdmin = request.cookies.get("admin")?.value === "1";
  const isLogin = pathname === "/login";

  // Bloquer /admin si pas connecté admin
  if (pathname.startsWith("/admin") && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname); // garde la destination demandée
    return NextResponse.redirect(url);
  }

  // Si déjà admin, pas besoin d'aller sur /login
  if (isLogin && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/voitures";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};


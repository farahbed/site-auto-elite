// app/api/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // On efface le cookie en lui donnant une date d'expiration passée
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookieValue = `admin=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secure}`;

  return new NextResponse(null, {
    status: 200,
    headers: { "Set-Cookie": cookieValue },
  });
}
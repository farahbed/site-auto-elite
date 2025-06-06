// app/api/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "Déconnecté" });
  res.headers.set("Set-Cookie", "admin=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
  return res;
}
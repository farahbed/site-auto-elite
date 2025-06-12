import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new NextResponse("Corps JSON invalide", { status: 400 });
  }

  const { password } = body;
  if (!password) {
    return new NextResponse("Mot de passe requis", { status: 400 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return new NextResponse("Mot de passe incorrect", { status: 401 });
  }

  // Construire la string du cookie en dur
  const maxAge = 60 * 60 * 24; // 1 jour en secondes
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookieValue = `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;

  return new NextResponse(null, {
    status: 200,
    headers: { "Set-Cookie": cookieValue },
  });
}
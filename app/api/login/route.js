import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("[/api/login] Requête POST reçue");

  // ────────────────────
  // Lecture du JSON reçu
  // ────────────────────
  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error("[/api/login] Erreur de parsing JSON :", err);
    return new NextResponse("Corps JSON invalide", { status: 400 });
  }

  const { password } = body;
  console.log("[/api/login] Password fourni :", password ? "(présent)" : "(vide)");
  console.log("[/api/login] ADMIN_PASSWORD défini :", !!process.env.ADMIN_PASSWORD);

  // ────────────────────
  // Vérifications
  // ────────────────────
  if (!password) {
    console.warn("[/api/login] Mot de passe manquant");
    return new NextResponse("Mot de passe requis", { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    console.error("[/api/login] ADMIN_PASSWORD manquant dans .env");
    return new NextResponse(
      "Mot de passe administrateur non configuré",
      { status: 500 }
    );
  }

  // ────────────────────
  // Validation du mot de passe
  // ────────────────────
  if (password === process.env.ADMIN_PASSWORD) {
    console.log("[/api/login] Mot de passe correct – connexion approuvée");

    const cookieOptions = [
      "Path=/",
      "HttpOnly",
      "Max-Age=3600",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "", // Secure uniquement en prod
    ]
      .filter(Boolean)
      .join("; ");

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie": `admin=1; ${cookieOptions}`,
      },
    });
  }

  console.warn("[/api/login] Mot de passe incorrect");
  return new NextResponse("Mot de passe incorrect", { status: 401 });
}
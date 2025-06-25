// lib/getBaseUrl.js
export function getBaseUrl() {
  // 1. Variable que TU as créée
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return process.env.NEXT_PUBLIC_SITE_URL;

  // 2. Variable système de Vercel (pas besoin de la créer)
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;

  // 3. Fallback local
  return "http://localhost:3000";
}
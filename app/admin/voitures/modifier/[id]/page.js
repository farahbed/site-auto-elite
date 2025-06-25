// app/admin/voitures/modifier/[id]/page.js
import ModifierForm from '@/components/admin/ModifierForm';
import { getBaseUrl } from '@/lib/getBaseUrl';

async function fetchVoiture(id) {
  console.log("✅ SITE_URL =", process.env.SITE_URL);
  console.log("✅ VERCEL_URL =", process.env.VERCEL_URL);
  console.log("✅ NEXT_PUBLIC_SITE_URL =", process.env.NEXT_PUBLIC_SITE_URL);

  const baseUrl = getBaseUrl();
  console.log("📡 Calling:", `${baseUrl}/api/voitures/${id}`);

  const res = await fetch(`${baseUrl}/api/voitures/${id}`, { cache: 'no-store' });

  if (!res.ok) throw new Error("Erreur fetch voiture");
  return res.json();
}

export default async function Page({ params }) {
  const voiture = await fetchVoiture(params.id);

  if (!voiture) {
    return (
      <p className="text-center text-red-600 mt-10">
        ⚠️ Véhicule introuvable.
      </p>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">✏️ Modifier un véhicule</h1>
      <ModifierForm voiture={voiture} />
    </section>
  );
}
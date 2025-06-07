// app/admin/voitures/modifier/[id]/page.js
import { fetchVoitures } from '@/lib/airtable';
import ModifierForm from '@/components/admin/ModifierForm';
import Link from 'next/link';

export default async function ModifierVoiturePage({ params }) {
  const voitures = await fetchVoitures();
  const voiture = voitures.find(v => v.id === params.id);

  if (!voiture) {
    return (
      <p className="text-center text-red-500 mt-10">
        Véhicule introuvable.
      </p>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <Link href="/admin/voitures" className="text-blue-600 underline">
        ← Retour à la liste
      </Link>
      <h1 className="text-2xl font-bold">✏️ Modifier un véhicule</h1>
      {/* on passe tout l’objet voiture au formulaire client */}
      <ModifierForm voiture={voiture} />
    </section>
  );
}
// app/vehicules/[id]/page.js
import { fetchVoitures } from "@/lib/airtable";
import CarrouselImages from "@/components/CarrouselImages";
import Link from "next/link";

export default async function VoitureDetailPage({ params }) {
  const voiture = (await fetchVoitures()).find(v => v.id === params.id);

  if (!voiture) {
    return <p className="text-red-500 text-center mt-10">Voiture introuvable.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-white">
      <CarrouselImages images={voiture.images} />

      <h1 className="text-3xl font-bold mb-2">
        {voiture.marque} {voiture.modele} – {voiture.annee}
      </h1>
      <p className="text-red-600 text-2xl font-semibold mb-4">
        {voiture.prix?.toLocaleString()} €
      </p>

      <p>Kilométrage : {voiture.kilometrage?.toLocaleString()} km</p>
      <p>État : {voiture.etat}</p>

      <div className="mt-8">
        <Link
          href="/vehicules"
          className="inline-block text-red-400 hover:text-red-600 transition font-medium"
        >
          ← Retour au catalogue
        </Link>
      </div>
    </section>
  );
}
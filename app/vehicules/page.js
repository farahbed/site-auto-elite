import { fetchVoitures } from "@/lib/airtable";
import CardVoiture from "@/components/CardVoiture";
import Link from "next/link";

export default async function Page({ params }) {
  const voitures = await fetchVoitures();
  const voiture = voitures.find((v) => v.id === params.id);

  if (!voiture) {
    return <p className="text-red-500">Voiture introuvable.</p>;
  }

  // Récupérer l'URL de la première image si elle existe
  const imageUrl = voiture.image && voiture.image.length > 0 ? voiture.image[0].url : "/images/default-car.jpg";

  // Options, s'assurer que c'est un tableau
  const options = Array.isArray(voiture.options) ? voiture.options : [];

  return (
    <section className="max-w-4xl mx-auto text-white px-4 py-8">
      <img
        src={imageUrl}
        alt={`${voiture.marque} ${voiture.modele}`}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        {voiture.marque} {voiture.modele} – {voiture.annee}
      </h1>
      <p className="text-red-500 text-2xl font-semibold mb-4">
        {voiture.prix ? Number(voiture.prix).toLocaleString() : "Prix non renseigné"} €
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900 p-6 rounded mb-6">
        <p><strong>Kilométrage :</strong> {voiture.kilometrage ? Number(voiture.kilometrage).toLocaleString() : "N/A"} km</p>
        <p><strong>Carburant :</strong> {voiture.carburant || "N/A"}</p>
        <p><strong>Transmission :</strong> {voiture.transmission || "N/A"}</p>
        <p><strong>Puissance :</strong> {voiture.puissance || "N/A"}</p>
        <p><strong>Portes :</strong> {voiture.portes || "N/A"}</p>
        <p><strong>Couleur :</strong> {voiture.couleur || "N/A"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-red-400">Options & équipements</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {options.length > 0 ? (
            options.map((opt, i) => <li key={i}>{opt}</li>)
          ) : (
            <li>Aucune option renseignée</li>
          )}
        </ul>
      </div>

      <p className="text-gray-400 italic">{voiture.description || "Aucune description disponible."}</p>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/vehicules" className="text-sm text-red-400 hover:underline">
          ← Retour au catalogue
        </Link>
        <Link
          href="/contact"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm uppercase tracking-wider"
        >
          Je suis intéressé(e)
        </Link>
      </div>
    </section>
  );
}
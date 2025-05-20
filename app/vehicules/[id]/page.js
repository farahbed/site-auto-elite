import { voitures } from "../../../data/voitures";
import Link from "next/link";

export default function Page({ params }) {
  const voitureId = parseInt(params.id);
  const voiture = voitures.find((v) => v.id === voitureId);

  if (!voiture) {
    return <p className="text-red-500">Voiture introuvable.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto text-white px-4">
      <img
        src={voiture.image}
        alt={voiture.modele}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        {voiture.marque} {voiture.modele} – {voiture.annee}
      </h1>
      <p className="text-red-500 text-2xl font-semibold mb-4">
        {voiture.prix.toLocaleString()} €
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900 p-6 rounded mb-6">
        <p><span className="font-semibold">Kilométrage :</span> {voiture.kilometrage.toLocaleString()} km</p>
        <p><span className="font-semibold">Carburant :</span> {voiture.carburant}</p>
        <p><span className="font-semibold">Transmission :</span> {voiture.transmission}</p>
        <p><span className="font-semibold">Puissance :</span> {voiture.puissance}</p>
        <p><span className="font-semibold">Portes :</span> {voiture.portes}</p>
        <p><span className="font-semibold">Couleur :</span> {voiture.couleur}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-red-400">Options & équipements</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {voiture.options?.map((opt, index) => (
            <li key={index}>{opt}</li>
          ))}
        </ul>
      </div>

      <p className="text-gray-400 italic">{voiture.description}</p>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/vehicules"
          className="text-sm text-red-400 hover:underline"
        >
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
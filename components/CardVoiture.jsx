"use client";
import Link from "next/link";

export default function CardVoiture({ voiture }) {
  if (!voiture) return null;
  const src = voiture.images?.[0];

  return (
    <div className="bg-white text-text rounded-2xl border-2 border-primary shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full">
      {/* Image → juste affichée */}
      {src ? (
        <img
          src={src}
          alt={`${voiture.marque} ${voiture.modele}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-subtle text-lg">
          Pas de photo
        </div>
      )}

      {/* Infos → lien interne */}
      <Link href={`/vehicules/${voiture.id}`} className="flex-1 flex flex-col p-4 space-y-2">
        <h2 className="text-xl font-bold">
          {voiture.marque} {voiture.modele}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-sm text-subtle">
          {voiture.annee && (
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded">
              {voiture.annee}
            </span>
          )}
          {voiture.kilometrage != null && (
            <span>🚗 {voiture.kilometrage.toLocaleString()} km</span>
          )}
          {voiture.carburant && <span>⛽ {voiture.carburant}</span>}
          {voiture.transmission && <span>⚙️ {voiture.transmission}</span>}
        </div>

        <p className="text-primary font-semibold mt-auto">
          {voiture.prix?.toLocaleString()} €
        </p>
      </Link>
    </div>
  );
}
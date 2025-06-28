"use client";
import Link from "next/link";

export default function CardVoiture({ voiture }) {
  if (!voiture) return null;
  const src = voiture.images?.[0];

  return (
    <Link href={`/vehicules/${voiture.id}`}>
      <div className="bg-white text-text rounded-2xl border border-border shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col h-full">
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

        <div className="p-4 flex flex-col flex-1 space-y-1">
          <h2 className="text-xl font-bold">
            {voiture.marque} {voiture.modele}
          </h2>

          <div className="text-sm text-subtle flex flex-wrap gap-2">
            {voiture.annee && <span>🗓 {voiture.annee}</span>}
            {voiture.kilometrage != null && (
              <span>🚗 {voiture.kilometrage.toLocaleString()} km</span>
            )}
            {voiture.carburant && <span>⛽ {voiture.carburant}</span>}
            {voiture.transmission && <span>⚙️ {voiture.transmission}</span>}
          </div>

          <p className="text-primary font-semibold mt-auto">
            {voiture.prix?.toLocaleString()} €
          </p>
        </div>
      </div>
    </Link>
  );
}
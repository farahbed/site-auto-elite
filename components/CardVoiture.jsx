"use client";
import Link from "next/link";

export default function CardVoiture({ voiture }) {
  if (!voiture) return null;
  const src = voiture.images?.[0];

  return (
    <Link href={`/vehicules/${voiture.id}`}>
      {/* 👉 Variante 1 : bordure dorée toujours visible */}
      <div className="bg-white text-text rounded-2xl border-2 border-primary shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col h-full">
        {/* Image */}
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

        {/* Infos */}
        <div className="p-4 flex flex-col flex-1 space-y-2">
          <h2 className="text-xl font-bold">
            {voiture.marque} {voiture.modele}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-sm text-subtle">
            {/* Badge année */}
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
        </div>
      </div>

      {/* 👉 Variante 2 : bordure dorée uniquement au hover */}
      {/* 
      <div className="bg-white text-text rounded-2xl border border-border hover:border-primary shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] overflow-hidden transition duration-300 cursor-pointer flex flex-col h-full">
        ...
      </div> 
      */}
    </Link>
  );
}
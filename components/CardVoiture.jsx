"use client";
import Link from "next/link";

export default function CardVoiture({ voiture }) {
  if (!voiture) return null;
  const src = voiture.images?.[0];

  return (
    <Link href={`/vehicules/${voiture.id}`}>
      {/* 1️⃣ flex col + h-full pour que toute la carte occupe la même hauteur */}
      <div className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer flex flex-col h-full">

        {/* image fixe 192 px (h-48) */}
        {src ? (
          <img
            src={src}
            alt={`${voiture.marque} ${voiture.modele}`}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
            Pas de photo
          </div>
        )}

        {/* 2️⃣ flex-1 pour pousser le prix en bas même si le texte varie */}
        <div className="p-4 flex flex-col flex-1 space-y-1">
          <h2 className="text-xl font-bold">
            {voiture.marque} {voiture.modele}
          </h2>

          <div className="text-sm text-gray-600 flex flex-wrap gap-2">
            {voiture.annee && <span>🗓 {voiture.annee}</span>}
            {voiture.kilometrage != null && (
              <span>🚗 {voiture.kilometrage.toLocaleString()} km</span>
            )}
            {voiture.carburant && <span>⛽ {voiture.carburant}</span>}
            {voiture.transmission && <span>⚙️ {voiture.transmission}</span>}
          </div>

          {/* 3️⃣ mt-auto = colle le prix en bas ; toutes les cartes finissent à la même hauteur */}
          <p className="text-red-600 font-semibold mt-auto">
            {voiture.prix?.toLocaleString()} €
          </p>
        </div>
      </div>
    </Link>
  );
}
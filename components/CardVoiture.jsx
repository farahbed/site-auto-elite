// components/CardVoiture.js
"use client";
import Link from "next/link";

export default function CardVoiture({ voiture }) {
  if (!voiture) return null;

  const src =
    voiture.image ??
    "https://via.placeholder.com/400x300?text=Photo+indisponible";

  return (
    <Link href={`/vehicules/${voiture.id}`}>
      <div className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
        <img
          src={src}
          alt={`${voiture.marque} ${voiture.modele}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {voiture.marque} {voiture.modele}
          </h2>
          <p className="text-sm text-gray-700">{voiture.annee}</p>
          <p className="text-red-600 font-semibold mt-2">
            {voiture.prix?.toLocaleString()} €
          </p>
        </div>
      </div>
    </Link>
  );
}
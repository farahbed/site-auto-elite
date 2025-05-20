"use client";

import { useState } from "react";
import { voitures } from "../../data/voitures";
import CardVoiture from "../../components/CardVoiture";

export default function Page() {
  const [filtre, setFiltre] = useState("Toutes");

  // Extraire les marques uniques
  const marques = ["Toutes", ...new Set(voitures.map((v) => v.marque))];

  // Appliquer le filtre
  const voituresFiltrees =
    filtre === "Toutes"
      ? voitures
      : voitures.filter((v) => v.marque === filtre);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Nos véhicules disponibles</h1>

      <div className="mb-6 flex gap-2 flex-wrap">
        {marques.map((marque) => (
          <button
            key={marque}
            onClick={() => setFiltre(marque)}
            className={`px-4 py-2 rounded-full border ${
              filtre === marque
                ? "bg-red-600 text-white"
                : "bg-white text-black hover:bg-gray-200"
            } transition`}
          >
            {marque}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {voituresFiltrees.map((voiture) => (
          <CardVoiture key={voiture.id} voiture={voiture} />
        ))}
      </div>
    </section>
  );
}
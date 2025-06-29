"use client";
import { useState, useMemo } from "react";
import CardVoiture from "@/components/CardVoiture";

export default function VoitureCatalogueClient({ voitures }) {
  const [search, setSearch] = useState("");
  const [carburants, setCarburants] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [marques, setMarques] = useState([]);
  const [sort, setSort] = useState("");

  const allCarburants = useMemo(
    () => [...new Set(voitures.map(v => v.carburant).filter(Boolean))],
    [voitures]
  );
  const allTransmissions = useMemo(
    () => [...new Set(voitures.map(v => v.transmission).filter(Boolean))],
    [voitures]
  );
  const allMarques = useMemo(
    () => [...new Set(voitures.map(v => v.marque).filter(Boolean))],
    [voitures]
  );

  const toggleFilter = (value, list, setter) => {
    setter(list.includes(value)
      ? list.filter(v => v !== value)
      : [...list, value]);
  };

  const filtered = useMemo(() => {
    return voitures
      .filter(v => {
        const query = `${v.marque} ${v.modele}`.toLowerCase();
        return query.includes(search.toLowerCase());
      })
      .filter(v => !carburants.length || carburants.includes(v.carburant))
      .filter(v => !transmissions.length || transmissions.includes(v.transmission))
      .filter(v => !marques.length || marques.includes(v.marque))
      .sort((a, b) => {
        switch (sort) {
          case "prix-asc": return a.prix - b.prix;
          case "prix-desc": return b.prix - a.prix;
          case "km-asc": return a.kilometrage - b.kilometrage;
          case "km-desc": return b.kilometrage - a.kilometrage;
          case "annee-desc": return b.annee - a.annee;
          default: return 0;
        }
      });
  }, [voitures, search, carburants, transmissions, marques, sort]);

  return (
    <div>
      {/* Barre de recherche + tri */}
      <div className="bg-white/70 border border-border rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par mot-clé..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-border bg-gray-100 text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-white text-sm shadow-sm"
          >
            <option value="">Trier par</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="km-asc">Kilométrage croissant</option>
            <option value="km-desc">Kilométrage décroissant</option>
            <option value="annee-desc">Année décroissante</option>
          </select>
        </div>

        {/* Filtres repliables */}
        <details className="mt-4">
          <summary className="cursor-pointer font-medium text-sm mb-2 text-text">Filtres</summary>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            {/* Carburants */}
            <div>
              <p className="text-xs font-medium text-subtle mb-1">Carburant</p>
              <div className="flex flex-wrap gap-2">
                {allCarburants.map(f => (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f, carburants, setCarburants)}
                    className={`px-2 py-1 rounded-full border text-xs ${carburants.includes(f)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-text border-border"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmissions */}
            <div>
              <p className="text-xs font-medium text-subtle mb-1">Transmission</p>
              <div className="flex flex-wrap gap-2">
                {allTransmissions.map(f => (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f, transmissions, setTransmissions)}
                    className={`px-2 py-1 rounded-full border text-xs ${transmissions.includes(f)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-text border-border"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Marques */}
            <div>
              <p className="text-xs font-medium text-subtle mb-1">Marque</p>
              <div className="flex flex-wrap gap-2">
                {allMarques.map(f => (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f, marques, setMarques)}
                    className={`px-2 py-1 rounded-full border text-xs ${marques.includes(f)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-text border-border"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0
          ? filtered.map(v => <CardVoiture key={v.id} voiture={v} />)
          : <p className="text-center col-span-full text-subtle">Aucun véhicule ne correspond à vos critères.</p>
        }
      </div>
    </div>
  );
}
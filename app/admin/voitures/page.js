'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function AdminVoituresPage() {
  const [voitures, setVoitures] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/voitures')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVoitures(data);
        } else {
          console.error("Réponse inattendue de l'API :", data);
          setError("Données invalides reçues du serveur.");
          setVoitures([]);
        }
      })
      .catch(err => {
        console.error("Erreur API :", err);
        setError(err.message || "Erreur de chargement");
        setVoitures([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!Array.isArray(voitures)) return [];

    let list = voitures.filter(v =>
      `${v.marque} ${v.modele}`.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey === 'price_asc') list = [...list].sort((a, b) => (a.prix || 0) - (b.prix || 0));
    else if (sortKey === 'price_desc') list = [...list].sort((a, b) => (b.prix || 0) - (a.prix || 0));
    else if (sortKey === 'year_asc') list = [...list].sort((a, b) => (a.annee || 0) - (b.annee || 0));
    else if (sortKey === 'year_desc') list = [...list].sort((a, b) => (b.annee || 0) - (a.annee || 0));

    return list;
  }, [voitures, search, sortKey]);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce véhicule ?')) return;
    const res = await fetch(`/api/voitures?id=${id}`, { method: 'DELETE' });
    if (res.ok) setVoitures(v => v.filter(x => x.id !== id));
  };

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Gestion des véhicules</h1>
        <Link
          href="/admin/voitures/ajouter"
          className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Ajouter un véhicule
        </Link>
      </header>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher un modèle…"
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-500"
        />
        <select
          value={sortKey}
          onChange={e => setSortKey(e.target.value)}
          className="text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Trier par…</option>
          <option value="price_asc">Prix ↑</option>
          <option value="price_desc">Prix ↓</option>
          <option value="year_asc">Année ↑</option>
          <option value="year_desc">Année ↓</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement des véhicules...</p>
      ) : (
        <>
          {/* Desktop: Table view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Modèle</th>
                  <th className="p-3 border">Prix</th>
                  <th className="p-3 border">Année</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="p-2 border">
                        {Array.isArray(v.images) && v.images.length > 0 && (v.images[0]?.url || v.images[0]) ? (
                          <img
                            src={typeof v.images[0] === 'string' ? v.images[0] : v.images[0]?.url}
                            alt={v.modele}
                            className="h-16 w-28 object-cover rounded"
                          />
                        ) : (
                          <div className="h-16 w-28 bg-gray-200 flex items-center justify-center rounded text-gray-400 text-xs">
                            Pas de photo
                          </div>
                        )}
                      </td>
                      <td className="p-2 border text-gray-900">
                        {v.marque} <span className="font-medium">{v.modele}</span>
                      </td>
                      <td className="p-2 border text-gray-900">
                        {v.prix?.toLocaleString()} €
                      </td>
                      <td className="p-2 border text-gray-900">{v.annee}</td>
                      <td className="p-2 border space-x-2">
                        <Link
                          href={`/admin/voitures/modifier/${v.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          ✏️ Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="text-red-600 hover:underline"
                        >
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      Aucun véhicule trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile: Cards view */}
          <div className="sm:hidden grid grid-cols-1 gap-4">
            {filtered.length > 0 ? (
              filtered.map(v => (
                <div key={v.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  {Array.isArray(v.images) && v.images.length > 0 ? (
                    <img
                      src={typeof v.images[0] === 'string' ? v.images[0] : v.images[0]?.url}
                      alt={v.modele}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                      Pas de photo
                    </div>
                  )}
                  <div className="p-4 text-black space-y-1">
                    <p className="text-lg font-semibold">{v.marque} {v.modele}</p>
                    <p className="text-sm">Année : {v.annee}</p>
                    <p className="text-sm font-bold text-red-600">{v.prix?.toLocaleString()} €</p>
                    <div className="flex justify-between mt-3">
                      <Link
                        href={`/admin/voitures/modifier/${v.id}`}
                        className="text-blue-600 font-medium"
                      >
                        ✏️ Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-red-600 font-medium"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Aucun véhicule trouvé.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
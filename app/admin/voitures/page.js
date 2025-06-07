'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function AdminVoituresPage() {
  const [voitures, setVoitures] = useState([]);
  const [search, setSearch]   = useState('');
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    fetch('/api/voitures')
      .then(res => res.json())
      .then(data => setVoitures(data.records || []))
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    let list = voitures.filter(v =>
      `${v.marque} ${v.modele}`.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey === 'price_asc')      list = [...list].sort((a,b)=> (a.prix||0)-(b.prix||0));
    else if (sortKey === 'price_desc') list = [...list].sort((a,b)=> (b.prix||0)-(a.prix||0));
    else if (sortKey === 'year_asc')   list = [...list].sort((a,b)=> (a.annee||0)-(b.annee||0));
    else if (sortKey === 'year_desc')  list = [...list].sort((a,b)=> (b.annee||0)-(a.annee||0));

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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Ajouter un véhicule
        </Link>
      </header>

      {/* Recherche & Tri */}
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

      {/* Tableau */}
      <div className="overflow-x-auto">
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
                    <img
                      src={v.images?.[0] || '/images/default-car.jpg'}
                      alt={v.modele}
                      className="h-16 w-28 object-cover rounded"
                    />
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
    </section>
  );
}
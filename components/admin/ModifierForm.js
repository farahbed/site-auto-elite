'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModifierForm({ voiture }) {
  const router = useRouter();
  const [form, setForm] = useState({
    marque: voiture.marque || '',
    modele: voiture.modele || '',
    annee: voiture.annee || '',
    prix: voiture.prix || '',
    kilometrage: voiture.kilometrage || '',
    carburant: voiture.carburant || '',
    transmission: voiture.transmission || '',
    puissance: voiture.puissance || '',
    portes: voiture.portes || '',
    couleur: voiture.couleur || '',
    description: voiture.description || '',
    options: (voiture.options || []).join(', '),
    imageUrl: (voiture.images?.[0] || voiture.image) || ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      id: voiture.id,
      ...form,
      options: form.options.split(',').map(s => s.trim()),
      prix: Number(form.prix),
      annee: Number(form.annee),
      kilometrage: Number(form.kilometrage),
      portes: Number(form.portes),
      images: [form.imageUrl],
    };

    try {
      const res = await fetch(`/api/voitures?id=${voiture.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push('/admin/voitures');
    } catch (err) {
      console.error(err);
      setError('Impossible de modifier le véhicule.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      {[
        ['marque','Marque'], ['modele','Modèle'], ['annee','Année'],
        ['prix','Prix (€)'], ['kilometrage','Kilométrage (km)'],
        ['carburant','Carburant'], ['transmission','Transmission'],
        ['puissance','Puissance'], ['portes','Portes'],
        ['couleur','Couleur'], ['imageUrl','URL de l’image'],
      ].map(([name,label]) => (
        <div key={name}>
          <label className="block mb-1 font-medium text-gray-800">{label}</label>
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium text-gray-800">
          Options (séparées par ,)
        </label>
        <input
          name="options"
          value={form.options}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-800">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Enregistrer
      </button>
    </form>
  );
}
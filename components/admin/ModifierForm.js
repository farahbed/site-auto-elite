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
    images: voiture.images || []
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const formData = new FormData();
  files.forEach(file => formData.append('images', file)); // même clé plusieurs fois

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur upload');

    // data.url est un tableau de liens (si tu modifies aussi /api/upload pour retourner toutes les urls)
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...(Array.isArray(data.url) ? data.url : [data.url])]
    }));
  } catch (err) {
    console.error(err);
    setError('Échec de l’upload des images');
  }
};
  const handleImageDelete = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
    images: form.images,  // Utilise le tableau d’images Cloudinary
  };

  console.log("📦 Payload envoyé à l’API PATCH :", payload);

  try {
    const res = await fetch(`/api/voitures?id=${voiture.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());

    console.log("✅ Réponse Airtable PATCH :", await res.json());

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/admin/voitures');
  } catch (err) {
    console.error(err);
    setError('Impossible de modifier le véhicule.');
  }
};
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <p className="text-red-600">{error}</p>}

      {[
        ['marque', 'Marque'],
        ['modele', 'Modèle'],
        ['annee', 'Année'],
        ['prix', 'Prix (€)'],
        ['kilometrage', 'Kilométrage (km)'],
        ['carburant', 'Carburant'],
        ['transmission', 'Transmission'],
        ['puissance', 'Puissance (ch)'],
        ['portes', 'Portes'],
        ['couleur', 'Couleur']
      ].map(([name, label]) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Options (séparées par des virgules)</label>
        <input
          name="options"
          value={form.options}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Photos</label>
        <input type="file" accept="image/*" multiple onChange={handleFileUpload} />
        <div className="flex flex-wrap gap-4 mt-3">
          {form.images.map((url, index) => (
            <div key={index} className="relative w-32 h-32">
              <img src={url} alt={`photo-${index}`} className="w-full h-full object-cover rounded shadow" />
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Enregistrer les modifications
      </button>
    </form>
  );
}
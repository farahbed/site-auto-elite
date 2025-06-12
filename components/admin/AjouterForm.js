'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AjouterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    marque: '',
    modele: '',
    annee: '',
    kilometrage: '',
    prix: '',
    etat: '',
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [cloudUrls, setCloudUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFilesChange = async e => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map(f => URL.createObjectURL(f)));

    const fd = new FormData();
    selected.forEach(f => fd.append('images', f));
    try {
      const res  = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setCloudUrls(json.urls);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Échec de l’upload des images');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...form,
        annee: Number(form.annee),
        kilometrage: Number(form.kilometrage),
        prix: Number(form.prix),
        images: cloudUrls,
      };
      const res = await fetch('/api/voitures', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.error?.message || 'Erreur création');
      }
      router.push('/admin/voitures');
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      {[
        ['marque','Marque','text'],
        ['modele','Modèle','text'],
        ['annee','Année','number'],
        ['kilometrage','Kilométrage','number'],
        ['prix','Prix (€)','number'],
      ].map(([name,label,type])=>(
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium">Condition</label>
        <select
          name="etat"
          value={form.etat}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Choisir --</option>
          <option value="New">Neuf</option>
          <option value="Used">Occasion</option>
          <option value="Certified Pre-Owned">Certifiée</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {previews.map((src,i) => (
            <img
              key={i}
              src={src}
              alt={`Preview ${i}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Enregistrement...' : '➕ Ajouter'}
      </button>
    </form>
  );
}
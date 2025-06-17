// components/admin/ModifierForm.jsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModifierForm({ voiture }) {
  const router = useRouter();
  const [form, setForm] = useState({
    marque: voiture.marque, modele: voiture.modele, annee: voiture.annee,
    prix: voiture.prix, kilometrage: voiture.kilometrage,
    carburant: voiture.carburant, transmission: voiture.transmission,
    puissance: voiture.puissance, portes: voiture.portes, couleur: voiture.couleur,
    description: voiture.description,
    options: (voiture.options||[]).join(', ')
  });
  const [uploadedImages, setUploadedImages] = useState(
    (voiture.images||[]).filter(u=>typeof u==="string")
  );
  const [error, setError] = useState('');

  const handleChange = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData(); fd.append('images', file);
    try {
      const res = await fetch('/api/upload',{method:'POST',body:fd});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||'Erreur upload');
      // data.urls = tableau
      setUploadedImages(prev=>[...prev,...(data.urls||[])]);
    } catch(err){
      console.error(err);
      setError("Échec de l’upload de l’image");
    }
  };

  const removeImage = url => setUploadedImages(p=>p.filter(u=>u!==url));

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      id: voiture.id,
      ...form,
      options: form.options.split(',').map(s=>s.trim()),
      prix: Number(form.prix),
      annee: Number(form.annee),
      kilometrage: Number(form.kilometrage),
      portes: Number(form.portes),
      images: uploadedImages.map(url=>({ url }))
    };
    try {
      const res = await fetch(`/api/voitures?id=${voiture.id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      router.push('/admin/voitures');
    } catch(err){
      console.error(err);
      setError("Impossible de modifier le véhicule.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <p className="text-red-600">{error}</p>}
      {[
        ['marque','Marque'],['modele','Modèle'],['annee','Année'],
        ['prix','Prix (€)'],['kilometrage','Kilométrage (km)'],
        ['carburant','Carburant'],['transmission','Transmission'],
        ['puissance','Puissance (ch)'],['portes','Portes'],['couleur','Couleur']
      ].map(([n,l])=>(
        <div key={n}>
          <label className="block mb-1 font-medium">{l}</label>
          <input
            name={n} value={form[n]} onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description" value={form.description} onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Options (virgules)</label>
        <input
          name="options" value={form.options} onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Ajouter une photo</label>
        <input type="file" accept="image/*" onChange={handleFileUpload}/>
        <div className="flex gap-4 mt-2 flex-wrap">
          {uploadedImages.map((url,i)=>(
            <div key={i} className="relative">
              <img src={url} alt={`upload-${i}`} className="w-32 h-20 object-cover rounded" />
              <button
                type="button"
                onClick={()=>removeImage(url)}
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full w-6 h-6 text-xs"
              >✕</button>
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
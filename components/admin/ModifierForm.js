// components/admin/ModifierForm.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CARBURANT_OPTIONS = ["Essence", "Diesel", "Hybride", "Électrique"];
const TRANSMISSION_OPTIONS = ["Manuelle", "Automatique"];

export default function ModifierForm({ voiture }) {
  const router = useRouter();
  const [form, setForm] = useState({
    marque:      voiture.marque      || "",
    modele:      voiture.modele      || "",
    annee:       voiture.annee       || "",
    prix:        voiture.prix        || "",
    kilometrage: voiture.kilometrage || "",
    carburant:   voiture.carburant   || "",
    transmission:voiture.transmission|| "",
    portes:      voiture.portes      || "",
    puissance:   voiture.puissance   || "",    // <-- ajouté
    couleur:     voiture.couleur     || "",
    description: voiture.description || "",
    options:     (voiture.options||[]).join(", "),
  });
  const [uploadedImages, setUploadedImages] = useState(voiture.images || []);
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("images", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur upload");
      setUploadedImages(prev => [...prev, ...(data.urls || [])]);
    } catch (err) {
      console.error(err);
      setError("Échec de l’upload de l’image");
    }
  };

  const removeImage = url => {
    setUploadedImages(prev => prev.filter(u => u !== url));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // validations minimales
    if (!form.marque || !form.modele || !form.annee || !form.prix || !form.kilometrage) {
      setError("Marque, modèle, année, prix et kilométrage sont obligatoires.");
      return;
    }
    if (!form.carburant || !form.transmission) {
      setError("Carburant et transmission sont obligatoires.");
      return;
    }
    if (uploadedImages.length === 0) {
      setError("Ajoute au moins une photo.");
      return;
    }

    const optionsArray = form.options
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      id: voiture.id,
      marque:      form.marque.trim(),
      modele:      form.modele.trim(),
      annee:       Number(form.annee),
      prix:        Number(form.prix),
      kilometrage: Number(form.kilometrage),
      carburant:   form.carburant,
      transmission:form.transmission,
      portes:      form.portes ? Number(form.portes) : undefined,
      puissance:   form.puissance ? Number(form.puissance) : undefined, // <-- converti en nombre
      couleur:     form.couleur.trim() || undefined,
      description: form.description.trim() || undefined,
      options:     optionsArray,
      images:      uploadedImages.map(url => ({ url })),
    };

    try {
      const res = await fetch(`/api/voitures?id=${voiture.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      router.push("/admin/voitures");
    } catch (err) {
      console.error(err);
      setError("Impossible de modifier le véhicule.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <p className="text-red-600">{error}</p>}

      {/* Champs obligatoires */}
      {[
        ["marque","Marque","text"],
        ["modele","Modèle","text"],
        ["annee","Année","number"],
        ["prix","Prix (€)","number"],
        ["kilometrage","Kilométrage (km)","number"],
      ].map(([name,label,type])=>(
        <div key={name}>
          <label className="block mb-1 font-medium">{label} *</label>
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Carburant */}
      <div>
        <label className="block mb-1 font-medium">Carburant *</label>
        <select
          name="carburant"
          value={form.carburant}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Sélectionnez…</option>
          {CARBURANT_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block mb-1 font-medium">Transmission *</label>
        <select
          name="transmission"
          value={form.transmission}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Sélectionnez…</option>
          {TRANSMISSION_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Puissance */}
      <div>
        <label className="block mb-1 font-medium">Puissance (ch)</label>
        <input
          name="puissance"
          type="number"
          value={form.puissance}
          onChange={handleChange}
          placeholder="Ex. 150"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Portes et couleur */}
      {[
        ["portes","Portes","number"],
        ["couleur","Couleur","text"],
      ].map(([name,label,type])=>(
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block mb-1 font-medium">Options (virgules)</label>
        <input
          name="options"
          type="text"
          value={form.options}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Upload images */}
      <div>
        <label className="block mb-1 font-medium">Photos *</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="flex gap-4 mt-2 flex-wrap">
          {uploadedImages.map((url,i) => (
            <div key={i} className="relative">
              <img src={url} className="w-32 h-20 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(url)}
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
// components/admin/ModifierForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CARBURANT_OPTIONS = ["Essence", "Diesel", "Hybride", "Électrique"];
const TRANSMISSION_OPTIONS = ["Manuelle", "Automatique"];

export default function ModifierForm({ voiture }) {
  const router = useRouter();

  const [form, setForm] = useState({
    marque: voiture.marque || "",
    modele: voiture.modele || "",
    annee: voiture.annee || "",
    prix: voiture.prix || "",
    kilometrage: voiture.kilometrage || "",
    carburant: voiture.carburant || "",
    transmission: voiture.transmission || "",
    portes: voiture.portes || "",
    couleur: voiture.couleur || "",
    description: voiture.description || "",
    options: (voiture.options || []).join(", "),
  });

  const [uploadedImages, setUploadedImages] = useState(voiture.images || []);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("images", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur upload");
      // Cloudinary renvoie { urls: [...] }
      setUploadedImages((prev) => [...prev, ...(data.urls || [])]);
    } catch (err) {
      console.error(err);
      setError("Échec de l’upload de l’image");
    }
  };

  const removeImage = (url) =>
    setUploadedImages((prev) => prev.filter((u) => u !== url));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // —— Validation client
    if (
      !form.marque.trim() ||
      !form.modele.trim() ||
      !form.annee ||
      !form.prix ||
      !form.kilometrage
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (!form.carburant) {
      setError("Veuillez sélectionner un carburant.");
      return;
    }
    if (!form.transmission) {
      setError("Veuillez sélectionner une transmission.");
      return;
    }
    if (uploadedImages.length === 0) {
      setError("Veuillez ajouter au moins une photo.");
      return;
    }

    // —— Prépare le tableau d’options
    const optionsArray = form.options
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      id: voiture.id,
      marque: form.marque.trim(),
      modele: form.modele.trim(),
      annee: Number(form.annee),
      prix: Number(form.prix),
      kilometrage: Number(form.kilometrage),
      carburant: form.carburant,
      transmission: form.transmission,
      portes: Number(form.portes) || undefined,
      couleur: form.couleur.trim() || undefined,
      description: form.description.trim() || undefined,
      options: optionsArray,
      images: uploadedImages.map((url) => ({ url })),
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

      {[
        ["marque", "Marque"],
        ["modele", "Modèle"],
        ["annee", "Année"],
        ["prix", "Prix (€)"],
        ["kilometrage", "Kilométrage (km)"],
      ].map(([name, label]) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label} *</label>
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
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
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Sélectionnez…</option>
          {CARBURANT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
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
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Sélectionnez…</option>
          {TRANSMISSION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Autres champs libres */}
      {[
        ["portes", "Portes"],
        ["couleur", "Couleur"],
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

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      {/* Options (multi-value) */}
      <div>
        <label className="block mb-1 font-medium">
          Options (séparées par des virgules)
        </label>
        <input
          name="options"
          value={form.options}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Upload images */}
      <div>
        <label className="block mb-1 font-medium">Ajouter une photo *</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="flex gap-4 mt-2 flex-wrap">
          {uploadedImages.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt={`upload-${i}`}
                className="w-32 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full w-6 h-6 text-xs"
              >
                ✕
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
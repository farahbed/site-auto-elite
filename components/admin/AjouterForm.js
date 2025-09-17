"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CARBURANT_OPTIONS   = ["Essence", "Diesel", "Hybride", "Électrique"];
const TRANSMISSION_OPTIONS = ["Manuelle", "Automatique"];

export default function AjouterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    marque: "",
    modele: "",
    annee: "",
    prix: "",
    kilometrage: "",
    etat: "",
    carburant: "",
    transmission: "",
    portes: "",
    puissance: "",
    couleur: "",
    description: "",
    options: "",
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("images", file);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erreur upload");
        setUploadedImages((prev) => [...prev, ...(json.urls || [])]);
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Échec de l’upload de l’image");
    }
  };

  const removeImage = (url) => {
    setUploadedImages((prev) => prev.filter((u) => u !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.marque.trim() ||
      !form.modele.trim() ||
      !form.annee ||
      !form.prix ||
      !form.kilometrage ||
      !form.carburant ||
      !form.transmission ||
      uploadedImages.length === 0
    ) {
      setError("⚠️ Merci de remplir tous les champs obligatoires (*) et d’ajouter au moins une photo.");
      return;
    }

    const payload = {
      marque: form.marque.trim(),
      modele: form.modele.trim(),
      annee: Number(form.annee),
      prix: Number(form.prix),
      kilometrage: Number(form.kilometrage),
      etat: form.etat,
      carburant: form.carburant,
      transmission: form.transmission,
      portes: form.portes ? Number(form.portes) : undefined,
      puissance: form.puissance ? Number(form.puissance) : undefined,
      couleur: form.couleur.trim() || undefined,
      description: form.description.trim() || undefined,
      options: form.options.split(",").map((s) => s.trim()).filter(Boolean),
      images: uploadedImages.map((url) => ({ url })),
    };

    try {
      const res = await fetch("/api/voitures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/voitures");
    } catch (err) {
      console.error(err);
      setError("⚠️ Impossible de créer la voiture.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && (
        <p className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</p>
      )}

      {/* Champs principaux */}
      {[
        ["marque", "Marque", "text"],
        ["modele", "Modèle", "text"],
        ["annee", "Année", "number"],
        ["prix", "Prix (€)", "number"],
        ["kilometrage", "Kilométrage (km)", "number"],
      ].map(([name, label, type]) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label} *</label>
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ))}

      {/* Condition */}
<div>
  <label className="block mb-1 font-medium">Condition *</label>
  <select
    name="etat"
    value={form.etat}
    onChange={handleChange}
    required
    className="w-full border rounded px-3 py-2"
  >
    <option value="">-- Choisir --</option>
    <option value="New">Neuf</option>
    <option value="Used">Occasion</option>
    <option value="Certified Pre-Owned">Certifiée</option>
  </select>
</div>

      {/* Carburant & Transmission */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Carburant *</label>
          <select
            name="carburant"
            value={form.carburant}
            onChange={handleChange}
            required
            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Sélectionnez</option>
            {CARBURANT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Transmission *</label>
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            required
            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Sélectionnez</option>
            {TRANSMISSION_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Portes, puissance et couleur */}
      {[
        ["portes", "Portes"],
        ["puissance", "Puissance (ch)"],
        ["couleur", "Couleur"],
      ].map(([name, label]) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            name={name}
            type="text"
            value={form[name]}
            onChange={handleChange}
            className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ))}

      {/* Description & options */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Options (séparées par des virgules)</label>
        <input
          name="options"
          value={form.options}
          onChange={handleChange}
          placeholder="GPS, Jantes alu,…"
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Upload multiple images */}
      <div>
        <label className="block mb-1 font-medium">Photos *</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="w-full border border-border rounded px-3 py-2"
        />
        <div className="flex gap-4 mt-2 flex-wrap">
          {uploadedImages.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt={`photo-${i}`}
                className="w-32 h-20 object-cover rounded border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-hover transition"
      >
        ➕ Ajouter le véhicule
      </button>
    </form>
  );
}
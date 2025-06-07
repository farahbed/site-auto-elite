// app/admin/voitures/ajouter/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterVoiturePage() {
  const router = useRouter();

  // États pour chaque champ du formulaire
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [kilometrage, setKilometrage] = useState("");
  const [prix, setPrix] = useState("");
  const [carburant, setCarburant] = useState("");
  const [transmission, setTransmission] = useState("");
  const [puissance, setPuissance] = useState("");
  const [portes, setPortes] = useState("");
  const [couleur, setCouleur] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("marque", marque);
    formData.append("modele", modele);
    formData.append("annee", annee);
    formData.append("kilometrage", kilometrage);
    formData.append("prix", prix);
    formData.append("carburant", carburant);
    formData.append("transmission", transmission);
    formData.append("puissance", puissance);
    formData.append("portes", portes);
    formData.append("couleur", couleur);
    formData.append("description", description);
    formData.append("options", options);
    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await fetch("/api/voitures", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      setError(`Échec (${res.status}) : ${text}`);
    } else {
      router.push("/admin/voitures");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">➕ Ajouter un véhicule</h1>

      {error && (
        <p className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Marque</label>
          <input
            type="text"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Modèle</label>
          <input
            type="text"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Année</label>
            <input
              type="number"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Kilométrage</label>
            <input
              type="number"
              value={kilometrage}
              onChange={(e) => setKilometrage(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Prix (€)</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Carburant</label>
            <input
              type="text"
              value={carburant}
              onChange={(e) => setCarburant(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Transmission</label>
            <input
              type="text"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Puissance</label>
            <input
              type="text"
              value={puissance}
              onChange={(e) => setPuissance(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Portes</label>
            <input
              type="number"
              value={portes}
              onChange={(e) => setPortes(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Couleur</label>
            <input
              type="text"
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Options (séparées par des virgules)</label>
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Photos du véhicule</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full border px-3 py-2 rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
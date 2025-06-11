"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterVoiturePage() {
  const router = useRouter();
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [kilometrage, setKilometrage] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState(""); // corresponds to "Condition"
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let urls = [];
      if (photos && photos.length > 0) {
        const formData = new FormData();
        Array.from(photos).forEach((file) => formData.append("images", file));
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Upload photos échoué.");
        const { urls: cloudinaryUrls } = await uploadRes.json();
        urls = cloudinaryUrls;
      }

      const voiturePayload = {
        marque,
        modele,
        annee: parseInt(annee),
        kilometrage: parseInt(kilometrage),
        prix: parseFloat(prix),
        etat, // maps to "Condition"
        images: urls,
      };

      const saveRes = await fetch("/api/voitures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voiturePayload),
      });

      if (!saveRes.ok) {
        const errorBody = await saveRes.json();
        setError(errorBody.error?.error?.message || "Erreur création du véhicule");
        setLoading(false);
        return;
      }

      router.push("/admin/voitures");
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">➕ Ajouter un véhicule</h1>
      {error && (
        <p className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {[
          { label: "Marque", value: marque, setter: setMarque },
          { label: "Modèle", value: modele, setter: setModele },
          { label: "Année", value: annee, setter: setAnnee, type: "number" },
          { label: "Kilométrage", value: kilometrage, setter: setKilometrage, type: "number" },
          { label: "Prix (€)", value: prix, setter: setPrix, type: "number" },
        ].map(({ label, value, setter, type = "text" }, idx) => (
          <div key={idx}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              className="w-full border px-3 py-2 rounded"
              value={value}
              onChange={(e) => setter(e.target.value)}
              required
            />
          </div>
        ))}
        <div>
          <label className="block font-medium mb-1">Condition</label>
          <select
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Choisir une option --</option>
            <option value="New">Neuf</option>
            <option value="Used">Occasion</option>
            <option value="Certified Pre-Owned">Certifiée</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Photos du véhicule</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={(e) => setPhotos(e.target.files)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { fetchVoitures } from "@/lib/airtable";
import Link from "next/link";

export default function AdminVoitures() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
    fetchVoitures().then(setVoitures).catch(console.error);
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des véhicules</h1>

      <Link
        href="/admin/voitures/ajouter"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        ➕ Ajouter un véhicule
      </Link>

      <table className="w-full table-auto border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Modèle</th>
            <th className="p-2 border">Prix</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map((v) => (
            <tr key={v.id} className="border">
              <td className="p-2 border">
                <img src={v.image} alt={v.modele} className="h-16 w-28 object-cover" />
              </td>
              <td className="p-2 border">{v.marque} {v.modele}</td>
              <td className="p-2 border">{v.prix.toLocaleString()} €</td>
              <td className="p-2 border">
                <Link
                  href={`/admin/voitures/modifier/${v.id}`}
                  className="text-blue-600 mr-4"
                >
                  ✏️ Modifier
                </Link>
                <button
                  onClick={async () => {
                    const confirmed = confirm("Supprimer ce véhicule ?");
                    if (confirmed) {
                      await fetch(`/api/supprimer-voiture?id=${v.id}`, { method: "DELETE" });
                      setVoitures(voitures.filter(voiture => voiture.id !== v.id));
                    }
                  }}
                  className="text-red-600"
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
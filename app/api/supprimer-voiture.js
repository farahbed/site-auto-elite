// pages/api/supprimer-voiture.js
import { requireAdmin } from "../../../lib/requireAdmin";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end("Méthode non autorisée");
  }

  const { id } = req.query;

  const response = await fetch(`https://api.airtable.com/v0/pattqPUcRCdWo8AQj/Voitures/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
    },
  });

  if (!response.ok) {
    return res.status(500).json({ message: "Erreur suppression" });
  }

  res.status(200).json({ message: "Supprimé" });
}

export default requireAdmin(handler);
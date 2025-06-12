// pages/api/voitures/index.js

import { normalizeVoitureRecord } from '@/lib/normalizeVoiture';

export default async function handler(req, res) {
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  if (!baseId || !apiKey || !tableName) {
    return res.status(500).json({ error: "Variables d'environnement manquantes." });
  }

  const urlBase = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  // 1) GET all
  if (req.method === "GET") {
    const response = await fetch(urlBase, { headers });
    const data     = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });
    const voitures = data.records.map(normalizeVoitureRecord);
    return res.status(200).json(voitures);
  }

  // 2) POST new
  if (req.method === "POST") {
    const {
      marque, modele, annee, kilometrage, prix, etat,
      images = [],          // URLs Cloudinary en entrée
      inspection
    } = req.body;

    const airtablePayload = {
      fields: {
        "Car Make":  marque,
        "Car Model": modele,
        "Year":      annee,
        "Mileage":   kilometrage,
        "Price":     prix,
        "Condition": etat,
        // stocke aussi l’URL Cloudinary en champ texte
        "Image URL": images[0] || "",
        // on peut continuer à envoyer à l’attachment pour rapatriement, mais désormais inutile
        "Car Photo": Array.isArray(images)
          ? images.map(url => ({ url }))
          : [],
        "Inspection": inspection
      }
    };

    try {
      const airtableRes = await fetch(urlBase, {
        method:  'POST',
        headers,
        body:    JSON.stringify(airtablePayload)
      });
      const data = await airtableRes.json();
      if (!airtableRes.ok) return res.status(airtableRes.status).json({ error: data });
      return res.status(200).json(data);
    } catch (err) {
      console.error("POST /api/voitures error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // 3) DELETE
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID manquant" });
    const deleteRes = await fetch(`${urlBase}/${id}`, { method: 'DELETE', headers });
    const data = await deleteRes.json();
    if (!deleteRes.ok) return res.status(deleteRes.status).json({ error: data });
    return res.status(200).json({ success: true });
  }

  // 4) PATCH update
  if (req.method === "PATCH") {
    const { id } = req.query;
    const fields = req.body;
    if (!id) return res.status(400).json({ error: "ID manquant pour la modification." });

    const airtableFields = {
      ...(fields.marque     && { "Car Make":   fields.marque }),
      ...(fields.modele     && { "Car Model":  fields.modele }),
      ...(fields.annee      && { "Year":       fields.annee }),
      ...(fields.kilometrage&& { "Mileage":    fields.kilometrage }),
      ...(fields.prix       && { "Price":      fields.prix }),
      ...(fields.etat       && { "Condition":  fields.etat }),
      ...(fields.inspection && { "Inspection": fields.inspection }),
      // on met à jour le champ texte
      ...(fields.images?.[0] && { "Image URL": fields.images[0] }),
      // on peut aussi mettre à jour les attachments si souhaité
      ...(fields.images && Array.isArray(fields.images)
        ? { "Car Photo": fields.images.map(u => ({ url: u })) }
        : {}
      )
    };

    try {
      const updateRes = await fetch(`${urlBase}/${id}`, {
        method:  'PATCH',
        headers,
        body:    JSON.stringify({ fields: airtableFields })
      });
      const data = await updateRes.json();
      if (!updateRes.ok) return res.status(updateRes.status).json({ error: data });
      return res.status(200).json(data);
    } catch (err) {
      console.error("PATCH /api/voitures error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // Méthode non-supportée
  res.setHeader("Allow", ["GET","POST","DELETE","PATCH"]);
  res.status(405).end("Method Not Allowed");
}
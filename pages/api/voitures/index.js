// pages/api/voitures/index.js
import { normalizeVoitureRecord } from '@/lib/normalizeVoiture';

export default async function handler(req, res) {
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  if (!baseId || !apiKey || !tableName) {
    return res.status(500).json({ error: "Vars env manquantes." });
  }
  const urlBase = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  // — GET
  if (req.method === "GET") {
    // ← on désactive le cache ici
    const resp = await fetch(urlBase, {
      headers,
      cache: 'no-store'
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ error: data });
    const voitures = data.records.map(normalizeVoitureRecord);
    return res.status(200).json(voitures);
  }

  // — POST
  if (req.method === "POST") {
    const { marque, modele, annee, kilometrage, prix, etat, inspection, images = [] } = req.body;

    const valid = images
      .map(i => typeof i === 'string' ? i : i.url)
      .filter(u => u.startsWith('https://res.cloudinary.com'));

    const payload = {
      fields: {
        "Car Make":   marque,
        "Car Model":  modele,
        "Year":       annee,
        "Mileage":    kilometrage,
        "Price":      prix,
        "Condition":  etat,
        "Inspection": inspection,
        "Image URLs": JSON.stringify(valid),
      }
    };

    const airtableRes = await fetch(urlBase, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    const result = await airtableRes.json();
    if (!airtableRes.ok) return res.status(airtableRes.status).json({ error: result });
    return res.status(200).json(result);
  }

  // — PATCH
  if (req.method === "PATCH") {
    const { id } = req.query;
    const fields = req.body;
    if (!id) return res.status(400).json({ error: "ID manquant." });

    const valid = (fields.images || [])
      .map(i => typeof i === 'string' ? i : i.url)
      .filter(u => u.startsWith('https://res.cloudinary.com'));

    const airtableFields = {
      ...(fields.marque     && { "Car Make":   fields.marque }),
      ...(fields.modele     && { "Car Model":  fields.modele }),
      ...(fields.annee      && { "Year":       fields.annee }),
      ...(fields.kilometrage&& { "Mileage":    fields.kilometrage }),
      ...(fields.prix       && { "Price":      fields.prix }),
      ...(fields.etat       && { "Condition":  fields.etat }),
      ...(fields.inspection && { "Inspection": fields.inspection }),
      ...(valid.length && { "Image URLs": JSON.stringify(valid) }),
    };

    if (Object.keys(airtableFields).length === 0) {
      return res.status(400).json({ error: "Rien à mettre à jour." });
    }
    const resp = await fetch(`${urlBase}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ fields: airtableFields })
    });
    const result = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ error: result });
    return res.status(200).json(result);
  }

  // — DELETE
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID manquant." });
    const del = await fetch(`${urlBase}/${id}`, { method:'DELETE', headers });
    const data = await del.json();
    if (!del.ok) return res.status(del.status).json({ error: data });
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["GET","POST","PATCH","DELETE"]);
  res.status(405).end("Method Not Allowed");
}
// pages/api/voitures/index.js

import { normalizeVoitureRecord } from '@/lib/normalizeVoiture';

export default async function handler(req, res) {
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  if (!baseId || !apiKey || !tableName) {
    return res.status(500).json({ error: "❌ Variables d'environnement manquantes." });
  }

  const urlBase = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  // — GET : lister toutes les voitures
  if (req.method === "GET") {
    const resp = await fetch(urlBase, { headers, cache: 'no-store' });
    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json({ error: data });
    }
    const voitures = data.records.map(normalizeVoitureRecord);
    return res.status(200).json(voitures);
  }

  // — POST : créer une voiture
  if (req.method === "POST") {
    const {
      marque, modele, annee, kilometrage, prix, etat, inspection,
      fuel, transmission, power, doors, color, description, options = [], images = []
    } = req.body;

    // On garde que les URLs cloudinary
    const validImages = images
      .map(i => typeof i === 'string' ? i : i.url)
      .filter(u => typeof u === 'string' && u.startsWith('https://res.cloudinary.com'));

    const payload = {
      fields: {
        "Car Make":    marque,
        "Car Model":   modele,
        "Year":        annee,
        "Mileage":     kilometrage,
        "Price":       prix,
        "Condition":   etat,
        "Inspection":  inspection,
        "Fuel":        fuel,
        "Transmission":transmission,
        "Power":       power,
        "Doors":       doors,
        "Color":       color,
        "Description": description,
        "Options":     Array.isArray(options) ? options : [],
        // on stringify le tableau d'images
        "Image URLs":  JSON.stringify(validImages),
      }
    };

    const airtableRes = await fetch(urlBase, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const result = await airtableRes.json();
    if (!airtableRes.ok) {
      return res.status(airtableRes.status).json({ error: result });
    }
    return res.status(200).json(result);
  }

  // — PATCH : modifier une voiture
  if (req.method === "PATCH") {
    const { id } = req.query;
    const fields = req.body;
    if (!id) {
      return res.status(400).json({ error: "❌ ID manquant pour modification." });
    }

    const validImages = (fields.images || [])
      .map(i => typeof i === 'string' ? i : i.url)
      .filter(u => typeof u === 'string' && u.startsWith('https://res.cloudinary.com'));

    const airtableFields = {
      ...(fields.marque      && { "Car Make":    fields.marque }),
      ...(fields.modele      && { "Car Model":   fields.modele }),
      ...(fields.annee       && { "Year":        fields.annee }),
      ...(fields.kilometrage && { "Mileage":     fields.kilometrage }),
      ...(fields.prix        && { "Price":       fields.prix }),
      ...(fields.etat        && { "Condition":   fields.etat }),
      ...(fields.inspection  && { "Inspection":  fields.inspection }),
      ...(fields.fuel        && { "Fuel":        fields.fuel }),
      ...(fields.transmission&& { "Transmission":fields.transmission }),
      ...(fields.power       && { "Power":       fields.power }),
      ...(fields.doors       && { "Doors":       fields.doors }),
      ...(fields.color       && { "Color":       fields.color }),
      ...(fields.description && { "Description": fields.description }),
      ...(Array.isArray(fields.options) && { "Options": fields.options }),
      ...(validImages.length && { "Image URLs": JSON.stringify(validImages) }),
    };

    if (!Object.keys(airtableFields).length) {
      return res.status(400).json({ error: "❌ Aucun champ à mettre à jour." });
    }

    const resp = await fetch(`${urlBase}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ fields: airtableFields }),
    });
    const result = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json({ error: result });
    }
    return res.status(200).json(result);
  }

  // — DELETE : supprimer une voiture
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "❌ ID manquant pour suppression." });
    }
    const del = await fetch(`${urlBase}/${id}`, { method: 'DELETE', headers });
    const data = await del.json();
    if (!del.ok) {
      return res.status(del.status).json({ error: data });
    }
    return res.status(200).json({ success: true });
  }

  // Méthode non autorisée
  res.setHeader("Allow", ["GET","POST","PATCH","DELETE"]);
  res.status(405).end("Method Not Allowed");
}
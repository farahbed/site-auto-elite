// pages/api/voitures/[id].js
import { normalizeVoitureRecord } from '../../../lib/normalizeVoiture';

export default async function handler(req, res) {
  const { id } = req.query;
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!id) {
    return res.status(400).json({ error: "ID manquant dans la requête." });
  }

  const url     = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${id}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  // on désactive le cache ici
  const response = await fetch(url, {
    headers,
    cache: 'no-store'
  });

  const data = await response.json();
  if (!response.ok) {
    return res.status(response.status).json({ error: data });
  }

  const voiture = normalizeVoitureRecord(data);
  return res.status(200).json(voiture);
}
// lib/airtable.js
import { normalizeVoitureRecord } from './normalizeVoiture';

export async function fetchVoitures() {
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!baseId || !apiKey || !tableName) {
    throw new Error("⛔ Variables d'environnement Airtable manquantes.");
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Erreur Airtable ${res.status}: ${await res.text()}`);
  }

  const { records } = await res.json();
  return records.map(normalizeVoitureRecord);
}
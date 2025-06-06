// lib/airtable.js
/**
 * Récupère toutes les voitures depuis Airtable.
 *  - `image` → string (première photo) pour les vignettes
 *  - `images` → tableau complet des photos pour le carrousel
 */
export async function fetchVoitures() {
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;   // ex. "Car Listings"

  if (!baseId || !apiKey || !tableName) {
    throw new Error("⛔ Variables d'environnement Airtable manquantes.");
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const res = await fetch(url, {
    cache   : "no-store",                    // pas de cache
    headers : { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`Erreur Airtable ${res.status}: ${await res.text()}`);
  }

  const { records } = await res.json();

  return records.map((r) => {
    const f = r.fields;

    // On génère le tableau complet de photos (miniature large si dispo, sinon original)
    const images = (f["Car Photo"] || []).map(file =>
      file.thumbnails?.large?.url || file.url
    );

    return {
      id          : r.id,
      marque      : f["Car Make"],
      modele      : f["Car Model"],
      annee       : f["Year"],
      kilometrage : f["Mileage"],
      prix        : f["Price"],
      etat        : f["Condition"],
      carburant   : f["Fuel Type"]     ?? null,
      transmission: f["Transmission"]  ?? null,
      puissance   : f["Horsepower"]    ?? null,
      portes      : f["Doors"]         ?? null,
      couleur     : f["Color"]         ?? null,
      description : f["Description"]   ?? "",
      options     : f["Options"]       ?? [],
      image       : images[0] || null,   // première image pour la carte
      images,                            // tableau complet pour le carrousel
    };
  });
}
// lib/normalizeVoiture.js
export function normalizeVoitureRecord(record) {
  const f = record.fields || {};

  // Images : JSON.stringify([...]) stocké dans "Image URLs"
  let images = [];
  if (typeof f["Image URLs"] === "string") {
    try { images = JSON.parse(f["Image URLs"]); } catch {}
  } else if (Array.isArray(f["Image URLs"])) {
    images = f["Image URLs"];
  }

  return {
    id:                record.id,
    marque:            f["Car Make"]        || "",
    modele:            f["Car Model"]       || "",
    annee:             f["Year"]            || "",
    kilometrage:       f["Mileage"]         || 0,
    prix:              f["Price"]           || 0,
    etat:              f["Condition"]       || "",
    inspection:        f["Inspection"]      || "",
    images, // tableau d’URL

    // **Les vrais noms de colonnes Airtable :**
    carburant:         f["Carburant"]       || "",
    transmission:      f["Transmission"]    || "",
    puissance:         f["Puissance"]       || "",
    portes:            f["Portes"]          || 0,
    couleur:           f["Couleur"]         || "",
    description:       f["Description"]     || "",
    options:           Array.isArray(f["Options"]) 
                        ? f["Options"] 
                        : (typeof f["Options"] === "string" 
                            ? f["Options"].split(",").map(s=>s.trim()) 
                            : []),
  };
}
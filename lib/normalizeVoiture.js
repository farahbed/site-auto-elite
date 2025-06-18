// lib/normalizeVoiture.js
export function normalizeVoitureRecord(record) {
  const f = record.fields || {};

  // images JSON-string ou tableau
  let images = [];
  if (typeof f["Image URLs"] === "string") {
    try { images = JSON.parse(f["Image URLs"]); } catch {}
  } else if (Array.isArray(f["Image URLs"])) {
    images = f["Image URLs"];
  }

  return {
    id:          record.id,
    marque:      f["Car Make"]    || "",
    modele:      f["Car Model"]   || "",
    annee:       f["Year"]        || "",
    kilometrage: f["Mileage"]     || 0,
    prix:        f["Price"]       || 0,
    etat:        f["Condition"]   || "",
    inspection:  f["Inspection"]  || "",
    images,

    fuel:        f["Fuel"]        || "",
    transmission:f["Transmission"]|| "",
    power:       f["Power"]       || 0,
    doors:       f["Doors"]       || 0,
    color:       f["Color"]       || "",
    description: f["Description"] || "",
    options:     Array.isArray(f["Options"]) ? f["Options"] : [],
  };
}
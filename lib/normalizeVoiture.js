export function normalizeVoitureRecord(record) {
  const f = record.fields || {};

  // images stockées en JSON-string ou en tableau
  let images = [];
  if (typeof f["Image URLs"] === "string") {
    try {
      images = JSON.parse(f["Image URLs"]);
    } catch (e) { /* ignore */ }
  } else if (Array.isArray(f["Image URLs"])) {
    images = f["Image URLs"];
  }

  // options : soit une chaîne séparée par des virgules, soit un tableau
  let options = [];
  if (typeof f["Options"] === "string") {
    options = f["Options"].split(",").map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(f["Options"])) {
    options = f["Options"];
  }

  return {
    id:           record.id,
    marque:       f["Car Make"]    || "",
    modele:       f["Car Model"]   || "",
    annee:        f["Year"]        || "",
    kilometrage:  f["Mileage"]     || 0,
    prix:         f["Price"]       || 0,
    etat:         f["Condition"]   || "",
    inspection:   f["Inspection"]  || "",
    images,

    carburant:    f["Fuel"]        || "",
    transmission: f["Transmission"]|| "",
    portes:       f["Doors"]       || 0,
    puissance:    f["Power"]       || 0,
    couleur:      f["Color"]       || "",
    description:  f["Description"] || "",
    options,
  };
}
export function normalizeVoitureRecord(record) {
  const f = record.fields;
  let images = [];
  if (typeof f["Image URLs"] === 'string') {
    try {
      const parsed = JSON.parse(f["Image URLs"]);
      if (Array.isArray(parsed)) images = parsed;
    } catch (e) {
      console.warn("JSON.parse Image URLs a échoué", e);
    }
  }
  return {
    id:         record.id,
    marque:     f["Car Make"]   || "",
    modele:     f["Car Model"]  || "",
    annee:      f["Year"]       || "",
    kilometrage:f["Mileage"]    || "",
    prix:       f["Price"]      || "",
    etat:       f["Condition"]  || "",
    inspection: f["Inspection"] || "",
    images,  // toujours un tableau de strings
  };
}
export function normalizeVoitureRecord(record) {
  const f = record.fields || {};
  let images = [];

  if (Array.isArray(f["Car Photo"])) {
    images = f["Car Photo"].map(a => a.url).filter(Boolean);
  }
  else if (f["Image URLs"]) {
    if (Array.isArray(f["Image URLs"])) {
      images = f["Image URLs"];
    } else if (typeof f["Image URLs"] === "string") {
      try {
        const p = JSON.parse(f["Image URLs"]);
        if (Array.isArray(p)) images = p;
      } catch {}
    }
  }

  return {
    id: record.id,
    marque:      f["Car Make"]   || "",
    modele:      f["Car Model"]  || "",
    annee:       f["Year"]       || "",
    kilometrage: f["Mileage"]    || "",
    prix:        f["Price"]      || "",
    etat:        f["Condition"]  || "",
    inspection:  f["Inspection"] || "",
    images
  };
}
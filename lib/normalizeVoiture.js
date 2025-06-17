// lib/normalizeVoiture.js


export function normalizeVoitureRecord(record) {
  const carPhotoRaw = record.fields["Car Photo"];
  console.log("🖼️ Car Photo brut depuis Airtable :", carPhotoRaw);

  const images = (carPhotoRaw || []).map(img => img?.url).filter(Boolean);
  const fallback = record.fields["Image URL"];
  return {
    id: record.id,
    marque: record.fields["Car Make"] || '',
    modele: record.fields["Car Model"] || '',
    annee: record.fields["Year"] || '',
    kilometrage: record.fields["Mileage"] || '',
    prix: record.fields["Price"] || '',
    etat: record.fields["Condition"] || '',
    inspection: record.fields["Inspection"] || '',
    images: images.length > 0 ? images : [fallback].filter(Boolean)
  };
}
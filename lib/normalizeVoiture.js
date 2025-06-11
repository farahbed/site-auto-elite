// lib/normalizeVoiture.js

export function normalizeVoitureRecord(record) {
  return {
    id: record.id,
    marque: record.fields["Car Make"] || '',
    modele: record.fields["Car Model"] || '',
    annee: record.fields["Year"] || '',
    kilometrage: record.fields["Mileage"] || '',
    prix: record.fields["Price"] || '',
    etat: record.fields["Condition"] || '',
    inspection: record.fields["Inspection"] || '',
    images: (record.fields["Car Photo"] || []).map(img => img.url),
  };
}
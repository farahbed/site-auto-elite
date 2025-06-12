// lib/normalizeVoiture.js

export function normalizeVoitureRecord(record) {
  // URL pérenne stockée dans le champ texte "Image URL"
  const cloudUrl = record.fields["Image URL"] || '';

  // L’attachment Airtable, à n’utiliser qu’en fallback
  const attachments = record.fields["Car Photo"] || [];

  return {
    id: record.id,
    marque:       record.fields["Car Make"]    || '',
    modele:       record.fields["Car Model"]   || '',
    annee:        record.fields["Year"]        || '',
    kilometrage:  record.fields["Mileage"]     || '',
    prix:         record.fields["Price"]       || '',
    etat:         record.fields["Condition"]   || '',
    inspection:   record.fields["Inspection"]  || '',
    // on préfère le lien Cloudinary si présent, sinon l’URL d’attachment
    images: cloudUrl 
      ? [cloudUrl] 
      : attachments.map(img => img?.url).filter(Boolean),
  };
}
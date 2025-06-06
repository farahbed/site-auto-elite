export async function fetchVoitures() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME; // "Car Listings"

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur Airtable ${res.status}: ${errorText}`);
  }

  const data = await res.json();

  return data.records.map(record => ({
    id: record.id,
    marque: record.fields["Car Make"],
    modele: record.fields["Car Model"],
    annee: record.fields["Year"],
    kilometrage: record.fields["Mileage"],
    prix: record.fields["Price"],
    etat: record.fields["Condition"],
    image: record.fields["Car Photo"]?.[0]?.url || "",
  }));
}
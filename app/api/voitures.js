// File: pages/api/voitures.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    marque, modele, annee, prix,
    kilometrage, carburant, transmission,
    puissance, portes, couleur,
    description, options, images
  } = req.body;

  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  const record = {
    fields: {
      'Car Make': marque,
      'Car Model': modele,
      'Year': parseInt(annee),
      'Price': parseFloat(prix),
      'Mileage': parseInt(kilometrage),
      'Fuel Type': carburant,
      'Transmission': transmission,
      'Horsepower': puissance,
      'Doors': portes,
      'Color': couleur,
      'Description': description,
      'Options': options,
      'Car Photo': images.map(url => ({ url }))
    }
  };

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }
  );
  const data = await airtableRes.json();
  if (!airtableRes.ok) return res.status(airtableRes.status).json({ error: data });
  res.status(200).json(data);
}

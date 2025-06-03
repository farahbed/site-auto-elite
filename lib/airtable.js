const BASE_ID = "pattqPUcRCdWo8AQj";
const TABLE_NAME = "Voitures";
const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_TOKEN;

export async function fetchVoitures() {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des données Airtable");
  }

  const data = await res.json();

  return data.records.map((record) => {
    const fields = record.fields;
    return {
      id: record.id,
      marque: fields.marque,
      modele: fields.modele,
      annee: fields.annee,
      prix: fields.prix,
      image: fields.image?.[0]?.url || "",
      description: fields.description,
      kilometrage: fields.kilometrage,
      carburant: fields.carburant,
      transmission: fields.transmission,
      puissance: fields.puissance,
      couleur: fields.couleur,
      portes: fields.portes,
      options: fields.options || [],
    };
  });
}

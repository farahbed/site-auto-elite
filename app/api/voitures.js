export default async function handler(req, res) {
  console.log("API handler appelé");

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/voitures`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Réponse API Airtable status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("Erreur API Airtable:", text);
      return res.status(response.status).json({ error: "Erreur Airtable", details: text });
    }

    const  = await response.json();
    console.log("Données reçues de Airtable:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur catch dans API handler:", error);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
}
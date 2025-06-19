import { normalizeVoitureRecord } from "@/lib/normalizeVoiture";

export default async function handler(req, res) {
  const { method, body, query: { id } } = req;
  const baseId    = process.env.AIRTABLE_BASE_ID;
  const apiKey    = process.env.AIRTABLE_API_KEY;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  if (!baseId||!apiKey||!tableName) {
    return res.status(500).json({ error: "Vars env manquantes." });
  }

  const urlBase = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  if (method === "GET") {
    const resp = await fetch(urlBase, { headers, cache: "no-store" });
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ error: data });
    return res.status(200).json(data.records.map(normalizeVoitureRecord));
  }

  if (method === "POST") {
    const {
      marque, modele, annee, kilometrage, prix, etat,
      carburant, transmission, portes, puissance, couleur,
      description, options = [], images = []
    } = body;

    const opts = Array.isArray(options)
      ? options
      : typeof options === "string"
        ? options.split(",").map(s=>s.trim()).filter(Boolean)
        : [];

    const validImgs = images
      .map(i => typeof i==="string"?i:i.url)
      .filter(u => u.startsWith("https://res.cloudinary.com"));

    const payload = {
      fields: {
        "Car Make":     marque,
        "Car Model":    modele,
        "Year":         Number(annee),
        "Mileage":      Number(kilometrage),
        "Price":        Number(prix),
        "Condition":    etat,
        "Fuel":         carburant,
        "Transmission": transmission,
        "Doors":        portes   ? Number(portes)   : undefined,
        "Power":        puissance? Number(puissance): undefined,
        "Color":        couleur  || undefined,
        "Description":  description|| undefined,
        "Options":      opts.join(", "),
        "Image URLs":   JSON.stringify(validImgs),
      }
    };

    const airtableRes = await fetch(urlBase, {
      method:  "POST",
      headers,
      body:    JSON.stringify(payload),
    });
    const result = await airtableRes.json();
    if (!airtableRes.ok) return res.status(airtableRes.status).json({ error: result });
    return res.status(200).json(result);
  }

  if (method === "PATCH") {
    if (!id) return res.status(400).json({ error: "ID manquant." });

    const {
      marque, modele, annee, kilometrage, prix, etat,
      carburant, transmission, portes, puissance, couleur,
      description, options = [], images = []
    } = body;

    const opts = Array.isArray(options)
      ? options
      : typeof options === "string"
        ? options.split(",").map(s=>s.trim()).filter(Boolean)
        : [];

    const validImgs = images
      .map(i => typeof i==="string"?i:i.url)
      .filter(u => u.startsWith("https://res.cloudinary.com"));

    const fields = {
      ...(marque       && { "Car Make":     marque }),
      ...(modele       && { "Car Model":    modele }),
      ...(annee        && { "Year":         Number(annee) }),
      ...(kilometrage  && { "Mileage":      Number(kilometrage) }),
      ...(prix         && { "Price":        Number(prix) }),
      ...(etat         && { "Condition":    etat }),
      ...(carburant    && { "Fuel":         carburant }),
      ...(transmission && { "Transmission": transmission }),
      ...(portes       && { "Doors":        Number(portes) }),
      ...(puissance    != null && { "Power":        Number(puissance) }),
      ...(couleur      && { "Color":        couleur }),
      ...(description  && { "Description":  description }),
      ...(opts.length  && { "Options":      opts.join(", ") }),
      ...(validImgs.length && { "Image URLs":  JSON.stringify(validImgs) }),
    };

    const resp = await fetch(`${urlBase}/${id}`, {
      method:  "PATCH",
      headers,
      body:    JSON.stringify({ fields }),
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ error: data });
    return res.status(200).json(data);
  }

  if (method === "DELETE") {
    if (!id) return res.status(400).json({ error: "ID manquant." });
    const del = await fetch(`${urlBase}/${id}`, { method: "DELETE", headers });
    const data = await del.json();
    if (!del.ok) return res.status(del.status).json({ error: data });
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["GET","POST","PATCH","DELETE"]);
  res.status(405).end("Method Not Allowed");
}
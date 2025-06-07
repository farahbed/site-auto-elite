// app/api/voitures/route.js
import { NextResponse } from "next/server";

const baseId    = process.env.AIRTABLE_BASE_ID;
const apiKey    = process.env.AIRTABLE_API_KEY;
const tableName = process.env.AIRTABLE_TABLE_NAME;

if (!baseId || !apiKey || !tableName) {
  throw new Error("⛔ Variables d'environnement Airtable manquantes.");
}
const airtableBaseUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

// GET /api/voitures
export async function GET() {
  const res = await fetch(airtableBaseUrl, { headers, cache: "no-store" });
  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: txt }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

// POST /api/voitures
export async function POST(request) {
  const body = await request.json();
  // attend un objet { marque, modele, annee, prix, kilometrage, etc., options: [], images: [url1, url2...] }
  const fields = {
    "Car Make":      body.marque,
    "Car Model":     body.modele,
    "Year":          body.annee,
    "Price":         body.prix,
    "Mileage":       body.kilometrage,
    "Fuel Type":     body.carburant,
    "Transmission":  body.transmission,
    "Horsepower":    body.puissance,
    "Doors":         body.portes,
    "Color":         body.couleur,
    "Description":   body.description,
    "Options":       body.options || [],
    // si tu veux gérer plusieurs images, expect un tableau d'URL dans body.images :
    // Airtable veut la forme [{ url: "https://..."}, ...]
    "Car Photo":     Array.isArray(body.images)
                       ? body.images.map((url) => ({ url }))
                       : body.images ? [{ url: body.images }] : [],
  };

  const res = await fetch(airtableBaseUrl, {
    method:  "POST",
    headers,
    body:    JSON.stringify({ records: [{ fields }] }),
  });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: txt }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/voitures?id=recXYZ...
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Paramètre id requis" }, { status: 400 });
  }

  const res = await fetch(`${airtableBaseUrl}/${id}`, {
    method:  "DELETE",
    headers,
  });
  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: txt }, { status: res.status });
  }
  const data = await res.json(); // contient deleted: true, id, etc.
  return NextResponse.json(data);
}
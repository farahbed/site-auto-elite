// app/vehicules/page.js
import { fetchVoitures } from "@/lib/airtable";
import VoitureCatalogueClient from "@/components/VoitureCatalogueClient";

export default async function Page() {
  const voitures = await fetchVoitures();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos véhicules disponibles</h1>
      <VoitureCatalogueClient voitures={voitures} />
    </section>
  );
}
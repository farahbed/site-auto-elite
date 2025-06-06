// app/vehicules/page.js
import { fetchVoitures } from "@/lib/airtable";
import CardVoiture       from "@/components/CardVoiture";

export default async function Page() {
  const voitures = await fetchVoitures();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos véhicules disponibles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {voitures.length > 0 ? (
          voitures.map(v => <CardVoiture key={v.id} voiture={v} />)
        ) : (
          <p>Aucune voiture disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
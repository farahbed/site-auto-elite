import { fetchVoitures } from "@/lib/airtable";

export default async function VoitureDetailPage({ params }) {
  const voitures = await fetchVoitures();
  const voiture = voitures.find(v => v.id === params.id);

  if (!voiture) {
    return <p className="text-red-500 text-center mt-10">Voiture introuvable.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={voiture.image}
        alt={`${voiture.marque} ${voiture.modele}`}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">
        {voiture.marque} {voiture.modele} – {voiture.annee}
      </h1>
      <p className="text-red-600 text-2xl font-semibold mb-4">
        {voiture.prix?.toLocaleString()} €
      </p>
      <p>Kilométrage : {voiture.kilometrage?.toLocaleString()} km</p>
      <p>État : {voiture.etat}</p>
    </section>
  );
}
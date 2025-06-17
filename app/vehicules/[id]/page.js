// app/vehicules/[id]/page.js
import { fetchVoitures } from "@/lib/airtable";
import CarrouselImages from "@/components/CarrouselImages";
import Link from "next/link";

export default async function VoitureDetailPage({ params }) {
  const voiture = (await fetchVoitures()).find(v => v.id === params.id);

  if (!voiture) {
    return (
      <p className="text-red-500 text-center mt-10">
        Voiture introuvable.
      </p>
    );
  }

  const {
    marque,
    modele,
    annee,
    prix,
    kilometrage,
    etat,
    carburant,
    transmission,
    puissance,
    portes,
    couleur,
    description,
    options = [],
    images,
    inspection,
  } = voiture;

  // ✅ On nettoie les images pour s'assurer qu'on n'a que des URLs
  const imageUrls = Array.isArray(images)
    ? images.map(img => typeof img === 'string' ? img : img?.url).filter(Boolean)
    : [];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-white space-y-6">
      {/* Galerie d'images */}
      {imageUrls.length > 0 ? (
        <CarrouselImages images={imageUrls} />
      ) : (
        <p className="text-center text-gray-400">Pas de photo disponible</p>
      )}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h1 className="text-3xl font-bold">
          {marque} {modele} — {annee}
        </h1>
        <span className="text-2xl font-extrabold text-red-500">
          {prix?.toLocaleString()} €
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800 p-6 rounded">
        <div>
          <p><span className="font-semibold">Kilométrage :</span> {kilometrage?.toLocaleString()} km</p>
          <p><span className="font-semibold">État :</span> {etat}</p>
        </div>
        <div>
          {carburant && <p><span className="font-semibold">Carburant :</span> {carburant}</p>}
          {transmission && <p><span className="font-semibold">Transmission :</span> {transmission}</p>}
          {puissance && <p><span className="font-semibold">Puissance :</span> {puissance} ch</p>}
          {portes != null && <p><span className="font-semibold">Portes :</span> {portes}</p>}
          {couleur && <p><span className="font-semibold">Couleur :</span> {couleur}</p>}
        </div>
      </div>

      {description && (
        <div className="bg-gray-900 p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-line">{description}</p>
        </div>
      )}

      {options.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Options</h2>
          <ul className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
              <li
                key={i}
                className="bg-indigo-600 px-3 py-1 rounded-full text-sm"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {inspection && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Rapport d’inspection</h2>
          <a
            href={inspection}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:underline"
          >
            Voir le rapport
          </a>
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/vehicules"
          className="inline-block text-red-400 hover:text-red-600 transition font-medium"
        >
          ← Retour au catalogue
        </Link>
      </div>
    </section>
  );
}
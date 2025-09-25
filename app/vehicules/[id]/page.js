import { fetchVoitures } from "@/lib/airtable";
import CarrouselImages from "@/components/CarrouselImages";
import Link from "next/link";
import {
  Car, Calendar, Gauge, Fuel, Settings, Droplet,
  MapPin, DoorOpen
} from "lucide-react";

export default async function VoitureDetailPage({ params }) {
  const voiture = (await fetchVoitures()).find(v => v.id === params.id);

  if (!voiture) {
    return <p className="text-red-500 text-center mt-10">Voiture introuvable.</p>;
  }

  const {
    marque, modele, annee, prix,
    kilometrage, carburant,
    transmission, puissance, portes,
    couleur, description, options = [],
    images, inspection,
    lienBoncoin
  } = voiture;

  // liste des specs à afficher
  const specs = [
    { icon: Car,       label: "Marque",          value: `${marque} ${modele}` },
    { icon: Calendar,  label: "Année",           value: annee },
    { icon: Gauge,     label: "Kilométrage",     value: `${kilometrage.toLocaleString()} km` },
    { icon: Fuel,      label: "Carburant",       value: carburant },
    { icon: Settings,  label: "Transmission",    value: transmission },
    { icon: DoorOpen,  label: "Portes",          value: portes },
    { icon: Droplet,   label: "Couleur",         value: couleur },
    { icon: MapPin,    label: "Puissance (ch)",  value: puissance },
  ].filter(item => item.value !== undefined && item.value !== "");

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-text space-y-6">
      {/* Galerie */}
     {images?.length ? (
  lienBoncoin ? (
    <a
      href={lienBoncoin}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
    >
      <CarrouselImages images={images} />

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <span className="text-white font-semibold bg-orange-500 px-4 py-2 rounded-lg shadow">
          🔗 Voir sur Le Bon Coin
        </span>
      </div>
    </a>
  ) : (
    <CarrouselImages images={images} />
  )
) : (
  <p className="text-center text-subtle">Pas de photo disponible</p>
)}

      {/* Titre + Prix */}
      <div className="flex justify-between items-end flex-wrap gap-4">
        <h1 className="text-3xl font-bold">{marque} {modele} — {annee}</h1>
        <span className="text-2xl font-extrabold text-primary">
          {prix.toLocaleString()} €
        </span>
      </div>

      {/* Bouton vers Le Bon Coin */}
      {lienBoncoin && (
        <div className="mt-4">
          <a
            href={lienBoncoin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            🔗 Voir l’annonce sur Le Bon Coin
          </a>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-surface p-6 rounded border border-border">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-line text-text">{description}</p>
        </div>
      )}

      {/* Options */}
      {options.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Options</h2>
          <ul className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
              <li key={i} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rapport inspection */}
      {inspection && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Rapport d’inspection</h2>
          <a
            href={inspection}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Voir le rapport
          </a>
        </div>
      )}

      {/* Retour */}
      <div className="mt-8">
        <Link href="/vehicules" className="text-primary hover:text-primary-hover">
          ← Retour au catalogue
        </Link>
      </div>
    </section>
  );
}
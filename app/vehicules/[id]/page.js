import { fetchVoitures } from "@/lib/airtable";
import CarrouselImages from "@/components/CarrouselImages";
import Link from "next/link";
import {
  Car, Calendar, Gauge, Fuel, Settings, Droplet,
  KeyRound, Hash, ListChecks, MapPin, Steering2, DoorOpen
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
  } = voiture;

  // on crée la liste des specs à afficher
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
    <CarrouselImages images={images} />
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

  {/* Caractéristiques */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface p-6 rounded border border-border">
    {specs.map(({ icon: Icon, label, value }) => (
      <div key={label} className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" />
        <div>
          <p className="text-sm text-subtle">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Description libre */}
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
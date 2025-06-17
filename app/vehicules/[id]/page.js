// app/vehicules/[id]/page.js
import { fetchVoitures } from "@/lib/airtable";
import CarrouselImages from "@/components/CarrouselImages";
import Link from "next/link";
import {
  Car,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Droplet,
  KeyRound,
  Hash,
  ListChecks,
  MapPin,
  Steering2,
  DoorOpen,
} from "lucide-react";

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
    version,
    typeVehicule,
    puissanceFiscale,
    puissanceDIN,
  } = voiture;

  const specs = [
    { icon: Car,         label: "Marque",           value: `${marque} ${modele}` },
    { icon: Calendar,    label: "Année",            value: annee },
    { icon: Gauge,       label: "Kilométrage",      value: `${kilometrage.toLocaleString()} km` },
    { icon: Fuel,        label: "Carburant",        value: carburant },
    { icon: DoorOpen,    label: "Portes",           value: portes },
    { icon: Droplet,     label: "Couleur",          value: couleur },
    { icon: Settings,    label: "Transmission",     value: transmission },
    { icon: ListChecks,  label: "État",             value: etat },
    { icon: KeyRound,    label: "Type véhicule",    value: typeVehicule },
    { icon: Hash,        label: "Puissance fiscale",value: `${puissanceFiscale} Cv` },
    { icon: MapPin,      label: "Puissance DIN",    value: `${puissanceDIN} Ch` },
    { icon: Settings,    label: "Version",          value: version },
  ].filter(item => item.value != null);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-white space-y-6">
      {/* Galerie d'images */}
      {images?.length > 0 ? (
        <CarrouselImages images={images} />
      ) : (
        <p className="text-center text-gray-400">Pas de photo disponible</p>
      )}

      {/* Titre et prix */}
      <div className="flex flex-col md:flex-row md:justify-between items-end gap-4">
        <h1 className="text-3xl font-bold">
          {marque} {modele} — {annee}
        </h1>
        <span className="text-2xl font-extrabold text-red-500">
          {prix.toLocaleString()} €
        </span>
      </div>

      {/* Caractéristiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800 p-6 rounded">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-6 h-6 text-indigo-300" />
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description libre */}
      {description && (
        <div className="bg-gray-900 p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-line">{description}</p>
        </div>
      )}

      {/* Options */}
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

      {/* Rapport d’inspection */}
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

      {/* Retour au catalogue */}
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
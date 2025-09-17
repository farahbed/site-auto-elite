import Image from "next/image";

export default function Page() {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-surface text-text rounded-2xl shadow-xl border border-border text-center">
      {/* Logo centré */}
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/logo.jpg"
          alt="Logo GT AUTOS"
          width={160}
          height={160}
          className="object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">À propos de GT AUTOS</h1>

      <p className="text-subtle leading-relaxed mb-4">
        <strong>GT AUTOS</strong>, spécialiste automobiles de 1ère main de véhicules particuliers & utilitaires.
      </p>

      <p className="text-subtle leading-relaxed mb-4">
        Nos véhicules proviennent exclusivement de retours de <strong>LLD (location longue durée)</strong> effectués par des
        professionnels. Ils ont tous bénéficié d’un entretien constructeur régulier et disposent d’une garantie mécanique
        de <strong>6 à 12 mois</strong>. Nous nous efforçons également d’être parmi les plus compétitifs du marché.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Nos prestations</h2>
      <ul className="list-disc list-inside text-subtle leading-relaxed space-y-2 text-left max-w-2xl mx-auto">
        <li>Vente de véhicules d'occasion 1ère main, entretenus dans le réseau constructeur</li>
        <li>Vente de véhicules d’une gamme petit prix (véhicules de reprise client avec entretiens)</li>
        <li>Reprise de votre ancien véhicule (uniquement avec factures d’entretiens)</li>
        <li>Location de véhicules à usage professionnel</li>
        <li>Accompagnement dans la recherche d’un véhicule, qualification de projet et conseils</li>
        <li>Extension de garantie possible jusqu’à 48 mois</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Nos coordonnées</h2>
      <p className="text-subtle leading-relaxed mb-4">
        Notre point de vente est situé au :
        <br />
        <strong>9 Avenue de Norvège, 91140 Villebon-sur-Yvette</strong>
        <br />
        (à 15 min de la gare de Massy TGV, accessible via RER B/C & TGV)
      </p>

      <p className="text-subtle leading-relaxed">
        <strong>Uniquement sur rendez-vous :</strong>
        <br />
        Lundi au vendredi : 9h – 12h / 13h – 19h
        <br />
        Samedi : 9h – 19h
        <br />
        Dimanche : fermé
      </p>
    </section>
  );
}
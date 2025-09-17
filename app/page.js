import Link from "next/link";
import CardVoiture from "../components/CardVoiture";
import { fetchVoitures } from "../lib/airtable";
import Image from "next/image";

export default async function HomePage() {
  const voitures = await fetchVoitures();

  return (
    <div className="space-y-32 bg-bg text-text">
      {/* HERO AVEC IMAGE - full width */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/gt-autos-banner.webp"
          alt="GT Autos Banner"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />

        {/* Overlay léger */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Contenu */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-black drop-shadow-lg">
              Voitures d’occasion haut de gamme
            </h1>
            <p className="text-lg md:text-xl mb-6 text-black drop-shadow">
              Sélectionnées, contrôlées et prêtes à partir.
            </p>
            <Link
              href="/vehicules"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded text-base uppercase tracking-wider inline-block mt-2 shadow-md"
            >
              Voir les véhicules
            </Link>
          </div>
        </div>
      </section>

      {/* COUPS DE CŒUR */}
      <section className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10 uppercase tracking-wide">
          Notre sélection coup de cœur
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {voitures.slice(0, 3).map((voiture) => (
            <CardVoiture key={voiture.id} voiture={voiture} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/vehicules"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded uppercase tracking-wider text-base shadow-md transition"
          >
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      {/* TIMELINE COMMENT ÇA MARCHE */}
      <section className="bg-bg text-text py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-20 uppercase tracking-wide">
            Comment ça marche ?
          </h2>

          <div className="relative hidden md:block">
            {/* Ligne centrale dorée */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>

            <div className="space-y-20">
              {/* Étape 1 - gauche */}
              <div className="flex items-start justify-start relative">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-2">1. Choisissez votre véhicule</h3>
                  <p>
                    Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins.
                  </p>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-[-10px] w-5 h-5 bg-primary rounded-full border-4 border-white" />
                </div>
              </div>

              {/* Étape 2 - droite */}
              <div className="flex items-start justify-end relative">
                <div className="w-1/2 relative">
                  <div className="absolute top-2 right-[-10px] w-5 h-5 bg-primary rounded-full border-4 border-white" />
                </div>
                <div className="w-1/2 pl-8 text-left">
                  <h3 className="text-xl font-bold mb-2">2. Contactez-nous</h3>
                  <p>
                    Appelez-nous ou utilisez notre formulaire pour organiser une visite ou poser vos questions.
                  </p>
                </div>
              </div>

              {/* Étape 3 - gauche */}
              <div className="flex items-start justify-start relative">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-2">3. Livraison ou retrait</h3>
                  <p>
                    Retirez votre voiture chez nous ou recevez-la directement chez vous.
                  </p>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-[-10px] w-5 h-5 bg-primary rounded-full border-4 border-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Version mobile en colonne */}
          <div className="flex flex-col space-y-12 md:hidden">
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-primary rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-2">1. Choisissez votre véhicule</h3>
              <p>Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins.</p>
            </div>
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-primary rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-2">2. Contactez-nous</h3>
              <p>Appelez-nous ou utilisez notre formulaire pour organiser une visite ou poser vos questions.</p>
            </div>
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-primary rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-2">3. Livraison ou retrait</h3>
              <p>Retirez votre voiture chez nous ou recevez-la directement chez vous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* APPEL À L’ACTION */}
      <section className="text-center px-4 sm:px-6 py-20 bg-surface text-text">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Vous souhaitez revendre votre voiture ?
          </h2>
          <p className="text-subtle text-lg">
            Nous reprenons votre ancien véhicule, avec ou sans achat. Réponse sous 24h.
          </p>
          <Link
            href="/rachat"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded uppercase tracking-wider text-base shadow-md"
          >
            Proposer mon véhicule
          </Link>
        </div>
      </section>

      {/* MAP */}
      <section className="w-full max-w-4xl mx-auto px-4 py-16">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-primary uppercase tracking-wide">GT AUTOS</h2>
          <p className="text-subtle text-lg">
            9 Avenue de Norvège, 91140 Villebon-sur-Yvette, France
          </p>
        </div>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-2 border-primary">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.7092058233575!2d2.20679779064981!3d48.69192413844102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5d62ec3395f8b%3A0x2205a00d70f7d8e2!2s9%20Av.%20de%20Norv%C3%A8ge%2C%2091140%20Villebon-sur-Yvette!5e0!3m2!1sfr!2sfr!4v1748602744063!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
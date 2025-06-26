import Link from "next/link";
import CardVoiture from "../components/CardVoiture";
import { fetchVoitures } from "../lib/airtable";

export default async function HomePage() {
  const voitures = await fetchVoitures();

  return (
    <div className="space-y-24">
      {/* HERO AVEC IMAGE */}
      <section
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-6"
        style={{ backgroundImage: "url('/images/intro.jpg')" }}
      >
        <div className="bg-black/60 p-8 rounded">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
            Voitures d’occasion haut de gamme
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Sélectionnées, contrôlées et prêtes à partir.
          </p>
          <Link
            href="/vehicules"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-sm uppercase tracking-wider inline-block mt-2"
          >
            Voir les véhicules
          </Link>
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR */}
      <section className="max-w-5xl mx-auto px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-500">Pourquoi nous faire confiance ?</h2>
        <p className="text-gray-300 leading-relaxed">
          Auto Élite vous propose une sélection exclusive de véhicules d’occasion, contrôlés et garantis.  
          Grâce à notre expérience, vous bénéficiez d’un service transparent, d’un accompagnement personnalisé et d’une 
          qualité irréprochable.  
        </p>
      </section>

      {/* COUPS DE CŒUR */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-red-500 mb-6">Notre sélection coup de cœur</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {voitures.slice(0, 3).map((voiture) => (
            <CardVoiture key={voiture.id} voiture={voiture} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/vehicules"
            className="inline-block bg-black text-white border border-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      {/* TIMELINE COMMENT ÇA MARCHE */}
      <section className="relative bg-black text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-red-500 mb-20">Comment ça marche ?</h2>

          <div className="relative hidden md:block">
            {/* Ligne centrale desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-600"></div>

            <div className="space-y-20">
              {/* Étape 1 - gauche */}
              <div className="flex items-start justify-start relative">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-1">1. Choisissez votre véhicule</h3>
                  <p className="text-gray-300">
                    Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins.
                  </p>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-[-10px] w-5 h-5 bg-red-600 rounded-full border-4 border-black" />
                </div>
              </div>

              {/* Étape 2 - droite */}
              <div className="flex items-start justify-end relative">
                <div className="w-1/2 relative">
                  <div className="absolute top-2 right-[-10px] w-5 h-5 bg-red-600 rounded-full border-4 border-black" />
                </div>
                <div className="w-1/2 pl-8 text-left">
                  <h3 className="text-xl font-bold mb-1">2. Contactez-nous</h3>
                  <p className="text-gray-300">
                    Appelez-nous ou utilisez notre formulaire pour organiser une visite ou poser vos questions.
                  </p>
                </div>
              </div>

              {/* Étape 3 - gauche */}
              <div className="flex items-start justify-start relative">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold mb-1">3. Livraison ou retrait</h3>
                  <p className="text-gray-300">
                    Retirez votre voiture chez nous ou recevez-la directement chez vous.
                  </p>
                </div>
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-[-10px] w-5 h-5 bg-red-600 rounded-full border-4 border-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Version mobile en colonne */}
          <div className="flex flex-col space-y-12 md:hidden">
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-red-600 rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-1">1. Choisissez votre véhicule</h3>
              <p className="text-gray-300">Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins.</p>
            </div>
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-red-600 rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-1">2. Contactez-nous</h3>
              <p className="text-gray-300">Appelez-nous ou utilisez notre formulaire pour organiser une visite ou poser vos questions.</p>
            </div>
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-2 bg-red-600 rounded-full border-4 border-white" />
              <h3 className="text-lg font-bold mb-1">3. Livraison ou retrait</h3>
              <p className="text-gray-300">Retirez votre voiture chez nous ou recevez-la directement chez vous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* APPEL À L’ACTION */}
      <section className="text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Vous souhaitez revendre votre voiture ?</h2>
        <p className="text-gray-300 mb-6">Nous reprenons votre ancien véhicule, avec ou sans achat. Réponse sous 24h.</p>
        <Link
          href="/rachat"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded uppercase tracking-wider"
        >
          Proposer mon véhicule
        </Link>
      </section>

      {/* MAP */}
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-white">Garage Villebon Auto</h2>
          <p className="text-gray-300">9 Avenue de Norvège, 91140 Villebon-sur-Yvette, France</p>
        </div>
        <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
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
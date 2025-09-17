import Link from "next/link";
import CardVoiture from "../components/CardVoiture";
import { fetchVoitures } from "../lib/airtable";
import Image from "next/image";

export default async function HomePage() {
  const voitures = await fetchVoitures();

  return (
    <div className="space-y-32 bg-bg text-text">
      {/* HERO AVEC IMAGE - full width */}
      <section className="relative h-[60vh] sm:h-[80vh] lg:h-screen w-full">
 <Image
  src="/images/banner.jpeg"
  alt="GT Autos Banner"
  fill
  priority
  quality={100}
  unoptimized
  className="object-cover object-center"
/>

  {/* Overlay léger */}
  <div className="absolute inset-0 bg-black/20 z-10"></div>

  {/* Contenu */}
  <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
    <div className="text-center max-w-2xl">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight text-black drop-shadow-lg">
        Voitures d’occasion haut de gamme
      </h1>
      <p className="text-sm sm:text-lg md:text-xl mb-6 text-black drop-shadow">
        Sélectionnées, contrôlées et prêtes à partir.
      </p>
      <Link
        href="/vehicules"
        className="bg-primary hover:bg-primary-hover text-white px-5 py-3 sm:px-6 sm:py-3 rounded text-xs sm:text-sm md:text-base uppercase tracking-wider inline-block mt-2 shadow-md"
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

 {/* INTRO À PROPOS */}
<section className="bg-gradient-to-b from-[#fdfdfb] to-[#f7f7f4] text-text py-24">
  <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
    {/* Titre */}
    <h2 className="text-3xl sm:text-4xl font-bold text-primary uppercase tracking-wide">
      À propos de GT AUTOS
    </h2>

    {/* Texte */}
    <p className="text-lg sm:text-xl text-subtle leading-relaxed">
      Spécialiste des <span className="font-semibold text-text">véhicules particuliers & utilitaires de 1ère main</span>,  
      GT AUTOS propose uniquement des modèles issus de retours de location longue durée de professionnels.  
      Tous nos véhicules bénéficient d’un <span className="font-semibold text-text">entretien constructeur régulier</span>  
      et d’une <span className="font-semibold text-text">garantie mécanique de 6 à 12 mois</span>.
    </p>

    <p className="text-base sm:text-lg text-subtle leading-relaxed max-w-3xl mx-auto">
      De la <span className="font-medium text-text">reprise de votre ancien véhicule</span> à la  
      <span className="font-medium text-text"> location professionnelle</span>, en passant par un  
      <span className="font-medium text-text"> accompagnement personnalisé</span>,  
      notre objectif est simple : vous offrir la meilleure expérience automobile au prix le plus compétitif.
    </p>

    {/* Bouton */}
    <Link
      href="/a-propos"
      className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg uppercase tracking-wide text-base shadow-md transition"
    >
      Découvrir nos engagements
    </Link>
  </div>
</section>

     {/* TIMELINE COMMENT ÇA MARCHE */}
<section className="bg-bg text-text py-24">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-primary mb-20 uppercase tracking-wide">
      Comment ça marche ?
    </h2>

    {/* Version desktop timeline */}
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

        {/* Étape 4 - droite (NOUVEAU) */}
        <div className="flex items-start justify-end relative">
          <div className="w-1/2 relative">
            <div className="absolute top-2 right-[-10px] w-5 h-5 bg-primary rounded-full border-4 border-white" />
          </div>
          <div className="w-1/2 pl-8 text-left">
            <h3 className="text-xl font-bold mb-2">4. Louez un véhicule</h3>
            <p>
              Besoin d’une solution temporaire ? Profitez de notre service de location adapté aux professionnels et particuliers.
            </p>
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
      <div className="text-center">
        <div className="w-5 h-5 mx-auto mb-2 bg-primary rounded-full border-4 border-white" />
        <h3 className="text-lg font-bold mb-2">4. Louez un véhicule</h3>
        <p>Besoin d’une solution temporaire ? Profitez de notre service de location adapté aux professionnels et particuliers.</p>
      </div>
    </div>
  </div>
</section>
{/* APPEL À L’ACTION */}
<section className="py-20 bg-bg text-text">
  <div className="max-w-2xl mx-auto text-center px-6 bg-[#f9f9f6] border border-primary rounded-2xl shadow-lg p-10">
    
    {/* Titre */}
    <h2 className="text-3xl sm:text-4xl font-bold mb-4 uppercase tracking-wide text-primary">
      Revendez votre voiture en toute sérénité
    </h2>
    
    {/* Sous-texte */}
    <p className="text-lg text-subtle mb-8 leading-relaxed">
      Nous reprenons votre véhicule avec ou sans nouvel achat.<br />
      <span className="font-medium text-text">Estimation gratuite</span> et réponse garantie sous 24h.
    </p>
    
    {/* Bouton premium */}
    <Link
      href="/rachat"
      className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-lg uppercase tracking-wide text-base transition shadow-md"
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
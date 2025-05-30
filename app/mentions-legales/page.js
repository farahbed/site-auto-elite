export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>Nom de l’entreprise : <strong>Auto Élite</strong></p>
        <p>Forme juridique : SAS</p>
        <p>Capital social : 10 000 €</p>
        <p>Siège social : 9 Avenue de Norvège, 91140 Villebon-sur-Yvette</p>
        <p>SIRET : 000 000 000 00000</p>
        <p>RCS : [VILLE DU GREFFE]</p>
        <p>Responsable de la publication : M. [Nom du Gérant]</p>
        <p>Email : contact@autoelite.fr</p>
        <p>Téléphone : 01 23 45 67 89</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>Nom de l’hébergeur : Hostinger International Ltd.</p>
        <p>Adresse : 61 Lordou Vironos, Larnaca 6023, Chypre</p>
        <p>Site : <a href="https://www.hostinger.fr" target="_blank" className="text-blue-600 underline">www.hostinger.fr</a></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Activité</h2>
        <p>
          Le site Auto Élite permet la consultation de véhicules d’occasion à la
          vente et propose un service de reprise de véhicules. Toutes les
          annonces sont non contractuelles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur le site (textes, photos, logos,
          graphismes) sont la propriété exclusive d’Auto Élite ou de ses
          partenaires. Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
        <p>
          Les données collectées via les formulaires sont utilisées uniquement
          dans le cadre de la relation commerciale. Conformément au RGPD, vous
          pouvez demander l’accès, la rectification ou la suppression de vos
          données en envoyant un email à <strong>contact@autoelite.fr</strong>.
        </p>
      </section>
    </div>
  );
}
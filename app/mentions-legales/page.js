export default function MentionsLegales() {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-title-on-dark">Éditeur du site</h2>
        <ul className="text-subtle space-y-1">
          <li><strong>Nom de l’entreprise :</strong> Auto Élite</li>
          <li><strong>Forme juridique :</strong> SAS</li>
          <li><strong>Capital social :</strong> 10 000 €</li>
          <li><strong>Siège social :</strong> 9 Avenue de Norvège, 91140 Villebon-sur-Yvette</li>
          <li><strong>SIRET :</strong> 000 000 000 00000</li>
          <li><strong>RCS :</strong> [VILLE DU GREFFE]</li>
          <li><strong>Responsable de la publication :</strong> M. [Nom du Gérant]</li>
          <li><strong>Email :</strong> contact@autoelite.fr</li>
          <li><strong>Téléphone :</strong> 01 23 45 67 89</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-title-on-dark">Hébergement</h2>
        <ul className="text-subtle space-y-1">
          <li><strong>Hébergeur :</strong> Hostinger International Ltd.</li>
          <li><strong>Adresse :</strong> 61 Lordou Vironos, Larnaca 6023, Chypre</li>
          <li>
            <strong>Site :</strong>{" "}
            <a
              href="https://www.hostinger.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.hostinger.fr
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-title-on-dark">Activité</h2>
        <p className="text-subtle leading-relaxed">
          Le site Auto Élite permet la consultation de véhicules d’occasion à la vente et propose un service de reprise
          de véhicules. Toutes les annonces sont non contractuelles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-title-on-dark">Propriété intellectuelle</h2>
        <p className="text-subtle leading-relaxed">
          Tous les contenus présents sur le site (textes, photos, logos, graphismes) sont la propriété exclusive
          d’Auto Élite ou de ses partenaires. Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-title-on-dark">Données personnelles</h2>
        <p className="text-subtle leading-relaxed">
          Les données collectées via les formulaires sont utilisées uniquement dans le cadre de la relation commerciale.
          Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en
          envoyant un email à <strong>contact@autoelite.fr</strong>.
        </p>
      </section>
    </section>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-white">Contact</h3>
          <p>
            Auto Élite<br />
            9 Avenue de Norvège<br />
            91140 Villebon-sur-Yvette
          </p>
          <p className="mt-3">
            📞 01 23 45 67 89<br />
            📧 contact@autoelite.fr
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-white">Liens utiles</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/mentions-legales" className="hover:text-white hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/login?next=/admin" className="hover:text-white hover:underline">
                Espace admin
              </Link>
            </li>
            <li>
              <a
                href="https://www.leboncoin.fr/recherche?category=2&owner_type=pro&locations=Villebon-sur-Yvette"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                Voir sur Le Bon Coin
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-white">Horaires</h3>
          <p>
            Lundi – Vendredi : 9h - 18h<br />
            Samedi : 10h - 17h<br />
            Dimanche : fermé
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Auto Élite – Tous droits réservés · Site réalisé par <span className="text-white font-semibold">Farah</span>
      </div>
    </footer>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-500 text-white px-4 py-12 border-t border-gray-600">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-sm text-center sm:text-left">
        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-3">📍 Contact</h3>
          <p>
            GT AUTOS<br />
            9 Avenue de Norvège<br />
            91140 Villebon-sur-Yvette
          </p>
          <p className="mt-3">
            📞 01 23 45 67 89<br />
            📧 Gt.autos91@gmail.com 
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-base font-semibold mb-3">🔗 Liens utiles</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/login?next=/admin" className="hover:underline">
                Espace Admin
              </Link>
            </li>
            <li>
              <a
                href="https://www.leboncoin.fr/boutique/98759/g_t_autos.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Voir sur Le Bon Coin
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h3 className="text-base font-semibold mb-3">🕒 Horaires</h3>
          <p>
            Lundi – Vendredi : 9h - 18h<br />
            Samedi : 10h - 17h<br />
            Dimanche : Fermé
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} GT AUTOS – Tous droits réservés · Site réalisé par{" "}
        <span className="font-semibold">Farah</span>
      </div>
    </footer>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-4 py-16 border-t-4 border-primary">
      <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 text-sm text-center sm:text-left">
        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-primary uppercase tracking-wide">📍 Contact</h3>
          <p className="leading-relaxed">
            GT AUTOS<br />
            9 Avenue de Norvège<br />
            91140 Villebon-sur-Yvette
          </p>
          <p className="mt-4 leading-relaxed">
            📞 01 23 45 67 89<br />
            📧 Gt.autos91@gmail.com 
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-primary uppercase tracking-wide">🔗 Liens utiles</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/mentions-legales" className="hover:text-primary transition">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/login?next=/admin" className="hover:text-primary transition">
                Espace Admin
              </Link>
            </li>
            <li>
              <a
                href="https://www.leboncoin.fr/boutique/98759/g_t_autos.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                Voir sur Le Bon Coin
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-primary uppercase tracking-wide">🕒 Horaires</h3>
          <p className="leading-relaxed">
            Lundi – Vendredi : 9h/12h - 13h/19h<br />
            Samedi : 9h/19h<br />
            Dimanche : Fermé
          </p>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} GT AUTOS – Tous droits réservés · Site réalisé par{" "}
        <span className="font-semibold text-primary">Farah</span>
      </div>
    </footer>
  );
}
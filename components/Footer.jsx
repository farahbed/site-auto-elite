import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-4 py-6 border-t-4 border-primary">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-3 text-xs">
        {/* Contact */}
        <div className="text-center sm:text-left space-y-1">
          <h3 className="font-semibold text-primary uppercase tracking-wide">📍 Contact</h3>
          <p>
            GT AUTOS<br />
            9 Av. de Norvège<br />
            91140 Villebon
          </p>
          <p>
            📞 01 23 45 67 89<br />
            📧 Gt.autos91@gmail.com
          </p>
        </div>

        {/* Liens utiles */}
        <div className="text-center sm:text-left space-y-1">
          <h3 className="font-semibold text-primary uppercase tracking-wide">🔗 Liens</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/mentions-legales" className="hover:text-primary transition">
                Mentions légales
              </Link>
            </li>
            <li>
              <a
                href="https://www.leboncoin.fr/boutique/98759/g_t_autos.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                Leboncoin
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div className="text-center sm:text-left space-y-1">
          <h3 className="font-semibold text-primary uppercase tracking-wide">🕒 Horaires</h3>
          <p>
            Lun–Ven : 9h-19h<br />
            Sam : 9h-19h<br />
            Dim : Fermé
          </p>
        </div>
      </div>

      {/* Ligne fine + Copyright */}
      <div className="mt-6 border-t border-gray-200 pt-3 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} GT AUTOS – Site réalisé par{" "}
        <span className="font-semibold text-primary">Farah</span>
      </div>
    </footer>
  );
}
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-wide">Auto Élite</span>
        </Link>
        <nav className="space-x-6 text-sm uppercase font-medium tracking-wider">
            <Link href="/" className="hover:text-red-500 transition">Accueil</Link>
          <Link href="/vehicules" className="hover:text-red-500 transition">Véhicules</Link>
          <Link href="/a-propos" className="hover:text-red-500 transition">À propos</Link>
          <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
            <Link href="/rachat" className="hover:text-red-500 transition">Rachat</Link>
        </nav>
      </div>
    </header>
  );
}
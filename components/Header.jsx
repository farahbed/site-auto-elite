"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-wide">Auto Élite</span>
        </Link>

        {/* Bouton menu mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu desktop */}
        <nav className="hidden sm:flex space-x-6 text-sm uppercase font-medium tracking-wider">
          <Link href="/" className="hover:text-primary transition">Accueil</Link>
          <Link href="/vehicules" className="hover:text-primary transition">Véhicules</Link>
          <Link href="/a-propos" className="hover:text-primary transition">À propos</Link>
          <Link href="/contact" className="hover:text-primary transition">Contact</Link>
          <Link href="/rachat" className="hover:text-primary transition">Rachat</Link>
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4 flex flex-col space-y-4 text-sm uppercase font-medium tracking-wider bg-gray-500 text-white">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Accueil</Link>
          <Link href="/vehicules" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Véhicules</Link>
          <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">À propos</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Contact</Link>
          <Link href="/rachat" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Rachat</Link>
        </nav>
      )}
    </header>
  );
}
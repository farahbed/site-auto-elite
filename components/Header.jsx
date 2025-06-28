"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icônes

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-overlay text-text shadow-md">
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
          <Link href="/" className="hover:text-red-500 transition">Accueil</Link>
          <Link href="/vehicules" className="hover:text-red-500 transition">Véhicules</Link>
          <Link href="/a-propos" className="hover:text-red-500 transition">À propos</Link>
          <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
          <Link href="/rachat" className="hover:text-red-500 transition">Rachat</Link>
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4 flex flex-col space-y-4 text-sm uppercase font-medium tracking-wider bg-overlay">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition">Accueil</Link>
          <Link href="/vehicules" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition">Véhicules</Link>
          <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition">À propos</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition">Contact</Link>
          <Link href="/rachat" onClick={() => setMenuOpen(false)} className="hover:text-red-500 transition">Rachat</Link>
        </nav>
      )}
    </header>
  );
}
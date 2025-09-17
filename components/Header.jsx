"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black shadow-md border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + texte */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="GT Autos Logo"
            width={80}   // ✅ plus grand
            height={80}
            className="object-contain"
            priority
          />
          <span className="text-2xl font-bold tracking-wide text-primary">
            GT AUTOS
          </span>
        </Link>

        {/* Bouton menu mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu desktop */}
        <nav className="hidden sm:flex space-x-8 text-sm uppercase font-semibold tracking-wider">
          <Link href="/" className="hover:text-primary transition">Accueil</Link>
          <Link href="/vehicules" className="hover:text-primary transition">Véhicules</Link>
          <Link href="/a-propos" className="hover:text-primary transition">À propos</Link>
          <Link href="/contact" className="hover:text-primary transition">Contact</Link>
          <Link href="/rachat" className="hover:text-primary transition">Rachat</Link>
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="sm:hidden px-6 pb-4 flex flex-col space-y-4 text-sm uppercase font-semibold tracking-wider bg-white text-black border-t border-primary">
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
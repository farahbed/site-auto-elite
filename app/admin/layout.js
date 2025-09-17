"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    fetch("/api/logout").then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-border w-full sm:w-64 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-primary"> Admin GT AUTOS</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin/voitures" className="hover:text-primary transition">Voitures</Link>
          <Link href="/admin/factures" className="hover:text-primary transition">Factures</Link>
          <Link href="/admin/charges" className="hover:text-primary transition">Charges</Link>
          <Link href="/admin/aides" className="hover:text-primary transition">Aides</Link>
          <Link href="/admin/profil" className="hover:text-primary transition">Profil</Link>
          <Link href="/admin/parametres" className="hover:text-primary transition">Paramètres</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Déconnexion
        </button>
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-6">
        <header className="bg-white border-b border-border px-6 py-4 mb-6 flex justify-between items-center">
          <h1 className="text-lg font-bold">Tableau de bord</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden bg-primary text-white px-3 py-1 rounded"
          >
            Menu
          </button>
        </header>
        <div className="bg-white rounded-lg shadow p-6">{children}</div>
      </main>
    </div>
  );
}
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (desktop) */}
      <aside className="hidden sm:flex bg-white border-r border-border w-64 p-6 flex-col">
        <h2 className="text-xl font-bold mb-8 text-primary">Admin GT AUTOS</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin/voitures" className="hover:text-primary transition">
            🚗 Voitures
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Déconnexion
        </button>
      </aside>

      {/* Sidebar mobile (overlay) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fond semi-transparent */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu */}
          <aside className="relative z-50 bg-white w-64 p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-8 text-primary">Admin GT AUTOS</h2>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/admin/voitures"
                onClick={() => setMenuOpen(false)}
                className="hover:text-primary transition"
              >
                🚗 Voitures
              </Link>
            </nav>
            <button
              onClick={handleLogout}
              className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Déconnexion
            </button>
          </aside>
        </div>
      )}

      {/* Contenu */}
      <main className="flex-1 p-6">
        <header className="bg-white border-b border-border px-6 py-4 mb-6 flex justify-between items-center">
          <h1 className="text-lg font-bold">Tableau de bord</h1>
          {/* Bouton menu mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden bg-primary text-white px-3 py-1 rounded"
          >
            ☰ Menu
          </button>
        </header>
        <div className="bg-white rounded-lg shadow p-6">{children}</div>
      </main>
    </div>
  );
}
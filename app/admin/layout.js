"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/logout").then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white flex items-center justify-between px-6 py-4">
        <Link href="/admin/voitures" className="flex items-center gap-2 text-lg font-bold">
          🚗 Espace Admin
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-black transition"
        >
          Déconnexion
        </button>
      </header>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Mon Site Auto
      </footer>
    </div>
  );
}
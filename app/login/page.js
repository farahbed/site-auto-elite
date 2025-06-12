"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword]   = useState("");
  const [showPassword, setShow]   = useState(false);
  const [error, setError]         = useState("");
  const router                    = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method:      "POST",
      headers:     { "Content-Type": "application/json" },
      credentials: "include",              // ← obliger l’envoi du cookie
      body:        JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/voitures");
    } else {
      const text = await res.text();
      setError(text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Connexion Admin</h1>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>
        )}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pr-20 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShow(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 font-semibold"
          >
            {showPassword ? "Cacher" : "Voir"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
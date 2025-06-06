// app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec mot de passe:", password);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      console.log("Réponse serveur status:", res.status);

      if (res.ok) {
        console.log("Connexion réussie");
        router.push("/admin/voitures");
      } else {
        setError("Mot de passe incorrect");
        console.log("Erreur login : mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur réseau ou serveur");
      console.error("Erreur fetch login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-600 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c.5 0 1-.5 1-1V8a4 4 0 10-8 0v2c0 .5.5 1 1 1h6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13v7a2 2 0 002 2h8a2 2 0 002-2v-7H6z"
            />
          </svg>
          <h1 className="text-3xl font-extrabold text-gray-900">Connexion Admin</h1>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pr-20 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none"
          >
            {showPassword ? "Cacher" : "Voir"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
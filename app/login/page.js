"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const next = searchParams.get("next") || "/admin/voitures";
      router.push(next);
    } else {
      const text = await res.text();
      setError(text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-surface max-w-md w-full p-8 rounded-2xl shadow-xl border border-border"
      >
        <h1 className="text-3xl font-extrabold text-text mb-6 text-center">
          Connexion Admin
        </h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-md p-3 pr-20 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShow(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary font-semibold"
          >
            {showPassword ? "Cacher" : "Voir"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

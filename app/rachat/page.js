'use client';
import { useState } from 'react';

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: connecter à ton API (Resend, Airtable ou autre)
    setTimeout(() => {
      alert('✅ Demande envoyée avec succès !');
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-2xl w-full p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Proposer votre véhicule à la reprise
        </h1>
        <p className="text-subtle text-center mb-6">
          Remplissez ce formulaire pour obtenir une estimation rapide de la reprise de votre véhicule.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-subtle">Nom complet</label>
            <input
              type="text"
              required
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jean Dupont"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-subtle">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="jean@email.com"
            />
          </div>

          {/* Marque et modèle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-subtle">Marque</label>
              <input
                type="text"
                required
                className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-subtle">Modèle</label>
              <input
                type="text"
                required
                className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Année et kilométrage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-subtle">Année</label>
              <input
                type="number"
                required
                className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-subtle">Kilométrage</label>
              <input
                type="number"
                required
                className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-subtle">Message</label>
            <textarea
              rows={4}
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="État du véhicule, options, entretien, etc."
            ></textarea>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-subtle">Photos du véhicule</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-subtle mt-1">
              Vous pouvez sélectionner plusieurs photos (extérieur, intérieur, carnet d’entretien…)
            </p>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </form>
      </div>
    </section>
  );
}
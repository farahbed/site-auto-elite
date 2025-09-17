'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/merci'), 1500);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-2xl w-full p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
        <h1 className="text-2xl font-bold mb-6 text-center">Contactez-nous</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-subtle">Nom</label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre nom"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-subtle">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="votre@email.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-subtle">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre message..."
              onChange={handleChange}
              value={formData.message}
            ></textarea>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>

        {/* Messages de feedback */}
        {status === 'success' && (
          <p className="mt-4 text-green-600 text-center">✅ Message envoyé avec succès !</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 text-center">❌ Une erreur est survenue. Merci de réessayer.</p>
        )}
      </div>
    </section>
  );
}
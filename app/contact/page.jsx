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
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/merci');
    } else {
      alert("Erreur lors de l'envoi du message.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
      <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-subtle">Nom</label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="Votre nom"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="votre@email.com"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="Votre message..."
            onChange={handleChange}
            value={formData.message}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </section>
  );
}
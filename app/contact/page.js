export default function Page() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
      <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-subtle">Nom</label>
          <input
            type="text"
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Message</label>
          <textarea
            rows={4}
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="Votre message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
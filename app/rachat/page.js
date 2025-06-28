export default function Page() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-surface text-text rounded-2xl shadow-xl border border-border">
      <h1 className="text-2xl font-bold mb-6">Proposer votre véhicule à la reprise</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-subtle">Nom complet</label>
          <input
            type="text"
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="jean@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-subtle">Marque</label>
            <input
              type="text"
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-subtle">Modèle</label>
            <input
              type="text"
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-subtle">Année</label>
            <input
              type="number"
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-subtle">Kilométrage</label>
            <input
              type="number"
              className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Message</label>
          <textarea
            rows={4}
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
            placeholder="État du véhicule, options, entretien, etc."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-subtle">Photo du véhicule</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-1 border border-border rounded p-2 bg-white text-text"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition"
        >
          Envoyer ma demande
        </button>
      </form>
    </section>
  );
}
export default function Page() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white text-black rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Proposer votre véhicule à la reprise</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom complet</label>
          <input
            type="text"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="jean@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Marque</label>
            <input type="text" className="w-full mt-1 border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Modèle</label>
            <input type="text" className="w-full mt-1 border border-gray-300 rounded p-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Année</label>
            <input type="number" className="w-full mt-1 border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Kilométrage</label>
            <input type="number" className="w-full mt-1 border border-gray-300 rounded p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            rows="4"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="État du véhicule, options, entretien, etc."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Photo du véhicule</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-1 border border-gray-300 rounded p-2 bg-white"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-red-600 transition"
        >
          Envoyer ma demande
        </button>
      </form>
    </section>
  );
}
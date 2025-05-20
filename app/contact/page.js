export default function Page() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white text-black rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            rows="4"
            className="w-full mt-1 border border-gray-300 rounded p-2"
            placeholder="Votre message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-red-600 transition"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
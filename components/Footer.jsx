export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">© {new Date().getFullYear()} Auto Élite – Tous droits réservés</p>
        <div className="space-x-4">
          <a href="/mentions-legales" className="hover:underline text-gray-400">Mentions légales</a>
          <a href="/contact" className="hover:underline text-gray-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}
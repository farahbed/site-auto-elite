import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Vente de voitures premium",
  description: "Trouvez votre prochaine voiture haut de gamme",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-bg text-text font-sans antialiased">
        <Header />
        {/* 👉 On enlève max-w ici */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
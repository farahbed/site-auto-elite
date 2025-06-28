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
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

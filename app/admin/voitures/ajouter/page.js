// app/admin/voitures/ajouter/page.jsx
import AjouterForm from "@/components/admin/AjouterForm";

export const metadata = {
  title: "➕ Ajouter un véhicule",
};

export default function AjouterVoiturePage() {
  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">➕ Ajouter un véhicule</h1>
      <AjouterForm />
    </section>
  );
}
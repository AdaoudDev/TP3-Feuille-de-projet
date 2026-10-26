// Carte générique : réutilisée pour les fromages, les offres et le panier
export default function Card({ title, children }) {
  return (
    <article className="flex flex-col gap-3 p-5 rounded-2xl bg-white shadow">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      {children}
    </article>
  )
}

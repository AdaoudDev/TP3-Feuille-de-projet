export default function Section({ title, children }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-6">
      <h2 className="font-display text-3xl font-bold">{title}</h2>
      {children}
    </section>
  )
}

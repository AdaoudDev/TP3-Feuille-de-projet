// Puce de filtre : active ou non
export default function Chip({ active, ...props }) {
  return (
    <button
      aria-pressed={active}
      className={`min-h-11 px-4 rounded-full border-2 border-primary capitalize cursor-pointer ${active ? 'bg-primary text-cream' : 'text-primary-dark'}`}
      {...props}
    />
  )
}

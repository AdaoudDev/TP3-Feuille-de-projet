// Champ de formulaire avec libellé et message d'erreur
export default function Field({ label, error, ...props }) {
  return (
    <label className="flex flex-col gap-1 font-semibold">
      {label}
      <input
        aria-invalid={!!error}
        className={`min-h-11 px-3 rounded-lg border-2 bg-white font-normal ${error ? 'border-error' : 'border-ink/30'}`}
        {...props}
      />
      {error && <span className="text-error text-sm font-normal">{error}</span>}
    </label>
  )
}

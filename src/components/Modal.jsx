import { useEffect, useRef } from 'react'
import Button from './Button'

// <dialog> natif : gère Échap et le focus tout seul
export default function Modal({ onClose, children }) {
  const ref = useRef()
  useEffect(() => ref.current.showModal(), [])
  return (
    <dialog ref={ref} onClose={onClose} className="m-auto p-6 rounded-2xl max-w-md w-full backdrop:bg-ink/60">
      {children}
      <Button variant="outline" className="mt-4" onClick={onClose}>Fermer</Button>
    </dialog>
  )
}

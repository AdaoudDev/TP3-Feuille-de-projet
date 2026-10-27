import { useState } from 'react'
import cheeses from '../data/cheeses.json'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import Chip from '../components/Chip'
import Modal from '../components/Modal'
import Section from '../components/Section'

const milks = ['vache', 'chèvre', 'brebis']
const strengths = ['doux', 'moyen', 'corsé']

export default function Products({ onAdd }) {
  const [milk, setMilk] = useState([])
  const [strength, setStrength] = useState('')
  const [sorted, setSorted] = useState(false)
  const [selected, setSelected] = useState(null)

  const toggleMilk = (m) => setMilk(milk.includes(m) ? milk.filter((x) => x !== m) : [...milk, m])

  // Liste dérivée : jamais stockée dans un state
  const list = cheeses
    .filter((c) => (!milk.length || milk.includes(c.milk)) && (!strength || c.strength === strength))
    .sort((a, b) => (sorted ? a.price - b.price : 0))

  return (
    <Section title="Nos fromages">
      <div className="flex flex-wrap gap-2">
        {milks.map((m) => <Chip key={m} active={milk.includes(m)} onClick={() => toggleMilk(m)}>{m}</Chip>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {strengths.map((s) => <Chip key={s} active={strength === s} onClick={() => setStrength(strength === s ? '' : s)}>{s}</Chip>)}
        <Chip active={sorted} onClick={() => setSorted(!sorted)}>Prix croissant</Chip>
      </div>

      {!list.length && <p>Aucun fromage ne correspond à ces filtres.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Card key={c.id} title={c.name} image={`/images/${c.id}.jpg`} alt={`${c.name}, fromage au lait de ${c.milk}`}>
            <div className="flex flex-wrap gap-2"><Badge>{c.milk}</Badge><Badge>{c.strength}</Badge><Badge>{c.region}</Badge></div>
            <p className="font-semibold">{c.price.toFixed(2)} € / 100 g</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Button variant="outline" onClick={() => setSelected(c)}>Détails</Button>
              <Button onClick={() => onAdd(c.id)}>Ajouter 100 g</Button>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h3 className="font-display text-2xl font-bold">{selected.name}</h3>
          <p className="my-3">{selected.description}</p>
          <p>Lait de {selected.milk} · {selected.type} · {selected.region}</p>
        </Modal>
      )}
    </Section>
  )
}

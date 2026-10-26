import { useState } from 'react'
import cheeses from '../data/cheeses.json'
import Button from '../components/Button'
import Card from '../components/Card'
import Field from '../components/Field'
import Section from '../components/Section'

const today = new Date().toISOString().slice(0, 10) // format AAAA-MM-JJ

// Chaque champ : [test, message d'erreur]
const rules = {
  lastName: [(v) => v.trim().length > 1, 'Indiquez votre nom.'],
  firstName: [(v) => v.trim().length > 1, 'Indiquez votre prénom.'],
  email: [(v) => /^\S+@\S+\.\S+$/.test(v), 'Adresse e-mail invalide, ex. moi@exemple.fr.'],
  phone: [(v) => /^0\d{9}$/.test(v.replace(/\s/g, '')), 'Numéro à 10 chiffres, ex. 06 12 34 56 78.'],
  date: [(v) => v, 'Choisissez un jour de retrait.'],
  card: [(v) => /^\d{16}$/.test(v.replace(/\s/g, '')), 'Numéro de carte à 16 chiffres.'],
  expiry: [(v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v), 'Format MM/AA, ex. 08/28.'],
}

export default function Order({ cart, onRemove, onConfirm, onBrowse }) {
  const [errors, setErrors] = useState({})
  const items = cheeses.filter((c) => cart[c.id])
  const total = items.reduce((sum, c) => sum + c.price * cart[c.id], 0)

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const found = {}
    for (const key in rules) if (!rules[key][0](data[key])) found[key] = rules[key][1]
    setErrors(found)
    if (!Object.keys(found).length) onConfirm(data)
  }

  if (!items.length) {
    return (
      <Section title="Votre commande">
        <p>Votre panier est vide.</p>
        <Button onClick={onBrowse} className="self-start">Voir les fromages</Button>
      </Section>
    )
  }

  return (
    <Section title="Votre commande">
      <Card title="Panier">
        {items.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-2">
            <span>{c.name} · {cart[c.id] * 100} g · {(c.price * cart[c.id]).toFixed(2)} €</span>
            <Button variant="outline" onClick={() => onRemove(c.id)}>Retirer</Button>
          </div>
        ))}
        <p className="text-lg font-bold">Total : {total.toFixed(2)} €</p>
      </Card>

      <form noValidate onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <Field label="Nom" name="lastName" autoComplete="family-name" placeholder="Dupont" error={errors.lastName} />
        <Field label="Prénom" name="firstName" autoComplete="given-name" placeholder="Camille" error={errors.firstName} />
        <Field label="E-mail" name="email" type="email" autoComplete="email" placeholder="moi@exemple.fr" error={errors.email} />
        <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" error={errors.phone} />
        <Field label="Jour de retrait" name="date" type="date" min={today} defaultValue={today} error={errors.date} />
        <Field label="Numéro de carte" name="card" inputMode="numeric" placeholder="1234 5678 9012 3456" error={errors.card} />
        <Field label="Expiration" name="expiry" placeholder="MM/AA" error={errors.expiry} />
        <Button className="md:col-span-2">Payer {total.toFixed(2)} €</Button>
      </form>
    </Section>
  )
}

import Card from '../components/Card'
import Section from '../components/Section'

// Affiché après la commande : comment venir la récupérer
export default function Pickup({ order }) {
  return (
    <Section title={`Merci ${order.firstName} !`}>
      <p>Votre commande est confirmée. Elle sera prête le {new Date(order.date).toLocaleDateString('fr-FR')}.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Adresse"><p>12 rue des Vibes, 39200 Saint-Claude</p></Card>
        <Card title="Horaires"><p>Lundi-Vendredi, 9h – 19h30, weekends 10h – 14h30</p></Card>
        <Card title="Au comptoir"><p>Donnez votre nom, votre commande vous attend au frais.</p></Card>
      </div>
    </Section>
  )
}

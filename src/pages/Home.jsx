import Button from '../components/Button'
import Card from '../components/Card'
import Section from '../components/Section'

const offers = [
  { title: 'À la coupe', text: 'Plus de 15 fromages affinés par nos soins, au prix des 100 g.' },
  { title: 'Plateau découverte', text: '5 fromages choisis par Claude pour 24 €.' },
  { title: 'Box du mois', text: 'Un abonnement à 29 €/mois pour découvrir un terroir.' },
]

export default function Home({ onOrder }) {
  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-24 flex flex-col items-start gap-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Le fromage affiné à Saint-Claude, prêt quand vous passez.</h1>
        <p className="text-lg">Commandez en ligne, retirez en boutique. Sans attendre.</p>
        <Button onClick={onOrder}>Commander</Button>
      </section>
      <Section title="À propos">
        <p>Claude et Léa affinent leurs fromages dans une cave voûtée du centre de Saint-Claude depuis 2009.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o) => <Card key={o.title} title={o.title}><p>{o.text}</p></Card>)}
        </div>
      </Section>
    </>
  )
}

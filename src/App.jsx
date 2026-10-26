import { useState } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import Order from './pages/Order'
import Pickup from './pages/Pickup'

export default function App() {
  const [page, setPage] = useState('home') // 'home' | 'products' | 'order'
  const [cart, setCart] = useState({}) // { id du fromage: nombre de portions de 100 g }
  const [order, setOrder] = useState(null)

  const go = (p) => { setPage(p); window.scrollTo(0, 0) }
  const add = (id) => setCart({ ...cart, [id]: (cart[id] || 0) + 1 })
  const remove = (id) => setCart({ ...cart, [id]: 0 })
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0)

  return (
    <>
      <header className="sticky top-0 z-10 bg-primary-dark text-cream">
        <nav className="max-w-5xl mx-auto px-4 flex items-center gap-6 min-h-16">
          <button onClick={() => go('home')} className="font-display text-xl font-bold mr-auto cursor-pointer">Saint-Claude Fromages</button>
          <button onClick={() => go('products')} className="py-3 cursor-pointer">Fromages</button>
          <button onClick={() => go('order')} className="py-3 cursor-pointer">Panier ({count})</button>
        </nav>
      </header>
      <main>
        {page === 'home' && <Home onOrder={() => go('products')} />}
        {page === 'products' && <Products onAdd={add} />}
        {page === 'order' && (order
          ? <Pickup order={order} />
          : <Order cart={cart} onRemove={remove} onConfirm={setOrder} onBrowse={() => go('products')} />)}
      </main>
    </>
  )
}

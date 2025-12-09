import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import Navbar from '../components/Navbar';
import productsData from '../data/product.js';
import { CartProvider, useDispatchCart } from '../contexts/CartContext';
import { useCart } from '../contexts/CartContext';

function HomeInner(){
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [selected, setSelected] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState(productsData);
  const dispatch = useDispatchCart();
  const cart = useCart();

  useEffect(()=>{
    function handler(e){
      const product = e.detail.product;
      dispatch({type:'ADD', payload:{...product}});
      setOpenCart(true);
    }
    window.addEventListener('add-to-cart', handler);
    return ()=> window.removeEventListener('add-to-cart', handler);
  },[dispatch]);

  useEffect(()=> {
    let filtered = productsData.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'price-asc') filtered = filtered.sort((a,b)=> parseInt(a.price.replace(/[^0-9]/g,'')) - parseInt(b.price.replace(/[^0-9]/g,'')));
    if (sort === 'price-desc') filtered = filtered.sort((a,b)=> parseInt(b.price.replace(/[^0-9]/g,'')) - parseInt(a.price.replace(/[^0-9]/g,'')));
    setItems(filtered);
  },[query, sort]);

  return (
    <>
      <Navbar onOpenCart={()=>setOpenCart(true)} />
      <Hero />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search watches..." className="px-4 py-2 border rounded-lg" />
            <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">{items.length} results</div>
        </div>

        <section id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => <ProductCard key={p.id} product={p} onQuickView={setSelected} />)}
        </section>
      </main>

      <ProductModal product={selected} onClose={()=>setSelected(null)} onAdd={(p)=>{ dispatch({type:'ADD', payload:{...p}}); setSelected(null); setOpenCart(true); }} />
      <CartDrawer open={openCart} onClose={()=>setOpenCart(false)} />
    </>
  )
}

export default function Home(){
  return (
    <CartProvider>
      <HomeInner />
    </CartProvider>
  )
}

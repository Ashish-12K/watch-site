import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

export default function Navbar({onOpenCart}) {
  const { items } = useCart();
  const qty = items.reduce((s,i)=>s+i.qty,0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">TW</div>
          <div>
            <div className="font-bold">Timeless Watches</div>
            <div className="text-xs text-gray-500 -mt-0.5">Premium collection</div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/about" className="text-sm text-gray-600 hover:text-black">About</Link>
          <Link to="/contact" className="text-sm text-gray-600 hover:text-black">Contact</Link>
          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>
            <span className="text-sm">Cart</span>
            {qty>0 && <span className="ml-1 text-xs bg-black text-white rounded-full px-2 py-0.5">{qty}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

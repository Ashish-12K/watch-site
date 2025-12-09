import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ products }){
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">Timeless Watches</h1>
          <p className="text-gray-600 mt-2">Premium timepieces crafted for style and precision.</p>
        </div>
        <a href="#products" className="inline-block px-4 py-2 bg-black text-white rounded-lg">Shop Collection</a>
      </header>

      <section id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(p => (
          <Link key={p.id} to={`/product/${p.slug}`} className="block bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition">
            <img src={p.img} alt={p.alt} className="w-full h-56 object-cover"/>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.short}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">{p.price}</span>
                <span className="text-xs text-gray-400">View →</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Demo site • Images are placeholders
      </footer>
    </main>
  );
}

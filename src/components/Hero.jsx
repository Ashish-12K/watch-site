import React from 'react';

export default function Hero(){
  return (
    <section className="relative bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/hero-watch.jpg" 
          alt="Luxury watch hero image" 
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl">
          Timeless watches, crafted for life.
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl text-lg">
          Discover a curated collection of premium timepieces — classic design, modern reliability, and exclusive craftsmanship.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="#products" className="px-6 py-3 bg-white text-black rounded-lg shadow-lg font-medium hover:bg-gray-200 transition">
            Shop Collection
          </a>
          <a href="#features" className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-white/10 transition">
            Why Timeless?
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          Free shipping & returns · Secure checkout
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onQuickView }) {
  return (
    <article className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition">
      <div className="relative">
        <img src={product.img} alt={product.alt} className="w-full h-56 object-cover" />

        {product.badge && (
          <div className="absolute left-3 top-3 bg-black text-white text-xs px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}

        <button
          onClick={() => onQuickView(product)}
          className="absolute right-3 top-3 bg-white/80 text-black rounded-full p-2 hover:scale-105 transition"
          aria-label={`Quick view ${product.title}`}
        >
          👁
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.short}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="font-medium">{product.price}</div>

          <div className="flex items-center gap-2">
            {/* DETAILS BUTTON → Navigates to product page */}
            <Link
              to={`/product/${product.slug}`}
              className="text-xs px-3 py-1 border rounded-lg inline-block hover:bg-gray-50 transition"
            >
              Details
            </Link>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product } }))
              }
              className="text-xs px-3 py-1 bg-black text-white rounded-lg hover:bg-black/90 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

import React from 'react';

export default function ProductModal({product, onClose, onAdd}) {
  if(!product) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={product.img} alt={product.alt} className="w-full h-80 object-cover"/>
          <div className="p-6">
            <button onClick={onClose} className="text-sm text-gray-500">Close ✕</button>
            <h2 className="text-2xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
              <div className="text-xl font-semibold">{product.price}</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => onAdd(product)} className="px-4 py-2 bg-black text-white rounded-lg">Add to cart</button>
                <a href="#" className="px-4 py-2 border rounded-lg">Buy now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

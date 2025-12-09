import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Product({ products }){
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  if (!product) return <div className="p-8">Product not found. <Link to="/" className="text-blue-600">Back</Link></div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/" className="text-sm text-gray-500">← Back to collection</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.img} alt={product.alt} className="w-full h-96 object-cover rounded-xl shadow" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-6">
            <div className="text-2xl font-semibold">{product.price}</div>
            <button className="mt-4 px-5 py-3 bg-black text-white rounded-lg">View Demo Purchase</button>
          </div>
        </div>
      </div>
    </main>
  );
}

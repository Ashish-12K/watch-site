import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/product";
import { useDispatchCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  // if product not found, show a friendly fallback
  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p className="text-gray-500 mt-2">We could not find the product you requested.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 rounded border"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.img);

  function addToCart() {
    // payload shape used by CartContext: include id, title, price (string), img, alt
    dispatch({
      type: "ADD",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        img: mainImg,
        alt: product.alt,
        qty,
      },
    });
    // Optional: open cart via custom event, if Home listens for it
    window.dispatchEvent(new CustomEvent("open-cart", {}));
  }

  // simple numeric price extraction helper (for displaying totals)
  const numericPrice = (p) => {
    const n = parseInt(String(p).replace(/[^0-9]/g, ""), 10);
    return isNaN(n) ? 0 : n;
  };

  // Related products (exclude current)
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> {" / "}
        <Link to="/" className="hover:underline">Collection</Link> {" / "}
        <span className="text-gray-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Images */}
        <div>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <img src={mainImg} alt={product.alt} className="w-full h-96 object-cover" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {/* If you have extra image URLs in product.images, show them; otherwise repeat product.img */}
            {([product.img, product.img2, product.img3].filter(Boolean)).map((src, i) => (
              <button
                key={i}
                onClick={() => setMainImg(src)}
                className={`rounded-lg overflow-hidden border ${mainImg === src ? "border-black" : "border-gray-200"}`}
              >
                <img src={src} alt={`${product.title} ${i}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          {product.badge && <div className="inline-block mt-2 px-3 py-1 text-xs bg-black text-white rounded-full">{product.badge}</div>}
          <div className="mt-4 text-gray-600">{product.short}</div>

          <div className="mt-6 flex items-baseline gap-4">
            <div className="text-3xl font-semibold">{product.price}</div>
            <div className="text-sm text-gray-500">Inclusive of taxes</div>
          </div>

          <p className="mt-6 text-gray-700">{product.description}</p>

          {/* Quantity & Add */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="px-4 py-2">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className="px-6 py-3 bg-black text-white rounded-lg shadow"
            >
              Add to cart
            </button>

            <button
              onClick={() => {
                addToCart();
                navigate("/checkout");
              }}
              className="px-4 py-3 border rounded-lg"
            >
              Buy now
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <strong>Total:</strong> ₹{numericPrice(product.price) * qty}
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <h3 className="font-semibold">Specifications</h3>
            <ul className="mt-2 text-sm text-gray-600 list-disc ml-5">
              <li>Case: Stainless steel</li>
              <li>Glass: Sapphire crystal</li>
              <li>Water resistance: 50m</li>
              <li>Movement: Automatic / Quartz (model dependent)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Related products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link key={r.id} to={`/product/${r.slug}`}>
              <ProductCard product={r} onQuickView={() => {}} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

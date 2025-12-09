import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/product";
import { useDispatchCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  // state must be declared before the effect that resets them
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product ? product.img : "");
  const [quickViewProduct, setQuickViewProduct] = useState(null); // <-- quick view state

  // run when slug or product changes (handles clicking related products)
  useEffect(() => {
    if (!product) return;
    // Scroll to top (smooth). Use behavior: 'auto' if you prefer instant jump.
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset local UI state for the new product
    setMainImg(product.img);
    setQty(1);
  }, [slug, product]);

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

  function addToCart(payloadProduct = null) {
    const p = payloadProduct || product;
    const img = payloadProduct ? payloadProduct.img : mainImg;
    const id = p.id;
    const title = p.title;
    const price = p.price;
    const alt = p.alt;
    const quantity = payloadProduct ? 1 : qty;

    dispatch({
      type: "ADD",
      payload: {
        id,
        title,
        price,
        img,
        alt,
        qty: quantity,
      },
    });
    // Keep this if Home listens to open-cart
    window.dispatchEvent(new CustomEvent("open-cart", {}));
  }

  // helper to extract numeric value from price string
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
              onClick={() => addToCart()}
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
              {/* hide inner Details link since the whole card is clickable */}
              <ProductCard
                product={r}
                onQuickView={() => setQuickViewProduct(r)}
                showDetailsLink={false}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative p-4">

            {/* Close Button */}
            <button
              className="absolute right-3 top-3 text-2xl"
              onClick={() => setQuickViewProduct(null)}
            >
              ×
            </button>

            {/* Image */}
            <img
              src={quickViewProduct.img}
              alt={quickViewProduct.alt}
              className="w-full h-64 object-cover rounded-xl"
            />

            {/* Title */}
            <h2 className="text-xl font-bold mt-4">{quickViewProduct.title}</h2>
            <p className="text-gray-500 mt-1">{quickViewProduct.short}</p>

            {/* Price */}
            <div className="text-2xl font-semibold mt-3">{quickViewProduct.price}</div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                className="flex-1 py-2 bg-black text-white rounded-lg"
              >
                Add to cart
              </button>

              <Link
                to={`/product/${quickViewProduct.slug}`}
                className="flex-1 py-2 border rounded-lg flex items-center justify-center"
                onClick={() => setQuickViewProduct(null)}
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

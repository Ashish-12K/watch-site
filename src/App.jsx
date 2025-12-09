import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import products from './data/product.js';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home products={products} />} />

          {/* Product detail page */}
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

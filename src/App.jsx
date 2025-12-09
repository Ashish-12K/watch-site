import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import products from './data/product.js';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/product/:slug" element={<Product products={products} />} />
      </Routes>
    </Router>
  );
}

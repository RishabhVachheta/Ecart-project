import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
// import { Switch } from "react-router";
// import ProductList from './ProductList';
// import ProductDetails from './ProductDetails';
import ProductList from './ProductList';
import ProductDetails from './DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:productId" element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;

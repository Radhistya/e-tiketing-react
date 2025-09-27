import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductList from "./pages/Productlist";
import ProductDetail from "./pages/Productdetail";
import DetailPesanan from "./pages/detailpesanan";
import Payment from "./pages/payment";
import Invoice from "./pages/invoice";
// import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/detailpesanan/:id" element={<DetailPesanan />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;

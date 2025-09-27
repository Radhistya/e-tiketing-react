// tests/App.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductList from "../src/pages/Productlist";
import ProductDetail from "@/pages/Productdetail";
import DetailPesanan from "@/pages/detailpesanan";
import Payment from "@/pages/payment";
import Invoice from "@/pages/invoice";
import App from "../src/App";

describe("App routing tanpa mock", () => {
  it("render route saat path '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("render route saat path '/prodcutdetail/1'", () => {
    render(
      <MemoryRouter initialEntries={["/productdetail/1"]}>
        <Routes>
          <Route path="/productdetail/1" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("render route saat path '/detailpesanan/1'", () => {
    render(
      <MemoryRouter initialEntries={["/detailpesanan/1"]}>
        <Routes>
          <Route path="/detailpesanan/:id" element={<DetailPesanan />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("render route saat path '/payment'", () => {
    render(
      <MemoryRouter initialEntries={["/payment"]}>
        <Routes>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("render route saat path '/invoice'", () => {
    render(
      <MemoryRouter initialEntries={["/invoice"]}>
        <Routes>
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </MemoryRouter>
    );
  });
});

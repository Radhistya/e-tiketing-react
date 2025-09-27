import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "../src/pages/ProductDetail";
import { Products } from "../src/data/products";

// Mock hook useIsMobile
vi.mock("../src/hooks/mobile", () => ({
  default: () => true,
}));

// Mock hook useLoading supaya langsung selesai
vi.mock("../src/hooks/loading", () => ({
  default: () => false,
}));

describe("ProductDetail", () => {
  it("memilih paket data + hari lalu klik lanjutkan navigasi ke detail pesanan", async () => {
    const product = Products[0];
    const productId = product.id.toString();

    render(
      <MemoryRouter initialEntries={[`/productdetail/${productId}`]}>
        <Routes>
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/detailpesanan/:id" element={<div>Detail Pesanan</div>} />
        </Routes>
      </MemoryRouter>
    );

    // cek nama produk tampil
    expect(await screen.findByText(product.name)).toBeInTheDocument();

    // tombol "Pesan Sekarang" awalnya disabled
    const pesanButton = await screen.findByRole("button", { name: /pesan sekarang|lanjutkan/i });
    expect(pesanButton).toBeDisabled();

    // pilih data pertama
    const dataButton = screen.getByRole("button", { name: product.priceOptions[0].data });
    await userEvent.click(dataButton);

    // pilih validitas pertama
    const validityButton = screen.getByRole("button", { name: product.priceOptions[0].validity });
    await userEvent.click(validityButton);

    // tombol sekarang aktif
    expect(pesanButton).not.toBeDisabled();

    // klik tombol untuk navigasi
    await userEvent.click(pesanButton);

    // cek apakah pindah ke halaman detail pesanan
    expect(await screen.findByText(/Detail Pesanan/i)).toBeInTheDocument();
  });
});

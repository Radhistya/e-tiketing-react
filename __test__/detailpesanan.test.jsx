import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetailPesanan from "../src/pages/DetailPesanan";

// Mock mobile supaya muncul UI mobile
vi.mock("../src/hooks/mobile", () => ({
  default: () => true,
}));

// Mock loading supaya false agar test bisa langsung lanjut
vi.mock("../src/hooks/loading", () => ({
  default: () => false,
}));

describe("DetailPesanan (Mobile)", () => {
  it("mengisi form pelanggan dan klik tombol Lanjutkan", async () => {
    // Simulasikan data dari halaman sebelumnya
    const productData = {
      productName: "eSIM Singapore",
      selectedData: "5GB",
      selectedValidity: "7 Hari",
      activePrice: 100000,
      image: "image.png",
      tanggalPesanan: "2025-09-28T00:00:00.000Z",
    };

    render(
      <MemoryRouter initialEntries={["/detailpesanan"]}>
        <Routes>
          <Route path="/detailpesanan" element={<DetailPesanan />} />
          <Route path="/payment" element={<div>Halaman Payment</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Isi form
    await userEvent.type(screen.getByPlaceholderText(/nama pelanggan/i), "John Doe");
    await userEvent.type(screen.getByPlaceholderText(/email pelanggan/i), "john@example.com");
    await userEvent.type(screen.getByPlaceholderText(/nomor hp pelanggan/i), "08123456789");

    // Klik tombol Lanjutkan
    const lanjutkanButton = screen.getByRole("button", { name: /lanjutkan/i });
    await userEvent.click(lanjutkanButton);

    // Pastikan navigasi ke halaman payment
    expect(await screen.findByText(/halaman payment/i)).toBeInTheDocument();
  });
});

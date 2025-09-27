import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Payment from "../src/pages/Payment";
import { paymentMethods } from "../src/data/payment";

// Mock useMobile supaya selalu mobile
vi.mock("../src/hooks/mobile", () => ({
  default: () => true,
}));

// Mock useLoading supaya langsung selesai loading
vi.mock("../src/hooks/loading", () => ({
  default: () => false,
}));

describe("Payment Mobile Page", () => {
  it("menampilkan ringkasan paket, pilih metode pembayaran, dan klik Lanjutkan", async () => {
    const productData = {
      productName: "eSIM Singapore",
      selectedData: "5GB",
      selectedValidity: "7 Hari",
      activePrice: 100000,
      tanggalPesanan: "2025-09-28T00:00:00.000Z",
      image: "image.png",
    };

    const userData = {
      name: "John Doe",
      email: "john@example.com",
      whatsapp: "08123456789",
    };

    render(
      <MemoryRouter initialEntries={["/payment"]}>
        <Routes>
          <Route
            path="/payment"
            element={
              <Payment
                location={{
                  state: { productData, userData, step: 2, completedSteps: [1] },
                }}
              />
            }
          />
          <Route path="/invoice" element={<div>Invoice Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Cek ringkasan paket muncul
    expect(screen.getByText(/paket terpilih/i)).toBeInTheDocument();

    // // Pilih metode pembayaran
    const firstMethod = screen.getByText(paymentMethods[0].name);
    await userEvent.click(firstMethod);
    // expect(firstMethod.parentElement).toHaveClass("border-blue-700");

    // // Klik tombol Lanjutkan
    const lanjutButton = screen.getByRole("button", { name: /lanjutkan/i });
    await userEvent.click(lanjutButton);

    // // Pastikan navigasi ke halaman Invoice
    expect(await screen.findByText(/invoice page/i)).toBeInTheDocument();
  });
});

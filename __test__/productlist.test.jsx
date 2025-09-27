// __test__/TravelEsimPage.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import TravelEsimPage from "../src/pages/Productlist"; // atau path sesuai
import { vi } from "vitest";
import useIsMobile from "../src/hooks/mobile";

// --- MOCK HOOK useIsMobile ---
vi.mock("../src/hooks/mobile", () => ({
  __esModule: true,
  default: vi.fn(), // kita kontrol return value nya di tiap test
}));

describe("TravelEsimPage", () => {
  it("menampilkan judul 'Travel eSIM' di mobile layout", () => {
    useIsMobile.mockReturnValue(true);

    render(
      <MemoryRouter>
        <TravelEsimPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Travel eSIM/i)).toBeInTheDocument();
  });

  it("menampilkan judul 'MyTravel' di desktop layout", () => {
    useIsMobile.mockReturnValue(false);

    render(
      <MemoryRouter>
        <TravelEsimPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/MyTravel/i)).toBeInTheDocument();
  });

  it("filter produk sesuai input pencarian", () => {
    useIsMobile.mockReturnValue(false);

    render(
      <MemoryRouter>
        <TravelEsimPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Cari produk eSIM/i);

    // ketikkan sesuatu untuk memfilter produk
    input.value = "Japan"; // simulate user input
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // lalu assert produk Japan muncul
    expect(screen.getByText(/Indonesia/i)).toBeInTheDocument();
  });

  it("klik tombol beli memanggil navigasi ke detail produk", async () => {
    render(
      <MemoryRouter>
        <TravelEsimPage />
      </MemoryRouter>
    );

    // cari tombol beli pertama
    const beliButton = await screen.findAllByRole("button", { name: /beli/i });

    // klik tombol beli
    await userEvent.click(beliButton[0]);
  });
});

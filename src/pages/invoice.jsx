import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import useIsMobile from "@/hooks/mobile";
import useLoading from "@/hooks/loading";
import { Loading } from "@/components/loading";
import { useState } from "react";
import { formatTanggalIndonesia } from "@/lib/formattanggal";
import { formatWaktuIndonesia } from "@/lib/formatwaktu";
import { maskEmail, maskWhatsapp } from "@/lib/mask";

export default function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const loading = useLoading(2000);
  const {
    productData,
    userData,
    selectedPayment,
    step = 1,
    completedSteps: prevCompletedSteps = [],
  } = location.state || {};
  const { productName, selectedData, selectedValidity, activePrice, tanggalPesanan } = productData || {};
  const steps = [1, 2];
  const [activeStep, setActiveStep] = useState(step); // step dari location.state
  const [completedSteps, setCompletedSteps] = useState(prevCompletedSteps); // centang dari location.state

  // Buat nomor invoice acak
  const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000000)}`;
  const refNumber = Math.floor(Math.random() * 1000000000000);

  if (loading) return <Loading isMobile={isMobile} />;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        {/* HEADER */}
        <div className="flex flex-row justify-between bg-indigo-700 text-white pb-16">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button size="icon" variant="ghost" className="text-white hover:bg-indigo-600" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="text-lg font-semibold">Detail Pemesan</h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4 px-4">
            {steps.map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                    ${
                      completedSteps.includes(step)
                        ? "bg-green-500 text-white"
                        : activeStep === step
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {completedSteps.includes(step) ? <Check size={16} /> : step}
                </div>
                {step !== steps.length && <div className="w-8 h-1 bg-gray-300 ml-3"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="-mt-12 bg-white rounded-t-3xl p-6">
          {/* Status */}
          <div className="flex flex-col items-center bg-white p-2">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold items-center mb-2">
              {activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}
            </h2>
            <div className="flex flex-row items-center gap-3 mb-3">
              <p className="text-sm text-gray-500">No. {invoiceNumber}</p>
              <Files className="text-indigo-800" />
            </div>
          </div>

          {/* Detail Transaksi */}
          <div className="bg-white border-1 rounded-xl p-6 space-y-2 my-1">
            <div className="flex flex-row justify-between text-sm">
              <span>Status</span>
              <span className=" p-1 rounded bg-green-100 text-green-700 font-semibold">Berhasil</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>No. Ref</span>
              <span className="font-semibold">{refNumber}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Tgl Transaksi</span>
              <span className="font-semibold">{formatTanggalIndonesia(tanggalPesanan)}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Waktu Transaksi</span>
              <span className="font-semibold">{formatWaktuIndonesia(tanggalPesanan)} WIB</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Metode Pembayaran</span>
              <span className="font-semibold">{selectedPayment}</span>
            </div>
          </div>
          <div className="bg-white border-1 rounded-xl p-6 space-y-2 my-2">
            <h3 className="font-semibold text-lg mb-2">Detail Transaksi</h3>
            <div className="flex flex-row justify-between text-sm">
              <span>Produk</span>
              <span className="font-semibold">{productName}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Data Tersedia</span>
              <span className="font-semibold">{selectedData}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Jumlah</span>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Nama Pelanggan</span>
              <span className="font-semibold">{userData?.name}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>No WhatsApp</span>
              <span className="font-semibold">{maskWhatsapp(userData?.whatsapp)}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Email</span>
              <span className="font-semibold">{maskEmail(userData?.email)}</span>
            </div>
            <p className="text-center text-sm mt-3 font-[100] text-grey">
              Kami akan segera mengirimkan kode QR eSIM ke email Anda. Cek inbox (atau folder spam) ya!
            </p>
          </div>

          {/* Detail Pembayaran */}
          <div className="bg-white border-1 rounded-xl p-6 space-y-2 my-2">
            <h3 className="font-semibold text-lg mb-2">Detail Pembayaran</h3>
            <div className="flex flex-row justify-between text-sm">
              <span>Harga</span>
              <span className="font-semibold">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Biaya Transaksi</span>
              <span className="font-semibold">Rp2.500</span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <span>Total</span>
              <span className="font-semibold">
                {" "}
                {activePrice ? `Rp${(activePrice + 2500).toLocaleString("id-ID")}` : "-"}
              </span>
            </div>
          </div>

          <Button className="w-full bg-indigo-700 text-white py-3 mt-4 rounded" onClick={() => navigate("/")}>
            Selesai
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="w-full bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
          {/* Logo */}
          <div className="text-indigo-100 font-bold text-xl">MyTravel</div>

          {/* Menu */}
          <nav className="flex gap-6 text-gray-100 font-medium">
            <a href="#" className="hover:text-white hover:underline">
              Home
            </a>
            <a href="#" className="hover:text-white hover:underline">
              Promo
            </a>
            <a href="#" className="hover:text-white hover:underline">
              Bantuan
            </a>
          </nav>

          {/* User Action */}
          <div className="flex gap-3">
            <Button variant="outline">Login</Button>
            <Button className="bg-indigo-700 text-white">Daftar</Button>
          </div>
        </div>
      </header>
      <div className="w-full h-100 overflow-hidden shadow-lg">
        <img src={productData.image} alt={productName.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex justify-center items-center gap-4 mt-6 ">
        {steps.map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
          ${
            completedSteps.includes(step)
              ? "bg-green-500 text-white"
              : activeStep === step
              ? "bg-indigo-500 text-white"
              : "bg-gray-300 text-gray-600"
          }
        `}
            >
              {completedSteps.includes(step) ? <Check size={20} /> : step}
            </div>
            {step !== steps.length && <div className="w-100 h-1 bg-gray-300 mx-2"></div>}
          </div>
        ))}
      </div>
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col gap-6">
        {/* STATUS TRANSAKSI */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-3">Status Transaksi</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Status</span>
            <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">Berhasil</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>No. Invoice</span>
            <span className="font-semibold">{invoiceNumber}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tgl Transaksi</span>
            <span className="font-semibold">{formatTanggalIndonesia(tanggalPesanan)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Waktu Transaksi</span>
            <span className="font-semibold">{formatWaktuIndonesia(tanggalPesanan)} WIB</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Metode Pembayaran</span>
            <span className="font-semibold">{selectedPayment}</span>
          </div>
        </div>

        {/* DETAIL TRANSAKSI */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-3">Detail Transaksi</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Produk</span>
            <span className="font-semibold">{productName}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Data Tersedia</span>
            <span className="font-semibold">{selectedData}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Jumlah</span>
            <span className="font-semibold">1</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Nama Pelanggan</span>
            <span className="font-semibold">{userData?.name}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>No WhatsApp</span>
            <span className="font-semibold">{maskWhatsapp(userData?.whatsapp)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Email</span>
            <span className="font-semibold">{maskEmail(userData?.email)}</span>
          </div>
        </div>

        {/* DETAIL PEMBAYARAN */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-3">Detail Pembayaran</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Harga</span>
            <span className="font-semibold">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Biaya Transaksi</span>
            <span className="font-semibold">Rp2.500</span>
          </div>
          <div className="flex justify-between text-sm font-bold mt-2">
            <span>Total</span>
            <span className="font-semibold">
              {activePrice ? `Rp${(activePrice + 2500).toLocaleString("id-ID")}` : "-"}
            </span>
          </div>
        </div>

        <Button className="w-full bg-indigo-700 text-white py-3 mt-4 rounded" onClick={() => navigate("/")}>
          Selesai
        </Button>
      </div>
    </div>
  );
}

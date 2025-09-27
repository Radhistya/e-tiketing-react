import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { paymentMethods } from "../data/payment";
import { ArrowLeft, Check, Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useIsMobile from "../hooks/mobile";
import useLoading from "@/hooks/loading";
import { Loading } from "@/components/loading";
import { formatTanggalIndonesia } from "@/lib/formattanggal";

export default function Payment() {
  const location = useLocation();
  const loading = useLoading(2000);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { productData, userData, step = 1, completedSteps: prevCompletedSteps = [] } = location.state || {};
  const { productName, selectedData, selectedValidity, activePrice, tanggalPesanan } = productData || {};

  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.name || ""); // default dari paymentMethods
  const steps = [1, 2];
  const [activeStep, setActiveStep] = useState(step); // step dari location.state
  const [completedSteps, setCompletedSteps] = useState(prevCompletedSteps); // centang dari location.state

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleSubmit = () => {
    const nextStep = activeStep + 1;
    const updatedCompletedSteps = [...completedSteps, activeStep];
    navigate("/invoice", {
      state: { productData, userData, selectedPayment, step: nextStep, completedSteps: updatedCompletedSteps },
    });
  };

  if (loading) return <Loading isMobile={isMobile} />;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Mobile */}
        <div className="flex flex-row justify-between bg-indigo-700 text-white pb-16">
          <div className="flex items-center px-4 py-3">
            <Button size="icon" variant="ghost" className="text-white hover:bg-indigo-600" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="text-lg font-semibold">Metode Pembayaran</h1>
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
          }
        `}
                >
                  {completedSteps.includes(step) ? <Check size={16} /> : step}
                </div>
                {step !== steps.length && <div className="w-8 h-1 bg-gray-300 ml-3"></div>}
              </div>
            ))}
          </div>
        </div>
        {/* Body */}
        <div className="-mt-12 bg-white rounded-t-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Paket</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Paket Terpilih</span>
              <span className="font-semibold">{productName}</span>
            </div>
            <div className="flex justify-between">
              <span>Data Tersedia</span>
              <span>{selectedData}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal Pesanan</span>
              <span className="font-semibold">{formatTanggalIndonesia(tanggalPesanan)}</span>
            </div>
            <div className="flex justify-between">
              <span>Masa Berlaku</span>
              <span className="font-semibold">{selectedValidity}</span>
            </div>
            <div className="flex justify-between">
              <span>Harga</span>
              <span className="font-semibold">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">Pilih Metode Pembayaran</h2>
          <div className="space-y-2 mb-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon; // ambil komponen ikon dari data
              return (
                <div
                  key={method.id}
                  className={`p-3 border rounded flex justify-between items-center cursor-pointer ${
                    selectedPayment === method.name ? "border-blue-700 bg-blue-50" : "border-gray-300"
                  }`}
                  onClick={() => handlePaymentSelect(method.name)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" /> {/* ikon Lucide */}
                    <span>{method.name}</span>
                  </div>
                  <input type="radio" checked={selectedPayment === method.name} readOnly />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <p>Harga</p>
              <p>Biaya Layanan</p>
              <p className="font-semibold mt-1">Total</p>
            </div>
            <div className="text-right">
              <p>{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</p>
              <p>Rp500</p>
              <p className="font-semibold mt-1">
                {activePrice ? `Rp${(activePrice + 500).toLocaleString("id-ID")}` : "-"}
              </p>
            </div>
          </div>

          <button className="w-full bg-blue-700 text-white py-3 rounded" onClick={handleSubmit}>
            Lanjutkan
          </button>
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
      <div className="flex flex-row justify-between gap-12 mx-3 py-5 px-7">
        <div className="w-full bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4 text-lg">Ringkasan Paket</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Paket Terpilih</span>
              <span className="font-semibold">{productName}</span>
            </div>
            <div className="flex justify-between">
              <span>Data Tersedia</span>
              <span>{selectedData}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal Pesanan</span>
              <span className="font-semibold">{tanggalPesanan}</span>
            </div>
            <div className="flex justify-between">
              <span>Masa Berlaku</span>
              <span className="font-semibold">{selectedValidity}</span>
            </div>
            <div className="flex justify-between">
              <span>Harga</span>
              <span className="font-semibold">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
            </div>
          </div>
          <div className="space-y-2 mb-6">
            <h2 className="font-semibold">Pilih Metode Pembayaran</h2>
            {paymentMethods.map((method) => {
              const Icon = method.icon; // ambil komponen ikon dari data
              return (
                <div
                  key={method.id}
                  className={`p-3 border rounded flex justify-between items-center cursor-pointer ${
                    selectedPayment === method.name ? "border-blue-700 bg-blue-50" : "border-gray-300"
                  }`}
                  onClick={() => handlePaymentSelect(method.name)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" /> {/* ikon Lucide */}
                    <span>{method.name}</span>
                  </div>
                  <input type="radio" checked={selectedPayment === method.name} readOnly />
                </div>
              );
            })}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Paket harga </span>
                <span className="font-semibold">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan </span>
                <span className="font-semibold">Rp500</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan </span>
                <span className="font-semibold">Rp500</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span className="text-indigo-800 ">Total</span>
              <span className="text-indigo-800">
                {activePrice ? `Rp${(activePrice + 500).toLocaleString("id-ID")}` : "-"}
              </span>
            </div>
          </div>
          <Button
            className="w-full mt-8 bg-indigo-700 text-white rounded-full py-3 text-base hover:bg-indigo-800"
            onClick={handleSubmit}
          >
            Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}

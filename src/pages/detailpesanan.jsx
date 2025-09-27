import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useIsMobile from "../hooks/mobile";
import useLoading from "@/hooks/loading";
import { Loading } from "@/components/loading";
import { formatTanggalIndonesia } from "@/lib/formattanggal";

export default function DetailPesanan() {
  const location = useLocation();
  const { productName, selectedData, selectedValidity, activePrice, image, tanggalPesanan } = location.state || {};
  const productData = { productName, selectedData, selectedValidity, activePrice, image, tanggalPesanan };
  const [userData, setUserData] = useState({ name: "", email: "", whatsapp: "" });
  const steps = [1, 2];
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const loading = useLoading(2000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, whatsapp } = userData;

    // Validasi form
    if (!name || !email || !whatsapp) {
      alert("Harap isi semua data pelanggan sebelum melanjutkan.");
      return;
    }

    const nextStep = activeStep + 1;
    const updatedCompletedSteps = [...completedSteps, activeStep];

    navigate("/payment", {
      state: {
        userData,
        productData,
        step: nextStep,
        completedSteps: updatedCompletedSteps,
      },
    });
  };

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

        {/* BODY */}
        <div className="-mt-12 bg-white rounded-t-3xl p-6">
          <h2 className="font-semibold mb-4">Ringkasan Paket</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Paket Terpilih</span>
              <span className="text-gray-800 font-medium">{productName || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Tersedia</span>
              <span className="text-gray-800 font-medium">{selectedData || "-"}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="text-gray-600">Harga</span>
              <span className="text-gray-800 font-medium">
                {activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}
              </span>
            </div> */}
            <div className="flex justify-between">
              <span className="text-gray-600">Masa berlaku</span>
              <span className="text-gray-800 font-medium">{selectedValidity || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Pesanan</span>
              <span className="text-gray-800 font-medium">{formatTanggalIndonesia(tanggalPesanan) || "-"}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Harga</span>
            <span className="text-indigo-700">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
          </div>

          {/* Form */}
          <form className="mt-8">
            <h2 className="font-semibold mt-6 mb-3">Data Pelanggan</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama</label>
                <Input
                  name="name"
                  placeholder="Masukan Nama Pelanggan"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alamat Email</label>
                <Input
                  name="email"
                  placeholder="Masukan Email Pelanggan"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nomor Whatsapp</label>
                <Input
                  name="whatsapp"
                  placeholder="Masukan Nomor HP Pelanggan"
                  value={userData.whatsapp}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Jika terjadi kendala, kami akan menghubungi ke nomor ini</p>
              </div>
            </div>
          </form>

          {/* Button */}
          <Button
            className="w-full mt-8 bg-indigo-700 text-white rounded-full py-3 text-base hover:bg-indigo-800"
            onClick={handleSubmit}
          >
            Lanjutkan
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
        <img src={image} alt={productName.name} className="h-full w-full object-cover" />
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
        <div className="w-[80%] bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4 text-lg">Data pelanggan</h2>
          <form className="bg-indigo-200 mt-4 px-3 rounded-lg shadow-md">
            <div>
              <div className="mb-5">
                <label className="text-sm font-medium ml-1">Nama</label>
                <Input
                  name="name"
                  placeholder="Masukan Nama Pelanggan"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-5">
                <label className="text-sm font-medium ml-1">Alamat Email</label>
                <Input
                  name="email"
                  placeholder="Masukan Email Pelanggan"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-5">
                <label className="text-sm font-medium ml-1">Nomor Whatsapp</label>
                <Input
                  name="whatsapp"
                  placeholder="Masukan Nomor HP Pelanggan"
                  value={userData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full mt-2 bg-white focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1 ml-1 py-1">
                  Jika terjadi kendala, kami akan menghubungi ke nomor ini
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="font-semibold mb-4 text-lg">Paket yang dipilih</h2>
          <div className="flex justify-between">
            <span className="text-sm">Paket yang dipilih</span>
            <span className="text-sm font-medium">{productName || "-"}</span>
          </div>
          <div className="flex justify-between gap-3 mt-3">
            <span className="text-sm">Data Tersedia</span>
            <span className="text-sm font-medium">{selectedData || "-"}</span>
          </div>
          <div className="flex justify-between gap-3 mt-3">
            <span className="text-sm">Masa berlaku</span>
            <span className="text-sm font-medium">{selectedValidity || "-"}</span>
          </div>
          <div className="flex justify-between gap-3 mt-3">
            <span className="text-sm">Tanggal Pesanan</span>
            <span className="text-sm font-medium">{tanggalPesanan || "-"}</span>
          </div>
          <div className="flex justify-between gap-3 mt-5 border-t border-gray-300 pt-3 flex justify-between text-lg font-semibold">
            <span className="text-indigo-800">Harga</span>
            <span className="text-indigo-800">{activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "-"}</span>
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

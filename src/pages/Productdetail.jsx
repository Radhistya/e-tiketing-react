import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Banknote, Zap, ArrowLeft } from "lucide-react";
import { Products } from "../data/products";
import useIsMobile from "../hooks/mobile";
import useLoading from "@/hooks/loading";
import { Loading } from "@/components/loading";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = Products.find((p) => p.id.toString() === id);
  const isMobile = useIsMobile();
  const loading = useLoading(2000);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedValidity, setSelectedValidity] = useState(null);

  if (!product) return <div className="p-4">Produk tidak ditemukan</div>;

  // ambil unique data & validity
  const dataOptions = [...new Set(product.priceOptions.map((opt) => opt.data))];
  const validityOptions = [...new Set(product.priceOptions.map((opt) => opt.validity))];
  const tanggalPesanan = new Date().toISOString(); // misal: "27/09/2025"

  // cari harga sesuai kombinasi
  const activeOption = product.priceOptions.find(
    (opt) => opt.data === selectedData && opt.validity === selectedValidity
  );
  const activePrice = activeOption ? activeOption.price : null;

  const navigatetoback = () => {
    navigate(-1);
  };

  const navigateDetailPesan = () => {
    navigate(`/detailpesanan/${id}`, {
      state: {
        productName: product.name,
        selectedData,
        selectedValidity,
        activePrice,
        image: product.image,
        tanggalPesanan,
      },
    });
  };

  if (loading) return <Loading isMobile={isMobile} />;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex flex-col">
          <div className="relative w-full h-100 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

            {/* Tombol Back di pojok kiri atas */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-3 left-3 bg-white/70 hover:bg-white rounded-full shadow"
              onClick={navigatetoback} // fungsi navigate(-1)
            >
              <ArrowLeft className="h-5 w-5 text-black" />
            </Button>
          </div>

          <div className="bg-white p-4 space-y-4 -mt-20 rounded-t-[30px] z-100">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500">Region {product.region}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  {product.type === "Instant" ? (
                    <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      <Zap className="h-4 w-4" /> Instant
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      <Banknote className="h-4 w-4" /> Topupable
                    </span>
                  )}
                </div>
              </div>
              <p className="text-lg font-bold text-indigo-700">
                {activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "Pilih paket"}
              </p>
            </div>

            {/* Ukuran Data */}
            <div>
              <p className="font-semibold mb-2">Ukuran Data</p>
              <div className="flex gap-2 flex-wrap">
                {dataOptions.map((d) => (
                  <Button
                    key={d}
                    variant={selectedData === d ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSelectedData(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            {/* Jumlah Hari */}
            <div>
              <p className="font-semibold mb-2">Pilih Jumlah Hari</p>
              <div className="flex gap-2 flex-wrap">
                {validityOptions.map((v) => (
                  <Button
                    key={v}
                    variant={selectedValidity === v ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setSelectedValidity(v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <p className="font-semibold mb-2">Deskripsi</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
            <Button
              className="w-full h-full bg-indigo-700 mt-10 text-white rounded-full py-3 text-base hover:bg-indigo-800"
              onClick={navigateDetailPesan}
              disabled={!activeOption}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* ================== DESKTOP ================== */
    <div className="min-h-screen bg-blue-50">
      {/* Gambar full width */}
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
      <div className="flex flex-col mb-6">
        <div className="w-full h-100 overflow-hidden shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mb-8" />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-20 left-3 bg-white/70 hover:bg-white rounded-full shadow"
            onClick={navigatetoback} // fungsi navigate(-1)
          >
            <ArrowLeft className="h-5 w-5 text-black" />
          </Button>
        </div>
      </div>
      {/* Grid 2 kolom */}
      <div className="grid grid-cols-2 gap-6 px-5">
        {/* Kiri: Header + Data + Validity */}
        <Card className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-sm text-gray-500">Region {product.region}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                {product.type === "Instant" ? (
                  <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    <Zap className="h-4 w-4" /> Instant
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    <Banknote className="h-4 w-4" /> Topupable
                  </span>
                )}
              </div>
            </div>
            <p className="text-xl font-bold text-indigo-700">
              {activePrice ? `Rp${activePrice.toLocaleString("id-ID")}` : "Pilih paket"}
            </p>
          </div>

          {/* Ukuran Data */}
          <div>
            <p className="font-semibold mb-2">Ukuran Data</p>
            <div className="flex gap-2 flex-wrap">
              {dataOptions.map((d) => (
                <Button
                  key={d}
                  variant={selectedData === d ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedData(d)}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          {/* Jumlah Hari */}
          <div>
            <p className="font-semibold mb-2">Pilih Jumlah Hari</p>
            <div className="flex gap-2 flex-wrap">
              {validityOptions.map((v) => (
                <Button
                  key={v}
                  variant={selectedValidity === v ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedValidity(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Kanan: Deskripsi + Tombol */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="font-semibold mb-2">Deskripsi</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
              {product.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Button
              className="w-full bg-indigo-700 text-white rounded-full py-3 text-base hover:bg-indigo-800"
              onClick={navigateDetailPesan}
              disabled={!activeOption}
            >
              Lanjutkan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Products } from "../data/products";
import { regions } from "@/data/region";
import { types } from "@/data/producttype";
import ProductCard from "../components/productcard";
import useIsMobile from "../hooks/mobile";
import { useNavigate } from "react-router-dom";

export default function TravelEsimPage() {
  const isMobile = useIsMobile();
  const [region, setRegion] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = Products.filter((p) => {
    return (
      (region === "all" || p.region.toLowerCase() === region) &&
      (type === "all" || p.type.toLowerCase() === type) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const NavigateProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  // ========== MOBILE LAYOUT ==========
  if (isMobile) {
    return (
      <div className="min-h-screen bg-blue-50">
        {/* Header Mobile */}
        <div className="h-60 bg-indigo-800 text-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button size="icon" variant="ghost" className="text-white hover:bg-indigo-700">
              <ArrowLeft />
            </Button>
            <h1 className="text-lg font-semibold">Travel eSIM</h1>
          </div>

          {/* Search + Filter */}
          <div className="px-4 pb-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Cari Produk yang Anda Mau"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-indigo-900/60 border-none text-white placeholder:text-indigo-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-indigo-300" />
            </div>

            {/* Filter pakai Sheet */}
            <div className="flex justify-start gap-5 mt-5">
              {/* Region */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-indigo-700 text-white rounded-full">
                    {regions.find((r) => r.value === region)?.label}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetTitle className="font-semibold text-lg mb-3">Pilih Region</SheetTitle>
                  <div className="grid gap-2">
                    {regions.map((r) => (
                      <Button
                        key={r.value}
                        variant={region === r.value ? "default" : "outline"}
                        onClick={() => setRegion(r.value)}
                      >
                        {r.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Type */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-indigo-700 text-white rounded-full">
                    {types.find((t) => t.value === type)?.label}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetTitle className="font-semibold text-lg mb-3">Pilih Jenis</SheetTitle>
                  <div className="grid gap-2">
                    {types.map((t) => (
                      <Button
                        key={t.value}
                        variant={type === t.value ? "default" : "outline"}
                        onClick={() => setType(t.value)}
                      >
                        {t.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Produk Mobile */}
        <div className="h-full w-full bg-white p-4 -mt-[60px] border rounded-t-3xl grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={NavigateProductDetail} />
          ))}
        </div>
      </div>
    );
  }

  // ========== DESKTOP LAYOUT ==========
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header Desktop */}
      <header className="bg-indigo-600 shadow-md">
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

        {/* Search & Filter bar */}
        <div className="bg-indigo-50 py-4 px-8 flex gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Input
              placeholder="Cari produk eSIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Region */}
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Pilih Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type */}
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Pilih Jenis" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Produk Desktop */}
      <div className="w-full h-full bg-white p-8 grid grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={NavigateProductDetail} />
        ))}
      </div>
    </div>
  );
}

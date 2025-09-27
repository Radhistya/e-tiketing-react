import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Banknote, Bot, Zap } from "lucide-react";

export default function ProductCard({ product, onClick }) {
  // Ambil harga termurah dari priceOptions
  const minPrice = Math.min(...product.priceOptions.map((option) => option.price));

  return (
    <Card className="rounded-2xl overflow-hidden shadow-md">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
      <CardContent className="p-3">
        <h3 className="font-semibold text-lg text-black">{product.name}</h3>
        <p className="text-sm text-gray-500">Region {product.region}</p>

        <div className="flex items-center gap-2 mt-2 text-sm">
          {product.type === "Instant" ? (
            <div className="flex items-center gap-1 text-black">
              <Zap className="h-full w-full pr-2 border-r-2 border-black" />
              <span>Instant</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-black">
              <Banknote className="h-full w-full pr-2 border-r-2 border-black" />
              <span>Topupable</span>
            </div>
          )}
        </div>

        <p className="mt-2 font-bold text-indigo-700">Mulai Rp{minPrice.toLocaleString("id-ID")}</p>
        <Button
          className="mt-2 w-full bg-indigo-700 text-white rounded-full py-2 hover:bg-indigo-800 transition"
          onClick={() => onClick(product.id)}
        >
          Beli Sekarang
        </Button>
      </CardContent>
    </Card>
  );
}

"use client";

import {useState} from "react";
import {ShoppingCart, Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import type {SanityProduct} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

export default function ProductDetailClient({product}: {product: SanityProduct}) {
  const {addToCart} = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(200).height(200).url()
    : "";

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        description: "",
        price: product.price,
        imageUrl,
        quantity: "1",
      });
    }
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Quantity Selector */}
      <div className="flex items-center rounded-xl border border-slate-200">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={!product.inStock}
          className="flex h-11 w-11 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-[#345B58]">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          disabled={!product.inStock}
          className="flex h-11 w-11 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAdd}
        disabled={!product.inStock}
        size="lg"
        className={`flex-1 gap-2 font-semibold ${
          added
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-[#345B58] text-white hover:bg-[#2a4a47]"
        }`}
      >
        <ShoppingCart className="h-5 w-5" />
        {added ? "Added to Cart!" : "Add to Cart"}
      </Button>
    </div>
  );
}

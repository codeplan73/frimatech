"use client";

import {useState} from "react";
import {ShoppingCart, Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import type {SanityProduct} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

interface Props {
  product: SanityProduct;
}

export default function AddToCartButton({product}: Props) {
  const {addToCart, products} = useCartStore();
  const [added, setAdded] = useState(false);

  const isInCart = products.some((p) => p.id === product._id);

  const handleAdd = () => {
    const imageUrl = product.images?.[0]
      ? urlFor(product.images[0]).width(200).height(200).url()
      : "";

    addToCart({
      id: product._id,
      name: product.name,
      description: "",
      price: product.price,
      imageUrl,
      quantity: "1",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={!product.inStock}
      size="sm"
      className={`w-full gap-1.5 text-xs font-semibold transition-all ${
        added
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-[#345B58] text-white hover:bg-[#2a4a47]"
      }`}
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Added
        </>
      ) : isInCart ? (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          Add More
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}

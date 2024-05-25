"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import useCartStore from "@/store/cartStore";
import { toast } from "react-toastify";
import { Product as PrismaProduct } from "@prisma/client";

type Product = PrismaProduct & { quantity: string };

const ProductDatails = ({ product }: { product: Product }) => {
  const { removeFromCart, addToCart, items } = useCartStore();
  const price = parseFloat(product.price);
  const formattedPrice = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(price);
  return (
    <div className="grid grid-cols-1 gap-10 mx-auto my-12 space-y-4 md:grid-cols-5 max-w-7xl">
      <div className="col-span-2 space-y-6">
        <div className="p-5 bg-white rounded-lg shadow">
          <Image
            src={product.imageUrl}
            alt={product.productName}
            height={1000}
            width={1000}
          />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex-col space-y-4 lex">
          <h2 className="text-3xl font-medium">{product.productName}</h2>
          <p className="text-sm font-semibold text-slate-600">
            Available Quantity: {product.quantity}
          </p>
          <p className="font-bold text-gray-900">{formattedPrice}</p>
          <div className="mt-4">
            <p className="text-gray-700 font-sans-serif text-md">
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </p>
          </div>

          <div className="space-x-4 space-y-4">
            <Button
              onClick={() => {
                addToCart({ ...product, updated: new Date() });
                toast.success("Item Added to Cart");
              }}
              className="text-textPrimary bg-bgPrimary hover:text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDatails;

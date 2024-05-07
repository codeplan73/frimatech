import React from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";

const ProductDatails = ({ product }: { product: Product }) => {
  const price = parseFloat(product.price);
  const formattedPrice = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(price);
  return (
    <div className="flex flex-col w-full gap-8 bg-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 justify-start space-x-4">
        <div className="flex w-7/12 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.productName}
            height={1000}
            width={1000}
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h4 className="text-xl md:text-3xl font-semibold text-slate-600">
            {product.productName}
          </h4>
          <h4 className="text-lg md:text-xl font-semibold text-slate-600">
            Price: {formattedPrice}
          </h4>
          <h4 className="text-lg md:text-xl font-semibold text-slate-600">
            Available Quantity: {product.quantity}
          </h4>
          <div className="space-x-4">
            <Button className="text-textPrimary bg-bgPrimary">
              Add to Cart
            </Button>
            <Button className="bg-textPrimary text-bgPrimary">
              Checkout Now
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Card className="border-none">
          <CardContent className="prose lg:prose-xl">
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDatails;

"use server";

import React from "react";
import ProductCardGrid from "@/components/ProductCardGrid";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";

const HomeProduct = async () => {
  const products = await db.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container grid grid-cols-1 gap-12 p-4 py-4 md:grid-cols-4 md:gap-6">
      {products.map((product: Product) => {
        const price = parseFloat(product.price);
        const formattedPrice = new Intl.NumberFormat("en-ng", {
          style: "currency",
          currency: "NGN",
        }).format(price);
        return (
          <ProductCardGrid
            rating=""
            key={product.id}
            image={product.imageUrl}
            price={formattedPrice}
            name={product.productName}
            link={`/shop/${product.id}`}
          />
        );
      })}
    </div>
  );
};

export default HomeProduct;

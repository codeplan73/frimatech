import React from "react";
import { db } from "@/lib/db";
import ProductCardGrid from "@/components/ProductCardGrid";

const ProductList = async () => {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {products?.map((item) => {
        const price = parseFloat(item.price);
        const formattedPrice = new Intl.NumberFormat("en-ng", {
          style: "currency",
          currency: "NGN",
        }).format(price);

        return (
          <ProductCardGrid
            rating=""
            key={item.id}
            image={item.imageUrl}
            price={formattedPrice}
            name={item.productName}
            link={`/shop/${item.id}`}
          />
        );
      })}
    </>
  );
};
export default ProductList;

"use client";

import React from "react";
import ProductCardGrid from "@/components/ProductCardGrid";
import { useProducts } from "@/hook/useProductHook";
import Image from "next/image";

const ProductList = () => {
  const { data: products, error, isLoading } = useProducts();

  const loader = (
    <div className="flex items-center justify-center h-[30vh] py-8 mx-auto pl-72">
      <Image
        src="/img/loading.gif"
        height={500}
        width={500}
        alt={"loader"}
        className="justify-center"
      />
    </div>
  );

  if (isLoading) {
    return loader;
  }

  if (error) {
    console.log(error);
  }

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

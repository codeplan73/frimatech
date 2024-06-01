"use client";

import React from "react";
import ProductCardGrid from "@/components/ProductCardGrid";
import Skeleton from "react-loading-skeleton";
import { useProducts } from "@/hook/useProductHook";

const ProductList = () => {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col max-w-sm gap-2 p-4 rounded-xl drop-shadow-lg">
          <div className="relative w-full" style={{ paddingBottom: "100%" }}>
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
          </div>
          <div className="flex items-start justify-between py-2">
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-md">
                {" "}
                <Skeleton height="20rem" />
              </p>
              <div className="flex items-start justify-start space-x-2">
                <p className="flex">
                  <Skeleton height="20rem" />
                  <Skeleton height="20rem" />
                </p>
                {/* <span className="-mt-1 text-yellow-400">{rating}</span> */}
              </div>
              <h4 className="text-lg leading-tight text-balance text-slate-500 line-clamp-1">
                <Skeleton height="20rem" />
              </h4>
            </div>
            <Skeleton height="20rem" />
          </div>
        </div>
      </div>
    );
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

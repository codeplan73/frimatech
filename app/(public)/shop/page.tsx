"use client";

import Banner from "@/components/page-banner";
import React from "react";
import ProductList from "./_components/ProductList";
import { useProducts } from "@/hook/useProductHook";
import Image from "next/image";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const ShopPage = () => {
  const { data: products, error, isLoading } = useProducts();
  const loader = (
    <div className="flex items-center justify-center h-[10vh] py-8 mx-auto pl-72">
      <Image
        src="/img/loading.gif"
        height={100}
        width={100}
        alt={"loader"}
        className="justify-center h-60 w-60"
      />
    </div>
  );

  if (isLoading) {
    return loader;
  }

  if (products?.length === 0) {
    return (
      <>
        <Banner
          currentPage="Shop"
          title="Shop Page"
          link="/"
          style={{ backgroundImage: "url('/img/shop.png')" }}
        />
        <div className="flex flex-col gap-6 items-center justify-center py-20 mx-auto">
          <MdOutlineProductionQuantityLimits className="text-6xl text-slate-400" />
          <p className="text-xl md:text-4xl text-slate-400 font-semibold">
            No products found.
          </p>
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-col">
      <Banner
        currentPage="Shop"
        title="Shop Page"
        link="/"
        style={{ backgroundImage: "url('/img/shop.png')" }}
      />

      <div className="w-full px-6 py-12 mx-auto space-y-8 md:px-32 bg-slate-100">
        <h4 className="container text-3xl font-bold md:text-4xl text-bgPrimary">
          Explore Our recommendations
        </h4>

        <div className="container grid grid-cols-1 gap-12 p-4 py-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

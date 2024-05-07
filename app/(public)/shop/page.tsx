import Banner from "@/components/page-banner";
import React from "react";
import ProductList from "./_components/ProductList";

const ShopPage = () => {
  return (
    <div className="flex flex-col">
      <Banner
        currentPage="Shop"
        title="Shop Page"
        link="/"
        style={{ backgroundImage: "url('/img/shop.png')" }}
      />

      <div className="mx-auto w-full px-6 md:px-32 space-y-8 py-12 bg-slate-100">
        <h4 className="container text-3xl md:text-4xl font-bold text-bgPrimary">
          Explore Our recommendations
        </h4>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 p-4 py-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

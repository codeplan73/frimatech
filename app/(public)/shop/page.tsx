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

      {/* <div className="w-full px-6 py-12 mx-auto space-y-8 md:px-32 bg-slate-100">
        <h4 className="container text-3xl font-bold md:text-4xl text-bgPrimary">
          Explore Our recommendations
        </h4>

        <div className="container grid grid-cols-1 gap-12 p-4 py-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6"> */}
      <ProductList />
      {/* </div>
      </div> */}
    </div>
  );
};

export default ShopPage;

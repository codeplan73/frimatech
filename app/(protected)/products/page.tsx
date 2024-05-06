import React from "react";
import ProductList from "./_component/ProductList";
import BreadCumNav from "@/components/BreadCumNav";

const ProductsPage = async () => {
  return (
    <div className="container mx-auto py-10 bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="products" />
      <ProductList />
    </div>
  );
};

export default ProductsPage;

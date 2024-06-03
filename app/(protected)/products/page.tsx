import React from "react";
import ProductList from "./_components/ProductList";
import BreadCumNav from "@/components/BreadCumNav";

const ProductsPage = async () => {
  return (
    <div className="container py-10 mx-auto bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="products" />
      <ProductList />
    </div>
  );
};

export default ProductsPage;

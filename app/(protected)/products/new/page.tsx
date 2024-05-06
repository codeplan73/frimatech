import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import NewForm from "../_components/ProductForm";

const NewPage = () => {
  return (
    <div className="">
      <BreadCumNav
        dashboard="dashboard"
        currentPage="products"
        currentSection="Add New Product"
      />
      <div>
        <NewForm />
      </div>
    </div>
  );
};

export default NewPage;

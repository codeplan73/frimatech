import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import CategoryForm from "../_components/CategoryForm";

const NewPage = () => {
  return (
    <div className="flex flex-col">
      <BreadCumNav
        dashboard="dashboard"
        currentPage="categories"
        currentSection="Add New Category"
      />
      <div>
        <CategoryForm />
      </div>
    </div>
  );
};

export default NewPage;

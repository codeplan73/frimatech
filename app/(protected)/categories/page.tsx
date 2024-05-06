import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import CategoryList from "./_components/CategoryList";

const CategoryPage = () => {
  return (
    <div className="container mx-auto py-10 bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="categories" />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;

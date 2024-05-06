import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import NewForm from "../_component/CategoryForm";

const NewPage = () => {
  return (
    <div className="flex flex-col">
      <BreadCumNav
        dashboard="dashboard"
        currentPage="categories"
        currentSection="Add New Category"
      />
      <div>
        <NewForm />
      </div>
    </div>
  );
};

export default NewPage;

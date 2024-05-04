import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import NewForm from "../_component/NewForm";

const NewPage = () => {
  return (
    <div className="">
      <BreadCumNav
        dashboard="dashboard"
        currentPage="users"
        currentSection="Add New User"
      />
      <div>
        <NewForm />
      </div>
    </div>
  );
};

export default NewPage;

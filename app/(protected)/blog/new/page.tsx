import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import BlogForm from "../_components/BlogForm";

const NewPage = () => {
  return (
    <div className="flex flex-col">
      <BreadCumNav
        dashboard="dashboard"
        currentPage="blog"
        currentSection="New Blog Post"
      />
      <div>
        <BlogForm />
      </div>
    </div>
  );
};

export default NewPage;

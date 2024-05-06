import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import BlogList from "./_components/BlogList";

const BlogPage = () => {
  return (
    <div className="container mx-auto py-10 bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="blog" />
      <BlogList />
    </div>
  );
};

export default BlogPage;

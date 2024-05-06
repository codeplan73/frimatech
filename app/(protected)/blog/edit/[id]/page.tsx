import React from "react";
import { db } from "@/lib/db";
import BreadCumNav from "@/components/BreadCumNav";
import BlogForm from "../../_components/BlogForm";

interface Props {
  params: { id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const blog = await db.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    return null; // or any other fallback behavior
  }

  return (
    <div>
      <BreadCumNav
        dashboard="dashboard"
        currentPage="blog"
        currentSection={`Edit ${blog.title}`}
      />
      <BlogForm blog={blog} />
    </div>
  );
};

export default EditProductPage;

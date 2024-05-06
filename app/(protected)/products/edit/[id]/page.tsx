import React from "react";
import { db } from "@/lib/db";
import BreadCumNav from "@/components/BreadCumNav";
import ProductForm from "../../_components/ProductForm";

interface Props {
  params: { id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return null; // or any other fallback behavior
  }

  return (
    <div>
      <BreadCumNav
        dashboard="dashboard"
        currentPage="products"
        currentSection={`Edit ${product.productName}`}
      />
      <ProductForm product={product} />
    </div>
  );
};

export default EditProductPage;

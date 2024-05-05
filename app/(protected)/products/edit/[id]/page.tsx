import React from "react";
import { db } from "@/lib/db";

interface Props {
  params: { id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <h4>{product?.productName}</h4>
    </div>
  );
};

export default EditProductPage;

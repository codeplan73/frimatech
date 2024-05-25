import Banner from "@/components/page-banner";
import React from "react";
import ProductDatails from "../_components/ProductDatails";
import { db } from "@/lib/db";
import Skeleton from "react-loading-skeleton";
interface Props {
  params: { id: string };
}

const ProductDetailsPage = async ({ params }: Props) => {
  const product = await db.product.findFirst({
    where: { id: params.id },
  });

  const name = product?.productName;

  if (!product) return <Skeleton />;

  return (
    <div className="flex flex-col">
      <Banner
        currentPage="Shop"
        title={name}
        link="/"
        style={{ backgroundImage: "url('/img/shop.png')" }}
      />

      <div className="w-full px-6 py-12 mx-auto space-y-8 md:px-32 bg-slate-100">
        {product && <ProductDatails product={product} />}
      </div>
    </div>
  );
};

export default ProductDetailsPage;

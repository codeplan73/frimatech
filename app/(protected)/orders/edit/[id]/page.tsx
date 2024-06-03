import React from "react";
import { db } from "@/lib/db";
import BreadCumNav from "@/components/BreadCumNav";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const EditOrderPage = async ({ params }: Props) => {
  const orders = await db.order.findUnique({
    where: { id: parseInt(params.id) },
  });

  const orderItems = await db.orderItem.findMany({
    where: { orderId: parseInt(params.id) },
  });

  if (!orders) {
    return null; // or any other fallback behavior
  }

  return (
    <div>
      <BreadCumNav
        dashboard="dashboard"
        currentPage="orders"
        currentSection={`Order Details | ${orders.shippingName}`}
      />

      {orderItems.map((order) => {
        const price = new Intl.NumberFormat("en-ng", {
          style: "currency",
          currency: "NGN",
        }).format(Number(order.price));
        return (
          <div
            key={order.id}
            className="grid grid-cols-1 gap-10 pb-4 mx-auto my-12 space-y-4 bg-white border-b-2 border-gray-200 md:grid-cols-5 max-w-7xl"
          >
            <div className="col-span-2 space-y-6">
              <div className="p-5 bg-white rounded-lg shadow">
                <Image
                  src={order.imageUrl}
                  alt={order.productName}
                  height={1000}
                  width={1000}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex-col space-y-4 lex">
                <h2 className="text-3xl font-medium">{order.productName}</h2>
                <p className="text-sm font-semibold text-slate-600">
                  Quantity Ordered: {order.quantity}
                </p>
                <p className="font-bold text-gray-900">{price}</p>
                <div className="mt-4">
                  <p className="text-gray-700 font-sans-serif text-md">
                    <ReactMarkdown>{order.description}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EditOrderPage;

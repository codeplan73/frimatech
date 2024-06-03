import React from "react";
import { db } from "@/lib/db";
import BreadCumNav from "@/components/BreadCumNav";
import OrderItemList from "../../_components/OrderItem";
import Image from "next/image";
import EditAction from "../../_components/EditAction";

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

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Product
              </th>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Price
              </th>
              {/* <th scope="col" className="px-6 py-3 rounded-e-lg"></th> */}
            </tr>
          </thead>
          <tbody>
            {orderItems.map((order) => {
              const price = new Intl.NumberFormat("en-ng", {
                style: "currency",
                currency: "NGN",
              }).format(Number(order.price));
              return (
                <tr
                  key={order.id}
                  className="bg-white border rounded-lg dark:bg-gray-800"
                >
                  <td className="flex flex-col items-center px-2 py-2 space-x-4 font-medium text-gray-900 md:flex-row whitespace-nowrap dark:text-white">
                    <Image
                      src={order.imageUrl}
                      height={1000}
                      width={1000}
                      alt={order.productName}
                      className="object-cover rounded-md bg-slate-100 h-14 w-14"
                    />

                    <p>{order.productName}</p>
                  </td>

                  <td className="pl-8">{order.category}</td>
                  <td className="pl-8">{order.quantity}</td>
                  <td className="pl-8">{price}</td>
                  <td>
                    {/* <button className="px-4 py-2 font-semibold rounded-md text-bgPrimary bg-textPrimary">
                      Update Status
                    </button> */}
                    {/* <EditAction id={parseInt(order.id.toString())} /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditOrderPage;

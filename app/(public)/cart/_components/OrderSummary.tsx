"use client";

import useCartStore from "@/store/cartStore";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import PayStackCheckout from "./PayStackCheckout";

const OrderSummary = () => {
  const session = useSession();
  const { items, total, products } = useCartStore();

  const formatCurrency = (number: string) => {
    return new Intl.NumberFormat("en-ng", {
      style: "currency",
      currency: "NGN",
    }).format(Number(number));
  };

  const handleSubmit = (e: any) => {
    const messageString = `Hello, I would like to make an order for the following Items: ${products
      .map(
        (item) =>
          `${item.productName} (Quantity: ${
            item.quantity
          }, Price: ${formatCurrency(item.price)})`
      )
      .join(", ")}

    Total Items: ${items()},
    Total Amount: ${formatCurrency(total())}`;

    const whatsappNumber = "+2347060482923";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      messageString
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 md:col-span-1">
      <div className="flex flex-col gap-4 px-10 py-6 bg-white rounded-md shadow min-h-max ">
        <p className="text-xl font-semibold">Order Summary</p>
        <hr />
        <div className="flex flex-col gap-2">
          {/* <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Discount</span>
            <span className="text-sm font-semibold text-slate-800">0.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Delivery</span>
            <span className="text-sm font-semibold text-slate-800">0.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Tax</span>
            <span className="text-sm font-semibold text-slate-800">0.00</span>
          </div> */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Total Items</span>
            <span className="text-sm font-semibold text-slate-800">
              {items()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Total</span>
            <span className="text-sm font-semibold text-slate-800">
              {formatCurrency(total())}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-white">
        <button
          onClick={handleSubmit}
          className="py-2 font-semibold text-center text-white rounded-md bg-bgPrimary"
        >
          Checkout via WhatsApps
        </button>
      </div>

      {/* {session.data?.user ? (
        <PayStackCheckout />
      ) : (
        <div className="flex flex-col gap-2 p-4 bg-white">
          <Link
            href="/auth/login"
            className="py-2 font-semibold text-center text-white rounded-md bg-bgPrimary"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="py-2 font-semibold text-center text-white rounded-md bg-bgPrimary"
          >
            Register
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default OrderSummary;

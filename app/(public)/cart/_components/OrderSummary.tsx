"use client";

import React, {useState} from "react";
import useCartStore from "@/store/cartStore";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import PayStackCheckout from "./PayStackCheckout";

const OrderSummary = () => {
   const [message, setMessage] = useState("");
  const session = useSession();
  const { items, total, products } = useCartStore();

  const formattedTotal = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(Number(total()));




   const handleSubmit = (e: any) => {

    const messageString = `Items: ${products.map(
        (item) =>
          `${item.productName} (Quantity: ${item.quantity}, Price: ${item.price})`
      )
      .join(", ")}

      <br />
      Total: ${formattedTotal}`;

    const whatsappNumber = "+2349168189258"; // Replace with the WhatsApp number you want to send messages to
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
              {formattedTotal}
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

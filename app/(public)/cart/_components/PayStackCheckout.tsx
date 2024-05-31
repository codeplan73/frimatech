"use client";

import React from "react";
import useCartStore from "@/store/cartStore";
import { PaystackButton } from "react-paystack";
import { useSession } from "next-auth/react";

const ShippingAddressPagee = () => {
  const session = useSession();
  const { items, total, products } = useCartStore();
  const amountToSend = parseFloat(total()) * 100;
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: session.data?.user.email!,
    name: session.data?.user.name!,
    amount: amountToSend,
    publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: session.data?.user.name!,
          variable_name: "Iphone 15 Pro Max",
          value: amountToSend,
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

  const handlePaystackSuccessAction = (reference: any) => {
    const orderDetails = {
      address: session.data?.user.address,
      city: session.data?.user.city,
      paymentStatus: "Paid",
      deliveryStatus: "Pending",
      state: session.data?.user.state,
      totalAmount: amountToSend / 100,
      totalItems: items(),
      orderItems: products,
    };
    // console.log("Payment Successfull", reference);
    console.log(products, items(), amountToSend / 100, amountToSend);
    // clearCart();

    console.log("Order Details: ", orderDetails);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Checkout",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  return (
    <PaystackButton
      className="p-4 py-2 text-white bg-blue-500 rounded-md"
      {...componentProps}
      publicKey={componentProps.publicKey!}
    />
  );
};

export default ShippingAddressPagee;

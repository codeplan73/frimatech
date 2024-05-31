"use client";

import React from "react";
import useCartStore from "@/store/cartStore";
import { PaystackButton } from "react-paystack";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const session = useSession();
  const router = useRouter();
  const { items, total, products, clearCart } = useCartStore();
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

  const handlePaystackSuccessAction = async (reference: any) => {
    const orderDetails = {
      userId: session.data?.user.id,
      shippingName: session.data?.user.name,
      shippingAddress: session.data?.user.address,
      shippingCity: session.data?.user.city,
      paymentStatus: "Paid",
      deliveryStatus: "Pending",
      shippingState: session.data?.user.state,
      totalAmount: amountToSend / 100,
      totalItems: items().toString(),
      items: products,
    };

    const res = await axios.post("/api/orders", orderDetails);

    if (res.data) {
      Swal.fire({
        title: "Thank you for your order!",
        text: "Your order was successfully placed check your email for your order details!",
        icon: "success",
      });

      clearCart();

      router.push("/orders");
    }
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

export default CheckoutPage;

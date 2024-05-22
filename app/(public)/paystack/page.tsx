"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PaystackButton } from "react-paystack";

const PaymentPage = () => {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  const amount = 1000000;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const config = {
    reference: new Date().getTime().toString(),
    email: "superadmin@gmail.com",
    amount: 2000 * 100,
    publicKey: "pk_test_6fc53b466579d09e761700f2c59b75913fbeba8a",
    metadata: {
      custom_fields: [
        {
          display_name: "Emmanuel",
          variable_name: "Iphone 15 Pro Max",
          value: "NGN 1000000",
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("Payment Successfull", reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystacks",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="">
      <div className="container">
        <div className="item">
          <div className="overlay-effect"></div>
          <Image
            className="item-image"
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="product"
            width={300}
            height={300}
          />
          <div className="item-details">
            <p className="item-details__title">Coconut Oil</p>
            <p className="item-details__amount">NGN{amount / 100}</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input value={phone} />
            </div>
          </div>
        </div>
      </div>
      <PaystackButton
        {...componentProps}
        publicKey={componentProps.publicKey ?? ""}
      />
    </div>
  );
};

export default PaymentPage;

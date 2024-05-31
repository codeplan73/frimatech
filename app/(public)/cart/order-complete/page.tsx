"use client";

import React, { useState } from "react";
import Banner from "@/components/page-banner";

const ShippingAddressPagee = () => {
  return (
    <>
      <Banner
        title="Cart"
        currentPage="Checkout Your Items"
        link="/"
        style={{ backgroundImage: "url('/img/contact.png')" }}
      />
      <section className="py-4 bg-slate-100 md:px-28">
        <div className="container grid grid-cols-1 gap-4 py-8 mx-auto md:grid-cols-4 md:max-w-7xl ">
          <div className="flex flex-col w-full gap-6 p-6 space-y-2 bg-white rounded-md shadow md:col-span-3">
            <h4 className="text-xl font-semibold md:text-2xl">
              Order Completed
            </h4>
            <hr />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingAddressPagee;

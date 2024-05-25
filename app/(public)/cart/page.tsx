"use client";

import React from "react";
import useCartStore from "@/store/cartStore";
import Banner from "@/components/page-banner";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";

const CartPage = () => {
  const {
    reduceFromCart,
    removeFromCart,
    addToCart,
    items,
    clearCart,
    total,
    products,
  } = useCartStore();

  const formattedTotal = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(Number(total()));

  const handleCheckout = () => {
    const totalAmount = total();
    const amount = parseFloat(totalAmount);
    const amountToSend = amount * 100;
    console.log(products, items(), amount, amountToSend);
  };

  return (
    <>
      <Banner
        title="Cart"
        currentPage="Checkout Your Items"
        link="/"
        style={{ backgroundImage: "url('/img/contact.png')" }}
      />
      {items() !== 0 ? (
        <section className="bg-slate-100 py-4  md:px-28">
          <div className="grid grid-cols-1 md:grid-cols-4 container mx-auto py-8 md:max-w-7xl gap-4 ">
            <div className="w-full md:col-span-3 flex flex-col bg-white p-6 rounded-md shadow gap-6 space-y-2">
              <h4 className="text-xl md:text-2xl font-semibold">
                Shopping Cart
              </h4>
              <hr />
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((cart) => {
                      const formattedPrice = new Intl.NumberFormat("en-ng", {
                        style: "currency",
                        currency: "NGN",
                      }).format(Number(cart.price));

                      return (
                        <tr
                          key={cart.id}
                          className="bg-white dark:bg-gray-800 border rounded-lg"
                        >
                          <td className="flex flex-col md:flex-row items-center space-x-4 px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image
                              src={cart.imageUrl}
                              height={1000}
                              width={1000}
                              alt={cart.productName}
                              className="object-cover bg-slate-100 rounded-md h-14 w-14"
                            />

                            <p>{cart.productName}</p>
                          </td>
                          <td>
                            <div className="flex pl-4 items-center gap-2  rounded-xl py-1">
                              <button
                                onClick={() => reduceFromCart(cart)}
                                className="text-xl font-semibold"
                              >
                                -
                              </button>
                              <span className="font-semibold">
                                {cart.quantity}
                              </span>
                              <button
                                onClick={() => addToCart(cart)}
                                className="text-xl font-semibold"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="px-2 py-2">{formattedPrice}</td>
                          <td className="px-2 py-2">
                            <button onClick={() => removeFromCart(cart)}>
                              <GoTrash className="text-xl font text-red-300" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex space-x-4">
                <Link
                  className="px-4 py-2 rounded-md bg-slate-100 font-semibold"
                  href="/shop"
                >
                  Back
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-2 rounded-md text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className=" md:col-span-1 flex flex-col gap-4">
              <div className="flex flex-col gap-4 bg-white rounded-md shadow p-4 min-h-max">
                <p className="text-xl font-semibold">Order Summary</p>
                <hr />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Discount</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      0.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Delivery</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      0.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Tax</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      0.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total Items</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      {items()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total</span>
                    <span className="text-slate-800 font-semibold text-sm">
                      {formattedTotal}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 rounded-md text-white py-2"
              >
                Check Out
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[40vh] flex items-center justify-center flex-col">
          <BsCart4 className="text-7xl mb-4 text-bgPrimary" />
          <h2 className="text-center text-xl md:text-4xl font-sans font-semibold text-bgPrimary">
            Your Cart is empty please add items
          </h2>
        </div>
      )}
    </>
  );
};

export default CartPage;

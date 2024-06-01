"use client";

import React from "react";
import useCartStore from "@/store/cartStore";
import Banner from "@/components/page-banner";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";
import OrderSummary from "./_components/OrderSummary";

const CartPage = () => {
  const {
    reduceFromCart,
    removeFromCart,
    addToCart,
    items,
    clearCart,
    products,
  } = useCartStore();

  return (
    <>
      <Banner
        title="Cart"
        currentPage="Checkout Your Items"
        link="/"
        style={{ backgroundImage: "url('/img/contact.png')" }}
      />
      {items() !== 0 ? (
        <section className="py-4 bg-slate-100 md:px-28">
          <div className="container grid grid-cols-1 gap-4 py-8 mx-auto md:grid-cols-4 md:max-w-7xl ">
            <div className="flex flex-col w-full gap-6 p-6 space-y-2 bg-white rounded-md shadow md:col-span-3">
              <h4 className="text-xl font-semibold md:text-2xl">
                Shopping Cart
              </h4>
              <hr />
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
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
                          className="bg-white border rounded-lg dark:bg-gray-800"
                        >
                          <td className="flex flex-col items-center px-2 py-2 space-x-4 font-medium text-gray-900 md:flex-row whitespace-nowrap dark:text-white">
                            <Image
                              src={cart.imageUrl}
                              height={1000}
                              width={1000}
                              alt={cart.productName}
                              className="object-cover rounded-md bg-slate-100 h-14 w-14"
                            />

                            <p>{cart.productName}</p>
                          </td>
                          <td>
                            <div className="flex items-center gap-2 py-1 pl-4 rounded-xl">
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
                              {/* <button
                                disabled={
                                  cart.availableQuantity
                                    ? parseInt(cart.quantity) >=
                                      cart.availableQuantity.valueOf()
                                    : false
                                }
                                onClick={() => addToCart(cart)}
                                className="text-xl font-semibold"
                              >
                                +
                              </button> */}
                            </div>
                          </td>

                          <td className="px-2 py-2">{formattedPrice}</td>
                          <td className="px-2 py-2">
                            <button onClick={() => removeFromCart(cart)}>
                              <GoTrash className="text-xl text-red-300 font" />
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
                  className="px-4 py-2 font-semibold rounded-md bg-slate-100"
                  href="/shop"
                >
                  Back
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <OrderSummary />
          </div>
        </section>
      ) : (
        <div className="h-[40vh] flex items-center justify-center flex-col">
          <BsCart4 className="mb-4 text-7xl text-bgPrimary" />
          <h2 className="font-sans text-xl font-semibold text-center md:text-4xl text-bgPrimary">
            Your Cart is empty please add items
          </h2>
        </div>
      )}
    </>
  );
};

export default CartPage;

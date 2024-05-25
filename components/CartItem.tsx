import React from "react";
import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { GoTrash } from "react-icons/go";
import Link from "next/link";

interface CartItemProps {
  cartItem: Product;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const formattedPrice = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(Number(cartItem.price));

  const { removeFromCart, reduceFromCart, addToCart, items, clearCart, total } =
    useCartStore();
  return (
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
          <tr className="bg-white dark:bg-gray-800 border rounded-lg">
            <td className="flex items-center px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <Image
                src={cartItem.imageUrl}
                height={1000}
                width={1000}
                alt={cartItem.productName}
                className="object-cover bg-slate-100 rounded-md h-14 w-14"
              />

              {cartItem.productName}
            </td>
            <td className="px-2 py-2">
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-1">
                <button
                  onClick={() => reduceFromCart(cartItem)}
                  className="text-xl font-semibold"
                >
                  -
                </button>
                <span className="font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={() => addToCart(cartItem)}
                  className="text-xl font-semibold"
                >
                  +
                </button>
              </div>
            </td>
            <td className="px-2 py-2">{formattedPrice}</td>
            <td className="px-2 py-2">
              <button onClick={() => removeFromCart(cartItem)}>
                <GoTrash className="text-xl font text-red-300" />
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base">
              Total
            </th>
            <td className="px-6 py-3">{items()}</td>
            <td className="px-6 py-3">{total()}</td>
          </tr>
        </tfoot>
      </table>

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
  );
};

export default CartItem;

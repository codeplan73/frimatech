import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

interface Props {
  image: string;
  price: number;
  name: string;
  rating: string;
  link: string;
}

const ProductCardGrid = ({ image, price, name, rating, link }: Props) => {
  return (
    <Link
      href={link}
      className="flex flex-col border border-slate-200 max-w-sm bg-white gap-2 rounded-xl drop-shadow-lg overflow-hidden p-4"
    >
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt="product image"
        />
      </div>
      <div className="flex py-2 items-start justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-md font-semibold">
            <span className="line-through">N</span> {price.toFixed(2)}
          </p>
          <div className="flex items-start justify-start space-x-2">
            <p className="flex">
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
            </p>
            <span className="text-yellow-400 -mt-1">{rating}</span>
          </div>
          <p className="text-balance leading-tight text-slate-500 text-sm line-clamp-1">
            {name}
          </p>
        </div>
        <CiHeart className="border border-slate-400 rounded-md text-blue-700 font-extrabold text-xl cursor-pointer" />
      </div>
      <div className="flex w-full gap-2">
        <button className="text-center flex-1 py-2 rounded-full text-slate-900 bg-slate-200">
          Add to Cart
        </button>
        <button className="text-center flex-1 py-2 rounded-full text-slate-200 bg-slate-900">
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCardGrid;

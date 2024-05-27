import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

interface Props {
  image: string;
  price: string;
  name: string;
  rating: string;
  link: string;
}

const ProductCardGrid = ({ image, price, name, rating, link }: Props) => {
  return (
    <Link
      href={link}
      className="flex flex-col max-w-sm gap-2 p-4 overflow-hidden bg-white border border-slate-200 rounded-xl drop-shadow-lg"
    >
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt="product image"
        />
      </div>
      <div className="flex items-start justify-between py-2">
        <div className="flex flex-col space-y-1">
          <p className="font-semibold text-md">{price}</p>
          <div className="flex items-start justify-start space-x-2">
            <p className="flex">
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
              <IoIosStar className="text-yellow-400" />
            </p>
            {/* <span className="-mt-1 text-yellow-400">{rating}</span> */}
          </div>
          <h4 className="text-lg leading-tight text-balance text-slate-500 line-clamp-1">
            {name}
          </h4>
        </div>
        <CiHeart className="text-xl font-extrabold text-blue-700 border rounded-md cursor-pointer border-slate-400" />
      </div>
    </Link>
  );
};

export default ProductCardGrid;

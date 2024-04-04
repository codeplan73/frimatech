import React from "react";
import { IoIosSearch } from "react-icons/io";

const ProductFilter = () => {
  return (
    <div className="container flex items-center justify-between px-4 py-6 -mt-14 bg-white mx-auto rounded-2xl shadow-sm drop-shadow-lg">
      <h4 className="hidden md:block text-4xl font-semibold">
        Give All You Need
      </h4>
      <form className="flex items-center w-full md:w-6/12 relative">
        <IoIosSearch className="absolute top-5 left-4 text-2xl font-extrabold text-slate-400" />
        <input
          type="text"
          className="w-full border-2 text-md py-4 px-10 rounded-full"
          placeholder="Search for products"
        />
        <button className="absolute top-4 right-4 bg-slate-900 text-slate-100 px-4 py-1 rounded-full">
          Search
        </button>
      </form>
    </div>
  );
};

export default ProductFilter;

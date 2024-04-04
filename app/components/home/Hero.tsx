import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[60vh] md:h-[80vh] w-full flex flex-col items-center justify-center bg-red-100 gap-6 px-10">
      <h4 className="text-4xl md:text-6xl font-bold">Musa Shop</h4>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia distinctio
        <br />
        vitae mollitia fuga repellat voluptas aliquid sunt saepe dolore
        corrupti.
      </p>
      <Link
        href="/shop"
        className="bg-[#344e41] px-6 md:px-8 py-4 font-sans text-white font-semibold rounded-xl"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Hero;

import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="relative w-full md:w-[100vw] bg-no-repeat bg-cover bg-bottom md:bg-top h-[80vh] md:h-[100vh] overflow-hidden px-6"
      style={{ backgroundImage: "url('/img/Homepage.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start gap-8 px-6 pt-52 md:pt-56">
        <h4 className="text-4xl font-extrabold text-center md:text-6xl text-textPrimary">
          Buy, Repair, Sell, Swap
        </h4>
        {/* <h4 className="text-4xl font-extrabold text-center md:text-6xl text-textPrimary">
          your gadgets
        </h4> */}

        <p className="w-full my-6 font-sans text-lg text-center text-md md:w-6/12 text-textPrimary">
          Explore a world of possibilities with our diverse selection. From
          cutting-edge electronics to vintage treasures, find your perfect match
          today
        </p>

        <div className="flex items-center space-x-4">
          <Link
            className="py-2 px-4 drop-shadow-lg md:px-10 md:py-4 rounded-lg text-xl md:text-2xl font-bold transition-all duration-300 bg-[#dbc547] text-bgPrimary"
            href="/shop"
          >
            Shop Now
          </Link>
          <Link
            className="bg-textPrimary py-2 px-4 md:px-10 md:py-4 rounded-lg text-xl md:text-2xl font-bold text-white transition-all duration-300 hover:bg-[#dbc547] hover:text-bgPrimary"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

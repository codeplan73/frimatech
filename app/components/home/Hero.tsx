import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    // <div className="h-[60vh] md:h-[80vh] w-full flex flex-col items-center justify-center bg-white gap-6 px-10">
    //   <h4 className="text-4xl md:text-6xl font-bold">Musa Shop</h4>
    //   <p className="text-center">
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia distinctio
    //     <br />
    //     vitae mollitia fuga repellat voluptas aliquid sunt saepe dolore
    //     corrupti.
    //   </p>
    //   <Link
    //     href="/shop"
    //     className="bg-[#344e41] px-6 md:px-8 py-4 font-sans text-white font-semibold rounded-xl"
    //   >
    //     Shop Now
    //   </Link>
    // </div>

    <div
      className="relative w-full md:w-[100vw] bg-no-repeat bg-cover bg-bottom md:bg-top h-[80vh] overflow-hidden px-6"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-start pt-52 md:pt-36  items-center text-white gap-8 md:gap-10 px-6">
        <h4 className="text-warningColor text-xl md:text-2xl text-center font-sans  md:mt-12 font-semibold">
          15 Years Experienced
        </h4>

        <p className="text-center font-sans text-md">
          Experience our renowned customer obserssion and commitment to perfect
          service <br /> delivery. Free quotes available - let us take the
          stress our of cleaning
        </p>
      </div>
    </div>
  );
};

export default Hero;

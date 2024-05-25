import Link from "next/link";
import React from "react";

interface Props {
  title: any;
  link: string;
  currentPage: string;
  style: React.CSSProperties;
}

const Banner = ({ title, currentPage, style, link }: Props) => {
  return (
    <div
      className={`relative w-full h-[30vh] md:h-[50vh] flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center md:bg-top`}
      style={style}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>

      <div className="relative z-10 flex flex-col justify-start">
        <h2 className="text-2xl md:text-4xl font-bold text-textPrimary text-center">
          {title}
        </h2>
        <Link
          className="text-lg font-semibold text-center text-textPrimary"
          href={link}
        >
          {currentPage}
        </Link>
      </div>
    </div>
  );
};

export default Banner;

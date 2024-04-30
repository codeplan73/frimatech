// ServiceCard.tsx
import React, { ReactNode } from "react";
import Image from "next/image";

interface Props {
  image: string;
  title: string;
  text: string;
}

const ServiceCard = ({ image, title, text }: Props) => {
  return (
    <div className="flex flex-col h-86 h-full w-full rounded-xl drop-shadow-xl overflow-hidden">
      <Image
        src={image}
        alt="image"
        height={1000}
        width={1000}
        className="h-40"
      />
      <div className="bg-white p-4 h-46 flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-bgPrimary text-center">
          {title}
        </h4>
        <p className="text-sm text-center text-slate-400 ">{text}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

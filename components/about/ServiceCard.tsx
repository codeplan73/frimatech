// ServiceCard.tsx
import React, { ReactNode } from "react";
import Image from "next/image";

interface Props {
  icon?: string;
  title: string;
  text: string;
  image: string;
}

const ServiceCard = ({ icon, image, title, text }: Props) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden h-86 rounded-xl drop-shadow-xl">
      <Image
        src={image}
        alt="image"
        height={1000}
        width={1000}
        className="h-40"
      />
      <div className="flex flex-col gap-2 p-4 bg-white h-46">
        <h4 className="text-xl font-semibold text-center text-bgPrimary">
          {title}
        </h4>
        <p className="text-center text-md text-slate-400 ">{text}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

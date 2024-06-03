import React, { ReactNode } from "react";
interface Props {
  icon: string;
  title: string;
  text: string;
}

const ServiceCard = ({ icon, title, text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-10 rounded-lg shadow-lg bg-bgPrimary bg-opacity-15">
      <span className="p-2 font-bold rounded-full text-7xl bg-secondaryColor">
        {icon}
      </span>
      <h4 className="text-xl font-semibold text-center md:text-xl">{title}</h4>
      <p className="text-justify text-slate-600 text-md md:text-lg">{text}</p>
    </div>
  );
};

export default ServiceCard;

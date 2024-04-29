import React, { ReactNode } from "react";
interface Props {
  icon: string;
  title: string;
  text: string;
}

const ServiceCard = ({ icon, title, text }: Props) => {
  return (
    <div className="shadow-lg rounded-lg flex flex-col items-center bg-bgPrimary justify-center gap-6 py-10 px-6 bg-opacity-15">
      <span className="text-7xl rounded-full bg-secondaryColor p-2 font-bold">
        {icon}
      </span>
      <h4 className="text-xl md:text-xl text-center font-semibold">{title}</h4>
      <p className="text-slate-600 text-justify text-md md:text-lg">{text}</p>
    </div>
  );
};

export default ServiceCard;

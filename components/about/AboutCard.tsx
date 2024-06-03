import React, { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

const Card = ({ icon, title, text }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-6 md:flex-row">
      <p className="p-2 text-4xl font-bold rounded-full bg-bgPrimary">{icon}</p>
      <div className="flex flex-col gap-6">
        <h4 className="text-xl font-semibold md:text-2xl">{title}</h4>
        <p className="text-lg text-justify text-slate-600 md:text-balance md:text-lg">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Card;

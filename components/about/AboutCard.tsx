import React, { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

const Card = ({ icon, title, text }: Props) => {
  return (
    <div className="flex items-start justify-start gap-6">
      <p className="text-4xl rounded-full bg-bgPrimary p-2 font-bold">{icon}</p>
      <div className="flex flex-col gap-6">
        <h4 className="text-xl md:text-2xl font-semibold">{title}</h4>
        <p className="text-slate-600 text-justify md:text-balance text-lg md:text-lg">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Card;

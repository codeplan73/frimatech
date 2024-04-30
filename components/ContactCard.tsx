import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  tittle: string;
  text: string;
}

const ContactCard = ({ icon, tittle, text }: Props) => {
  return (
    <div className="group w-full max-w-md flex flex-col gap-4 bg-textPrimary hover:bg-secondaryColor py-8 px-8 transition-all items-center justify-center">
      <span className="text-6xl text-bgPrimary">{icon}</span>
      <h2 className="text-2xl font-bold text-bgPrimary">{tittle}</h2>
      <p className="text-lg text-bgPrimary">{text}</p>
    </div>
  );
};

export default ContactCard;

import React, { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  heading: string;
  amount: string;
}

const Card = ({ icon, heading, amount }: CardProps) => {
  return (
    <div className="flex flex-col max-w-md bg-white border rounded-lg shadow-lg">
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex items-center space-x-4">
          {icon}
          <p className="font-light text-md text-bgPrimary">{heading}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-2xl font-semibold text-bgPrimary">
            {amount}
          </h2>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Card;

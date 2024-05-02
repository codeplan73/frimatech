import React, { ReactNode } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

interface CardProps {
  icon: ReactNode;
  heading: string;
  amount: string;
  inconChart: ReactNode;
  chart: string;
  date?: string;
}

const Card = ({
  icon,
  heading,
  amount,
  inconChart,
  chart,
  date,
}: CardProps) => {
  // const Card = () => {
  return (
    <div className="flex flex-col max-w-md bg-white rounded-lg shadow-lg border">
      <div className="px-4 py-4 flex flex-col gap-4">
        <div className="flex items-center space-x-4">
          {icon}
          <p className="text-md font-light">{heading}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold font-mono">{amount}</h2>
          <div className="flex items-center space-x-1 bg-green-100 p-1 rounded-md">
            {inconChart}
            <span className="text-xs">{chart}%</span>
          </div>
        </div>
      </div>
      <hr />
      {date && (
        <p className="py-2 px-4 text-sm font-sans text-slate-400">
          Updated: {date}
        </p>
      )}
    </div>
  );
};

export default Card;

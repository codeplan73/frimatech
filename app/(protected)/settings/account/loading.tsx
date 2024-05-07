import React from "react";
import Skeleton from "@/components/Skeleton";
import InputWrapper from "@/components/form-fields/InputWrapper";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Skeleton />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Skeleton />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Skeleton />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Skeleton />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

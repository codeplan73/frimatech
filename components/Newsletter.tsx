import React from "react";

const Newsletter = () => {
  return (
    <div className="mx-auto flex flex-col md:flex-row items-center justify-between w-full bg-textPrimary py-12 md:py-16 px-12 md:px-40 text-slate-50 gap-6 md:gap-0">
      <div>
        <h2 className="text-3xl md:text-6xl font-semibold text-bgPrimary">
          Ready to Get Our New Stuff?
        </h2>
        <p className="text-lg text-bgPrimary mt-4">
          subscribe to our newsletter and get all the latest news and updates
        </p>
      </div>

      <form className="flex w-full justify-end">
        <input
          type="text"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-lg"
        />
        <button className="bg-bgPrimary text-white px-4 py-4 rounded-r-lg">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;

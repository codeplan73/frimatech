import React from "react";

const Newsletter = () => {
  return (
    <div>
      <div className="bg-primaryColor py-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-2xl font-semibold">
              Subscribe to our Newsletter
            </h2>
            <p className="text-sm">Get the latest news and updates from us</p>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg"
            />
            <button className="bg-secondaryColor text-white px-4 py-2 rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

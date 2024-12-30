import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const BlogPostitem = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
      <Image
        src={image}
        height={1000}
        width={1000}
        alt={"loader"}
        className="justify-center h-60 w-60 md:h-40 md:w-60 rounded-md"
      />
      <div className="flex flex-col gap-2">
        <h4 className="text-xl md:text-2xl font-semibold">
          {/* Exploring the Beauty of fantancy landscapes */}
          {title}
        </h4>
        <p className="text-sm md:text-base text-gray-500">
          {description}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cum
          alias dolor animi ut libero atque voluptates neque, optio aliquid! */}
        </p>
        <Link href={link} className="text-blue-500 flex gap-2 items-center">
          <span className="text-bgPrimary font-bold"> Read More</span>
          <FaArrowRight className="text-bgPrimary" />
        </Link>
      </div>
    </div>
  );
};

export default BlogPostitem;

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
    <div className="flex flex-col md:flex-row gap-4 justify-center items-start w-full md:w-12/12">
      <div className="w-full md:w-1/4">
        <Image
          src={image}
          height={1000}
          width={1000}
          alt={"loader"}
          className="justify-center h-[200px] w-[250px] rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-3/4">
        <h4 className="text-xl md:text-2xl font-semibold">{title}</h4>
        <p className="text-sm md:text-base text-gray-500 line-clamp-4">
          {description}
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

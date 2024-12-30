import Banner from "@/components/page-banner";
import ProductCardGrid from "@/components/ProductCardGrid";
import Image from "next/image";
import { db } from "@/lib/db";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import BlogPostitem from "@/components/BlogPostitem";

async function PostsPage() {
  const blogs = await db.blog.findMany({
    orderBy: { id: "desc" },
  });

  const loader = (
    <div className="flex items-center justify-center h-[10vh] py-8 mx-auto pl-72">
      <Image
        src="/img/loading.gif"
        height={100}
        width={100}
        alt={"loader"}
        className="justify-center"
      />
    </div>
  );

  return (
    <div className="flex flex-col">
      <Banner
        currentPage="Blog"
        title="Blog Posts"
        link="/"
        style={{ backgroundImage: "url('/img/services.png')" }}
      />

      <div className="mx-auto w-full px-6 md:px-32 space-y-8 py-12 bg-slate-100">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 p-4 py-4">
          {blogs.map((blog: any) => (
            <ProductCardGrid
              key={blog.id}
              image={blog.coverImage || "/images/watch.png"}
              price="400"
              name={blog.title}
              rating="7.5"
              link={`/blog/${blog.id}`}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
          <Image
            src="/images/headset.png"
            height={1000}
            width={1000}
            alt={"loader"}
            className="justify-center h-60 w-60 md:h-40 md:w-60 rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-xl md:text-2xl font-semibold">
              Exploring the Beauty of fantancy landscapes
            </h4>
            <p className="text-sm md:text-base text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cum
              alias dolor animi ut libero atque voluptates neque, optio aliquid!
            </p>
            <Link href="/" className="text-blue-500 flex gap-2 items-center">
              <span className="text-bgPrimary font-bold"> Read More</span>
              <FaArrowRight className="text-bgPrimary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;

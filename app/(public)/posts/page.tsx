import Banner from "@/components/page-banner";
import Image from "next/image";
import { db } from "@/lib/db";
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
    <div className="flex flex-col w-full md:w-12/12 ">
      <Banner
        currentPage=""
        title="Blog Posts"
        link="/"
        style={{ backgroundImage: "url('/img/services.png')" }}
      />

      <div className="flex flex-col gap-8 items-start justify-start py-20 px-16 md:px-20 md:w-9/12 mx-auto w-full">
        {blogs.map((blog: any) => (
          <BlogPostitem
            key={blog.id}
            image={blog.coverImage}
            title={blog.title}
            description={blog.bodyText}
            link={`/posts/${blog.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;

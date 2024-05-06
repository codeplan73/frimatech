import { blogColumns } from "@/components/table//blogColumn";
import { BlogDataTable } from "@/components/table/blogTable";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";

export default async function BlogList() {
  const blog: Blog[] = await db.blog.findMany({
    orderBy: { id: "desc" },
  });

  if (!blog) return null;

  return (
    <div>
      <BlogDataTable columns={blogColumns} data={blog} />
    </div>
  );
}

export const revalidate = 1;

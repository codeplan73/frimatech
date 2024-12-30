import React from "react";
import { db } from "@/lib/db";
import Banner from "@/components/page-banner";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const PostDetailsPage = async ({ params }: Props) => {
  const post = await db.blog.findFirst({
    where: { id: params.id },
  });

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="flex flex-col">
      <Banner
        currentPage=""
        title={post?.title}
        link="/posts"
        style={{ backgroundImage: "url('/img/about.png')" }}
      />

      <div className="w-full px-6 py-12 mx-auto space-y-8 md:px-32 bg-slate-100">
        <article className="prose lg:prose-xl">
          <h2>{post?.title}</h2>
          <small>Posted: {formattedDate}</small>
          {/* <div dangerouslySetInnerHTML={{ __html: post?.bodyText || "" }} /> */}
          <ReactMarkdown>{post?.bodyText}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default PostDetailsPage;

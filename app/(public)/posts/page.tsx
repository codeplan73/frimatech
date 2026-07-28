import type {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";
import {BookOpen, ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {getAllPosts, type SanityBlogPost} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Blog | Tech Tips, Repair Guides & IT Insights | Frima Technology",
  description:
    "Read the latest tech tips, computer repair guides, COMPTIA certification advice, and IT industry insights from the experts at Frima Technology in Benin City.",
  keywords: [
    "tech blog Nigeria",
    "computer repair tips",
    "COMPTIA certification advice",
    "IT support guides",
    "laptop repair blog",
    "technology insights Benin City",
  ],
  openGraph: {
    title: "Blog | Tech Tips, Repair Guides & IT Insights | Frima Technology",
    description:
      "Read the latest tech tips, repair guides, and IT insights from Frima Technology.",
    type: "website",
    url: "https://www.frimatechnology.com/posts",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Frima Technology Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title: "Blog | Tech Tips, Repair Guides & IT Insights | Frima Technology",
    description:
      "Read the latest tech tips, repair guides, and IT insights from Frima Technology.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com/posts",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripPortableText(body: unknown[] | null): string {
  if (!body || !Array.isArray(body)) return "";
  const text = body
    .filter((block): block is Record<string, unknown> => {
      if (typeof block !== "object" || block === null) return false;
      const b = block as Record<string, unknown>;
      return b._type === "block" && Array.isArray(b.children);
    })
    .flatMap((block) => {
      const children = block.children as Array<{text?: string}>;
      return children.map((child) => child.text ?? "").join("");
    })
    .join(" ");
  return text.slice(0, 200) + (text.length > 200 ? "..." : "");
}

function BlogCard({post}: {post: SanityBlogPost}) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null;
  const excerpt = stripPortableText(post.body);

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/posts/${post.slug.current}`}>
        <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl bg-slate-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <BookOpen className="h-12 w-12" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        {post.categories && post.categories.length > 0 && (
          <span className="mb-2 inline-block rounded-full bg-[#345B58]/10 px-3 py-1 text-xs font-medium text-[#345B58]">
            {post.categories[0].title}
          </span>
        )}
        <Link href={`/posts/${post.slug.current}`}>
          <h2 className="mb-2 text-lg font-semibold text-[#345B58] transition-colors hover:text-[#2a4a47]">
            {post.title}
          </h2>
        </Link>
        {excerpt && (
          <p className="mb-3 text-sm leading-relaxed text-slate-500">
            {excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </p>
          <Link
            href={`/posts/${post.slug.current}`}
            className="text-xs font-semibold text-[#345B58] hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <AnimateOnEnter>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Our Blog
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/80 lg:text-lg">
              Tech tips, repair guides, COMPTIA certification advice, and IT
              industry insights from our team of experts.
            </p>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Posts Grid */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="posts-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {posts.length === 0 ? (
            <AnimateOnEnter>
              <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
                <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                <h2 className="mb-2 text-lg font-medium text-slate-500">
                  No posts yet
                </h2>
                <p className="text-sm text-slate-400">
                  Check back soon for the latest articles and guides from our
                  team.
                </p>
              </div>
            </AnimateOnEnter>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <AnimateOnEnter key={post._id} delay={0.05}>
                  <BlogCard post={post} />
                </AnimateOnEnter>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#345B58]/5 py-16 lg:py-20">
        <AnimateOnEnter>
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-[#345B58] lg:text-4xl">
              Have a Question?
            </h2>
            <p className="mb-8 text-base text-slate-600 lg:text-lg">
              Need help with a repair or want to learn more about our training
              programs? We are here to help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#345B58] text-white hover:bg-[#2a4a47] font-semibold"
            >
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimateOnEnter>
      </section>
    </>
  );
}

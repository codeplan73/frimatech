import Link from "next/link";
import Image from "next/image";
import {BookOpen} from "lucide-react";
import {getLatestPosts, type SanityBlogPost} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

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
  return text.slice(0, 150) + (text.length > 150 ? "..." : "");
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
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <BookOpen className="h-12 w-12" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        {post.categories && post.categories.length > 0 && (
          <span className="mb-2 inline-block rounded-full bg-[#345B58]/10 px-3 py-1 text-xs font-medium text-[#345B58]">
            {post.categories[0].title}
          </span>
        )}
        <Link href={`/posts/${post.slug.current}`}>
          <h3 className="mb-2 text-base font-semibold text-[#345B58] transition-colors hover:text-[#2a4a47]">
            {post.title}
          </h3>
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

function BlogSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="aspect-[3/2] animate-pulse rounded-t-2xl bg-slate-100" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

const LatestBlogPosts = async () => {
  let posts: SanityBlogPost[] = [];
  let error = false;

  try {
    posts = await getLatestPosts();
  } catch {
    error = true;
  }

  if (error) return null;

  return (
    <section
      className="bg-[#345B58]/[0.03] py-16 lg:py-24"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2
              id="blog-heading"
              className="mb-2 text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              Latest from the Blog
            </h2>
            <p className="text-base text-slate-600">
              Tips, guides, and insights from our technology experts.
            </p>
          </div>
          <Link
            href="/posts"
            className="hidden text-sm font-semibold text-[#345B58] hover:underline lg:inline-block"
          >
            View All Posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="mb-2 text-lg font-medium text-slate-500">
              No articles yet
            </p>
            <p className="text-sm text-slate-400">
              Check back soon for the latest tips and guides from our team.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/posts"
            className="text-sm font-semibold text-[#345B58] hover:underline"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;

export const LatestBlogPostsSkeleton = () => (
  <section className="bg-slate-50 py-16 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-12">
        <div className="mb-2 h-8 w-64 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-80 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 3}).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

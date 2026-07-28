import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, Clock, User, BookOpen} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {getPostBySlug} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

interface Props {
  params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {title: "Post Not Found | Frima Technology"};
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : "https://www.frimatechnology.com/images/logo.jpeg";

  return {
    title: `${post.title} | Frima Technology Blog`,
    description: post.body
      ? stripPortableText(post.body).slice(0, 160)
      : "Read this article on the Frima Technology blog.",
    openGraph: {
      title: post.title,
      description: post.body ? stripPortableText(post.body).slice(0, 160) : "",
      type: "article",
      url: `https://www.frimatechnology.com/posts/${slug}`,
      images: [{url: imageUrl, width: 1200, height: 630, alt: post.title}],
    },
    twitter: {
      card: "summary_large_image",
      site: "@frimatech",
      title: post.title,
      description: post.body ? stripPortableText(post.body).slice(0, 160) : "",
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.frimatechnology.com/posts/${slug}`,
    },
  };
}

function stripPortableText(body: unknown[] | null): string {
  if (!body || !Array.isArray(body)) return "";
  return body
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
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PortableTextBody({body}: {body: unknown[] | null}) {
  if (!body || !Array.isArray(body)) {
    return (
      <p className="text-slate-500">No content has been added to this post yet.</p>
    );
  }

  return (
    <div className="prose prose-slate max-w-none">
      {body.map((block, i) => {
        if (typeof block !== "object" || block === null) return null;
        const b = block as Record<string, unknown>;

        if (b._type !== "block" || !Array.isArray(b.children)) return null;

        const style = (b.style as string) || "normal";
        const children = b.children as Array<{
          _type?: string;
          text?: string;
          marks?: string[];
        }>;

        const content = children.map((child, j) => {
          if (!child.text) return null;
          let text: React.ReactNode = child.text;

          if (child.marks?.includes("strong")) {
            text = <strong key={j}>{text}</strong>;
          }
          if (child.marks?.includes("em")) {
            text = <em key={j}>{text}</em>;
          }

          return <span key={j}>{text}</span>;
        });

        switch (style) {
          case "h2":
            return (
              <h2 key={i} className="mb-4 mt-10 text-2xl font-bold text-[#345B58] lg:text-3xl">
                {content}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mb-3 mt-8 text-xl font-semibold text-[#345B58] lg:text-2xl">
                {content}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="my-6 border-l-4 border-[#345B58] bg-[#345B58]/5 py-3 pl-6 italic text-slate-600"
              >
                {content}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="mb-4 leading-relaxed text-slate-600">
                {content}
              </p>
            );
        }
      })}
    </div>
  );
}

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <AnimateOnEnter>
            <Link
              href="/posts"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {post.categories && post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl lg:leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <AnimateOnEnter>
            {/* Featured Image */}
            {imageUrl && (
              <div className="relative mb-12 aspect-[2/1] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={post.mainImage?.alt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  unoptimized
                />
              </div>
            )}

            {/* Body */}
            <article>
              <PortableTextBody body={post.body} />
            </article>

            {/* Footer */}
            <div className="mt-16 border-t border-slate-200 pt-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  {post.author && (
                    <p className="text-sm font-medium text-[#345B58]">
                      Written by {post.author.name}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="text-xs text-slate-400">
                      Published on {formatDate(post.publishedAt)}
                    </p>
                  )}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#345B58] text-[#345B58] hover:bg-[#345B58]/5"
                >
                  <Link href="/posts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>
          </AnimateOnEnter>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#345B58]/5 py-16 lg:py-20">
        <AnimateOnEnter>
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <BookOpen className="mx-auto mb-6 h-10 w-10 text-[#345B58]" />
            <h2 className="mb-4 text-2xl font-bold text-[#345B58] lg:text-3xl">
              Enjoyed This Article?
            </h2>
            <p className="mb-8 text-base text-slate-600">
              Check out more tech tips, repair guides, and IT insights on our
              blog, or reach out if you need help with a repair or training.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-[#345B58] text-white hover:bg-[#2a4a47]"
              >
                <Link href="/posts">More Articles</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#345B58] text-[#345B58] hover:bg-[#345B58]/5"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </AnimateOnEnter>
      </section>
    </>
  );
}

import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Wrench,
  ExternalLink,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {getTrainingBySlug} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

interface Props {
  params: Promise<{slug: string}>;
}

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const levelStyles: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-purple-100 text-purple-700",
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const course = await getTrainingBySlug(slug);

  if (!course) {
    return {title: "Workshop Not Found | Frima Technology"};
  }

  const imageUrl = course.image
    ? urlFor(course.image).width(1200).height(630).url()
    : "https://www.frimatechnology.com/images/logo.jpeg";

  const description = Array.isArray(course.description)
    ? course.description
        .filter(
          (b): b is Record<string, unknown> =>
            typeof b === "object" && b !== null && (b as Record<string, unknown>)._type === "block",
        )
        .flatMap((b) => {
          const children = (b as Record<string, unknown>).children as Array<{text?: string}>;
          return children.map((c) => c.text ?? "").join("");
        })
        .join(" ")
        .slice(0, 160)
    : "";

  return {
    title: `${course.title} | Frima Technology Workshops`,
    description,
    openGraph: {
      title: course.title,
      description,
      type: "website",
      url: `https://www.frimatechnology.com/training/${slug}`,
      images: [{url: imageUrl, width: 1200, height: 630, alt: course.title}],
    },
    twitter: {
      card: "summary_large_image",
      site: "@frimatech",
      title: course.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.frimatechnology.com/training/${slug}`,
    },
  };
}

function PortableTextBody({body}: {body: unknown[] | null}) {
  if (!body || !Array.isArray(body)) {
    return <p className="text-slate-500">No description has been added yet.</p>;
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
              <h2
                key={i}
                className="mb-4 mt-10 text-2xl font-bold text-[#345B58] lg:text-3xl"
              >
                {content}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mb-3 mt-8 text-xl font-semibold text-[#345B58] lg:text-2xl"
              >
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

export default async function TrainingDetailPage({params}: Props) {
  const {slug} = await params;
  const course = await getTrainingBySlug(slug);

  if (!course) {
    notFound();
  }

  const imageUrl = course.image
    ? urlFor(course.image).width(1200).height(600).url()
    : null;

  return (
    <>
      {/* Back link */}
      <section className="bg-white pb-0 pt-8 lg:pt-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href="/training"
            className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-[#345B58]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workshops
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <AnimateOnEnter>
            {/* Featured Image */}
            {imageUrl && (
              <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={course.image?.alt || course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${levelStyles[course.level]}`}
              >
                {levelLabels[course.level]}
              </span>
              {course.duration && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight text-[#345B58] lg:text-4xl lg:leading-tight">
              {course.title}
            </h1>

            {/* Workshop Info Cards */}
            <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-[#345B58]/[0.02] p-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#345B58]" />
                <div>
                  <p className="text-xs font-semibold text-[#345B58]">
                    Location
                  </p>
                  <p className="text-sm text-slate-500">
                    15 Arala Street, Airport Road, Benin City
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#345B58]" />
                <div>
                  <p className="text-xs font-semibold text-[#345B58]">
                    Class Size
                  </p>
                  <p className="text-sm text-slate-500">
                    Small groups for hands-on learning
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wrench className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#345B58]" />
                <div>
                  <p className="text-xs font-semibold text-[#345B58]">
                    Format
                  </p>
                  <p className="text-sm text-slate-500">
                    In person, practical workshop
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <article className="mb-12">
              <PortableTextBody body={course.description} />
            </article>

            {/* Registration */}
            <div className="rounded-2xl border-2 border-[#345B58]/20 bg-[#345B58]/5 p-6 lg:p-8">
              <h2 className="mb-3 text-xl font-bold text-[#345B58]">
                Ready to Join This Workshop?
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                This is an in person workshop held at our training center in
                Benin City. Spaces are limited. {course.googleFormUrl
                  ? "Fill the registration form below to secure your spot."
                  : "Contact us to check availability and register for the next session."}
              </p>
              {course.googleFormUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-[#345B58] text-white hover:bg-[#2a4a47]"
                >
                  <a
                    href={course.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register for This Workshop{" "}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#345B58] text-white hover:bg-[#2a4a47]"
                  >
                    <Link href="/contact">
                      Inquire About This Workshop
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-[#345B58] text-[#345B58] hover:bg-[#345B58]/5"
                  >
                    <Link href="/training">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Workshops
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </AnimateOnEnter>
        </div>
      </section>
    </>
  );
}

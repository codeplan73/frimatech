import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {getTrainingCourses, type SanityTraining} from "@/sanity/lib/queries";
import {trainingCards} from "@/components/home/training-data";
import {urlFor} from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Computer Repair & IT Support Workshops | Frima Technology",
  description:
    "Hands-on computer repair and IT support workshops in Benin City. Learn laptop repair, networking, and cybersecurity in our physical classroom with real equipment and expert instructors.",
  keywords: [
    "computer repair workshop Benin City",
    "IT support training Nigeria",
    "laptop repair course",
    "networking workshop",
    "cybersecurity training Benin City",
    "hands-on computer training",
    "physical IT class Nigeria",
    "Frima Technology training",
  ],
  openGraph: {
    title: "Computer Repair & IT Support Workshops | Frima Technology",
    description:
      "Hands-on computer repair and IT support workshops in Benin City. Learn with real equipment and expert instructors.",
    type: "website",
    url: "https://www.frimatechnology.com/training",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Frima Technology Training Workshops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title: "Computer Repair & IT Support Workshops | Frima Technology",
    description:
      "Hands-on computer repair and IT support workshops in Benin City.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com/training",
  },
};

const levelStyles: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  Beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  Intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-purple-100 text-purple-700",
  Advanced: "bg-purple-100 text-purple-700",
};

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  Beginner: "Beginner",
  intermediate: "Intermediate",
  Intermediate: "Intermediate",
  advanced: "Advanced",
  Advanced: "Advanced",
};

function stripPortableText(body: unknown[] | null, maxLen = 200): string {
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
  return text.slice(0, maxLen) + (text.length > maxLen ? "..." : "");
}

function SanityCourseCard({course}: {course: SanityTraining}) {
  const imageUrl = course.image
    ? urlFor(course.image).width(600).height(400).url()
    : null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/training/${course.slug.current}`}>
        <div className="relative aspect-[3/2] overflow-hidden bg-slate-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={course.image?.alt || course.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#345B58]/5">
              <Wrench className="h-14 w-14 text-[#345B58]/20" />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
        <Link href={`/training/${course.slug.current}`}>
          <h2 className="mb-3 text-xl font-bold text-[#345B58] transition-colors hover:text-[#2a4a47]">
            {course.title}
          </h2>
        </Link>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
          {stripPortableText(course.description)}
        </p>
        <div className="space-y-2">
          <Link
            href={`/training/${course.slug.current}`}
            className="block w-full"
          >
            <Button
              variant="outline"
              className="w-full border-[#345B58] text-[#345B58] hover:bg-[#345B58]/5"
            >
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {course.googleFormUrl && (
            <a
              href={course.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-[#345B58] text-white hover:bg-[#2a4a47]">
                Register Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function TrainingPage() {
  const sanityCourses = await getTrainingCourses();

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <AnimateOnEnter>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Computer Repair & IT Support Workshops
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 lg:text-lg">
              Hands-on, in-person workshops at our training center in Benin
              City. Learn computer repair, IT support, and networking with real
              equipment and expert instructors.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-[#dbc547]" />
                Physical Classroom
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <Users className="h-4 w-4 text-[#dbc547]" />
                Small Groups
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <Wrench className="h-4 w-4 text-[#dbc547]" />
                Hands-on Practice
              </span>
            </div>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Workshop Grid */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="workshops-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimateOnEnter>
            <h2
              id="workshops-heading"
              className="mb-4 text-center text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              Upcoming Workshops
            </h2>
            <p className="mb-12 text-center text-base text-slate-500">
              All workshops are held in person at our training center in Benin
              City. Registration is required as spaces are limited.
            </p>
          </AnimateOnEnter>

          {sanityCourses.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {sanityCourses.map((course) => (
                <AnimateOnEnter key={course._id} delay={0.1}>
                  <SanityCourseCard course={course} />
                </AnimateOnEnter>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {trainingCards.map((course) => (
                <AnimateOnEnter key={course.certificationName} delay={0.1}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex aspect-[3/2] items-center justify-center bg-[#345B58]/5">
                      <course.icon className="h-14 w-14 text-[#345B58]/20" />
                    </div>
                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                      <div className="mb-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${levelStyles[course.level]}`}
                        >
                          {course.level}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold text-[#345B58]">
                        {course.certificationName}
                      </h2>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                        {course.description}
                      </p>
                      <Button
                        asChild
                        className="w-full bg-[#345B58] text-white hover:bg-[#2a4a47]"
                      >
                        <Link href="/contact">
                          Inquire Now{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </AnimateOnEnter>
              ))}
            </div>
          )}

          <AnimateOnEnter delay={0.3}>
            <p className="mt-8 text-center text-sm text-slate-400">
              Workshop schedules and fees are available on inquiry. Each session
              has limited spaces to ensure quality hands-on learning. Contact us
              about private group training for your organization.
            </p>
          </AnimateOnEnter>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="bg-[#345B58]/5 py-16 lg:py-24"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimateOnEnter>
            <h2
              id="how-it-works-heading"
              className="mb-12 text-center text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              How Our Workshops Work
            </h2>
          </AnimateOnEnter>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Choose a Workshop",
                description:
                  "Browse our available workshops and pick the one that matches your goals — computer repair, IT support and networking, or cybersecurity essentials.",
              },
              {
                step: "2",
                title: "Register In Person",
                description:
                  "Fill the registration form or visit our office in Benin City. We will confirm your spot, share the schedule, and let you know what to bring for the hands-on sessions.",
              },
              {
                step: "3",
                title: "Attend and Learn",
                description:
                  "Join the workshop at our physical training center. Work with real equipment, practice real repairs, and learn from experienced instructors in a small group setting.",
              },
            ].map((item) => (
              <AnimateOnEnter key={item.step} delay={0.1}>
                <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#345B58] text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#345B58]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </AnimateOnEnter>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-24">
        <AnimateOnEnter>
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <MapPin className="mx-auto mb-6 h-12 w-12 text-[#345B58]" />
            <h2 className="mb-4 text-3xl font-bold text-[#345B58] lg:text-4xl">
              Ready to Learn by Doing?
            </h2>
            <p className="mb-8 text-base text-slate-600 lg:text-lg">
              Our workshops are held at our training center in Benin City.
              Spaces are limited to keep groups small and hands-on. Reach out to
              secure your spot in the next session.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#dbc547] text-[#345B58] hover:bg-[#c9b33a] font-semibold text-base px-8 py-6"
            >
              <Link href="/contact">
                Contact Us About Workshops{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimateOnEnter>
      </section>
    </>
  );
}

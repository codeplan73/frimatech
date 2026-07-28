import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Users, Wrench, Target, CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {services as servicesList} from "@/components/home/services-data";

export const metadata: Metadata = {
  title: "About Frima Technology | PC Repairs, IT Training & Support",
  description:
    "Frima Technology is a trusted provider of PC and laptop repairs, COMPTIA training, IT support, and computer accessories in Benin City, Nigeria. Serving our community since 2010.",
  keywords: [
    "about Frima Technology",
    "computer repair Benin City",
    "IT training provider Nigeria",
    "laptop repair services",
    "technology solutions Benin City",
  ],
  openGraph: {
    title: "About Frima Technology | PC Repairs, IT Training & Support",
    description:
      "Trusted PC and laptop repairs, COMPTIA training, and IT support in Benin City since 2010.",
    type: "website",
    url: "https://www.frimatechnology.com/about",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "About Frima Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title: "About Frima Technology | PC Repairs, IT Training & Support",
    description:
      "Trusted PC and laptop repairs, COMPTIA training, and IT support in Benin City since 2010.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com/about",
  },
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide top quality PC and laptop repair services that exceed customer expectations. We are committed to delivering prompt, reliable, and cost effective solutions while maintaining the highest standards of professionalism and customer satisfaction.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "Our skilled technicians are dedicated to diagnosing and resolving issues efficiently. We continuously expand our knowledge and expertise to stay at the forefront of technological advancements.",
  },
  {
    icon: Wrench,
    title: "Our Approach",
    description:
      "With a focus on transparent communication, integrity, and personalized service, we aim to build long term relationships with our customers and be their trusted partner for all their technology needs.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <AnimateOnEnter>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              About Frima Technology
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/80 lg:text-lg">
              Your trusted partner for PC and laptop repairs, professional IT
              training, and technology solutions in Benin City since 2010.
            </p>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Story Section with original images */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:gap-20">
            {/* Left: Image Gallery */}
            <div className="flex w-full flex-col gap-6 lg:w-6/12">
              <AnimateOnEnter>
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/main.png"
                    alt="Frima Technology workspace"
                    width={1000}
                    height={1000}
                    className="h-auto w-full rounded-2xl object-cover lg:h-[70vh]"
                  />
                </div>
              </AnimateOnEnter>
              
            </div>

            {/* Right: Text Content */}
            <AnimateOnEnter className="w-full lg:w-6/12">
              <div>
                <h2 className="mb-6 text-3xl font-bold leading-snug text-[#345B58] lg:text-4xl lg:leading-snug">
                  We Offer Computer Repair and All Manner of Technical Support
                </h2>
                <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                  <p>
                    In today&apos;s technology driven world, encountering
                    computer issues can be a frustrating and time consuming
                    experience. That is where Frima Technology comes in. We take
                    pride in offering comprehensive computer repair and technical
                    support services to individuals and businesses alike.
                  </p>
                  <p>
                    Whether you are facing hardware malfunctions, software
                    glitches, or network connectivity problems, we are here to
                    help. Our team of experienced technicians uses modern tools
                    and proven methods to diagnose and resolve issues quickly.
                  </p>
                  <p>
                    Beyond repairs, we are also a COMPTIA authorized training
                    partner, helping aspiring IT professionals earn industry
                    recognized certifications through hands on courses and
                    expert guidance.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-[#345B58] text-white hover:bg-[#2a4a47]"
                  >
                    <Link href="/contact">
                      Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#345B58] text-[#345B58] hover:bg-[#345B58]/5"
                  >
                    <Link href="/training">
                      View Training Courses
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateOnEnter>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="bg-[#345B58]/5 py-16 lg:py-24"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimateOnEnter>
            <h2
              id="values-heading"
              className="mb-12 text-center text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              How We Work
            </h2>
          </AnimateOnEnter>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <AnimateOnEnter key={value.title} delay={0.1}>
                <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
                  <div className="mb-4 inline-flex rounded-xl bg-[#345B58]/10 p-3">
                    <value.icon className="h-6 w-6 text-[#345B58]" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#345B58]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {value.description}
                  </p>
                </div>
              </AnimateOnEnter>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="about-services-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimateOnEnter>
            <h2
              id="about-services-heading"
              className="mb-12 text-center text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              What We Offer
            </h2>
          </AnimateOnEnter>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesList.map((service) => (
              <AnimateOnEnter key={service.title} delay={0.05}>
                <Link
                  href={service.link}
                  className="group block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-[#345B58]/10 p-2.5">
                    <service.icon className="h-5 w-5 text-[#345B58]" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#345B58]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {service.description.slice(0, 100)}...
                  </p>
                </Link>
              </AnimateOnEnter>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-20">
        <AnimateOnEnter>
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <CheckCircle className="mx-auto mb-6 h-12 w-12 text-[#dbc547]" />
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              Ready to Work With Us?
            </h2>
            <p className="mb-8 text-base text-white/80 lg:text-lg">
              Whether you need a repair, want to enroll in training, or need IT
              support for your business, we are here to help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#dbc547] text-[#345B58] hover:bg-[#c9b33a] font-semibold text-base px-8 py-6"
            >
              <Link href="/contact">
                Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimateOnEnter>
      </section>
    </>
  );
}

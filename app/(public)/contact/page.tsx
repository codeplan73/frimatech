import type {Metadata} from "next";
import {FaMapLocation} from "react-icons/fa6";
import {PiPhoneCallBold} from "react-icons/pi";
import {IoMdMail} from "react-icons/io";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import ContactForm from "./ContactForm";
import MapLocation from "./MapLocation";

export const metadata: Metadata = {
  title: "Contact Frima Technology | Get In Touch for Repairs & Training",
  description:
    "Contact Frima Technology for PC and laptop repairs, COMPTIA training inquiries, IT support, or accessory purchases. Visit our office in Benin City or call us today.",
  keywords: [
    "contact Frima Technology",
    "computer repair contact Benin City",
    "IT training inquiry Nigeria",
    "laptop repair Benin City phone",
    "Frima Technology address",
  ],
  openGraph: {
    title: "Contact Frima Technology | Get In Touch for Repairs & Training",
    description:
      "Contact us for PC and laptop repairs, COMPTIA training, IT support, and accessories in Benin City.",
    type: "website",
    url: "https://www.frimatechnology.com/contact",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Frima Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title: "Contact Frima Technology | Get In Touch for Repairs & Training",
    description:
      "Contact us for PC and laptop repairs, COMPTIA training, IT support, and accessories in Benin City.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com/contact",
  },
};

const contactInfo = [
  {
    icon: <FaMapLocation className="h-6 w-6" />,
    title: "Office Address",
    lines: [
      "15 Arala Street off Akenzuwa",
      "Opposite Keystone Bank, Airport Road",
      "Benin City, Nigeria",
    ],
  },
  {
    icon: <PiPhoneCallBold className="h-6 w-6" />,
    title: "Phone Number",
    lines: ["+234 706 048 2923"],
    href: "tel:+2347060482923",
  },
  {
    icon: <IoMdMail className="h-6 w-6" />,
    title: "Email Address",
    lines: ["info@frimatechnology.com"],
    href: "mailto:info@frimatechnology.com",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <AnimateOnEnter>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Get In Touch
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/80 lg:text-lg">
              Have a question, need a repair, or want to enroll in training? We
              would love to hear from you. Reach out and we will respond as
              quickly as possible.
            </p>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimateOnEnter>
            <h2 className="mb-12 text-center text-3xl font-bold text-[#345B58] lg:text-4xl">
              We want to share our location to find us easily
            </h2>
          </AnimateOnEnter>

          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {contactInfo.map((info) => (
              <AnimateOnEnter key={info.title} delay={0.1}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm lg:p-8">
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-[#345B58]/10 p-3">
                    {info.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-[#345B58]">
                    {info.title}
                  </h3>
                  {info.lines.map((line, i) =>
                    info.href ? (
                      <a
                        key={i}
                        href={info.href}
                        className={`block text-sm text-slate-600 transition-colors hover:text-[#345B58] ${i > 0 ? "mt-1" : ""}`}
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={i}
                        className={`text-sm text-slate-600 ${i > 0 ? "mt-1" : ""}`}
                      >
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </AnimateOnEnter>
            ))}
          </div>

          {/* Contact Form + Map */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
            <div className="w-full lg:w-5/12">
              <AnimateOnEnter>
                <ContactForm />
              </AnimateOnEnter>
            </div>
            <div className="w-full lg:w-7/12">
              <AnimateOnEnter>
                <MapLocation />
              </AnimateOnEnter>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

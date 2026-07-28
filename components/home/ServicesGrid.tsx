'use client'

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {services} from "./services-data";

const staggerCard = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.08, delayChildren: 0.1},
  },
};

const cardVariants = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const},
  },
};

const ServicesGrid = () => {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateOnEnter>
          <div className="mb-12 text-center">
            <h2
              id="services-heading"
              className="mb-4 text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              What We Offer
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 lg:text-lg">
              From expert repairs to professional IT training, we provide a full
              range of technology services to individuals and businesses.
            </p>
          </div>
        </AnimateOnEnter>

        <motion.div
          variants={staggerCard}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: "-60px"}}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link
                href={service.link}
                className="group block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#345B58]/5"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#345B58]/10 p-3">
                  <service.icon className="h-6 w-6 text-[#345B58]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#345B58]">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#345B58] opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;

"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {trainingCards} from "./training-data";

const staggerCard = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.1, delayChildren: 0.15},
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

const TrainingHighlights = () => {
  const levelStyles: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  return (
    <section
      className="bg-[#345B58]/5 py-16 lg:py-24"
      aria-labelledby="training-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateOnEnter>
          <div className="mb-12 text-center">
            <h2
              id="training-heading"
              className="mb-4 text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              Get COMPTIA Certified
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 lg:text-lg">
              Industry recognized IT certifications taught by experienced
              instructors. Hands on labs, exam preparation, and career support
              included.
            </p>
          </div>
        </AnimateOnEnter>

        <motion.div
          variants={staggerCard}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: "-60px"}}
          className="grid gap-8 lg:grid-cols-3"
        >
          {trainingCards.map((course) => (
            <motion.div key={course.certificationName} variants={cardVariants}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <div className="mb-4 inline-flex rounded-xl bg-[#345B58]/10 p-3">
                  <course.icon className="h-7 w-7 text-[#345B58]" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#345B58]">
                  {course.certificationName}
                </h3>
                <span
                  className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${levelStyles[course.level]}`}
                >
                  {course.level}
                </span>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">
                  {course.description}
                </p>
                <Link
                  href="/training"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#345B58] hover:underline"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingHighlights;

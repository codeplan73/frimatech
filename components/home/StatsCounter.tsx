"use client";

import {useEffect, useRef, useState} from "react";
import {motion, useInView} from "framer-motion";
import {stats} from "./stats-data";

function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {once: true, margin: "-100px"});
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-1 text-4xl font-bold text-white lg:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

const StatsCounter = () => {
  return (
    <section
      className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-60px"}}
          transition={{duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]}}
        >
          <h2
            id="stats-heading"
            className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl"
          >
            Trusted by Hundreds Across Nigeria
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: "-60px"}}
          variants={{
            hidden: {},
            visible: {transition: {staggerChildren: 0.12, delayChildren: 0.2}},
          }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: {opacity: 0, y: 20, scale: 0.95},
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]},
                },
              }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;

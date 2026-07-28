"use client";

import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {motion} from "framer-motion";
import {Quote} from "lucide-react";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {testimonials} from "./testimonials-data";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: "center"}, [
    Autoplay({delay: 6000, stopOnInteraction: true}),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateOnEnter>
          <div className="mb-12 text-center">
            <h2
              id="testimonials-heading"
              className="mb-4 text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              What Our Customers Say
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 lg:text-lg">
              Real feedback from the people and businesses we have served.
            </p>
          </div>
        </AnimateOnEnter>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-60px"}}
          transition={{duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]}}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-[#345B58]/[0.03] p-6 shadow-sm lg:p-8">
                    <Quote className="mb-4 h-8 w-8 text-[#345B58]/20" />
                    <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <div>
                      <p className="text-sm font-semibold text-[#345B58]">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots for mobile */}
          <div className="mt-6 flex justify-center gap-2 lg:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-[#345B58]"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

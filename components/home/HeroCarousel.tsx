"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {heroSlides} from "./hero-slides";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const},
  },
};

const fadeUpSubtle = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const},
  },
};

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [
    Autoplay({delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true}),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <section
      className="relative overflow-hidden"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${heroSlides.length}: ${slide.heading}`}
            >
              {/* Background image with gradient overlay */}
              <div className="relative h-[70vh] min-h-[500px] w-full lg:h-[80vh]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover bg-left"
                  priority={index === 0}
                  sizes="100vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-[#345B58]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#345B58]/40 via-transparent to-transparent" />

                {/* Content with staggered text animation */}
                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="max-w-2xl"
                      >
                        {/* Icon */}
                        <motion.div
                          variants={fadeUp}
                          className="mb-4 inline-flex rounded-xl bg-white/10 p-3 backdrop-blur-sm"
                        >
                          <slide.icon className="h-8 w-8 text-[#dbc547]" />
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                          variants={fadeUp}
                          className="mb-4 text-3xl font-bold leading-tight text-white lg:text-5xl lg:leading-tight"
                        >
                          {slide.heading}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                          variants={fadeUpSubtle}
                          className="mb-8 text-base leading-relaxed text-white/80 lg:text-lg"
                        >
                          {slide.subtitle}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div variants={fadeUpSubtle}>
                          <Button
                            asChild
                            size="lg"
                            className="bg-[#dbc547] text-[#345B58] hover:bg-[#c9b33a] font-semibold text-base px-8 py-6"
                          >
                            <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-[#dbc547]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

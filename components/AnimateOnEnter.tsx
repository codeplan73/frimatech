"use client";

import {type ReactNode} from "react";
import {motion, type Variants} from "framer-motion";

const defaultVariants: Variants = {
  hidden: {opacity: 0, y: 40},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const},
  },
};

interface Props {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

const AnimateOnEnter = ({children, className, variants, delay}: Props) => {
  const v = variants ?? defaultVariants;

  const withDelay = delay
    ? {
        ...v,
        visible: {
          ...v.visible,
          transition: {...((v.visible as Record<string, unknown>)?.transition ?? {}), delay},
        },
      }
    : v;

  return (
    <motion.div
      variants={withDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: "-60px"}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnEnter;

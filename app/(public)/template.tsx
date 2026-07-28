"use client";

import {type ReactNode} from "react";
import {motion} from "framer-motion";

export default function Template({children}: {children: ReactNode}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const}}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.21, 0.6, 0.35, 1] },
  }),
};

export function Reveal({
  children,
  i = 0,
  className,
  style,
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={riseVariants}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

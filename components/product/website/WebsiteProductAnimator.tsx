"use client";

import React from "react";
import { motion } from "framer-motion";

interface WebsiteProductAnimatorProps {
  children: React.ReactNode;
  className?: string;
  enableScrollZoom?: boolean;
}

export const WebsiteProductAnimator: React.FC<WebsiteProductAnimatorProps> = ({
  children,
  className = "",
  enableScrollZoom = true,
}) => {
  if (!enableScrollZoom) {
    return (
      <div className={`w-full overflow-x-auto max-w-full rounded-[14px] scrollbar-none ${className}`}>
        <div className="min-w-[720px] md:min-w-0">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-x-auto max-w-full rounded-[14px] scrollbar-none ${className}`}
      style={{ perspective: 1200 }}
    >
      <div className="min-w-[720px] md:min-w-0">
        <motion.div
          initial={{ opacity: 0.9, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full transform-gpu transition-shadow hover:shadow-2xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};


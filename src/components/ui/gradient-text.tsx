
"use client"
import React from "react";
import { motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex overflow-hidden",
        "bg-gradient-to-r from-book-purple via-book-lightPurple to-book-orange",
        "bg-clip-text text-transparent",
        "animate-pulse",
        className,
      )}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 opacity-30">
        <span className="pointer-events-none absolute -top-1/2 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[0.5rem] opacity-60"></span>
        <span className="pointer-events-none absolute right-0 top-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[0.5rem] opacity-60"></span>
        <span className="pointer-events-none absolute bottom-0 left-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[0.5rem] opacity-60"></span>
        <span className="pointer-events-none absolute -bottom-1/2 right-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[0.5rem] opacity-60"></span>
      </span>
    </MotionComponent>
  );
}

export { GradientText }

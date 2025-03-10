"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];

interface HeroBadgeProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const badgeVariants: Record<string, string> = {
  default: "bg-background",
  outline: "border-2",
  ghost: "",
};

const sizeVariants: Record<string, string> = {
  sm: "px-3 py-2 text-sm gap-2",
  md: "px-4 py-2 text-base gap-2.5",
  lg: "px-5 py-2 text-lg gap-3",
};

const iconAnimationVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: -10 },
};

export default function HeroBadge({
  href,
  text,
  icon,
  endIcon,
  variant = "default",
  size = "md",
  className,
  onClick,
}: HeroBadgeProps) {
  const controls = useAnimation();

  const baseClassName = cn(
    "inline-flex items-center w-full justify-center border-b border-[#F0F0F0] tracking-wider transition-colors",
    badgeVariants[variant],
    sizeVariants[size],
    className
  );

  const content = (
    <motion.div
      className={baseClassName}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("initial")}
    >
      {icon && (
        <motion.div
          className="text-foreground/60 transition-colors group-hover:text-primary"
          variants={iconAnimationVariants}
          initial="initial"
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.div>
      )}
      <span className="tracking-widest">{text}</span>
      {endIcon && (
        <motion.div className="text-foreground/60">{endIcon}</motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group cursor-pointer")}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button onClick={onClick} className="group w-full">
      {content}
    </motion.button>
  );
}
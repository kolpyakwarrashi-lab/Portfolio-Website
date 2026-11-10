import { useEffect, useState } from "react";
import { motion, useReducedMotion as useMotionReducedMotion, type HTMLMotionProps } from "motion/react";

/** Reduced-motion preference that stays false during SSR/hydration to avoid mismatches. */
export function useReducedMotion() {
  const prefers = useMotionReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits text into words that rise in, staggered. */
export function StaggerText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h2" | "h1" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="eyebrow flex items-center gap-3 text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-10 bg-border" />
      <span>{children}</span>
    </div>
  );
}

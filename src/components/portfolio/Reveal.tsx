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

const motionTags = { span: motion.span, h1: motion.h1, h2: motion.h2, p: motion.p };

/** Splits text into words that rise in, staggered. Parent observes the viewport. */
export function StaggerText({
  text,
  className,
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
}) {
  const reduce = useReducedMotion();
  const Tag = motionTags[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.9, ease } } }}
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

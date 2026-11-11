import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion as useMotionReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Reduced-motion preference that stays false during SSR/hydration to avoid mismatches. */
export function useReducedMotion() {
  const prefers = useMotionReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; x?: number };

/** Rises in with a soft blur as it scrolls into view. Reduced motion: opacity fade only. */
export function Reveal({ delay = 0, y = 48, x = 0, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const motionTags = { span: motion.span, h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

function useTrigger(onMount: boolean) {
  return onMount
    ? ({ animate: "show" } as const)
    : ({ whileInView: "show", viewport: { once: true, margin: "-60px" } } as const);
}

/** Splits text into words that rise in, staggered. */
export function StaggerText({
  text,
  className,
  delay = 0,
  as = "span",
  onMount = false,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
  onMount?: boolean;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motionTags[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...useTrigger(onMount)}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={
              reduce
                ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }
                : {
                    hidden: { y: "110%", rotate: 4 },
                    show: { y: 0, rotate: 0, transition: { duration: 0.9, ease } },
                  }
            }
          >
            {i < words.length - 1 ? `${w}\u00A0` : w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Letter-by-letter rise for display headlines. `shimmer` adds a light sweep that
 * travels across the letters continuously.
 */
export function LetterReveal({
  text,
  className,
  delay = 0,
  as = "span",
  onMount = false,
  shimmer = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
  onMount?: boolean;
  shimmer?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motionTags[as];
  const words = text.split(" ");
  let n = 0;
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...useTrigger(onMount)}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((w, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {[...w].map((ch, ci) => {
            const idx = n++;
            return (
              <span key={ci} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={cn("inline-block", shimmer && "text-shimmer")}
                  style={shimmer ? { animationDelay: `${idx * 0.09}s` } : {}}
                  variants={
                    reduce
                      ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
                      : {
                          hidden: { y: "120%", rotate: 12, opacity: 0 },
                          show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 1, ease } },
                        }
                  }
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">{"\u00A0"}</span>}
        </span>
      ))}
    </Tag>
  );
}

/** Image that is unveiled by a rising mask, then settles from a slight zoom. */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Section transition: the wrapped section opens from a rounded, inset card to full
 * width as it scrolls into view.
 */
export function Curtain({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px ${radius}px 0px 0px)`;
  return (
    <motion.div ref={ref} style={reduce ? {} : { clipPath }}>
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="eyebrow flex items-center gap-3 text-muted-foreground">
      <motion.span
        className="text-primary"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {index}
      </motion.span>
      <motion.span
        aria-hidden
        className="h-px w-14 origin-left bg-gradient-brand"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
      />
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
      >
        {children}
      </motion.span>
    </div>
  );
}

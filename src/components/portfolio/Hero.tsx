import { useReducedMotion } from "./Reveal";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Code2, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

function Chip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease, delay }}
      className={`glass absolute z-20 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-foreground shadow-soft ${className}`}
    >
      <motion.span
        className="flex items-center gap-2"
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, color-mix(in oklab, var(--softwhite) 28%, transparent), transparent 55%)`;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="dark grain relative isolate overflow-hidden bg-background pb-20 pt-28 text-foreground md:pt-32"
    >
      <div aria-hidden className="aurora absolute inset-0 -z-10 opacity-80" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
        {/* Giant name behind portrait */}
        <motion.h1
          style={reduce ? {} : { y: nameY }}
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "-0.04em" }}
          transition={{ duration: 1.4, ease }}
          className="pointer-events-none absolute top-6 z-0 select-none font-display text-[26vw] font-bold leading-none text-outline md:top-0 md:text-[17rem]"
          aria-hidden
        >
          RASHI
        </motion.h1>

        {/* Portrait */}
        <motion.div
          style={reduce ? {} : { y: portraitY }}
          className="relative z-10 mt-6 [perspective:1200px]"
          initial={reduce ? false : { opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative">
            <motion.div
              style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* back glow layers */}
              <div aria-hidden className="absolute -inset-6 -z-10 rounded-t-full bg-gradient-brand opacity-40 blur-3xl" />
              <div
                aria-hidden
                className="absolute -inset-3 rounded-t-full rounded-b-[2.5rem] border border-primary/30"
                style={{ transform: "translateZ(-30px)" }}
              />
              <div className="relative h-[26rem] w-[19rem] overflow-hidden rounded-t-full rounded-b-[2rem] bg-violet shadow-glow sm:h-[32rem] sm:w-[24rem] md:h-[36rem] md:w-[27rem]">
                <img
                  src={profile.portrait}
                  alt="Portrait of Rashi Kolpyakwar smiling at her desk"
                  className="h-full w-full object-cover object-[50%_25%]"
                  fetchPriority="high"
                  width={1199}
                  height={1312}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                {!reduce && (
                  <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
                )}
              </div>

              <Chip className="-left-4 top-24 sm:-left-24" delay={1.0}>
                <GraduationCap className="size-3.5 text-sky" /> CSE · {profile.year}
              </Chip>
              <Chip className="-right-4 top-44 sm:-right-28" delay={1.15}>
                <Code2 className="size-3.5 text-primary" /> Aspiring Full-Stack
              </Chip>
              <Chip className="-left-4 bottom-28 sm:-left-20" delay={1.3}>
                <Sparkles className="size-3.5 text-sky" /> {profile.collegeShort}
              </Chip>
            </motion.div>
          </div>
        </motion.div>

        {/* Copy */}
        <div className="relative z-10 -mt-12 flex flex-col items-center text-center md:-mt-16">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.85 }}
            className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl"
          >
            Beyond the <span className="text-gradient">Code.</span>
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="eyebrow mt-5 text-muted-foreground"
          >
            {profile.fullName} — {profile.role}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            {profile.intro}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild variant="hero" size="xl">
              <a href="#work">
                Explore My Work <ArrowDown />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#contact">
                Let's Connect <ArrowUpRight />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

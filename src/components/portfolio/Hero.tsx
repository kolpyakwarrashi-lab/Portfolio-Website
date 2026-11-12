import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Code2, Github, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, profile } from "@/content/portfolio";
import { ease, LetterReveal, StaggerText, useReducedMotion } from "./Reveal";
import { Magnetic } from "./Interactions";

function Chip({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
      className={`glass absolute z-20 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-foreground shadow-glow ${className}`}
    >
      <motion.span
        className="flex items-center gap-2"
        animate={reduce ? {} : { y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

/** Small glowing sparks drifting around the portrait. */
const sparks = [
  { cls: "left-[8%] top-[22%] size-2 bg-sky float-slow", delay: "0s" },
  { cls: "left-[18%] top-[62%] size-1.5 bg-primary float-fast", delay: "1.2s" },
  { cls: "right-[10%] top-[30%] size-2.5 bg-primary float-slow", delay: "0.6s" },
  { cls: "right-[20%] top-[70%] size-1.5 bg-sky float-fast", delay: "2s" },
  { cls: "left-[30%] top-[12%] size-1 bg-softwhite twinkle", delay: "0.4s" },
  { cls: "right-[32%] top-[16%] size-1 bg-softwhite twinkle", delay: "1.6s" },
  { cls: "left-[42%] bottom-[18%] size-1 bg-sky twinkle", delay: "2.4s" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, color-mix(in oklab, var(--softwhite) 30%, transparent), transparent 55%)`;

  // Spotlight that follows the mouse across the whole hero
  const sx = useSpring(useMotionValue(640), { stiffness: 90, damping: 20 });
  const sy = useSpring(useMotionValue(320), { stiffness: 90, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in oklab, var(--electric) 26%, transparent), transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
  const onSectionMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    sx.set(e.clientX - r.left);
    sy.set(e.clientY - r.top);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onSectionMove}
      className="dark grain relative isolate overflow-hidden bg-background pb-20 pt-28 text-foreground md:pt-32"
    >
      {/* Animated background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora absolute inset-0 opacity-80" />
        <div className="blob-a absolute -left-[10%] top-[5%] size-[34rem] rounded-full bg-primary/35 blur-[110px]" />
        <div className="blob-b absolute -right-[8%] top-[35%] size-[30rem] rounded-full bg-sky/25 blur-[110px]" />
        <div className="grid-lines grid-pan absolute inset-0" />
        {!reduce && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}
        {sparks.map((s, i) => (
          <span
            key={i}
            className={`absolute rounded-full shadow-glow ${s.cls}`}
            style={{ animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5">
        {/* Giant outlined name behind the portrait */}
        <motion.p
          style={reduce ? {} : { y: nameY }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.3em", filter: "blur(12px)" }}
          animate={{ opacity: 1, letterSpacing: "-0.04em", filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease }}
          className="pointer-events-none absolute top-6 z-0 select-none font-display text-[26vw] font-bold leading-none text-outline md:top-0 md:text-[17rem]"
          aria-hidden
        >
          RASHI
        </motion.p>

        {/* Portrait */}
        <motion.div
          style={reduce ? {} : { y: portraitY, scale: portraitScale }}
          className="relative z-10 mt-6 [perspective:1200px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, scale: 0.9, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease, delay: 0.15 }}
        >
          <div onPointerMove={onMove} onPointerLeave={onLeave} className="group/portrait relative">
            <motion.div
              style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div aria-hidden className="absolute -inset-8 -z-10 rounded-t-full bg-gradient-brand opacity-50 blur-3xl float-slow" />
              {/* Spinning gradient ring */}
              <div
                aria-hidden
                className="border-spin absolute -inset-3 rounded-t-full rounded-b-[2.5rem] p-px opacity-90"
                style={{ transform: "translateZ(-30px)" }}
              >
                <div className="h-full w-full rounded-t-full rounded-b-[2.5rem] bg-background/60" />
              </div>
              <div className="relative h-[26rem] w-[19rem] overflow-hidden rounded-t-full rounded-b-[2rem] bg-violet shadow-glow sm:h-[32rem] sm:w-[24rem] md:h-[36rem] md:w-[27rem]">
                <img
                  src={profile.portrait}
                  alt="Portrait of Rashi Kolpyakwar smiling at her desk"
                  className="h-full w-full object-cover object-[50%_25%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/portrait:scale-[1.05]"
                  fetchPriority="high"
                  width={1199}
                  height={1312}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                {!reduce && (
                  <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
                )}
              </div>

              <Chip className="-left-4 top-24 sm:-left-24" delay={1.1}>
                <GraduationCap className="size-3.5 text-sky" /> <span>{`CSE · ${profile.year}`}</span>
              </Chip>
              <Chip className="-right-4 top-44 sm:-right-28" delay={1.3}>
                <Code2 className="size-3.5 text-primary" /> <span>Aspiring Full-Stack</span>
              </Chip>
              <Chip className="-left-4 bottom-28 sm:-left-20" delay={1.5}>
                <Sparkles className="size-3.5 text-sky" /> <span>{profile.collegeShort}</span>
              </Chip>
            </motion.div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          style={reduce ? {} : { y: copyY, opacity: fade }}
          className="relative z-10 -mt-12 flex flex-col items-center text-center md:-mt-16"
        >
          <LetterReveal
            as="h1"
            onMount
            shimmer
            delay={0.7}
            text={profile.fullName}
            className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl"
          />
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1.4, ease, delay: 1.3 }}
            className="eyebrow mt-5 text-muted-foreground"
          >
            {"\u00a0COMPUTER SCIENCE & ENGINEERING STUDENT"}
          </motion.p>
          <StaggerText
            as="p"
            onMount
            delay={1.6}
            stagger={0.025}
            text={profile.intro}
            className="mt-6 block max-w-xl text-base text-muted-foreground md:text-lg"
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 2.1 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <a href="#work">
                  <span>Explore My Work</span> <ArrowDown />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="glass" size="xl">
                <a href="#contact">
                  <span>Let's Connect</span> <ArrowUpRight />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.45}>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="glass social-icon flex size-12 items-center justify-center rounded-full"
              >
                <Github className="size-5" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Scroll cue */}
          <motion.a
            href="#about"
            aria-label="Scroll to About"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="mt-14 flex h-11 w-7 justify-center rounded-full border border-foreground/30 pt-2"
          >
            <motion.span
              className="block h-2 w-1 rounded-full bg-gradient-brand"
              animate={reduce ? {} : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

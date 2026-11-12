import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/content/portfolio";
import { ease, ImageReveal, Reveal, SectionLabel, StaggerText, useReducedMotion } from "./Reveal";
import { Tilt } from "./Interactions";

const facts = [
  { k: "Studying", v: "B.E. Computer Science & Engineering" },
  { k: "College", v: profile.collegeShort },
  { k: "Year", v: profile.year },
  { k: "From", v: profile.location },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  // Zooms in gently as the photo travels up the screen
  const imgScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.32, 1.12, 1.2]);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel index="01">About me</SectionLabel>
          <StaggerText
            as="h2"
            text="I learn by building — and I'm just getting started."
            className="mt-6 block font-display text-4xl font-bold leading-[1.02] md:text-6xl"
          />
          <Reveal delay={0.1} className="mt-10 grid gap-6 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
            <p>
              I'm a second-year Computer Science & Engineering student at {profile.college}, Shegaon.
              My journey into tech started with HTML, CSS and JavaScript — and the simple thrill of seeing
              something I wrote come alive in the browser.
            </p>
            <p>
              I'm most interested in frontend development and creating practical, user-friendly web
              applications. Right now I'm expanding into React, backend development and deployment, on my
              way to becoming a full-stack developer.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-4">
              {facts.map((f, i) => (
                <motion.div
                  key={f.k}
                  className="bg-card p-5 transition-colors duration-300 hover:bg-accent"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.1 }}
                >
                  <dt className="eyebrow text-muted-foreground">{f.k}</dt>
                  <dd className="mt-2 font-display text-sm font-medium leading-snug">{f.v}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative md:col-span-5">
          <Reveal className="relative mx-auto max-w-sm md:mt-16">
            <motion.div
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-brand-soft"
              aria-hidden
              initial={{ rotate: 0, opacity: 0 }}
              whileInView={{ rotate: -4, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease, delay: 0.4 }}
            />
            <Tilt max={8} className="group/photo relative">
              <div className="relative rounded-[2rem] p-[2px] shadow-soft transition-shadow duration-700 group-hover/photo:shadow-glow">
                {/* Animated gradient border */}
                <div aria-hidden className="border-spin absolute inset-0 rounded-[2rem] opacity-70 transition-opacity duration-700 group-hover/photo:opacity-100" />
                <ImageReveal className="relative rounded-[calc(2rem-2px)] bg-muted">
                  <div className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:rotate-[1.5deg] group-hover/photo:scale-[1.06]">
                    <motion.img
                      style={reduce ? {} : { y: imgY, scale: imgScale }}
                      src={profile.portrait}
                      alt="Rashi at her workspace"
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                    />
                  </div>
                  {/* Light that follows the mouse */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/photo:opacity-100"
                    style={{
                      background:
                        "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--softwhite) 45%, transparent), transparent 60%)",
                    }}
                  />
                  {/* Hover overlay along the bottom edge only, so the face stays clear */}
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity duration-500 group-hover/photo:opacity-100" />
                  <span className="glass absolute bottom-4 left-4 translate-y-4 rounded-full px-3 py-1.5 text-xs font-medium opacity-0 transition-all duration-500 group-hover/photo:translate-y-0 group-hover/photo:opacity-100">
                    {`${profile.collegeShort} · ${profile.year}`}
                  </span>
                </ImageReveal>
              </div>
            </Tilt>
            <figcaption className="relative mt-5 flex items-center justify-between text-sm text-muted-foreground">
              <span className="font-display font-medium text-foreground">Curious by default.</span>
              <span>Shegaon · 2026</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/content/portfolio";
import { Reveal, SectionLabel, StaggerText } from "./Reveal";

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

  return (
    <section id="about" className="relative bg-background py-28 text-foreground md:py-36">
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
              {facts.map((f) => (
                <div key={f.k} className="bg-card p-5">
                  <dt className="eyebrow text-muted-foreground">{f.k}</dt>
                  <dd className="mt-2 font-display text-sm font-medium leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative md:col-span-5">
          <Reveal className="relative mx-auto max-w-sm md:mt-16">
            <div className="absolute -inset-4 -rotate-3 rounded-[2.5rem] bg-gradient-brand-soft" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
              <motion.img
                style={reduce ? undefined : { y: imgY, scale: 1.12 }}
                src={profile.portrait}
                alt="Rashi at her workspace"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[50%_30%]"
              />
            </div>
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

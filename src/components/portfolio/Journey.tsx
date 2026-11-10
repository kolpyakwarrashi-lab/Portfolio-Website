import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { education } from "@/content/portfolio";
import { Reveal, SectionLabel, StaggerText, useReducedMotion } from "./Reveal";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="dark grain relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div aria-hidden className="absolute -right-40 top-20 size-[36rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="02">Education & Journey</SectionLabel>
            <StaggerText
              as="h2"
              text="Every chapter, a stepping stone."
              className="mt-6 block font-display text-4xl font-bold leading-[1.02] md:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-muted-foreground">
                From Sindewahi to Shegaon — consistent effort, curiosity and a growing love for computer science.
              </p>
            </Reveal>
          </div>

          <ol ref={ref} className="relative md:col-span-7">
            <span aria-hidden className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
            <motion.span
              aria-hidden
              style={reduce ? {} : { scaleY }}
              className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary to-sky"
            />
            {education.map((e, i) => (
              <motion.li
                key={e.title}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="relative pb-14 pl-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 flex size-6 items-center justify-center rounded-full border ${
                    e.current ? "border-primary bg-primary/20" : "bg-background"
                  }`}
                >
                  <span className={`size-2 rounded-full ${e.current ? "bg-gradient-brand" : "bg-muted-foreground"}`} />
                </span>
                <div>
                  <p className="eyebrow text-sky">{e.period}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{e.title}</h3>
                  <p className="mt-1 text-muted-foreground">{e.place}</p>
                  <div className="mt-5 inline-flex items-baseline gap-3 rounded-2xl glass px-5 py-3">
                    <span className="font-display text-3xl font-bold text-gradient">{e.highlight}</span>
                    <span className="text-sm text-muted-foreground">{e.note}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

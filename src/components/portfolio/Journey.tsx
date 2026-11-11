import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { education } from "@/content/portfolio";
import { ease, Reveal, SectionLabel, StaggerText, useReducedMotion } from "./Reveal";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
              className="absolute left-[10px] top-2 h-[calc(100%-1rem)] w-[3px] origin-top rounded-full bg-gradient-to-b from-primary to-sky shadow-glow"
            />
            {!reduce && (
              <span aria-hidden className="absolute left-[11.5px] top-2 h-[calc(100%-1rem)] w-0">
                <motion.span
                  style={{ top: dotTop }}
                  className="absolute -left-2 -mt-2 block size-4 rounded-full bg-sky shadow-glow"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-sky/60" />
                </motion.span>
              </span>
            )}
            {education.map((e, i) => (
              <motion.li
                key={e.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 60, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1, ease, delay: i * 0.05 }}
                className="group relative pb-14 pl-12 last:pb-0"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: [0, 1.4, 1] }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease, delay: 0.2 }}
                  aria-hidden
                  className={`absolute left-0 top-1.5 z-10 flex size-6 items-center justify-center rounded-full border transition-shadow duration-500 group-hover:shadow-glow ${
                    e.current ? "border-primary bg-primary/20" : "bg-background"
                  }`}
                >
                  <span className={`size-2 rounded-full ${e.current ? "bg-gradient-brand" : "bg-muted-foreground"}`} />
                  {e.current && <span className="absolute inset-0 animate-ping rounded-full border border-primary" />}
                </motion.span>
                <div>
                  <p className="eyebrow text-sky">{e.period}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{e.title}</h3>
                  <p className="mt-1 text-muted-foreground">{e.place}</p>
                  <div className="mt-5 inline-flex items-baseline gap-3 rounded-2xl glass px-5 py-3 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-glow">
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

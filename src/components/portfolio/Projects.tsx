import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { moreProjects, projects, type Project, type Shot } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { ease, ImageReveal, LetterReveal, Reveal, SectionLabel, StaggerText, useReducedMotion } from "./Reveal";
import { Magnetic, Tilt } from "./Interactions";

function ShotButton({
  shot,
  onOpen,
  className,
  title,
}: {
  shot: Shot;
  onOpen: (s: Shot) => void;
  className?: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      className={cn(
        "group/shot relative block h-full w-full overflow-hidden rounded-2xl border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={`View larger: ${shot.alt}`}
      data-cursor="View"
    >
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.09]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/shot:opacity-100"
      />
      {title && (
        <span aria-hidden className="absolute inset-x-5 bottom-4 overflow-hidden">
          <span className="block translate-y-full font-display text-2xl font-bold text-foreground transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:translate-y-0 md:text-3xl">
            {title}
          </span>
        </span>
      )}
      <span className="glass absolute right-3 top-3 flex size-9 scale-50 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover/shot:scale-100 group-hover/shot:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

function Gallery({ project, onOpen }: { project: Project; onOpen: (s: Shot) => void }) {
  const [main, ...rest] = project.shots;
  if (!main) return null;
  if (rest.length === 0) {
    return (
      <ImageReveal className="aspect-[16/10] rounded-2xl">
        <ShotButton shot={main} onOpen={onOpen} title={project.title} />
      </ImageReveal>
    );
  }
  const tall = rest.find((s) => s.ratio === "tall");
  const wides = rest.filter((s) => s.ratio === "wide");
  return (
    <div className="grid grid-cols-3 gap-3">
      <ImageReveal className={cn("aspect-[16/10] rounded-2xl", tall ? "col-span-2" : "col-span-3")}>
        <ShotButton shot={main} onOpen={onOpen} title={project.title} />
      </ImageReveal>
      {tall && (
        <ImageReveal className="col-span-1 rounded-2xl" delay={0.15}>
          <ShotButton shot={tall} onOpen={onOpen} />
        </ImageReveal>
      )}
      {wides.length > 0 && (
        <div className={cn("col-span-3 grid gap-3", wides.length > 1 && "sm:grid-cols-2")}>
          {wides.map((s, i) => (
            <ImageReveal key={s.src} className="aspect-[16/9] rounded-2xl" delay={0.25 + i * 0.1}>
              <ShotButton shot={s} onOpen={onOpen} />
            </ImageReveal>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen, flip }: { project: Project; onOpen: (s: Shot) => void; flip: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? {} : { scale, rotateX, opacity, transformPerspective: 1400 }}
      className="origin-top"
    >
      <Tilt max={3}>
        {/* Animated gradient border + mouse-follow lighting */}
        <div className="group relative rounded-[2rem] p-px">
          <div aria-hidden className="border-spin absolute inset-0 rounded-[2rem] opacity-40 transition-opacity duration-700 group-hover:opacity-100" />
          <article className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-surface p-4 md:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--electric) 18%, transparent), transparent 60%)",
              }}
            />
      <div className={cn("relative grid gap-8 lg:grid-cols-12 lg:items-start", flip && "lg:[&>*:first-child]:order-2")}>
        <div className="lg:col-span-7">
          <Gallery project={project} onOpen={onOpen} />
        </div>

        <div className="flex flex-col p-2 lg:col-span-5 lg:p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm text-muted-foreground">{project.index} / 0{projects.length}</span>
            <span
              className={cn(
                "eyebrow rounded-full border px-3 py-1",
                project.status === "Live" ? "border-sky/40 text-sky" : "border-primary/40 text-primary",
              )}
            >
              {project.status === "Live" && <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-sky align-middle" />}
              {project.status}
            </span>
          </div>
          <LetterReveal as="h3" text={project.title} className="mt-5 block font-display text-4xl font-bold md:text-5xl" />
          <p className="mt-2 text-muted-foreground">{project.subtitle}</p>

          <dl className="mt-8 space-y-5 text-sm">
            {[
              ["Problem", project.problem],
              ["Solution", project.solution],
              ["My contribution", project.contribution],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="eyebrow pt-0.5 text-muted-foreground">{k}</dt>
                <dd className="leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <p className="eyebrow text-muted-foreground">Key features</p>
            <ul className="mt-3 space-y-2 text-sm">
              {project.features.map((f, fi) => (
                <motion.li
                  key={f}
                  className="flex gap-3"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease, delay: 0.1 + fi * 0.07 }}
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  <span className="text-muted-foreground">{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map((t, ti) => (
              <motion.li
                key={t}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + ti * 0.06 }}
                className="rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live ? (
              <Magnetic>
                <Button asChild variant="hero" size="xl">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <span>Live Demo</span> <ArrowUpRight />
                  </a>
                </Button>
              </Magnetic>
            ) : (
              <span className="inline-flex h-12 items-center rounded-full border border-dashed px-6 text-sm text-muted-foreground">
                Demo coming soon
              </span>
            )}
            {project.github && (
              <Magnetic>
                <Button asChild variant="glass" size="xl">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github /> <span>GitHub</span>
                  </a>
                </Button>
              </Magnetic>
            )}
          </div>
        </div>
      </div>
          </article>
        </div>
      </Tilt>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Shot | null>(null);
  return (
    <section id="work" className="dark grain relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div aria-hidden className="absolute -left-40 top-40 size-[40rem] rounded-full bg-sky/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionLabel index="04">Featured Projects</SectionLabel>
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <StaggerText
            as="h2"
            text="Things I've built, and am building."
            className="block max-w-3xl font-display text-4xl font-bold leading-[1.02] md:text-7xl"
          />
          <Reveal>
            <p className="max-w-xs text-muted-foreground">Real screenshots, real links. Tap any image to view it larger.</p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} onOpen={setOpen} flip={i % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="eyebrow text-muted-foreground">More from my resume</p>
          <ul className="mt-6 divide-y border-y">
            {moreProjects.map((p) => (
              <li key={p.title} className="group grid gap-4 py-8 transition-[padding] duration-500 hover:pl-3 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-2xl font-semibold transition-colors duration-500 group-hover:text-primary md:col-span-4">{p.title}</h3>
                <p className="text-muted-foreground md:col-span-5">{p.description}</p>
                <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-auto border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{open?.alt}</DialogTitle>
          {open && <img src={open.src} alt={open.alt} className="mx-auto max-h-[88vh] w-auto rounded-2xl" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

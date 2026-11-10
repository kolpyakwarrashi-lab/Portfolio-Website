import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { moreProjects, projects, type Project, type Shot } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel, StaggerText, useReducedMotion } from "./Reveal";

function ShotButton({ shot, onOpen, className, priority }: { shot: Shot; onOpen: (s: Shot) => void; className?: string; priority?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      className={cn(
        "group/shot relative block overflow-hidden rounded-2xl border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={`View larger: ${shot.alt}`}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.04]"
      />
      <span className="glass absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

function Gallery({ project, onOpen }: { project: Project; onOpen: (s: Shot) => void }) {
  const [main, ...rest] = project.shots;
  if (!main) return null;
  if (rest.length === 0) {
    return <ShotButton shot={main} onOpen={onOpen} className="aspect-[16/10]" />;
  }
  const tall = rest.find((s) => s.ratio === "tall");
  const wides = rest.filter((s) => s.ratio === "wide");
  return (
    <div className="grid grid-cols-3 gap-3">
      <ShotButton shot={main} onOpen={onOpen} className={cn("aspect-[16/10]", tall ? "col-span-2" : "col-span-3")} />
      {tall && <ShotButton shot={tall} onOpen={onOpen} className="col-span-1 h-full" />}
      {wides.length > 0 && (
        <div className={cn("col-span-3 grid gap-3", wides.length > 1 && "sm:grid-cols-2")}>
          {wides.map((s) => (
            <ShotButton key={s.src} shot={s} onOpen={onOpen} className="aspect-[16/9]" />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen, flip }: { project: Project; onOpen: (s: Shot) => void; flip: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[2rem] border bg-card p-4 md:p-6"
    >
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-start", flip && "lg:[&>*:first-child]:order-2")}>
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
          <h3 className="mt-5 font-display text-4xl font-bold md:text-5xl">{project.title}</h3>
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
              {project.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map((t) => (
              <li key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live ? (
              <Button asChild variant="hero" size="xl">
                <a href={project.live} target="_blank" rel="noreferrer">
                  <span>Live Demo</span> <ArrowUpRight />
                </a>
              </Button>
            ) : (
              <span className="inline-flex h-12 items-center rounded-full border border-dashed px-6 text-sm text-muted-foreground">
                Demo coming soon
              </span>
            )}
            {project.github && (
              <Button asChild variant="glass" size="xl">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github /> <span>GitHub</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
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
              <li key={p.title} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-2xl font-semibold md:col-span-4">{p.title}</h3>
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

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Award } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { achievements, certificates } from "@/content/portfolio";
import { SectionLabel, StaggerText, useReducedMotion } from "./Reveal";

export function Achievements() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<(typeof certificates)[number] | null>(null);

  return (
    <section id="achievements" className="bg-background py-28 text-foreground md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel index="05">Achievements & Certifications</SectionLabel>
        <StaggerText
          as="h2"
          text="Milestones along the way."
          className="mt-6 block max-w-3xl font-display text-4xl font-bold leading-[1.02] md:text-6xl"
        />

        <ol className="mt-16 border-t">
          {achievements.map((a, i) => (
            <motion.li
              key={a.title}
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 overflow-hidden border-b py-7 md:grid-cols-[5rem_1fr_14rem_auto] md:py-8"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gradient-brand-soft transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <span className="relative font-display text-sm text-muted-foreground">0{i + 1}</span>
              <div className="relative">
                <h3 className="font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground md:hidden">{a.org}</p>
              </div>
              <p className="relative hidden text-muted-foreground md:block">{a.org}</p>
              <span className="relative flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium">
                <Award className="size-3.5 text-primary" /> {a.detail}
              </span>
            </motion.li>
          ))}
        </ol>

        {certificates.length > 0 && (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <button
                key={c.src}
                type="button"
                onClick={() => setOpen(c)}
                className="group overflow-hidden rounded-3xl border bg-card text-left shadow-soft"
              >
                <img src={c.src} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="flex items-center justify-between p-4 font-medium">
                  {c.title} <ArrowUpRight className="size-4" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          {open && <img src={open.src} alt={open.title} className="max-h-[88vh] w-full rounded-2xl object-contain" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

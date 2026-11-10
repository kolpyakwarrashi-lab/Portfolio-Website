import { motion, useReducedMotion } from "motion/react";
import { Code2, LayoutTemplate, Palette, Sprout, Users, Wrench } from "lucide-react";
import { skillGroups, skillLevelLabel, type SkillLevel } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel, StaggerText } from "./Reveal";

const icons = { code: Code2, layout: LayoutTemplate, wrench: Wrench, palette: Palette, sprout: Sprout, users: Users };

function LevelMeter({ level }: { level: SkillLevel }) {
  return (
    <span className="flex items-center gap-2.5" aria-label={skillLevelLabel[level]}>
      <span className="flex gap-1" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn("h-1.5 w-4 rounded-full", n <= level ? "bg-gradient-brand" : "bg-border")}
          />
        ))}
      </span>
      <span className="w-16 text-right text-xs text-muted-foreground">{skillLevelLabel[level]}</span>
    </span>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <section id="skills" className="bg-background py-28 text-foreground md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="03">Skills & Technologies</SectionLabel>
            <StaggerText
              as="h2"
              text="My toolkit, honestly measured."
              className="mt-6 block max-w-2xl font-display text-4xl font-bold leading-[1.02] md:text-6xl"
            />
          </div>
          <Reveal>
            <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground" aria-label="Level legend">
              {([3, 2, 1] as SkillLevel[]).map((l) => (
                <li key={l} className="flex items-center gap-2">
                  <span className="flex gap-1" aria-hidden>
                    {[1, 2, 3].map((n) => (
                      <span key={n} className={cn("h-1.5 w-3 rounded-full", n <= l ? "bg-gradient-brand" : "bg-border")} />
                    ))}
                  </span>
                  {skillLevelLabel[l]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            const highlight = g.title === "Currently Learning";
            return (
              <motion.article
                key={g.title}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-card p-7 shadow-soft transition-colors duration-500 hover:border-primary/40",
                  highlight && "dark bg-background text-foreground",
                )}
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="relative mt-6 font-display text-xl font-semibold">{g.title}</h3>
                <p className="relative mt-1 text-sm text-muted-foreground">{g.blurb}</p>
                <ul className="relative mt-6 divide-y">
                  {g.skills.map((s) => (
                    <li key={s.name} className="flex items-center justify-between py-3">
                      <span className="font-medium">{s.name}</span>
                      <LevelMeter level={s.level} />
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-brand"
      style={{ scaleX: progress }}
    />
    <nav
      aria-label="Section indicator"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {navLinks.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className="group flex items-center gap-3 py-0.5" aria-label={l.label}>
              <span className="dark glass pointer-events-none translate-x-2 rounded-full px-2.5 py-1 text-xs text-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {l.label}
              </span>
              <motion.span
                className={cn("block w-1.5 rounded-full", active === l.id ? "bg-gradient-brand" : "bg-primary/35 group-hover:bg-primary/70")}
                animate={{ height: active === l.id ? 26 : 6 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <header className="dark fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 text-foreground transition-all duration-500 md:px-6",
          scrolled ? "border bg-background/85 shadow-soft backdrop-blur-xl" : "border border-transparent",
        )}
      >
        <a href="#top" className="font-display text-base font-bold tracking-tight">
          RASHI<span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "group relative inline-block rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 block translate-y-full text-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                  >
                    {l.label}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="hidden px-4 sm:inline-flex">
            <a href={profile.resumeUrl} download={profile.resumeFileName} target="_blank" rel="noopener noreferrer">
              <Download /> <span>Resume</span>
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full glass md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 text-foreground md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-lg hover:bg-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="xl" className="mt-3 w-full">
              <a href={profile.resumeUrl} download={profile.resumeFileName} target="_blank" rel="noopener noreferrer">
                <Download /> <span>Download Resume</span>
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}

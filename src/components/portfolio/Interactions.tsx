import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./Reveal";

/** True only on devices with a real mouse (desktop), after hydration. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/** Pulls its child gently towards the mouse. Inert on touch and with reduced motion. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt that follows the mouse on desktop; flat on touch and with reduced motion. */
export function Tilt({ children, className, max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 20 });
  return (
    <div
      className={cn("[perspective:1400px]", className)}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
        // expose pointer position for spotlight effects inside
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div className="h-full" style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

type CursorMode = "default" | "link" | "label" | "hidden";

/**
 * Soft ring that trails the mouse, grows over links and shows a label over
 * elements with `data-cursor="Label"`. Desktop only; the native cursor stays.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });
  const gx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const gy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (!fine || reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset["cursor"] ?? "");
        return;
      }
      if (el?.closest("input, textarea, select")) return setMode("hidden");
      if (el?.closest("a, button, [role='button'], label")) return setMode("link");
      setMode("default");
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  const size = mode === "label" ? 88 : mode === "link" ? 60 : 36;
  return (
    <>
      {/* Wide soft glow that lags behind */}
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[69]" style={{ x: gx, y: gy }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand blur-2xl"
          animate={{ width: mode === "default" ? 90 : 140, height: mode === "default" ? 90 : 140, opacity: visible && mode !== "hidden" ? 0.35 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </motion.div>
      {/* Trailing ring */}
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70]" style={{ x: sx, y: sy }}>
        <motion.div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-glow",
            mode === "label" ? "border-transparent bg-gradient-brand" : "border-primary/80 bg-primary/10",
          )}
          animate={{ width: size, height: size, opacity: visible && mode !== "hidden" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {mode === "label" && <span className="eyebrow text-[0.62rem] text-primary-foreground">{label}</span>}
        </motion.div>
      </motion.div>
      {/* Precise glowing dot */}
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[71]" style={{ x, y }}>
        <motion.div
          className="size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky shadow-glow"
          animate={{ opacity: visible && mode === "default" ? 1 : 0, scale: mode === "default" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}

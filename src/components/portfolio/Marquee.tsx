import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useReducedMotion } from "./Reveal";

const words = ["Beyond the Code", "HTML", "CSS", "JavaScript", "C", "Learning React", "Building things", "Creative tech"];

function Row({ reverse = false }: { reverse?: boolean }) {
  const row = [...words, ...words];
  return (
    <div
      className={`${reverse ? "marquee-reverse" : "marquee"} flex w-max gap-10 whitespace-nowrap hover:[animation-play-state:paused]`}
    >
      {row.map((w, i) => (
        <span
          key={i}
          className={`flex items-center gap-10 font-display font-medium ${
            reverse ? "text-outline text-5xl md:text-7xl" : "text-3xl text-foreground md:text-4xl"
          }`}
        >
          <span>{w}</span>
          <span className="text-gradient">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewX = useSpring(useTransform(velocity, [-2500, 0, 2500], [12, 0, -12]), { stiffness: 300, damping: 40 });
  return (
    <div className="dark overflow-hidden border-y bg-background py-8 text-foreground" aria-hidden>
      <motion.div className="space-y-4" style={reduce ? {} : { skewX }}>
        <Row />
        <Row reverse />
      </motion.div>
    </div>
  );
}

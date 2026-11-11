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
            reverse ? "text-outline text-4xl md:text-6xl" : "text-2xl text-muted-foreground md:text-3xl"
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
  return (
    <div className="dark space-y-3 overflow-hidden border-y bg-background py-6 text-foreground" aria-hidden>
      <Row />
      <Row reverse />
    </div>
  );
}

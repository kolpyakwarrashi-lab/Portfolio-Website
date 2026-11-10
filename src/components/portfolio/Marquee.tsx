const words = ["Beyond the Code", "HTML", "CSS", "JavaScript", "C", "Learning React", "Building things", "Creative tech"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="dark overflow-hidden border-y bg-background py-5 text-foreground" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-muted-foreground md:text-3xl">
            {w}
            <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

import { ArrowUp, Github, Mail } from "lucide-react";
import { contact, profile } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Interactions";

const socials = [
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail, external: false },
  { label: "GitHub", href: contact.github, icon: Github, external: true },
];

export function Footer() {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 pt-20">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <p className="max-w-xl font-display text-2xl leading-snug md:text-3xl">
            Thanks for scrolling this far. I'm always open to internships, collaborations and a good conversation about code.
          </p>
          <ul className="flex items-center gap-3" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <Magnetic strength={0.4}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass social-icon flex size-12 items-center justify-center rounded-full"
                  >
                    <s.icon className="size-5" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </Reveal>
        <p aria-hidden className="mt-14 select-none text-center font-display text-[18vw] font-bold leading-[0.8] text-outline md:text-[12rem]">
          {"\n"}
        </p>
        <div className="flex flex-col items-center justify-between gap-4 border-t py-8 text-sm text-muted-foreground md:flex-row">
          <p>
            <span>{`© ${new Date().getFullYear()} ${profile.fullName}. ${profile.tagline}`}</span>
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 hover:text-foreground">
            <span>Back to top</span>
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}

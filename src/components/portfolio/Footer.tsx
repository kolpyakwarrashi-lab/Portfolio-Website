import { ArrowUp } from "lucide-react";
import { profile } from "@/content/portfolio";

export function Footer() {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 pt-16">
        <p aria-hidden className="select-none text-center font-display text-[18vw] font-bold leading-[0.8] text-outline md:text-[12rem]">
          KOLPYAKWAR
        </p>
        <div className="flex flex-col items-center justify-between gap-4 border-t py-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {profile.fullName}. {profile.tagline}</p>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-foreground">
            Back to top <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

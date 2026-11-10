import { useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/content/portfolio";
import { buildMailto, validateContact, type ContactInput } from "@/lib/contact";
import { Reveal, SectionLabel, StaggerText } from "./Reveal";

const links = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { label: "LinkedIn", value: "rashi-kolpyakwar", href: contact.linkedin, icon: Linkedin },
  { label: "GitHub", value: "kolpyakwarrashi-lab", href: contact.github, icon: Github },
];

const fieldClass =
  "h-12 rounded-2xl border-input bg-card/60 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring";

export function Contact() {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = validateContact(values);
    if (!r.ok) {
      setErrors(r.errors);
      setSent(false);
      return;
    }
    window.location.href = buildMailto(contact.email, r.data);
    setSent(true);
  };

  return (
    <section id="contact" className="dark grain relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div aria-hidden className="aurora absolute inset-x-0 bottom-0 -z-0 h-2/3 opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-5 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel index="06">Contact</SectionLabel>
          <StaggerText
            as="h2"
            text="Let's create something meaningful."
            className="mt-6 block font-display text-5xl font-bold leading-[0.98] md:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Have an idea, an opportunity, or just want to connect? Let's create something meaningful.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-12 divide-y border-y">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full glass transition-colors group-hover:border-primary/60">
                      <l.icon className="size-4.5" />
                    </span>
                    <span className="flex-1">
                      <span className="eyebrow block text-muted-foreground">{l.label}</span>
                      <span className="mt-1 block font-display text-lg break-all">{l.value}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <form noValidate onSubmit={onSubmit} className="glass rounded-[2rem] p-6 shadow-glow md:p-10">
            <h3 className="font-display text-2xl font-semibold">Send a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">This opens your email app with your message ready to send.</p>

            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" autoComplete="name" value={values.name} onChange={set("name")} placeholder="Your name"
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={fieldClass} />
                {errors.name && <p id="name-err" className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@example.com"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={fieldClass} />
                {errors.email && <p id="email-err" className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} value={values.message} onChange={set("message")} placeholder="Tell me about your idea…"
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
                  className={`${fieldClass} h-auto min-h-36 py-3`} />
                {errors.message && <p id="message-err" className="text-sm text-destructive">{errors.message}</p>}
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="mt-8 w-full">
              {sent ? (
                <span key="sent" className="inline-flex items-center gap-2"><Check /><span>Opening your email app</span></span>
              ) : (
                <span key="send" className="inline-flex items-center gap-2"><span>Send message</span><Send /></span>
              )}
            </Button>
            {sent && (
              <p role="status" className="mt-4 text-center text-sm text-muted-foreground">
                If nothing opened, email me directly at{" "}
                <a className="text-foreground underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

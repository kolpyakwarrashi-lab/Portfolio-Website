import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function validateContact(input: ContactInput) {
  const result = contactSchema.safeParse(input);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false as const, errors };
}

export function buildMailto(to: string, data: ContactInput) {
  const subject = `Portfolio enquiry from ${data.name}`;
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

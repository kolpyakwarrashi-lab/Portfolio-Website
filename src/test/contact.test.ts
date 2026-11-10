import { describe, expect, it } from "vitest";
import { buildMailto, validateContact } from "@/lib/contact";

describe("contact form validation", () => {
  it("rejects an invalid email", () => {
    const r = validateContact({ name: "Asha", email: "not-an-email", message: "Hello there, Rashi!" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeDefined();
  });

  it("requires name, email and message", () => {
    const r = validateContact({ name: "", email: "", message: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("accepts a complete message and addresses the mail to Rashi", () => {
    const r = validateContact({ name: "Asha", email: "asha@example.com", message: "Let's build something together." });
    expect(r.ok).toBe(true);
    if (r.ok) expect(buildMailto("kolpyakwarrashi@gmail.com", r.data)).toMatch(/^mailto:kolpyakwarrashi@gmail\.com\?/);
  });
});

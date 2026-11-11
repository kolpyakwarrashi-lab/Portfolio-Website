import { describe, expect, it } from "vitest";
import { contact } from "@/content/portfolio";

describe("social links", () => {
  it("uses Rashi's exact LinkedIn profile URL", () => {
    expect(contact.linkedin).toBe("https://www.linkedin.com/in/rashi-kolpyakwar-1a364737b/");
  });
});

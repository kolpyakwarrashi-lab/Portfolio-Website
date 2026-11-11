import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { contact } from "@/content/portfolio";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";

const LINKEDIN = "https://www.linkedin.com/in/rashi-kolpyakwar-1a364737b/";

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });
});

describe("LinkedIn links", () => {
  it("uses Rashi's exact LinkedIn profile URL", () => {
    expect(contact.linkedin).toBe(LINKEDIN);
  });

  it.each([
    ["Hero", Hero],
    ["Contact", Contact],
    ["Footer", Footer],
  ])("every LinkedIn link in %s opens the exact profile in a new tab", (_, Section) => {
    const { container } = render(<Section />);
    const links = [...container.querySelectorAll<HTMLAnchorElement>("a[href*='linkedin']")];
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a.getAttribute("href")).toBe(LINKEDIN);
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });
});

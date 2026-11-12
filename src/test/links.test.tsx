import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { contact } from "@/content/portfolio";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Nav } from "@/components/portfolio/Nav";

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

describe("Social links", () => {
  it.each([
    ["Nav", Nav],
    ["Hero", Hero],
    ["Contact", Contact],
    ["Footer", Footer],
  ])("%s has no LinkedIn links", (_, Section) => {
    const { container } = render(<Section />);
    expect(container.querySelectorAll("a[href*='linkedin']").length).toBe(0);
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
  });

  it.each([
    ["Hero", Hero],
    ["Contact", Contact],
    ["Footer", Footer],
  ])("%s keeps the GitHub link", (_, Section) => {
    const { container } = render(<Section />);
    expect(container.querySelector(`a[href='${contact.github}']`)).not.toBeNull();
  });

  it.each([
    ["Contact", Contact],
    ["Footer", Footer],
  ])("%s keeps the email link", (_, Section) => {
    const { container } = render(<Section />);
    expect(container.querySelector(`a[href='mailto:${contact.email}']`)).not.toBeNull();
  });
});

// Smoke tests: every page renders, shortcuts and language switching work, and the mail link is right.
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider } from "../i18n/language";
import { routes } from "../routes";

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>,
  );
  return router;
}

beforeEach(() => {
  localStorage.setItem("lang", "en");
  // jsdom has no scrollTo.
  window.scrollTo = () => {};
});

afterEach(cleanup);

describe("pages", () => {
  it.each([
    ["/", "Hi, I'm Jared Best"],
    ["/about", "About me"],
    ["/resume", "Resume"],
    ["/projects", "Projects"],
    ["/blog", "Blog"],
    ["/blog/1/london-street-orientations", "London Street Orientations"],
    ["/blog/2/ml-agents-setup-with-anaconda", "ML-Agents Setup with Anaconda"],
    ["/blog/3/mapping-ticonderoga", "Mapping Ticonderoga"],
    ["/legal", "Legal notice & privacy"],
    ["/nope", "Page not found"],
    ["/blog/99/missing", "Page not found"],
  ])("%s shows its heading", async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(heading);
  });
});

describe("console", () => {
  it("links the mail button to my address", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute("href", "mailto:me@jaredbest.com");
  });

  it("switches pages with number keys", async () => {
    const router = renderAt("/");
    await userEvent.keyboard("3");
    expect(router.state.location.pathname).toBe("/resume");
  });

  it("sends old /contact links to About", async () => {
    const router = renderAt("/contact");
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent("About me");
    expect(router.state.location.pathname).toBe("/about");
  });

  it("ignores number keys while a dialog is open", async () => {
    const router = renderAt("/about");
    await userEvent.click(screen.getByRole("button", { name: /enlarge photo/i }));
    await userEvent.keyboard("3");
    expect(router.state.location.pathname).toBe("/about");
  });

  it("translates the site to German", async () => {
    renderAt("/about");
    await userEvent.click(screen.getByRole("button", { name: "Deutsch" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Über mich");
    expect(document.documentElement.lang).toBe("de");
  });
});

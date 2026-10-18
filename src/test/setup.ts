// Adds DOM matchers like toBeInTheDocument to Vitest.
import "@testing-library/jest-dom/vitest";

// jsdom has no <dialog> support yet; mimic the "open" attribute that the site relies on.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.removeAttribute("open");
};

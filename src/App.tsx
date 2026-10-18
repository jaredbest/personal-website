// Wires the language provider to the router.
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LanguageProvider } from "./i18n/language";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

export function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

// Every page on the site, all inside the console frame.
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import { Console } from "./components/Console";
import { PageLoading } from "./components/PageLoading";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/Home";
import { Legal } from "./pages/Legal";
import { NotFound } from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Resume } from "./pages/Resume";

// Posts pull in the markdown renderer, charts and map data, so they load on demand.
// Loading inside the console keeps the frame on screen while a post arrives.
const Post = lazy(() => import("./pages/Post").then((module) => ({ default: module.Post })));

export const routes: RouteObject[] = [
  {
    element: <Console />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/resume", element: <Resume /> },
      { path: "/projects", element: <Projects /> },
      { path: "/blog", element: <Blog /> },
      {
        path: "/blog/:id/:slug",
        element: (
          <Suspense fallback={<PageLoading />}>
            <Post />
          </Suspense>
        ),
      },
      { path: "/legal", element: <Legal /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

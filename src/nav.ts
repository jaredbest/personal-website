// The main pages in nav order. Position N is also the number-key shortcut N.
import { BookOpen, FileText, FolderKanban, Home, User, type LucideIcon } from "lucide-react";

export interface NavItem {
  path: string;
  /** Key of the page name in the `nav` UI strings. */
  label: "home" | "about" | "resume" | "projects" | "blog";
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { path: "/", label: "home", icon: Home },
  { path: "/about", label: "about", icon: User },
  { path: "/resume", label: "resume", icon: FileText },
  { path: "/projects", label: "projects", icon: FolderKanban },
  { path: "/blog", label: "blog", icon: BookOpen },
];

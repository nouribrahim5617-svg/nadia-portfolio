/**
 * GitHub Pages serves a project site from /<repo>/, so every URL needs that
 * prefix. Next rewrites it for `next/link` and `next/image` on its own, but not
 * for raw `<video src>`, `<source src>` or `<a href>` pointing at a file in
 * public/. Those go through here.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(publicPath: string) {
  return `${BASE}${publicPath}`;
}

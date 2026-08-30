/**
 * Moves the freshly exported site from out/ to docs/.
 *
 * Runs automatically as part of `npm run build`.
 *
 * Why docs/ and not out/: GitHub Pages can serve straight from a folder on the
 * branch — Settings → Pages → Branch: main, folder: /docs — and the only two
 * folders it will accept are the repo root and /docs. Publishing there means
 * the built index.html is a real, committed file: no build step runs on
 * GitHub, and the site is live the moment the push lands.
 *
 * The trade is that docs/ is generated output under version control, so it is
 * only correct as of the last `npm run build`. After changing anything in
 * app/, components/ or lib/, run the build again and commit docs/ with it, or
 * the published site will still show the previous version.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const OUT = path.join(ROOT, "out");
const DOCS = path.join(ROOT, "docs");

try {
  await fs.access(OUT);
} catch {
  console.error("No out/ directory — did `next build` fail?");
  process.exit(1);
}

// Replace rather than merge: a stale file left behind from a previous build
// would still be served, and that is very hard to notice.
await fs.rm(DOCS, { recursive: true, force: true });
await fs.rename(OUT, DOCS);

// Belt and braces. `public/.nojekyll` should already have been copied into the
// export, but if it ever goes missing GitHub runs Jekyll, Jekyll skips folders
// beginning with an underscore, and the whole _next/ bundle 404s — a failure
// that looks like "the site loads but has no styling".
await fs.writeFile(path.join(DOCS, ".nojekyll"), "");

const count = async (dir) => {
  let n = 0;
  for (const entry of await fs.readdir(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile()) n += 1;
  }
  return n;
};

console.log(`\nPublished ${await count(DOCS)} files to docs/`);
console.log("Commit docs/ along with your source changes to update the live site.");

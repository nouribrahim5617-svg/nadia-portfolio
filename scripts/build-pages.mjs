/**
 * Builds the GitHub Pages variant — the one with the /<repo> path prefix.
 *
 *   npm run build:pages
 *
 * A separate entry point rather than an inline env var in package.json because
 * `FOO= next build` is not valid on Windows cmd, and this repo is worked on
 * from Windows.
 */
import { spawnSync } from "node:child_process";

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, BUILD_TARGET: "pages" },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run("next", ["build"]);
run("node", ["scripts/publish-docs.mjs"]);

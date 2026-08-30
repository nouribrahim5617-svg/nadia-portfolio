/**
 * Opens the built site in your browser, exactly as GitHub Pages will serve it.
 *
 *   npm run preview          (or double-click preview.bat)
 *
 * Why this exists rather than just opening docs/index.html:
 *
 * The pages are built for https://<user>.github.io/<repo>/, so every URL in
 * them starts with "/<repo>/". Opened straight off the disk, the browser reads
 * that as the root of your hard drive — file:///E:/<repo>/... — and the CSS,
 * the JavaScript, the images and the video all 404. You get unstyled text.
 *
 * Rewriting those to relative paths gets most of the way, but Next builds some
 * chunk URLs at runtime rather than writing them into the HTML, so a handful of
 * scripts still fail and parts of the page quietly stop working. There is no
 * version of this app that runs correctly from file:// — it needs an http://
 * origin. So this serves the folder over http on localhost, which takes about
 * as long as opening a file and actually works.
 */
import { exec } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const DOCS = path.join(ROOT, "docs");

if (!fs.existsSync(path.join(DOCS, "index.html"))) {
  console.error("\n  No docs/ folder yet. Run `npm run build` first.\n");
  process.exit(1);
}

/**
 * Read the prefix out of the built HTML rather than out of next.config.ts.
 * Either build variant can be sitting in docs/ — root-relative for Netlify, or
 * /<repo>-prefixed for GitHub Pages — and what matters is what was actually
 * built, not what the config would produce if you rebuilt right now.
 */
const html = fs.readFileSync(path.join(DOCS, "index.html"), "utf8");
const PREFIX = html.match(/(?:src|href)="(\/[^/"][^"]*?)\/_next\//)?.[1] ?? "";

const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let url = decodeURIComponent((req.url ?? "/").split("?")[0]);

  // Serving under the same prefix the pages were built for is the whole point:
  // it is what makes this a faithful preview rather than an approximation.
  if (PREFIX) {
    if (url === PREFIX) url = `${PREFIX}/`;
    if (!url.startsWith(`${PREFIX}/`)) {
      res.writeHead(302, { Location: `${PREFIX}/` });
      return res.end();
    }
    url = url.slice(PREFIX.length);
  }

  let file = path.join(DOCS, url);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  // Keep the served tree inside docs/ even if a request contains "..".
  if (!file.startsWith(DOCS)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  if (!fs.existsSync(file)) {
    const notFound = path.join(DOCS, "404.html");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
  }

  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  const address = `http://localhost:${PORT}${PREFIX}/`;
  console.log(`\n  Nadia Abdel Sater — portfolio preview`);
  console.log(`  Serving docs/ at ${address}`);
  console.log(`  Press Ctrl+C to stop.\n`);

  const open =
    process.platform === "win32"
      ? `start "" "${address}"`
      : process.platform === "darwin"
        ? `open "${address}"`
        : `xdg-open "${address}"`;
  exec(open);
});

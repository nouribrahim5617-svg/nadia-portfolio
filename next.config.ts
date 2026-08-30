import type { NextConfig } from "next";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Where the site is served from.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Netlify (and any custom domain) serves the site from the ROOT of its domain,
 * so URLs need no prefix. That is the default, and what `npm run build`
 * produces.
 *
 *     https://nadia-abdel-sater.netlify.app/
 *     https://nadiaabdelsater.com/
 *
 * GitHub Pages is the exception: a project site lives in a SUBFOLDER named
 * after the repository, so every URL needs that prefix or the CSS, images and
 * video all 404.
 *
 *     https://<user>.github.io/<repo>/
 *
 * For that, run `npm run build:pages` instead, and set REPO below to the
 * repository name. The two builds are not interchangeable — a prefixed build
 * uploaded to Netlify is broken, and vice versa.
 */
const REPO = "nadia-portfolio";

const basePath =
  process.env.NODE_ENV === "development"
    ? ""
    : process.env.BUILD_TARGET === "pages"
      ? `/${REPO}`
      : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Required by `output: "export"` — there is no image server on a static host.
    unoptimized: true,
  },
  env: {
    // lib/asset.ts reads this to prefix raw <video>/<a href> URLs, which Next
    // does not rewrite on its own the way it does for next/link and next/image.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

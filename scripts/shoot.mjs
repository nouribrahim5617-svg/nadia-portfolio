/**
 * Screenshots the running dev server so the layout can be reviewed.
 *
 *   node scripts/shoot.mjs [baseUrl] [outDir]
 *
 * Runs with `prefers-reduced-motion: reduce` emulated. That is not a compromise
 * for convenience — it is the branch where Lenis is off and every Reveal paints
 * its final state immediately, so a screenshot captures the settled layout
 * rather than whatever frame the entry animation happened to be on. It also
 * means these shots double as a check of the reduced-motion experience.
 */
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const base = process.argv[2] ?? "http://localhost:3220";
const outDir = process.argv[3] ?? path.resolve("../.shots");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
  { name: "mobile", width: 390, height: 844, dsf: 2 },
];

const PAGES = [
  {
    url: "/",
    shots: [
      { name: "01-hero", y: 0 },
      { name: "02-about", selector: "#about" },
      { name: "03-about-cv", selector: "#about", extra: 1100 },
      { name: "04-work", selector: "#work" },
      { name: "05-arches", selector: "#work", extra: 420 },
      { name: "06-contact", selector: "#contact" },
    ],
  },
  {
    url: "/projects/the-haven/",
    shots: [
      { name: "10-project-hero", y: 0 },
      { name: "11-project-lead", y: 760 },
      { name: "12-project-text", y: 1500 },
      { name: "13-project-gallery", y: 2900 },
    ],
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({ headless: true });
await fs.mkdir(outDir, { recursive: true });

for (const viewport of VIEWPORTS) {
  for (const pageSpec of PAGES) {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.dsf,
    });

    await page.goto(base + pageSpec.url, { waitUntil: "networkidle2", timeout: 90_000 });
    await wait(1500);

    for (const shot of pageSpec.shots) {
      await page.evaluate(
        ({ selector, y, extra }) => {
          const top = selector
            ? (document.querySelector(selector)?.getBoundingClientRect().top ?? 0) +
              window.scrollY -
              70
            : (y ?? 0);
          window.scrollTo({ top: top + (extra ?? 0), behavior: "instant" });
        },
        shot,
      );
      // Let lazy images decode.
      await wait(1400);
      await page.screenshot({
        path: path.join(outDir, `${viewport.name}-${shot.name}.png`),
      });
      console.log(`${viewport.name}-${shot.name}.png`);
    }

    await page.close();
  }
}

await browser.close();
console.log(`\nWrote to ${outDir}`);

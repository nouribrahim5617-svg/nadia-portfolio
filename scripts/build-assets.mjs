/**
 * Turns the client folder into web assets.
 *
 *   node scripts/build-assets.mjs
 *
 * Source is the parent folder ("Nadia Abdel-Sater") — 103 MB of full-resolution
 * renders, 18 MB portfolio sheets and a 43 MB hero video. None of that can ship
 * to GitHub Pages as-is, so this script:
 *
 *   - resizes every image to a 2000 px long edge (1400 px for portfolio sheets,
 *     which are 9000 px wide and only ever read as a spread) and re-encodes to
 *     mozjpeg q78,
 *   - transcodes the hero video to a muted 1600 px H.264 loop plus a 960 px
 *     mobile cut and a poster frame,
 *   - copies the CV,
 *   - writes lib/media-manifest.ts with real pixel dimensions, so every <img>
 *     reserves its exact box and the page never shifts while loading.
 *
 * Order inside each gallery is a deliberate edit, not folder order: the render
 * that sells the project first, then drawings interleaved so the grid alternates
 * between atmosphere and information.
 */
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const run = promisify(execFile);

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SOURCE = path.resolve(ROOT, "..");
const OUT = path.join(ROOT, "public", "media");

/** Long-edge cap for gallery images. */
const MAX_EDGE = 2000;
/** Portfolio sheets are ~9000 px wide; they only ever read as a whole spread. */
const SHEET_EDGE = 1400;

/* --------------------------------------------------------------------------
   What goes where
-------------------------------------------------------------------------- */

const PROJECTS = [
  {
    slug: "the-haven",
    dir: "01-Project 01",
    hero: ["01-Images/01-Main Shot.jpg", "Courtyard between the housing blocks at dusk, children playing on the path"],
    gallery: [
      ["01-Images/02-Night Shot.jpg", "The housing cluster at night, festoon lights strung between the steel frames"],
      ["01-Images/site analysis.jpg", "Site analysis of Al Laylake: zoning, circulation and the Ghadir river corridor"],
      ["01-Images/03-Render 01.jpg", "Elevated walkway under the prefabricated units"],
      ["01-Images/plan big main.jpg", "Master plan of the compound with its shared agricultural courtyards"],
      ["01-Images/04-Render 02.jpg", "Shared ground level beneath the raised housing blocks"],
      ["01-Images/cluster 3d.jpg", "Cluster 3D assembly: raising structure, hallway, core, unit, partition and shading"],
      ["01-Images/05-Render 03.jpg", "Balconies with their sliding scrap-wood louvres"],
      ["01-Images/unitsplans.jpg", "Unit plans for the 60 m² and 80 m² variants"],
      ["01-Images/06-Render 04.jpg", "Planting beds and circulation through the compound"],
      ["01-Images/explodee.jpg", "Exploded wall and floor build-up, from eco concrete to the hollow steel frame"],
      ["01-Images/sec1.jpg", "Long section through the block showing the elevated steel platform"],
      ["01-Images/elev1.jpg", "Elevation study, louvre colours distinguishing the unit types"],
      ["01-Images/elev2.jpg", "Second elevation study across the cluster"],
      ["01-Images/modulestuff1.jpg", "Module studies: the 9.6 m and 7.8 m prefabricated boxes"],
      ["01-Images/shade 1.jpg", "Shading study for the sliding louvre panels"],
      ["01-Images/shade 2.jpg", "Second shading study across the balcony edge"],
      ["01-Images/ag sig.jpg", "Diagram of agricultural significance and the agro-healing cycle"],
      ["01-Images/cutecrane.jpg", "Off-site construction sequence, modules craned into the steel frame"],
    ],
    sheets: [
      ["02-Template/Sheet 01.jpg", "Portfolio sheet 01 — context and site analysis"],
      ["02-Template/Sheet 02.jpg", "Portfolio sheet 02 — concept and modular strategy"],
      ["02-Template/Sheet 03.jpg", "Portfolio sheet 03 — plans, sections and elevations"],
      ["02-Template/Sheet 04.jpg", "Portfolio sheet 04 — structure and low carbon design"],
    ],
  },
  {
    slug: "narrative-of-jbeil",
    dir: "02-Project 02",
    hero: ["01-Images/main image.jpg", "The design district's perforated copper screen above the garden at Byblos"],
    gallery: [
      ["01-Images/night image.jpg", "The building at night, the screen lit from within"],
      ["01-Images/day n night 2.jpg", "Day and night comparison of the same elevation"],
      ["01-Images/elevations.jpg", "Elevations reading the Bronze Age, Roman and Ottoman periods of Jbeil"],
      ["01-Images/meeting room image.jpg", "Meeting room behind the mashrabiya-like shaders"],
      ["01-Images/project 2 portfolio-single images.jpg", "Concept study for the design district"],
      ["01-Images/project 2 portfolio-single images2.jpg", "Site strategy among the historical landmarks of Byblos"],
      ["01-Images/project 2 portfolio-single images3.jpg", "Plan of the three studios and their creative loop"],
      ["01-Images/project 2 portfolio-single images4.jpg", "Section through the design district"],
      ["01-Images/project 2 portfolio-single images5.jpg", "Studio A — open collaboration space"],
      ["01-Images/project 2 portfolio-single images6.jpg", "Studio B — fabrication labs and materials testing"],
      ["01-Images/project 2 portfolio-single images7.jpg", "Studio C — the virtual reality lab"],
      ["01-Images/project 2 portfolio-single images8.jpg", "Facade detail of the copper screen"],
      ["01-Images/project 2 portfolio-single images9.jpg", "Circulation and wayfinding through the district"],
      ["01-Images/project 2 portfolio-single images10.jpg", "Material study of steel and Byblos stone"],
    ],
    sheets: [],
  },
  {
    slug: "journey-to-utopia",
    dir: "03-Project 03",
    hero: ["01-Images/Image1 render.jpg", "The funicular arch trail in low sun, light patterning the timber deck"],
    gallery: [
      ["01-Images/project 3 portfolio-single images.jpg", "Concept for the temporary art trail on Gouraud Street"],
      ["01-Images/project 3 portfolio-single images2.jpg", "The three sites: the street trail, the main and secondary structures"],
      ["01-Images/project 3 portfolio-single images3.jpg", "Funicular arch geometry meeting the inclined ring beam"],
      ["01-Images/project 3 portfolio-single images4.jpg", "Structural study of the radial arches"],
      ["01-Images/project 3 portfolio-single images5.jpg", "Plan of the trail through Gemmayzeh"],
      ["01-Images/project 3 portfolio-single images6.jpg", "Section through the main structure"],
      ["01-Images/project 3 portfolio-single images7.jpg", "The secondary structure on the adjacent site"],
      ["01-Images/project 3 portfolio-single images8.jpg", "Steel beams spanning across the funicular arches"],
      ["01-Images/project 3 portfolio-single images9.jpg", "Light and shadow study through the arch lattice"],
      ["01-Images/project 3 portfolio-single images10.jpg", "The trail seen from the street"],
    ],
    sheets: [],
  },
  {
    slug: "ephemeral-luminance",
    dir: "01 - Project 04",
    hero: ["01-Images/main image dark.jpg", "The 3 × 3 × 3 m grid structure glowing in the dark, figures beneath it"],
    gallery: [
      ["01-Images/illustration dark.jpg", "Illustration of the illuminated grid and its interchangeable partitions"],
      ["01-Images/narrative 1/big render.jpg", "Narrative one — the maze, light contouring the visitor's path"],
      ["01-Images/narrative 1/small renders.jpg", "The maze — sequence of views towards the garden of light"],
      ["01-Images/narrative 1/plan.jpg", "The maze — plan of the maze-like partition layout"],
      ["01-Images/narrative 1/sections.jpg", "The maze — sections through the grid"],
      ["01-Images/narrative 1/partitions.jpg", "The maze — partition types, including Kahn's circular openings"],
      ["01-Images/narrative 2/big render.jpg", "Narrative two — the legend of Inanna, daylight dimming through the descent"],
      ["01-Images/narrative 2/small renders.jpg", "Inanna — sequence of views through the descent and return"],
      ["01-Images/narrative 2/plans.jpg", "Inanna — plans of the deconstructed cube arrangement"],
      ["01-Images/narrative 2/section.jpg", "Inanna — section through the narrative"],
      ["01-Images/narrative 2/partitions.jpg", "Inanna — partitions after Richard Meier's deconstructed cubes"],
      ["01-Images/narrative 3/big render.jpg", "Narrative three — stability and instability, the breakpoint"],
      ["01-Images/narrative 3/small renders.jpg", "Stability and instability — sequence towards the spiritual oasis"],
      ["01-Images/narrative 3/plan.jpg", "Stability and instability — plan of the fragmented labyrinth"],
      ["01-Images/narrative 3/section.jpg", "Stability and instability — section through the labyrinth"],
      ["01-Images/narrative 3/partitions.jpg", "Stability and instability — thick hollow partitions after Ronchamp"],
      ["01-Images/project 4 pages individual.jpg", "Competition board — concept and parameters"],
      ["01-Images/project 4 pages individual2.jpg", "Competition board — grid structure"],
      ["01-Images/project 4 pages individual3.jpg", "Competition board — materials and light"],
      ["01-Images/project 4 pages individual4.jpg", "Competition board — the maze"],
      ["01-Images/project 4 pages individual5.jpg", "Competition board — the legend of Inanna"],
      ["01-Images/project 4 pages individual6.jpg", "Competition board — stability and instability"],
    ],
    sheets: [["02-Template/project 4 template.jpg", "VELUX competition board, full spread"]],
  },
];

const SINGLES = [
  ["Profile image - white background.png", "portrait.jpg", "Nadia Abdel Sater"],
  ["pattern light.jpg", "pattern-light.jpg", ""],
  ["pattern dark.jpg", "pattern-dark.jpg", ""],
];

/* --------------------------------------------------------------------------
   Helpers
-------------------------------------------------------------------------- */

async function encode(src, dest, maxEdge) {
  const image = sharp(src, { limitInputPixels: false }).rotate();
  const meta = await image.metadata();
  const scale = Math.min(1, maxEdge / Math.max(meta.width, meta.height));
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  await image
    .resize(width, height, { withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(dest);

  return { width, height };
}

async function encodeMany(entries, srcDir, destDir, urlPrefix, maxEdge) {
  const out = [];
  for (const [rel, alt] of entries) {
    const src = path.join(srcDir, rel);
    try {
      await fs.access(src);
    } catch {
      console.warn(`  ! missing, skipped: ${rel}`);
      continue;
    }
    const name = `${String(out.length + 1).padStart(2, "0")}.jpg`;
    const { width, height } = await encode(src, path.join(destDir, name), maxEdge);
    out.push({ src: `${urlPrefix}/${name}`, width, height, alt });
  }
  return out;
}

/* --------------------------------------------------------------------------
   Video
-------------------------------------------------------------------------- */

async function buildVideo() {
  const src = path.join(SOURCE, "project 3 video.mp4");
  try {
    await fs.access(src);
  } catch {
    console.warn("! hero video not found, skipping");
    return null;
  }

  const dir = path.join(OUT, "hero");
  await fs.mkdir(dir, { recursive: true });

  // The source runs 35.7s and ends on a night aerial that dims to black, so a
  // raw loop would snap from near-black back to a bright daytime street. Cut at
  // 34s and fade both ends into black instead — the seam then reads as a
  // deliberate cinematic loop rather than a glitch.
  const DURATION = 34;
  const FADE = 0.9;
  const fade = `fade=t=in:st=0:d=${FADE},fade=t=out:st=${DURATION - FADE}:d=${FADE}`;

  // Muted — it plays as a background loop and autoplay only works silently.
  const common = ["-an", "-t", String(DURATION), "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-r", "30"];

  console.log("  transcoding 1600px…");
  await run(ffmpeg, ["-y", "-i", src, ...common, "-vf", `scale=1600:-2,${fade}`, "-crf", "27", "-preset", "slow", path.join(dir, "hero.mp4")]);

  console.log("  transcoding 960px…");
  await run(ffmpeg, ["-y", "-i", src, ...common, "-vf", `scale=960:-2,${fade}`, "-crf", "30", "-preset", "slow", path.join(dir, "hero-mobile.mp4")]);

  // 15s: dappled arch shadows across the timber deck — mid-tone, so the
  // overlaid name stays legible on the first paint and for reduced motion.
  console.log("  poster frame…");
  await run(ffmpeg, ["-y", "-ss", "15", "-i", src, "-frames:v", "1", "-vf", "scale=1600:-2", "-q:v", "4", path.join(dir, "poster.jpg")]);

  const sizes = await Promise.all(
    ["hero.mp4", "hero-mobile.mp4", "poster.jpg"].map(async (f) => {
      const { size } = await fs.stat(path.join(dir, f));
      return `${f} ${(size / 1024 / 1024).toFixed(1)} MB`;
    }),
  );
  console.log(`  ${sizes.join("  ·  ")}`);

  return {
    mp4: "/media/hero/hero.mp4",
    mobile: "/media/hero/hero-mobile.mp4",
    poster: "/media/hero/poster.jpg",
  };
}

/* --------------------------------------------------------------------------
   Main
-------------------------------------------------------------------------- */

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  const manifest = {};

  for (const project of PROJECTS) {
    const srcDir = path.join(SOURCE, project.dir);
    const destDir = path.join(OUT, project.slug);
    await fs.mkdir(destDir, { recursive: true });

    console.log(`\n${project.slug}`);

    const [heroRel, heroAlt] = project.hero;
    const hero = await encode(path.join(srcDir, heroRel), path.join(destDir, "hero.jpg"), MAX_EDGE);

    const gallery = await encodeMany(project.gallery, srcDir, destDir, `/media/${project.slug}`, MAX_EDGE);

    let sheets = [];
    if (project.sheets.length) {
      const sheetDir = path.join(destDir, "sheets");
      await fs.mkdir(sheetDir, { recursive: true });
      sheets = await encodeMany(project.sheets, srcDir, sheetDir, `/media/${project.slug}/sheets`, SHEET_EDGE);
    }

    manifest[project.slug] = {
      hero: { src: `/media/${project.slug}/hero.jpg`, ...hero, alt: heroAlt },
      gallery,
      sheets,
    };

    console.log(`  hero + ${gallery.length} images + ${sheets.length} sheets`);
  }

  console.log("\nsingles");
  const singles = {};
  for (const [rel, name, alt] of SINGLES) {
    const src = path.join(SOURCE, rel);
    try {
      await fs.access(src);
    } catch {
      console.warn(`  ! missing, skipped: ${rel}`);
      continue;
    }
    const { width, height } = await encode(src, path.join(OUT, name), MAX_EDGE);
    singles[path.parse(name).name] = { src: `/media/${name}`, width, height, alt };
    console.log(`  ${name} ${width}×${height}`);
  }

  console.log("\ncv");
  await fs.copyFile(path.join(SOURCE, "CV-Nadia A4.pdf"), path.join(OUT, "Nadia-Abdel-Sater-CV.pdf"));
  console.log("  Nadia-Abdel-Sater-CV.pdf");

  console.log("\nvideo");
  const video = await buildVideo();

  const body = `// Generated by scripts/build-assets.mjs — do not edit by hand.
// Run \`npm run assets\` after changing the source folder.

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectMedia = {
  hero: Media;
  gallery: Media[];
  sheets: Media[];
};

export const media: Record<string, ProjectMedia> = ${JSON.stringify(manifest, null, 2)};

export const singles: Record<string, Media> = ${JSON.stringify(singles, null, 2)};

export const heroVideo = ${JSON.stringify(video, null, 2)};
`;

  await fs.writeFile(path.join(ROOT, "lib", "media-manifest.ts"), body, "utf8");
  console.log("\nWrote lib/media-manifest.ts");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

# Nadia Abdel Sater — Portfolio

One-page architecture portfolio with a page per project. Built for clients and
scholarship panels: the work reads first, the credentials are one scroll away,
and the CV is one click away from anywhere on the site.

**Stack** — Next.js 16 (App Router, static export) · React 19 · TypeScript ·
Tailwind CSS 4 · Framer Motion · Lenis · shadcn layout conventions.

---

## Running it

```bash
npm install
npm run dev
```

Then <http://localhost:3000>.

## Structure

```
app/
  layout.tsx              skip bar + smooth scroll, wrapped around every page
  page.tsx                the one-pager: hero → about → work → contact
  globals.css             design tokens (her palette) and type classes
  projects/[slug]/        one prerendered page per project
components/
  sections/               hero, about, work, contact, skip-bar, project-view
  ui/                     arch-card, rosewood-blush, words-pull-up, lightbox
  reveal.tsx              the single scroll-entry animation used everywhere
lib/
  content.ts              EVERY WORD ON THE SITE — edit copy here
  media-manifest.ts       generated, do not edit by hand
  asset.ts                prefixes raw public/ URLs with the deploy basePath
scripts/
  build-assets.mjs        source folder → public/media + the manifest
  publish-docs.mjs        moves the export from out/ to docs/ after a build
  build-pages.mjs         the GitHub Pages build variant (prefixed URLs)
  preview.mjs             serves docs/ locally — what preview.bat runs
  shoot.mjs               screenshots the running site for review
preview.bat               double-click to view the built site
docs/                     THE BUILT SITE — committed, this is what you deploy
  index.html                the home page
  projects/<slug>/index.html
  _next/ … media/ …
```

Two files hold everything you would normally want to change:
**`lib/content.ts`** for words, **`scripts/build-assets.mjs`** for which images
appear and in what order.

## Design tokens

Straight off the swatches in `../Color pallete/`:

| Token | Value | Used for |
| --- | --- | --- |
| `paper` | `#edece7` | the page |
| `ink` | `#3b3b3b` | body and display text |
| `ash` | `#66655f` | secondary text, labels, captions |
| `signal` | `#c8756d` | the accent, on dark grounds only |
| `signal-deep` | `#a05244` | the same accent where it sits on paper |
| `hairline` | `#d8d6cf` | rules and dividers |
| `night` | `#1c1b1a` | hero scrim, skip bar, contact panel |

Type is Helvetica for structure and Times for reading — both already on every
device, so the page paints with no web-font request and no layout shift.

## Rebuilding the assets

`public/media` is generated from the client folder one level up and is
**committed to the repo**, because the deploy runner does not have that folder.
Re-run it after adding or replacing source images:

```bash
npm run assets
```

That resizes 103 MB of source renders to a 2000 px long edge (1400 px for the
9000 px portfolio sheets), transcodes the 43 MB hero video to an 8.6 MB desktop
loop and a 2.8 MB mobile one with matched fades so it loops cleanly, copies the
CV, and rewrites `lib/media-manifest.ts` with real pixel dimensions so no image
shifts the layout while it loads. `ffmpeg` comes from `ffmpeg-static` — nothing
to install system-wide.

## Screenshots

With the dev server running:

```bash
node scripts/shoot.mjs http://localhost:3000
```

Writes desktop and mobile shots of every section to `../.shots`.

## Deploying

The built site is the **`docs/`** folder. It is committed, so it is always
present and always deployable.

### Netlify (current setup)

`npm run build` produces a **root-relative** build — the one Netlify needs.

**First deploy, no account required**

1. `npm run build`
2. Open <https://app.netlify.com/drop>
3. Drag the `docs/` folder onto the page

You get a live URL in about thirty seconds. Sign in afterwards to claim the
site, rename it, and attach a custom domain.

**Updating it** — rebuild and drag `docs/` onto the same site's *Deploys* tab.
Or connect the repository to Netlify and let it build on every push;
`netlify.toml` already has the right command and publish directory.

### GitHub Pages (the alternative)

Pages serves a project site from `https://<user>.github.io/<repo>/`, a
subfolder, so it needs a **different build** with that path prefix baked in:

```bash
npm run build:pages
```

Set `REPO` in `next.config.ts` to the repository name first — that is the only
place it appears. Then push, and set **Settings → Pages → Deploy from a branch
→ Branch `main`, folder `/docs`**.

**The two builds are not interchangeable.** A prefixed build uploaded to
Netlify is broken, and a root build on Pages is broken, in both cases with
every asset 404ing. Rebuild when you switch hosts.

### Either way

`docs/` is generated output under version control, so it is only correct as of
the last build. **Edit → `npm run build` → commit both**, or the live site keeps
showing the previous version.

## Viewing the built site

**Double-click `preview.bat`** (or run `npm run preview`). It starts a small
local server and opens the browser at the same kind of URL the host will use.

**Do not open `docs/index.html` by double-clicking it** — you will get unstyled
text. This is worth understanding once, because it looks like a broken build
and is not:

When built for GitHub Pages the URLs carry a `/<repo>` prefix, so opened off
the disk the browser resolves them against the root of your drive and
everything 404s. Even in the root-relative Netlify build the URLs are absolute
(`/media/…`, `/_next/…`), which off the disk means your drive root — same result.

Rewriting those to relative paths fixes most of it but not all: Next builds some
chunk URLs at runtime rather than writing them into the HTML, so a few scripts
still fail and parts of the page quietly stop working. **There is no version of
this site that runs correctly from `file://`** — it needs an `http://` origin.
That is true of any React or Next application, not something specific to this
build. `preview.bat` is the fix, and it takes about as long as opening a file.

For working on the site, `npm run dev` is the right tool — it builds with no
prefix, serves at `http://localhost:3000`, and hot-reloads.

`.nojekyll` (in `public/`, and re-asserted by the publish script) must stay:
without it GitHub Pages runs Jekyll, Jekyll skips directories beginning with
`_`, and the whole `_next/` bundle 404s — which looks like "the site loads but
has no styling".

## Notes on the content

- Spelling slips in the source documents ("Bacholar in Architactural
  Engineering", "hollow steal columns", "conventual") are corrected in
  `lib/content.ts`. Her phrasing and emphasis are untouched.
- Her phone number is deliberately **not** on the page — it stays in the CV PDF,
  which is linked for download. The site shows email and the three accounts.
- Alt text is written per image and lives beside the filename in
  `scripts/build-assets.mjs`, so it survives a re-run of the pipeline.

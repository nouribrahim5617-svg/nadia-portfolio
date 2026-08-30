import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    // docs/ and out/ are build output — minified bundles, not source to lint.
    ignores: [".next/**", "out/**", "docs/**", "node_modules/**", "lib/media-manifest.ts"],
  },
  {
    rules: {
      // The gallery, hero and arch cards deliberately use plain <img>/<video>:
      // the export is static with `images.unoptimized`, so next/image would add
      // a component layer without doing any optimisation, and the generated
      // manifest already supplies real width/height for every file.
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;

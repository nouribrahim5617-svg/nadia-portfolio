/**
 * GradientBackground — "Rosewood Blush", originally made with the 21st.dev
 * Gradient Builder and exported as live CSS (the builder's Copy-CSS background
 * plus its soften-blur pass). Remix the source recipe here:
 * https://21st.dev/community/gradients/editor?from=803856e1-f722-4990-b966-32738d184dd9
 *
 * The stops are retuned from the builder's default rosewood to Nadia's own
 * swatches — #c8756d signature, #edece7 off white — with two mid tones lifted
 * off her renders so the wash sits in the same family as the work it backs.
 *
 * Zero dependencies: one <div> that fills its parent.
 *   <div className="relative h-96">
 *     <GradientBackground className="absolute inset-0" />
 *   </div>
 */
export function GradientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        containerType: "size",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-0.8cqmin",
          filter: "blur(0.4cqmin)",
          backgroundColor: "#c8756d",
          backgroundImage: [
            "radial-gradient(circle at 65.68% 46.6%, rgba(237, 236, 231, 1) 0%, rgba(237, 236, 231, 0) 39.7%)",
            "radial-gradient(circle at 28.5% 72.47%, rgba(227, 205, 191, 1) 0%, rgba(227, 205, 191, 0) 51.25%)",
            "radial-gradient(circle at 52.7% 17.67%, rgba(217, 155, 140, 1) 0%, rgba(217, 155, 140, 0) 63.15%)",
            "radial-gradient(circle at 78.79% 84.35%, rgba(200, 117, 109, 1) 0%, rgba(200, 117, 109, 0) 74.7%)",
          ].join(", "),
        }}
      />
    </div>
  );
}

export default GradientBackground;

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Segment = {
  text: string;
  className?: string;
};

/**
 * Words rise into place one after another the first time the line scrolls into
 * view. Split by word rather than character: at the display sizes used here a
 * per-letter stagger reads as a slot machine, a per-word one reads as a line
 * being set.
 */
export function WordsPullUp({
  text,
  className = "",
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <WordsPullUpMultiStyle
      segments={[{ text }]}
      className={className}
      delay={delay}
      style={style}
    />
  );
}

/**
 * Same animation, but each segment can carry its own classes — which is how
 * "Let's make Dialogue" gets its grey sans lead and italic serif accent while
 * still animating as one continuous line.
 */
export function WordsPullUpMultiStyle({
  segments,
  className = "",
  delay = 0,
  style,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    segment.text.split(" ").forEach((word) => {
      if (word) words.push({ word, className: segment.className });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((entry, index) => (
        <span
          key={`${entry.word}-${index}`}
          // The clip has to sit on a wrapper: animating y on the word itself
          // with overflow-hidden on the same element clips the descenders.
          className="inline-block overflow-hidden"
          style={{ marginRight: index === words.length - 1 ? 0 : "0.26em" }}
        >
          <motion.span
            className={`inline-block ${entry.className ?? ""}`}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: delay + index * 0.07,
              ease: EASE,
            }}
          >
            {entry.word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

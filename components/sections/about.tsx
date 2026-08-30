"use client";

import { Reveal } from "@/components/reveal";
import { GradientBackground } from "@/components/ui/rosewood-blush";
import { WordsPullUpMultiStyle } from "@/components/ui/words-pull-up";
import { asset } from "@/lib/asset";
import {
  competitions,
  education,
  experience,
  languages,
  profile,
  software,
} from "@/lib/content";
import { singles } from "@/lib/media-manifest";

/** Section heading, used here and by the work and contact sections. */
function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-hairline pb-4">
      <span className="type-label text-signal-deep">{index}</span>
      <h2 className="type-display text-[9vw] leading-none sm:text-[6vw] lg:text-[4.2vw]">
        {title}
      </h2>
    </div>
  );
}

export { SectionHead };

export function About() {
  const portrait = singles.portrait;

  return (
    <section id="about" className="relative px-[var(--gutter)] py-24 sm:py-32">
      {/* Her leaf pattern, the same one printed behind the portrait on the CV,
          washed back so the paper has texture instead of reading as flat CSS. */}
      <div
        aria-hidden
        className="pattern-wash pointer-events-none absolute inset-0"
        style={{ "--pattern-url": `url(${asset(singles["pattern-light"]?.src ?? "")})` } as React.CSSProperties}
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHead index="01" title="About" />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait, cut to the same arch as the project cards and floated on
              a wash of the signature colour. */}
          <Reveal className="lg:col-span-4" y={36}>
            <div className="relative mx-auto max-w-[340px] lg:mx-0 lg:max-w-none">
              <div className="mask-arch absolute -inset-3 overflow-hidden opacity-90">
                <GradientBackground className="h-full w-full" />
              </div>
              <div className="mask-arch relative aspect-[3/4.6] overflow-hidden bg-hairline">
                {portrait ? (
                  <img
                    src={asset(portrait.src)}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : null}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="type-display text-[6.5vw] leading-[0.95] sm:text-[4.2vw] lg:text-[3vw]">
                <WordsPullUpMultiStyle
                  segments={[
                    { text: "Let's make", className: "text-ink" },
                    { text: "Dialogue", className: "type-accent text-signal-deep" },
                  ]}
                />
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="type-body mt-8 max-w-[62ch] text-ink/85">{profile.statement}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <div>
                  <dt className="type-label text-ash">Education</dt>
                  <dd className="mt-4 space-y-5">
                    {education.map((entry) => (
                      <div key={entry.school}>
                        <p className="type-label text-signal-deep">{entry.period}</p>
                        <p className="type-body mt-1 leading-snug text-ink">{entry.school}</p>
                        {entry.lines.map((line) => (
                          <p key={line} className="type-body text-[0.95rem] leading-snug text-ash">
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className="type-label text-ash">Languages</dt>
                  <dd className="mt-4 space-y-3">
                    {languages.map((language) => (
                      <div key={language.name} className="flex items-center justify-between gap-4">
                        <span className="type-body text-ink">{language.name}</span>
                        <span className="flex gap-1.5" aria-hidden>
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={
                                index < language.level
                                  ? "h-1.5 w-1.5 rounded-full bg-signal"
                                  : "h-1.5 w-1.5 rounded-full bg-hairline"
                              }
                            />
                          ))}
                        </span>
                        <span className="sr-only">{language.level} out of 5</span>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Experience and competitions, side by side the way her CV sets them. */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="type-label border-b border-hairline pb-3 text-ash">Experience</h3>
            <ol className="mt-6 space-y-7">
              {experience.map((entry) => (
                <li key={entry.org} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-5">
                  <p className="type-label pt-1 text-signal-deep">{entry.period}</p>
                  <div>
                    <p className="type-body leading-snug text-ink">{entry.org}</p>
                    <p className="type-label mt-1 text-ash">{entry.role}</p>
                    <p className="type-body mt-2 text-[0.95rem] leading-snug text-ink/80">
                      {entry.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="type-label border-b border-hairline pb-3 text-ash">Competitions</h3>
            <ol className="mt-6 space-y-7">
              {competitions.map((entry) => (
                <li key={entry.name} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-5">
                  <p className="type-label pt-1 text-signal-deep">{entry.year}</p>
                  <div>
                    <p className="type-body leading-snug text-ink">{entry.name}</p>
                    <p className="type-body mt-2 text-[0.95rem] leading-snug text-ink/80">
                      {entry.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-24">
            <h3 className="type-label border-b border-hairline pb-3 text-ash">Software</h3>
            <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {software.map((group) => (
                <div key={group.group}>
                  <p className="type-label text-signal-deep">{group.group}</p>
                  <p className="type-body mt-2 text-[0.95rem] leading-relaxed text-ink/80">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;

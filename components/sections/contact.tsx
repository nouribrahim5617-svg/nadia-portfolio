"use client";

import { Reveal } from "@/components/reveal";
import { GradientBackground } from "@/components/ui/rosewood-blush";
import { WordsPullUpMultiStyle } from "@/components/ui/words-pull-up";
import { asset } from "@/lib/asset";
import { profile } from "@/lib/content";

/**
 * Closing section. Her phone number stays in the CV PDF rather than on a
 * crawlable page — email and the three accounts are the routes in.
 */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-night text-paper">
      {/* The blush is masked back to one corner rather than washed flat across
          the whole panel — at full spread it only ever averaged out to mud
          against the night ground. Anchored bottom-right it stays a light
          source, and the type keeps a clean dark field to sit on. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-55 [mask-image:radial-gradient(115%_95%_at_100%_100%,#000_0%,transparent_62%)]"
      >
        <GradientBackground className="h-full w-full" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-[var(--gutter)] py-24 sm:py-32">
        <Reveal>
          <div className="flex items-baseline gap-4 border-b border-paper/20 pb-4">
            <span className="type-label text-signal">03</span>
            <h2 className="type-display text-[9vw] leading-none sm:text-[6vw] lg:text-[4.2vw]">
              Contact
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="type-display mt-16 text-[11vw] leading-[0.92] sm:text-[8vw] lg:text-[6vw]">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Let's make", className: "text-paper" },
                { text: "Dialogue", className: "type-accent text-signal" },
              ]}
            />
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.05}>
            <p className="type-label text-paper/50">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-wipe type-body mt-3 inline-block break-all text-paper transition-colors hover:text-signal"
            >
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="type-label text-paper/50">Based in</p>
            <p className="type-body mt-3 text-paper/80">{profile.location}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="type-label text-paper/50">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe type-body text-paper transition-colors hover:text-signal"
                  >
                    {social.label}
                    <span className="type-label ml-2 text-paper/40">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-label text-paper/50">Curriculum vitae</p>
            <a
              href={asset(profile.cv)}
              download
              className="type-label mt-3 inline-flex items-center gap-3 rounded-full bg-signal px-5 py-3 text-paper transition-opacity hover:opacity-85"
            >
              Download CV
              <span aria-hidden>↓</span>
            </a>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-paper/20 pt-6">
          <p className="type-label text-paper/40">
            {profile.name} — {profile.credential}
          </p>
          <p className="type-label text-paper/40">
            © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}

export default Contact;

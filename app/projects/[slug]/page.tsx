import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/sections/project-view";
import { projects } from "@/lib/content";

type Params = { slug: string };

/** Every project page is prerendered at build time — `output: "export"` has no
 *  server to fall back to for a slug it has not seen. */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};

  const title = project.subtitle
    ? `${project.title}: ${project.subtitle}`
    : project.title;

  return {
    title,
    description: `${project.programme}, ${project.place}. ${project.blurb}`,
    openGraph: { title, description: project.blurb },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  return (
    <ProjectView
      project={projects[index]}
      next={projects[(index + 1) % projects.length]}
    />
  );
}

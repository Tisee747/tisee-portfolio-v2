"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { projectsData } from "@/data/portfolioData";

const FILTERS = ["All", "Web", "Mobile", "AI/ML", "Backend"];

function getProjectCategory(project: (typeof projectsData)[number]) {
  if (project.projectLayout === "none") return "Backend";
  if (project.projectLayout === "mobile") return "Mobile";
  if (project.projectLayout === "hybrid") return "Fullstack";
  return "Web";
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Backend" && project.projectLayout === "none") return true;
    if (activeFilter === "Web" && project.projectLayout === "web") return true;
    if (activeFilter === "Mobile" && project.projectLayout === "mobile") return true;
    if (activeFilter === "AI/ML") {
      return project.technologies?.some((technology) =>
        ["Python", "OpenCV", "TensorFlow", "LLM", "AI", "ML"].includes(technology),
      );
    }
    return false;
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-6 pb-24 pt-28 selection:bg-blue-100 selection:text-blue-900 sm:pt-32 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <FadeIn className="mb-12 flex flex-col gap-8 border-b border-zinc-200 pb-12 sm:mb-16 sm:pb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Selected work
            </p>
            <h1 className="text-5xl font-medium tracking-tighter text-zinc-900 md:text-7xl">
              Project Archive
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-500 md:text-lg">
              A concise look at the products, experiments, and systems I&apos;ve worked on.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:max-w-[430px] md:justify-end" role="group" aria-label="Filter projects">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:px-5",
                  activeFilter === filter
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mb-5 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          <span>Work</span>
          <span>{filteredProjects.length} projects</span>
        </div>

        <div className="border-t border-zinc-200">
          {filteredProjects.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={0.05}
              className="grid gap-5 border-b border-zinc-200 py-7 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:gap-x-8 md:py-8"
            >
              <div className="text-sm font-medium tabular-nums text-zinc-400">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="min-w-0 text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
                    {project.title}
                  </h2>
                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                    {getProjectCategory(project)}
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-base">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.technologies ?? []).map((technology) => (
                    <span
                      key={technology}
                      className="whitespace-nowrap rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-start gap-2 md:max-w-[180px] md:justify-end">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                  >
                    Repository
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                  >
                    Live demo
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {!project.repoUrl && !project.demoUrl && (
                  <span className="inline-flex min-h-11 items-center text-sm text-zinc-400">
                    No public link
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { projectsData } from "@/data/portfolioData";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "AI/ML", "Backend"];

function projectCategory(layout?: string) {
  if (layout === "none") return "Backend";
  if (layout === "mobile") return "Mobile";
  if (layout === "hybrid") return "Web / Mobile";
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
      return project.technologies?.some((tech) => ["Python", "OpenCV", "TensorFlow", "LLM", "AI", "ML"].includes(tech));
    }
    return false;
  });

  return (
    <main className="min-h-screen bg-white px-6 pb-28 pt-36 selection:bg-blue-100 selection:text-blue-900 md:px-12 md:pt-40">
      <div className="mx-auto w-full max-w-6xl">
        <FadeIn className="mb-12 border-b border-zinc-200 pb-10 md:mb-16 md:pb-12">
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-600">Archive</div>
          <h1 className="text-5xl font-semibold tracking-[-0.055em] text-zinc-900 md:text-7xl">Technical Projects</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
            A complete collection of web, mobile, backend, and applied AI work.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeFilter === filter
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="border-t border-zinc-200">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={Math.min(index * 0.025, 0.16)}>
              <article className="group grid gap-5 border-b border-zinc-200 py-7 transition-colors hover:bg-zinc-50/70 md:grid-cols-[64px_minmax(0,1fr)_180px] md:items-center md:gap-6 md:px-2">
                <div className="text-xs font-medium tabular-nums text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="text-lg font-semibold tracking-[-0.025em] text-zinc-900 md:text-xl">{project.title}</h2>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                      {projectCategory(project.projectLayout)}
                    </span>
                  </div>

                  <p className="max-w-4xl text-sm leading-6 text-zinc-500 md:text-[15px]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech) => (
                      <span key={tech} className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:justify-end">
                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      Code ↗
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-zinc-900 transition-transform group-hover:translate-x-0.5"
                    >
                      Live ↗
                    </Link>
                  )}
                  {!project.repoUrl && !project.demoUrl && <span className="text-xs text-zinc-300">—</span>}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-sm text-zinc-400">No projects in this filter yet.</div>
        )}
      </div>
    </main>
  );
}

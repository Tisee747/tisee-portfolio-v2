"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import SectionArtwork from "@/components/SectionArtwork";
import { cn } from "@/lib/utils";
import { projectsData } from "@/data/portfolioData";
import type { ProjectCategory } from "@/types";

const FILTERS = ["All", "Web", "Mobile", "Fullstack", "AI/ML", "Backend"] as const;
type ProjectFilter = (typeof FILTERS)[number];

const TECHNOLOGY_ICONS: Record<string, string> = {
  "Next.js": "/images/tech/simple-icons/nextdotjs.svg",
  React: "/images/tech/simple-icons/react.svg",
  TypeScript: "/images/tech/simple-icons/typescript.svg",
  TailwindCSS: "/images/tech/simple-icons/tailwindcss.svg",
  "Tailwind CSS": "/images/tech/simple-icons/tailwindcss.svg",
  Laravel: "/images/tech/simple-icons/laravel.svg",
  Flutter: "/images/tech/simple-icons/flutter.svg",
  PHP: "/images/tech/simple-icons/php.svg",
  Dart: "/images/tech/simple-icons/dart.svg",
  Java: "/images/tech/simple-icons/openjdk.svg",
  "Spring Boot": "/images/tech/simple-icons/springboot.svg",
  Python: "/images/tech/simple-icons/python.svg",
  Streamlit: "/images/tech/simple-icons/streamlit.svg",
  OpenCV: "/images/tech/simple-icons/opencv.svg",
  LangChain: "/images/tech/simple-icons/langchain.svg",
  PostgreSQL: "/images/tech/simple-icons/postgresql.svg",
  FastAPI: "/images/tech/simple-icons/fastapi.svg",
  Groq: "/images/tech/groq.svg",
  "Groq AI": "/images/tech/groq.svg",
};

function getProjectCategory(project: (typeof projectsData)[number]): ProjectCategory {
  return project.category ?? project.categories[0] ?? "Backend";
}

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M2.5 5.25H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 5.25H15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="5.25" r="1.55" stroke="currentColor" strokeWidth="1.35" />
      <path d="M2.5 12.75H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 12.75H15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12.75" r="1.55" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M3.25 7.75L6.15 10.45L11.85 4.75"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M4 10L10 4M10 4H5.5M10 4V8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FallbackTechnologyIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M5.5 4.5L2.5 8L5.5 11.5M10.5 4.5L13.5 8L10.5 11.5M9 3.5L7 12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TechnologyIcon({ technology }: { technology: string }) {
  const iconPath = TECHNOLOGY_ICONS[technology];

  if (!iconPath) return <FallbackTechnologyIcon />;

  return (
    <img
      src={iconPath}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="h-[15px] w-[15px] shrink-0 object-contain"
    />
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isFilterOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!filterMenuRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
        filterTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen]);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.categories.includes(activeFilter);
  });

  const selectFilter = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setIsFilterOpen(false);
    filterTriggerRef.current?.focus();
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white px-6 pb-24 pt-28 selection:bg-blue-100 selection:text-blue-900 sm:pt-32 md:px-12">
      <SectionArtwork variant="archive" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <FadeIn className="flex flex-col gap-4 border-b border-zinc-100 pb-6 sm:gap-5 sm:pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              All time work
            </p>
            <h1 className="text-5xl font-medium tracking-tighter text-zinc-950 md:text-7xl">
              Project Archive
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-950 md:text-lg">
              A concise look at the products, experiments, and systems I&apos;ve worked on.
            </p>
          </div>

          <div ref={filterMenuRef} className="relative flex justify-end">
            <button
              ref={filterTriggerRef}
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isFilterOpen}
              aria-controls="project-filter-menu"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-950 shadow-[0_1px_2px_rgba(24,24,27,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-[0_8px_22px_rgba(24,24,27,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 active:translate-y-px sm:min-h-11 sm:gap-2.5 sm:rounded-full sm:px-4 sm:text-sm"
            >
              <FilterIcon />
              <span>{activeFilter === "All" ? "Filter" : activeFilter}</span>
            </button>

            {isFilterOpen && (
              <div
                id="project-filter-menu"
                role="menu"
                aria-label="Filter projects"
                className="absolute right-0 top-[calc(100%+0.625rem)] z-30 w-44 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-[0_18px_48px_rgba(24,24,27,0.13)] sm:w-48"
              >
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => selectFilter(filter)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
                        isActive ? "bg-zinc-100 text-zinc-950" : "text-zinc-950 hover:bg-zinc-50",
                      )}
                    >
                      <span>{filter}</span>
                      <span className={cn("text-zinc-950", !isActive && "invisible")}>
                        <CheckIcon />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>

        <div>
          {filteredProjects.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={0.04}
              className="grid gap-5 border-b border-zinc-100 py-7 md:grid-cols-[3rem_190px_minmax(0,1fr)_auto] md:gap-x-7 md:py-8"
            >
              <div className="text-sm font-medium tabular-nums text-zinc-950">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 md:aspect-[4/3]">
                {project.images?.[0] ? (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} project screenshot`}
                    fill
                    sizes="(min-width: 768px) 190px, 92vw"
                    className="object-contain p-1.5 sm:p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center text-xs text-zinc-500">
                    No project image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="min-w-0 text-2xl font-medium tracking-tight text-zinc-950 md:text-3xl">
                    {project.title}
                  </h2>
                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                    {getProjectCategory(project)}
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-zinc-950 md:text-base">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.technologies ?? []).map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex min-h-8 items-center gap-2 whitespace-nowrap rounded-lg border border-zinc-100 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-950"
                    >
                      <TechnologyIcon technology={technology} />
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
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-100 bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                  >
                    Repository
                    <ExternalArrowIcon />
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
                    <ExternalArrowIcon />
                  </a>
                )}
                {!project.repoUrl && !project.demoUrl && (
                  <span className="inline-flex min-h-11 items-center text-sm text-zinc-950">
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

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/portfolioData";
import { FadeIn } from "@/components/FadeIn";

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const selectedProjects = useMemo(
    () => projectsData.filter((project) => project.images && project.images.length > 0).slice(0, 6),
    []
  );

  useEffect(() => {
    if (isHovered || selectedProjects.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedProjects.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, [isHovered, selectedProjects.length]);

  const goTo = (index: number) => {
    setCurrentIndex((index + selectedProjects.length) % selectedProjects.length);
  };

  const previousIndex = (currentIndex - 1 + selectedProjects.length) % selectedProjects.length;
  const nextIndex = (currentIndex + 1) % selectedProjects.length;
  const activeProject = selectedProjects[currentIndex];
  const previousProject = selectedProjects[previousIndex];
  const nextProject = selectedProjects[nextIndex];
  const activeHref = activeProject.demoUrl || activeProject.repoUrl || "/projects";
  const activeExternal = Boolean(activeProject.demoUrl || activeProject.repoUrl);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden border-t border-zinc-100 bg-white py-24 md:py-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <FadeIn className="mb-14 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-600">Selected work</div>
            <h2 className="text-5xl font-semibold tracking-[-0.055em] text-zinc-900 md:text-7xl">Work Gallery</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg">
              A rotating selection of systems, apps, and applied AI projects I’ve built.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-900 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white"
          >
            View More Projects
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="relative h-[300px] sm:h-[390px] md:h-[470px]">
            <button
              type="button"
              onClick={() => goTo(previousIndex)}
              className="absolute left-[-18%] top-1/2 z-10 h-[56%] w-[58%] -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 opacity-45 shadow-sm transition-all duration-700 hover:opacity-65 sm:left-[-10%] sm:h-[60%] sm:w-[48%] md:left-[-2%] md:h-[62%] md:w-[40%]"
              aria-label={`Show ${previousProject.title}`}
            >
              <Image src={previousProject.images![0]} alt="" fill className="object-contain p-4" />
            </button>

            <Link
              href={activeHref}
              target={activeExternal ? "_blank" : undefined}
              rel={activeExternal ? "noopener noreferrer" : undefined}
              className="group absolute left-1/2 top-1/2 z-30 h-[78%] w-[76%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.10)] transition-all duration-700 hover:-translate-y-[52%] sm:w-[68%] md:h-[82%] md:w-[52%]"
              aria-label={`Open ${activeProject.title}`}
            >
              <div className="relative h-full w-full bg-zinc-50 p-4 md:p-7">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
                  <Image
                    key={activeProject.id}
                    src={activeProject.images![0]}
                    alt={`${activeProject.title} preview`}
                    fill
                    priority={currentIndex === 0}
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              className="absolute right-[-18%] top-1/2 z-10 h-[56%] w-[58%] -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 opacity-45 shadow-sm transition-all duration-700 hover:opacity-65 sm:right-[-10%] sm:h-[60%] sm:w-[48%] md:right-[-2%] md:h-[62%] md:w-[40%]"
              aria-label={`Show ${nextProject.title}`}
            >
              <Image src={nextProject.images![0]} alt="" fill className="object-contain p-4" />
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.18} className="mx-auto mt-4 max-w-4xl text-center md:mt-8">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-600">
            {activeProject.projectLayout === "none" ? "Backend" : activeProject.projectLayout || "Project"}
          </div>
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-zinc-900 md:text-4xl">{activeProject.title}</h3>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-zinc-500 md:text-base">
            {activeProject.description}
          </p>

          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => goTo(previousIndex)}
              className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              aria-label="Previous project"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {selectedProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-7 bg-zinc-900" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Show ${project.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

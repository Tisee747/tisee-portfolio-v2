"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { projectsData } from "@/data/portfolioData";
import type { Project } from "@/types";

const featuredProjects = projectsData
  .filter((project) => project.demoUrl || project.repoUrl)
  .slice(0, 4);

function getProjectHref(project: Project) {
  return project.demoUrl ?? project.repoUrl ?? "/projects";
}

function getProjectCategory(project: Project) {
  if (project.projectLayout === "none") return "Backend";
  if (project.projectLayout === "mobile") return "Mobile";
  if (project.projectLayout === "hybrid") return "Fullstack";
  return "Web";
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="flex h-full min-h-[250px] w-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 p-3 text-left shadow-sm transition-transform duration-500 group-hover:-translate-y-1 sm:p-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 260px, 30vw"
            className="object-contain opacity-60"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="mt-auto px-1 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {getProjectCategory(project)}
        </p>
        <p className="mt-2 line-clamp-2 text-base font-medium tracking-tight text-zinc-700">
          {project.title}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeProject = featuredProjects[currentIndex];
  const previousProject = featuredProjects[
    (currentIndex - 1 + featuredProjects.length) % featuredProjects.length
  ];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  useEffect(() => {
    if (
      featuredProjects.length < 2 ||
      shouldReduceMotion ||
      isPaused ||
      isPointerOver ||
      isFocused
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isFocused, isPaused, isPointerOver, shouldReduceMotion]);

  const showNext = () => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
  };

  const showPrevious = () => {
    setCurrentIndex(
      (previousIndex) => (previousIndex - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  if (!activeProject) return null;

  return (
    <section
      id="projects"
      className="relative flex w-full flex-col justify-center overflow-hidden border-t border-zinc-100 bg-white py-24"
    >
      {/* Decorative background for Projects */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="plus-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 25 V35 M25 30 H35" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plus-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <FadeIn className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              A few things I&apos;ve built
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl">
              Work Gallery
            </h2>
          </div>
          <p className="text-sm text-zinc-400 sm:pb-1">
            {String(currentIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured work gallery"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPrevious();
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                showNext();
              }
            }}
            onPointerEnter={() => setIsPointerOver(true)}
            onPointerLeave={() => setIsPointerOver(false)}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                setIsFocused(false);
              }
            }}
            className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
          >
            <div className="relative flex min-h-[470px] items-center justify-center px-4 py-6 sm:min-h-[520px] sm:px-8 sm:py-10">
              <button
                type="button"
                onClick={showPrevious}
                aria-label={`Show previous project: ${previousProject.title}`}
                className="group absolute left-[-12%] top-1/2 hidden h-[72%] w-[28%] -translate-y-1/2 text-left opacity-60 transition-opacity hover:opacity-80 focus-visible:z-20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:flex lg:left-[-4%] lg:w-[24%]"
              >
                <ProjectPreview project={previousProject} />
              </button>

              <Link
                href={getProjectHref(activeProject)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${activeProject.title} ${activeProject.demoUrl ? "live demo" : "repository"}`}
                className="group relative z-10 flex w-full max-w-[700px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.1)] transition-shadow duration-500 hover:shadow-[0_22px_70px_rgba(24,24,27,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:w-[76%] lg:w-[58%]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-100 bg-zinc-50 sm:aspect-[16/10]">
                  {activeProject.images?.[0] ? (
                    <Image
                      src={activeProject.images[0]}
                      alt={activeProject.title}
                      fill
                      sizes="(min-width: 1024px) 700px, 92vw"
                      className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:p-8"
                      priority={currentIndex === 0}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      No image available
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-5 sm:p-8">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                      {getProjectCategory(activeProject)}
                    </span>
                    <span className="shrink-0 text-xs font-medium text-zinc-400">
                      {activeProject.demoUrl ? "Live demo" : "Repository"}
                      <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
                    {activeProject.description}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={showNext}
                aria-label={`Show next project: ${nextProject.title}`}
                className="group absolute right-[-12%] top-1/2 hidden h-[72%] w-[28%] -translate-y-1/2 text-left opacity-60 transition-opacity hover:opacity-80 focus-visible:z-20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:flex lg:right-[-4%] lg:w-[24%]"
              >
                <ProjectPreview project={nextProject} />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-6 flex items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-0.5 sm:gap-1" aria-label="Choose a project">
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show ${project.title}`}
                aria-current={currentIndex === index ? "true" : undefined}
                className="flex h-11 min-w-7 flex-1 items-center justify-center rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                <span
                  className={`block h-1.5 w-full max-w-12 rounded-full transition-colors duration-300 ${
                    currentIndex === index
                      ? "bg-zinc-900"
                      : "bg-zinc-200 hover:bg-zinc-400"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            disabled={Boolean(shouldReduceMotion)}
            aria-pressed={Boolean(shouldReduceMotion) || isPaused}
            aria-label={
              shouldReduceMotion
                ? "Autoplay disabled because reduced motion is enabled"
                : isPaused
                  ? "Resume autoplay"
                  : "Pause autoplay"
            }
            title={
              shouldReduceMotion
                ? "Autoplay disabled because reduced motion is enabled"
                : isPaused
                  ? "Resume autoplay"
                  : "Pause autoplay"
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:w-auto sm:gap-2 sm:px-3"
          >
            {isPaused || shouldReduceMotion ? (
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 2.75L10 7L4 11.25V2.75Z" fill="currentColor" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 3V11M10 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span className="hidden text-xs font-medium sm:inline">
              {shouldReduceMotion ? "Motion off" : isPaused ? "Play" : "Pause"}
            </span>
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L6 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L10 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

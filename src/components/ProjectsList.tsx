"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import SectionArtwork from "@/components/SectionArtwork";
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

function GalleryCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.65rem] border border-zinc-100 bg-white text-left shadow-[0_14px_42px_rgba(24,24,27,0.075)]">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 720px, (min-width: 640px) 72vw, 84vw"
            className="object-contain p-4 sm:p-7"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">No image available</div>
        )}
      </div>

      <div className="border-t border-zinc-100 p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
          {getProjectCategory(project)}
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight text-zinc-950 sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const settleTimer = useRef<number | null>(null);
  const clickResetTimer = useRef<number | null>(null);
  const interactionStartLeft = useRef(0);
  const didScroll = useRef(false);

  useEffect(() => {
    return () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
      if (clickResetTimer.current !== null) window.clearTimeout(clickResetTimer.current);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;

    const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setCurrentIndex(index);
    scroller.scrollTo({
      left,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const syncIndexFromScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);

    if (clickResetTimer.current !== null) {
      window.clearTimeout(clickResetTimer.current);
    }
    clickResetTimer.current = window.setTimeout(() => {
      didScroll.current = false;
    }, 90);
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (Math.abs(scroller.scrollLeft - interactionStartLeft.current) > 6) {
      didScroll.current = true;
    }

    if (settleTimer.current !== null) {
      window.clearTimeout(settleTimer.current);
    }

    settleTimer.current = window.setTimeout(syncIndexFromScroll, 90);
  };

  const showPrevious = () => {
    scrollToIndex((currentIndex - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const showNext = () => {
    scrollToIndex((currentIndex + 1) % featuredProjects.length);
  };

  if (!featuredProjects.length) return null;

  return (
    <section id="projects" className="relative flex w-full flex-col justify-center overflow-hidden bg-white pb-10 pt-24 md:pb-12 md:pt-28">
      <SectionArtwork variant="projects" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <FadeIn className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Featured projects
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-zinc-950 md:text-5xl">
              A few things I&apos;ve built.
            </h2>
          </div>
          <p className="shrink-0 pb-1 text-xs font-medium text-zinc-400 sm:text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div
            ref={scrollerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects carousel"
            tabIndex={0}
            onPointerDown={() => {
              interactionStartLeft.current = scrollerRef.current?.scrollLeft ?? 0;
              didScroll.current = false;
            }}
            onScroll={handleScroll}
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
            className="-mx-6 flex snap-x snap-mandatory gap-[2%] overflow-x-auto overscroll-x-contain px-[8%] pb-7 pt-2 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 [&::-webkit-scrollbar]:hidden md:-mx-12 sm:px-[14%] lg:px-[18%]"
          >
            {featuredProjects.map((project, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={project.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="h-[400px] w-[84%] shrink-0 snap-center snap-always sm:h-[480px] sm:w-[72%] lg:h-[530px] lg:w-[64%]"
                >
                  <button
                    type="button"
                    aria-label={
                      isActive
                        ? `Open ${project.title} ${project.demoUrl ? "live demo" : "repository"}`
                        : `Show ${project.title}`
                    }
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                      if (didScroll.current) {
                        event.preventDefault();
                        return;
                      }

                      if (!isActive) {
                        scrollToIndex(index);
                        return;
                      }

                      window.open(getProjectHref(project), "_blank", "noopener,noreferrer");
                    }}
                    className="h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
                  >
                    <GalleryCard project={project} priority={index < 2} />
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-1 text-center text-[11px] font-medium text-zinc-400 sm:hidden">
            Swipe to browse
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

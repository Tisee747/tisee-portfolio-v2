"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { projectsData } from "@/data/portfolioData";
import type { Project } from "@/types";

const featuredProjects = projectsData
  .filter((project) => project.demoUrl || project.repoUrl)
  .slice(0, 4);

const activeCardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "12%" : "-12%",
    opacity: 0,
    scale: 0.96,
    rotate: direction > 0 ? 1.2 : -1.2,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-12%" : "12%",
    opacity: 0,
    scale: 0.96,
    rotate: direction > 0 ? -1.2 : 1.2,
  }),
};

function getProjectHref(project: Project) {
  return project.demoUrl ?? project.repoUrl ?? "/projects";
}

function getProjectCategory(project: Project) {
  if (project.projectLayout === "none") return "Backend";
  if (project.projectLayout === "mobile") return "Mobile";
  if (project.projectLayout === "hybrid") return "Fullstack";
  return "Web";
}

function GalleryCard({ project, active = false }: { project: Project; active?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] border bg-white text-left transition-shadow duration-300 ${
        active
          ? "border-zinc-200 shadow-[0_26px_80px_rgba(24,24,27,0.14)]"
          : "border-zinc-200/80 shadow-[0_12px_40px_rgba(24,24,27,0.08)]"
      }`}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={active ? project.title : ""}
            fill
            sizes="(min-width: 1024px) 720px, 88vw"
            className={`object-contain p-4 sm:p-7 ${active ? "opacity-100" : "opacity-60 grayscale-[20%]"}`}
            priority={active}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">No image available</div>
        )}
      </div>

      <div className={`border-t border-zinc-100 ${active ? "p-5 sm:p-7" : "p-4 sm:p-5"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
          {getProjectCategory(project)}
        </p>
        <h3 className={`mt-2 font-medium tracking-tight text-zinc-950 ${active ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
          {project.title}
        </h3>
        {active && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressSwipeClick = useRef(false);

  const activeProject = featuredProjects[currentIndex];
  const previousProject = featuredProjects[
    (currentIndex - 1 + featuredProjects.length) % featuredProjects.length
  ];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  const showNext = () => {
    setDirection(1);
    setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
  };

  const showPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (previousIndex) => (previousIndex - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  useEffect(() => {
    if (featuredProjects.length < 2 || shouldReduceMotion || isPointerOver || isFocused) {
      return;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isFocused, isPointerOver, shouldReduceMotion]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    suppressSwipeClick.current = false;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) >= 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

    if (!isHorizontalSwipe) return;

    suppressSwipeClick.current = true;
    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  };

  const handleTouchCancel = () => {
    touchStart.current = null;
    suppressSwipeClick.current = false;
  };

  const consumeSwipeClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!suppressSwipeClick.current) return false;
    event.preventDefault();
    event.stopPropagation();
    suppressSwipeClick.current = false;
    return true;
  };

  if (!activeProject) return null;

  const cardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 360, damping: 34, mass: 0.72 };

  return (
    <section id="projects" className="flex w-full flex-col justify-center overflow-hidden bg-white pb-10 pt-24 md:pb-12 md:pt-28">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <FadeIn className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Selected work
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-zinc-950 md:text-5xl">Work Gallery</h2>
          </div>
          <p className="pb-1 text-xs font-medium text-zinc-400 sm:text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onPointerEnter={() => setIsPointerOver(true)}
            onPointerLeave={() => setIsPointerOver(false)}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                setIsFocused(false);
              }
            }}
            className="relative h-[430px] touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:h-[535px] lg:h-[590px]"
          >
            <button
              type="button"
              onClick={(event) => {
                if (consumeSwipeClick(event)) return;
                showPrevious();
              }}
              aria-label={`Show previous project: ${previousProject.title}`}
              className="absolute left-1/2 top-1/2 z-0 h-[350px] w-[88%] text-left opacity-55 transition-[opacity,filter] duration-300 hover:opacity-75 focus-visible:z-30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-[455px] sm:w-[72%] lg:h-[505px] lg:w-[64%]"
              style={{ transform: "translate(-76%, -50%) rotate(-3deg) scale(0.91)" }}
            >
              <GalleryCard project={previousProject} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                if (consumeSwipeClick(event)) return;
                showNext();
              }}
              aria-label={`Show next project: ${nextProject.title}`}
              className="absolute left-1/2 top-1/2 z-0 h-[350px] w-[88%] text-left opacity-55 transition-[opacity,filter] duration-300 hover:opacity-75 focus-visible:z-30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-[455px] sm:w-[72%] lg:h-[505px] lg:w-[64%]"
              style={{ transform: "translate(-24%, -50%) rotate(3deg) scale(0.91)" }}
            >
              <GalleryCard project={nextProject} />
            </button>

            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeProject.id}
                  custom={direction}
                  variants={activeCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={cardTransition}
                  className="pointer-events-auto h-[370px] w-[88%] sm:h-[480px] sm:w-[72%] lg:h-[530px] lg:w-[64%]"
                >
                  <Link
                    href={getProjectHref(activeProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${activeProject.title} ${activeProject.demoUrl ? "live demo" : "repository"}`}
                    onClick={(event) => {
                      consumeSwipeClick(event);
                    }}
                    className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
                  >
                    <GalleryCard project={activeProject} active />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-2 text-center text-[11px] font-medium text-zinc-400 sm:hidden">
            Swipe left or right to browse
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

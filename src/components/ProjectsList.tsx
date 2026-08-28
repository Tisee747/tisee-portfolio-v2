"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
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

function getRelativePosition(index: number, currentIndex: number, total: number) {
  let position = index - currentIndex;

  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;

  return position;
}

function getCardMotion(position: number) {
  if (position === -1) {
    return { x: "-76%", scale: 0.91, rotate: -3, opacity: 0.55 };
  }

  if (position === 0) {
    return { x: "-50%", scale: 1, rotate: 0, opacity: 1 };
  }

  if (position === 1) {
    return { x: "-24%", scale: 0.91, rotate: 3, opacity: 0.55 };
  }

  return { x: "-50%", scale: 0.86, rotate: 0, opacity: 0 };
}

function GalleryCard({ project, active = false }: { project: Project; active?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] border bg-white text-left transition-[border-color,box-shadow] duration-300 ${
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
            className={`object-contain p-4 transition-[opacity,filter] duration-300 sm:p-7 ${
              active ? "opacity-100 grayscale-0" : "opacity-60 grayscale-[20%]"
            }`}
            priority={project.id === featuredProjects[0]?.id}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">No image available</div>
        )}
      </div>

      <div className={`border-t border-zinc-100 transition-[padding] duration-300 ${active ? "p-5 sm:p-7" : "p-4 sm:p-5"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
          {getProjectCategory(project)}
        </p>
        <h3 className={`mt-2 font-medium tracking-tight text-zinc-950 ${active ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
          {project.title}
        </h3>
        <p
          className={`overflow-hidden text-sm leading-relaxed text-zinc-500 transition-[max-height,opacity,margin] duration-300 sm:text-base ${
            active ? "mt-3 max-h-20 opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const didDrag = useRef(false);
  const dragResetTimer = useRef<number | null>(null);

  const activeProject = featuredProjects[currentIndex];

  useEffect(() => {
    if (featuredProjects.length < 2 || shouldReduceMotion || isPointerOver || isFocused) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isFocused, isPointerOver, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (dragResetTimer.current !== null) {
        window.clearTimeout(dragResetTimer.current);
      }
    };
  }, []);

  const showNext = () => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredProjects.length);
  };

  const showPrevious = () => {
    setCurrentIndex(
      (previousIndex) => (previousIndex - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  const handleDragStart = () => {
    didDrag.current = true;
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const intent = Math.abs(info.offset.x) >= 42 || Math.abs(info.velocity.x) >= 420;

    if (intent) {
      if (info.offset.x < 0 || info.velocity.x < -420) {
        showNext();
      } else if (info.offset.x > 0 || info.velocity.x > 420) {
        showPrevious();
      }
    }

    if (dragResetTimer.current !== null) {
      window.clearTimeout(dragResetTimer.current);
    }

    dragResetTimer.current = window.setTimeout(() => {
      didDrag.current = false;
    }, 120);
  };

  const activateProject = (project: Project) => {
    window.open(getProjectHref(project), "_blank", "noopener,noreferrer");
  };

  if (!activeProject) return null;

  const cardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

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
            <motion.div
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={shouldReduceMotion ? 0 : 0.16}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {featuredProjects.map((project, index) => {
                const position = getRelativePosition(index, currentIndex, featuredProjects.length);
                const isActive = position === 0;
                const isPrevious = position === -1;
                const isNext = position === 1;
                const isVisible = isActive || isPrevious || isNext;
                const motionTarget = getCardMotion(position);
                const actionLabel = isActive
                  ? `Open ${project.title} ${project.demoUrl ? "live demo" : "repository"}`
                  : isPrevious
                    ? `Show previous project: ${project.title}`
                    : `Show next project: ${project.title}`;

                return (
                  <motion.div
                    key={project.id}
                    initial={false}
                    animate={{
                      x: motionTarget.x,
                      y: "-50%",
                      scale: motionTarget.scale,
                      rotate: motionTarget.rotate,
                      opacity: motionTarget.opacity,
                    }}
                    transition={cardTransition}
                    aria-hidden={!isVisible || undefined}
                    className="absolute left-1/2 top-1/2 h-[370px] w-[88%] sm:h-[480px] sm:w-[72%] lg:h-[530px] lg:w-[64%]"
                    style={{
                      zIndex: isActive ? 20 : isVisible ? 10 : 0,
                      pointerEvents: isVisible ? "auto" : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <button
                      type="button"
                      tabIndex={isVisible ? 0 : -1}
                      aria-label={actionLabel}
                      onClick={(event) => {
                        if (didDrag.current) {
                          event.preventDefault();
                          return;
                        }

                        if (isPrevious) {
                          showPrevious();
                          return;
                        }

                        if (isNext) {
                          showNext();
                          return;
                        }

                        if (isActive) {
                          activateProject(project);
                        }
                      }}
                      className={`h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 ${
                        isActive ? "cursor-pointer" : "cursor-pointer hover:opacity-80"
                      }`}
                    >
                      <GalleryCard project={project} active={isActive} />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <p className="mt-2 text-center text-[11px] font-medium text-zinc-400 sm:hidden">
            Swipe left or right to browse
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

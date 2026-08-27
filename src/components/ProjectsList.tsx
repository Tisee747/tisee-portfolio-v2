"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { projectsData } from "@/data/portfolioData";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export default function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Pick only top 4 selected projects
  const selectedProjects = projectsData.slice(0, 4);

  // Auto-scroll logic via state
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedProjects.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [isHovered, selectedProjects.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + selectedProjects.length) % selectedProjects.length);
  };

  return (
    <section id="projects" className="relative w-full bg-white py-24 flex flex-col justify-center overflow-hidden border-t border-zinc-100">
      
      {/* Decorative background for Projects */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="plus-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 25 V35 M25 30 H35" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plus-pattern)" />
      </svg>

      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <FadeIn className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight">
              Selected Projects
            </h2>
          </div>
        </FadeIn>

        {/* Carousel Container */}
        <FadeIn delay={0.2} className="relative w-full overflow-hidden rounded-[2rem] bg-white border border-zinc-200 shadow-sm">
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {selectedProjects.map((project) => (
              <div 
                key={project.id} 
                className="w-full shrink-0 flex flex-col md:flex-row p-6 md:p-12 gap-8 md:gap-12"
              >
                {/* Left: Details */}
                <div className="flex flex-col flex-1 justify-center order-2 md:order-1">
                  <div className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
                    {project.projectLayout === 'none' ? 'Backend' : (project.projectLayout || 'web')}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.repoUrl && (
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-zinc-200 text-zinc-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center shadow-sm">
                        Repository
                      </Link>
                    )}
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors flex items-center justify-center shadow-sm">
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: Image */}
                <div className="flex-1 w-full aspect-video md:aspect-auto md:h-[400px] bg-zinc-50 rounded-2xl relative overflow-hidden border border-zinc-200 flex items-center justify-center p-4 order-1 md:order-2 group">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm bg-white">
                    {project.images && project.images.length > 0 ? (
                      <Image 
                        src={project.images[0]} 
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        No Image Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Carousel Controls */}
        <FadeIn delay={0.3} className="flex justify-between items-center mt-8">
          
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {selectedProjects.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-blue-600" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-zinc-900 hover:bg-zinc-50 transition-colors border border-zinc-200 shadow-sm active:scale-95"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-zinc-900 hover:bg-zinc-50 transition-colors border border-zinc-200 shadow-sm active:scale-95"
            >
              &rarr;
            </button>
          </div>
        </FadeIn>
        
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { projectsData } from "@/data/portfolioData";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "AI/ML", "Backend"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Backend" && p.projectLayout === "none") return true;
    if (activeFilter === "Web" && p.projectLayout === "web") return true;
    if (activeFilter === "Mobile" && p.projectLayout === "mobile") return true;
    if (activeFilter === "AI/ML") {
      return p.technologies?.some(t => ['Python', 'OpenCV', 'TensorFlow', 'LLM', 'AI', 'ML'].includes(t));
    }
    return false;
  });

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-[1000px] mx-auto w-full flex flex-col">
        
        <FadeIn className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-medium text-zinc-900 tracking-tighter mb-6">
            All Projects
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
            A comprehensive look at my work, side projects, and experiments.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === filter
                    ? "bg-zinc-900 text-white shadow-md"
                    : "bg-slate-50 text-zinc-600 hover:bg-slate-100 border border-zinc-100"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="flex flex-col gap-32">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={0.1} direction="up" className="flex flex-col">
              
              {/* Project Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
                    {project.projectLayout === 'none' ? 'Backend' : (project.projectLayout || 'web')}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-medium text-zinc-900 tracking-tight">
                    {project.title}
                  </h2>
                </div>
                
                <div className="flex gap-3">
                  {project.repoUrl && (
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-zinc-200 text-zinc-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      Repository
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full aspect-video bg-zinc-100 rounded-3xl mb-10 relative border border-zinc-200 p-4 md:p-12">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
                  {project.images && project.images.length > 0 ? (
                    <Image 
                      src={project.images[0]} 
                      alt={project.title}
                      fill
                      className="object-contain hover:scale-[1.02] transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-white">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium text-zinc-900 mb-4">About this project</h3>
                  <p className="text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
                
                <div className="md:w-1/3 flex flex-col">
                  <h3 className="text-lg font-medium text-zinc-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map(tech => (
                      <span key={tech} className="bg-slate-50 border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-md text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}

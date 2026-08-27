"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "01",
    level: "University",
    label: "Medusa",
    title: "Backend Intern",
    company: "Medusa Technology",
    period: "Jun 2026 - Aug 2026",
    tech: "Node.js • Go • FastAPI • AWS EC2 • Llama 3",
    description: "Backend APIs, deployment, and applied AI work.",
    imageFile: "medusa.jpg",
  },
  {
    id: "02",
    level: "Senior Highschool",
    label: "Indicator",
    title: "IT & Data Intern",
    company: "PT. Indonesia Indicator",
    period: "Feb 2023 - Aug 2023",
    tech: "Python • RegEx • Web Scraping",
    description: "Web scraping, data crawling, and automation scripts.",
    imageFile: "indicator.jpg",
  },
  {
    id: "03",
    level: "Junior Highschool",
    label: "Lensza",
    title: "Digital Marketing Intern",
    company: "Lensza.co.id",
    period: "Feb 2021 - Jan 2023",
    tech: "Shopify • Canva • Email Marketing",
    description: "Promotional content creation and e-commerce operations.",
    imageFile: "lensza.jpg",
  }
];

import { FadeIn } from "@/components/FadeIn";

export default function ExperienceSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="relative w-full bg-white py-24 px-6 md:px-12 flex justify-center overflow-hidden">
      
      {/* Decorative background for Experience */}
      <div className="absolute inset-0 pointer-events-none flex justify-end items-end z-0">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.03] translate-x-1/4 translate-y-1/4">
          <circle cx="200" cy="200" r="199" stroke="black" strokeWidth="2" strokeDasharray="8 8"/>
          <circle cx="200" cy="200" r="149" stroke="black" strokeWidth="2" strokeDasharray="8 8"/>
          <circle cx="200" cy="200" r="99" stroke="black" strokeWidth="2" strokeDasharray="8 8"/>
        </svg>
      </div>

      <div className="max-w-5xl w-full flex flex-col relative z-10">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[10px] font-semibold text-blue-600 tracking-wider mb-2 uppercase">Experience</div>
              <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight">Experience</h2>
            </div>
          </div>
        </FadeIn>

        {/* Mobile Swipeable List */}
        <FadeIn delay={0.2} className="flex flex-col md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-6 px-6 hide-scrollbar">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm flex-none w-[85vw] snap-center flex flex-col relative transition-shadow hover:shadow-md">
                <div className="text-xs font-semibold text-blue-600 mb-6 uppercase tracking-wider">
                  {exp.level}
                </div>
                <h3 className="text-2xl font-medium text-neutral-900 mb-2">
                  {exp.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {exp.company}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  {exp.period}
                </p>
                
                <div className="w-full aspect-[5/3] bg-slate-100 rounded-2xl relative overflow-hidden border border-zinc-200 mb-6 shrink-0 group">
                  <Image 
                    src={`/images/journey/${exp.imageFile}`}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="border-t border-zinc-200 pt-6 mt-auto">
                  <p className="text-sm text-neutral-900 mb-2">
                    {exp.tech}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-zinc-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">Swipe to explore</span>
          </div>
        </FadeIn>

        {/* Desktop Single View with Buttons */}
        <FadeIn delay={0.2} className="hidden md:block bg-white border border-zinc-200 rounded-3xl p-12 shadow-sm relative transition-shadow hover:shadow-md">
          <div className="grid grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col min-h-[360px]">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-8">
                {experiences[active].level}
              </div>
              <h3 className="text-3xl font-medium text-neutral-900 mb-2 tracking-tight">
                {experiences[active].title}
              </h3>
              <p className="text-base text-gray-500 mb-1">
                {experiences[active].company}
              </p>
              <p className="text-sm text-gray-500 mb-8">
                {experiences[active].period}
              </p>
              
              <div className="border-t border-zinc-200 pt-6 mt-auto">
                <p className="text-base text-neutral-900 mb-2">
                  {experiences[active].tech}
                </p>
                <p className="text-base text-gray-500 leading-relaxed">
                  {experiences[active].description}
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-4 mt-12">
                <button 
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F2F6FC] border border-[#DDE3EA] text-gray-500 disabled:opacity-50 transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95"
                >
                  &larr;
                </button>
                <button 
                  onClick={() => setActive(Math.min(experiences.length - 1, active + 1))}
                  disabled={active === experiences.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#17191D] text-white disabled:opacity-50 transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-md"
                >
                  &rarr;
                </button>
                
                {/* Progress Indicators */}
                <div className="flex gap-4 ml-8">
                  {experiences.map((exp, idx) => (
                    <div key={exp.id} className="flex flex-col gap-2 w-full max-w-[80px] cursor-pointer group" onClick={() => setActive(idx)}>
                      <div className="flex gap-2 text-xs font-medium">
                        <span className={active === idx ? "text-blue-600" : "text-gray-400 group-hover:text-blue-400 transition-colors"}>0{idx + 1}</span>
                      </div>
                      <div className={cn(
                        "h-[3px] rounded-full w-full transition-colors duration-300",
                        active === idx ? "bg-blue-600" : "bg-zinc-200 group-hover:bg-zinc-300"
                      )} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl relative overflow-hidden border border-zinc-200 group">
              <Image 
                src={`/images/journey/${experiences[active].imageFile}`}
                alt={experiences[active].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

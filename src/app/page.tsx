import Link from "next/link";
import Image from "next/image";
import ExperienceSection from "@/components/ExperienceSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProjectsList from "@/components/ProjectsList";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="w-full bg-white selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">

      {/* Hero Section */}
      <section className="w-full flex justify-center pt-32 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center">
          
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-semibold text-zinc-900 leading-[1.1] tracking-tighter mb-6 md:mb-8">
                Hi! I&apos;m Tisee
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 className="text-2xl md:text-5xl font-normal text-zinc-900 leading-tight md:leading-[1.15] tracking-tight mb-6 md:mb-10 max-w-2xl mx-auto md:mx-0">
                Backend systems<br className="hidden md:block" />
                <span className="md:hidden"> &amp; </span>applied AI
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-xl text-gray-500 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                I build practical APIs, automation tools, and AI features for real-world workflows.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-16">
                <Link href="/resume.pdf" target="_blank" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  View Resume
                </Link>
                <Link href="#projects" className="bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 hover:scale-[1.02] active:scale-95 transition-all shadow-sm flex items-center gap-2 group">
                  View Work
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="border-t border-zinc-100 pt-8">
                <div className="grid grid-cols-4 gap-4 md:gap-8 divide-x divide-zinc-100">
                  <div className="flex flex-col items-center md:items-start group">
                    <div className="text-xl md:text-3xl font-semibold text-zinc-900 mb-1 transition-transform group-hover:-translate-y-1">3.66</div>
                    <div className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest">GPA</div>
                  </div>
                  <div className="flex flex-col items-center md:items-start pl-4 md:pl-8 group">
                    <div className="text-xl md:text-3xl font-semibold text-zinc-900 mb-1 transition-transform group-hover:-translate-y-1">10+</div>
                    <div className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest">Projects</div>
                  </div>
                  <div className="flex flex-col items-center md:items-start pl-4 md:pl-8 group">
                    <div className="text-xl md:text-3xl font-semibold text-zinc-900 mb-1 transition-transform group-hover:-translate-y-1">3</div>
                    <div className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest">Interns</div>
                  </div>
                  <div className="flex flex-col items-center md:items-start pl-4 md:pl-8 group">
                    <div className="text-xl md:text-3xl font-semibold text-zinc-900 mb-1 transition-transform group-hover:-translate-y-1">2</div>
                    <div className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest">Certs</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="relative mb-8 w-full shrink-0 md:mb-0 md:w-[420px]">
            <div className="pointer-events-none absolute -inset-8 z-0 md:-inset-16" aria-hidden="true">
              <span className="absolute inset-[8%] rounded-full border border-zinc-200/75" />
              <span className="absolute inset-[18%] rounded-full border border-zinc-200/50" />
              <span className="absolute left-1/2 top-1/2 h-[28%] w-[118%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-zinc-200/65" />
              <span className="absolute left-[13%] top-[24%] h-2 w-2 rounded-full bg-zinc-300" />
            </div>
            <div className="relative z-10 mx-auto aspect-square max-w-[320px] overflow-hidden rounded-[3rem] border border-zinc-200/60 bg-zinc-100 shadow-xl md:aspect-[4/5] md:max-w-none">
              <Image 
                src="/profile.png" 
                alt="Tisee Profile" 
                fill 
                sizes="(min-width: 768px) 420px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
          
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Capabilities Section */}
      <CapabilitiesSection />

      {/* Projects Slider Section */}
      <ProjectsList />

      {/* See All Projects Button */}
      <section className="w-full bg-white pb-32 flex justify-center">
        <FadeIn>
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-sm hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            See all work
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}

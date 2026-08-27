import Link from "next/link";
import ExperienceSection from "@/components/ExperienceSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProjectsList from "@/components/ProjectsList";
import { FadeIn } from "@/components/FadeIn";

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]" aria-hidden="true">
      <div className="absolute inset-[5%] rounded-full border border-zinc-200" />
      <div className="absolute inset-[17%] rounded-full border border-dashed border-zinc-300" />
      <div className="absolute inset-[31%] rounded-full border border-zinc-200" />

      <div className="absolute inset-[5%] animate-spin motion-reduce:animate-none [animation-duration:22s] [animation-timing-function:linear]">
        <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-zinc-900" />
      </div>
      <div className="absolute inset-[17%] animate-spin motion-reduce:animate-none [animation-direction:reverse] [animation-duration:17s] [animation-timing-function:linear]">
        <span className="absolute bottom-[10%] right-[4%] h-2 w-2 rounded-full border border-zinc-900 bg-white" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[22deg] bg-zinc-100" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[22deg] bg-zinc-100" />

      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
        <span className="text-xs font-semibold tracking-[0.24em] text-zinc-900">TISEE</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
      <div className="pointer-events-none absolute left-0 top-0 z-0 h-[860px] w-full overflow-hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.13]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0V60" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <section className="relative z-10 flex w-full justify-center px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-40">
        <div className="grid w-full max-w-5xl items-center gap-14 md:grid-cols-[1.18fr_.82fr] md:gap-16">
          <div className="flex flex-col justify-center text-center md:text-left">
            <FadeIn delay={0.1}>
              <h1 className="mb-7 text-5xl font-semibold leading-[1.08] tracking-tighter text-zinc-900 md:text-7xl">
                Hi! I’m Tisee
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="mx-auto mb-7 max-w-2xl text-3xl font-normal leading-[1.12] tracking-tight text-zinc-900 md:mx-0 md:mb-8 md:text-5xl">
                Backend systems.<br />
                Applied AI.
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-gray-500 md:mx-0 md:text-lg">
                Building reliable APIs, automation, and data workflows—with AI where it adds real value.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mb-14 flex items-center justify-center gap-3 md:justify-start">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_rgb(0,0,0,0.10)] transition-all hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
                >
                  View Resume
                </Link>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 active:translate-y-0"
                >
                  Explore Work
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M1 11 11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="border-t border-zinc-100 pt-8">
                <div className="grid grid-cols-4 gap-3 divide-x divide-zinc-100 md:gap-8">
                  {[
                    ["3.66", "GPA"],
                    ["10+", "Projects"],
                    ["3", "Interns"],
                    ["2", "Certs"],
                  ].map(([value, label], index) => (
                    <div key={label} className={`group flex flex-col items-center md:items-start ${index ? "pl-3 md:pl-8" : ""}`}>
                      <div className="mb-1 text-xl font-semibold text-zinc-900 transition-transform group-hover:-translate-y-1 md:text-3xl">{value}</div>
                      <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 md:text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mx-auto w-full max-w-[430px] md:max-w-none">
            <OrbitVisual />
          </FadeIn>
        </div>
      </section>

      <ExperienceSection />
      <CapabilitiesSection />
      <ProjectsList />
    </main>
  );
}

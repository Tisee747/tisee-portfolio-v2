import Image from "next/image";
import Link from "next/link";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import { FadeIn } from "@/components/FadeIn";
import ProjectsList from "@/components/ProjectsList";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
      <section className="relative z-10 flex w-full justify-center bg-white px-6 pb-20 pt-28 md:px-12 md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[42rem] overflow-hidden" aria-hidden="true">
          <div className="tisee-flow-canvas absolute -left-[8%] top-8 h-[32rem] w-[116%]">
            <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" preserveAspectRatio="none">
              <path d="M-120 128C112 34 286 50 452 132S790 250 1320 84" stroke="#E4E4E7" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M-120 196C112 102 286 118 452 200S790 318 1320 152" stroke="#F0F0F1" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M-120 264C112 170 286 186 452 268S790 386 1320 220" stroke="#E4E4E7" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="tisee-flow-canvas tisee-flow-canvas-secondary absolute -left-[12%] top-24 h-[32rem] w-[116%]">
            <svg viewBox="0 0 1200 520" className="h-full w-full" fill="none" preserveAspectRatio="none">
              <path d="M-120 310C132 232 300 246 470 324S830 430 1320 276" stroke="#F0F0F1" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M-120 378C132 300 300 314 470 392S830 498 1320 344" stroke="#E4E4E7" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,1fr)_420px] md:gap-16">
          <div className="flex flex-col justify-center text-center md:text-left">
            <FadeIn delay={0.1}>
              <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-zinc-950 sm:text-6xl md:mx-0 md:text-7xl">
                Hi!I&apos;m Tisee
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg md:mx-0 md:mt-8 md:text-xl">
                <span className="block">I turn ideas into working software.</span>
                <span className="mt-2 block">Focused on backend development, automation, and AI.</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full bg-zinc-950 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
                >
                  View Resume
                </Link>
                <Link
                  href="#projects"
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
                >
                  View Work
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-14 border-t border-zinc-100 pt-7 md:mt-16 md:pt-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left sm:grid-cols-4 sm:gap-8">
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">3.66</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">GPA</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">10+</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">3</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Internships</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">2</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Certificates</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="relative mx-auto w-full max-w-[320px] md:max-w-none">
            <div className="pointer-events-none absolute -inset-8 z-0 md:-inset-16" aria-hidden="true">
              <span className="absolute inset-[8%] rounded-full border border-zinc-200/75" />
              <span className="absolute inset-[18%] rounded-full border border-zinc-200/50" />
              <span className="absolute left-1/2 top-1/2 h-[28%] w-[118%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-zinc-200/65" />
              <span className="absolute left-[13%] top-[24%] h-2 w-2 rounded-full bg-zinc-300" />
            </div>
            <div className="relative z-10 mx-auto aspect-square w-full overflow-hidden rounded-[2.5rem] border border-zinc-200/60 bg-zinc-100 shadow-[0_24px_70px_rgba(24,24,27,0.12)] md:aspect-[4/5] md:rounded-[3rem]">
              <Image
                src="/profile.png"
                alt="Portrait of Tisee"
                fill
                sizes="(min-width: 768px) 420px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <ExperienceSection />
      <CapabilitiesSection />
      <ProjectsList />

      <section className="flex w-full justify-center bg-white pb-28 pt-4 md:pb-32">
        <FadeIn>
          <Link
            href="/projects"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
          >
            See all work
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
              ↗
            </span>
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}

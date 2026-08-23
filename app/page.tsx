"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const RAW = "https://raw.githubusercontent.com/Tisee747/tisee-portfolio-v2/main";
const RESUME = `${RAW}/assets/resume.pdf`;

const experience = [
  {
    date: "Jun — Aug 2026",
    role: "Programming Intern",
    company: "Medusa Technology",
    stack: ["Node.js", "Go", "FastAPI", "AWS EC2", "Llama 3", "LangChain", "ChromaDB", "LSL"],
  },
  {
    date: "Feb — Aug 2023",
    role: "IT & Data Intern",
    company: "PT. Indonesia Indicator",
    stack: ["Python", "RegEx", "Web Scraping", "Automation Tools", "Data Processing"],
  },
  {
    date: "Feb 2021 — Jan 2023",
    role: "Digital Marketing Intern",
    company: "PT. Gucob E-Service / Lensza",
    stack: ["Shopify", "Canva", "Email Marketing", "E-Commerce Operations"],
  },
];

const skills = [
  ["Backend", "Go", "Python", "FastAPI", "Node.js", "Laravel", "Spring Boot", "PostgreSQL", "MongoDB"],
  ["Applied AI", "LangChain", "Llama 3", "ChromaDB", "OpenCV", "Scikit-Learn", "CatBoost"],
  ["Product", "Next.js", "React", "TypeScript", "Flutter", "PHP", "Dart", "PWA"],
  ["Engineering", "AWS EC2", "Git", "Linux", "Docker", "Automation"],
];

const projects = [
  {
    name: "Posyandu Pintar",
    type: "Web application",
    summary: "AI-assisted health monitoring for toddlers and maternal health.",
    tech: "Next.js · React · TypeScript · TailwindCSS",
    image: `${RAW}/assets/projects/posyandu_dashboard.png`,
    live: "https://posyandu-web-app.vercel.app",
    repo: "https://github.com/Tisee747/Posyandu_Pintar",
  },
  {
    name: "NexEvent",
    type: "Web & mobile application",
    summary: "Campus event registration and management platform with a waitlist flow.",
    tech: "Laravel · Flutter · PHP · Dart",
    images: [
      `${RAW}/assets/projects/nexevent_mobile_login.jpg`,
      `${RAW}/assets/projects/nexevent_mobile_dashboard.jpg`,
      `${RAW}/assets/projects/nexevent_mobile_tiket.jpg`,
    ],
  },
];

const moreProjects = [
  ["TelyuTalks", "Academic Q&A PWA", "Java · Spring Boot · PWA", "https://github.com/Tisee747/TelyuTalks"],
  ["Intelligent AI NPC Chatbot", "Internship project", "Python · Llama 3 · LangChain · ChromaDB", ""],
  ["MyDormitory", "Dormitory attendance & security", "Laravel · Flutter", ""],
  ["GPT-NER Implementation", "Named entity recognition", "Python · Streamlit · Llama 3", "https://gpt-ner.streamlit.app/"],
  ["MicroPlast CV Scanner", "Computer vision scanner", "Python · OpenCV", "https://microplast.streamlit.app/"],
  ["House Pricing Predictor", "Machine learning regression", "Python · CatBoost", ""],
  ["Metaverse Racing & Leaderboards", "Virtual-world game systems", "LSL", ""],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: .72, delay, ease: [0.22, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 0.45], [0, reduce ? 0 : 90]);
  const navBg = useTransform(scrollYProgress, [0, 0.06], ["rgba(7,8,11,0)", "rgba(7,8,11,.78)"]);

  const navItems = useMemo(() => ["About", "Experience", "Skills", "Projects", "Contact"], []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onChange = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <main className="page-shell">
      <motion.header style={{ backgroundColor: navBg }} className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] backdrop-blur-xl">
        <div className="container-x flex h-[72px] items-center justify-between">
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-full text-sm font-semibold tracking-[-.02em]">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/[.06] font-mono text-[11px]">TS</span>
            <span>Tisee</span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-white/60 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="focus-ring rounded-sm transition hover:text-white">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={RESUME} target="_blank" rel="noreferrer" className="focus-ring hidden rounded-full border border-white/15 bg-white/[.055] px-4 py-2.5 text-xs font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[.09] sm:inline-flex">Resume</a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[.055] md:hidden"
            >
              <span className="relative h-3.5 w-4">
                <span className={`absolute left-0 top-1 h-px w-4 bg-white transition ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`absolute bottom-1 left-0 h-px w-4 bg-white transition ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={{ duration: .24 }}
            className="fixed inset-0 z-40 bg-[#07080b]/98 px-5 pb-8 pt-28 md:hidden"
          >
            <nav className="grid border-t border-white/10" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="focus-ring flex items-center justify-between border-b border-white/10 py-5 text-3xl font-semibold tracking-[-.04em]">
                  {item}<span className="font-mono text-[11px] text-white/35">0{index + 1}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="top" className="container-x relative flex min-h-[930px] flex-col pt-[128px] md:min-h-screen md:pt-[150px]">
        <div className="flex items-center justify-between gap-6">
          <div className="eyebrow">Informatics Undergraduate · Telkom University</div>
          <div className="hidden items-center gap-2 text-xs text-white/45 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.75)]" /> Indonesia</div>
        </div>

        <div className="grid flex-1 items-center gap-16 py-20 lg:grid-cols-[1.2fr_.8fr] lg:gap-10 lg:py-10">
          <div className="min-w-0">
            <Reveal>
              <p className="mb-7 text-sm font-semibold text-[#8e96ff]">Tisee / Backend Engineering & Applied AI</p>
            </Reveal>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 42 }} animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: .85, ease: [0.22, 0.75, 0.2, 1] }}
              className="max-w-[900px] text-[clamp(58px,8vw,126px)] font-semibold leading-[.89] tracking-[-.065em]"
            >
              Backend systems.<br /><span className="gradient-text">Applied intelligence.</span>
            </motion.h1>
            <Reveal delay={.12} className="mt-10 grid max-w-[820px] gap-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[610px] text-lg leading-8 text-white/58 md:text-xl">I build APIs, automation, data workflows, and AI-backed product features with a bias for useful systems over demos.</p>
              <div className="flex gap-2">
                <a href="#projects" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5">View work <Arrow /></a>
                <a href="#contact" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-5 py-3 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/[.08]">Contact</a>
              </div>
            </Reveal>
          </div>

          <motion.div style={{ y: orbY }} className="relative mx-auto w-full max-w-[430px] lg:max-w-[480px]">
            <div className="absolute -inset-20 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="glass relative rounded-[32px] p-5 md:p-7">
              <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em] text-white/35">
                <span>System profile</span><span>01 / 04</span>
              </div>
              <div className="signal-orb mx-auto w-[70%]" />
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
                {["Backend", "Automation", "Data", "Applied AI"].map((item, i) => (
                  <div key={item} className="bg-[#0b0d12]/95 p-4">
                    <div className="mb-5 font-mono text-[10px] text-white/25">0{i + 1}</div>
                    <div className="text-sm font-semibold">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[["GPA", "3.66"], ["Projects", "10+"], ["Internships", "3"], ["Focus", "Backend / AI"]].map(([label, value]) => (
            <div key={label} className="border-b border-white/10 px-0 py-5 sm:border-r sm:px-5 lg:border-b-0 first:sm:pl-0 last:border-r-0">
              <div className="font-mono text-[10px] uppercase tracking-[.15em] text-white/34">{label}</div>
              <div className="mt-2 text-xl font-semibold tracking-[-.03em] text-white/90">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="container-x scroll-mt-24 py-28 md:py-40">
        <Reveal className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <div><div className="eyebrow">01 / About</div></div>
          <div className="min-w-0">
            <h2 className="max-w-[1050px] text-[clamp(38px,5vw,72px)] font-semibold leading-[1.03] tracking-[-.05em]">Engineering fundamentals first. AI where it actually helps.</h2>
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
              <p className="max-w-[580px] text-lg leading-8 text-white/55">Informatics undergraduate at Telkom University focused on backend development, APIs, automation, data processing, and AI integration.</p>
              <div className="flex items-end md:justify-end"><a href={RESUME} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white/75 transition hover:text-white">Open resume <Arrow diagonal /></a></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="experience" className="scroll-mt-24 border-y border-white/10 bg-white/[.018] py-28 md:py-40">
        <div className="container-x">
          <Reveal className="mb-16 grid gap-8 lg:grid-cols-[220px_1fr] lg:items-end">
            <div className="eyebrow">02 / Experience</div>
            <div className="min-w-0"><h2 className="text-[clamp(44px,6vw,82px)] font-semibold leading-none tracking-[-.055em]">Three internships.<br /><span className="text-white/30">Different systems.</span></h2></div>
          </Reveal>
          <div className="border-t border-white/15">
            {experience.map((item, index) => (
              <Reveal key={item.company} delay={index * .05}>
                <article className="group grid gap-6 border-b border-white/10 py-8 transition md:grid-cols-[70px_190px_1fr_1.2fr] md:items-start md:py-9">
                  <div className="font-mono text-[10px] text-white/25">0{index + 1}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[.08em] text-white/36">{item.date}</div>
                  <div className="min-w-0"><h3 className="text-2xl font-semibold tracking-[-.035em] transition group-hover:text-[#aeb4ff]">{item.role}</h3><p className="mt-2 text-sm text-white/42">{item.company}</p></div>
                  <div className="flex min-w-0 flex-wrap gap-2 md:justify-end">{item.stack.map((tech) => <span key={tech} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[11px] text-white/48">{tech}</span>)}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="container-x scroll-mt-24 py-28 md:py-40">
        <Reveal className="mb-16 grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="eyebrow">03 / Toolkit</div>
          <h2 className="max-w-[850px] text-[clamp(44px,6vw,82px)] font-semibold leading-none tracking-[-.055em]">Tools follow the problem.</h2>
        </Reveal>
        <div className="grid overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0e13]/90 lg:grid-cols-2">
          {skills.map((group, index) => (
            <Reveal key={group[0]} delay={index * .04} className="border-b border-white/10 p-7 last:border-b-0 lg:border-r lg:p-9 lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-last-child(-n+2)]:border-b-0">
              <div className="mb-12 flex items-center justify-between"><h3 className="text-2xl font-semibold tracking-[-.035em]">{group[0]}</h3><span className="font-mono text-[10px] text-white/25">0{index + 1}</span></div>
              <div className="flex flex-wrap gap-x-5 gap-y-3">{group.slice(1).map((tech) => <span key={tech} className="text-sm text-white/48">{tech}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 py-28 md:py-40">
        <div className="container-x">
          <Reveal className="mb-16 grid gap-8 lg:grid-cols-[220px_1fr]">
            <div className="eyebrow">04 / Selected work</div>
            <h2 className="max-w-[900px] text-[clamp(48px,7vw,96px)] font-semibold leading-[.94] tracking-[-.06em]">Built to be used.<br /><span className="text-white/28">Not just presented.</span></h2>
          </Reveal>

          <div className="space-y-28 md:space-y-40">
            <Reveal>
              <article>
                <div className="project-frame panel-grid p-3 md:p-5">
                  <div className="relative aspect-[16/8.4] overflow-hidden rounded-[20px] bg-[#151820]">
                    <Image src={projects[0].image!} alt="Posyandu Pintar dashboard" fill sizes="(max-width: 900px) 100vw, 1200px" className="object-contain p-3 md:p-8" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                </div>
                <div className="mt-8 grid gap-7 md:grid-cols-[1fr_.65fr]">
                  <div className="min-w-0"><div className="eyebrow">01 / {projects[0].type}</div><h3 className="mt-4 text-4xl font-semibold tracking-[-.045em] md:text-6xl">{projects[0].name}</h3></div>
                  <div className="min-w-0"><p className="text-base leading-7 text-white/52">{projects[0].summary}</p><p className="mt-4 text-sm text-white/32">{projects[0].tech}</p><div className="mt-6 flex gap-5 text-sm font-semibold"><a className="focus-ring inline-flex items-center gap-2" href={projects[0].live} target="_blank" rel="noreferrer">Live <Arrow diagonal /></a><a className="focus-ring inline-flex items-center gap-2" href={projects[0].repo} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a></div></div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
                <div className="project-frame overflow-hidden p-6 md:p-10">
                  <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />
                  <div className="relative flex items-center justify-center gap-3 md:gap-6">
                    {projects[1].images!.map((src, index) => (
                      <motion.div key={src} whileHover={reduce ? undefined : { y: -10, rotate: index === 0 ? -2 : index === 2 ? 2 : 0 }} className={`relative aspect-[9/20] w-[29%] overflow-hidden rounded-[18px] border border-white/15 bg-black shadow-2xl ${index === 1 ? "z-10 scale-[1.06]" : "opacity-85"}`}>
                        <Image src={src} alt={`NexEvent mobile screen ${index + 1}`} fill sizes="260px" className="object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="min-w-0 lg:pl-8"><div className="eyebrow">02 / {projects[1].type}</div><h3 className="mt-4 text-5xl font-semibold tracking-[-.05em] md:text-7xl">{projects[1].name}</h3><p className="mt-7 max-w-[530px] text-lg leading-8 text-white/52">{projects[1].summary}</p><p className="mt-4 text-sm text-white/32">{projects[1].tech}</p></div>
              </article>
            </Reveal>
          </div>

          <Reveal className="mt-32 md:mt-44">
            <div className="mb-8 flex items-end justify-between gap-8"><div><div className="eyebrow">Project index</div><h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">More work</h3></div><span className="font-mono text-[10px] text-white/25">03 — 09</span></div>
            <div className="border-t border-white/15">
              {moreProjects.map(([name, desc, tech, href], index) => {
                const content = <><span className="font-mono text-[10px] text-white/22">{String(index + 3).padStart(2, "0")}</span><span className="min-w-0 text-base font-semibold tracking-[-.025em] sm:text-lg">{name}</span><span className="hidden min-w-0 text-sm text-white/38 md:block">{desc}</span><span className="hidden min-w-0 text-right text-xs text-white/27 lg:block">{tech}</span>{href ? <Arrow diagonal /> : <span className="h-4 w-4" />}</>;
                const rowClass = "grid grid-cols-[36px_minmax(0,1fr)_20px] items-center gap-3 border-b border-white/10 py-5 md:grid-cols-[50px_minmax(0,1.1fr)_minmax(0,.9fr)_20px] md:gap-4 lg:grid-cols-[50px_minmax(0,1fr)_minmax(0,.75fr)_minmax(0,1fr)_20px]";
                return href ? <a key={name} href={href} target="_blank" rel="noreferrer" className={`focus-ring ${rowClass} transition hover:bg-white/[.025]`}>{content}</a> : <div key={name} className={rowClass}>{content}</div>;
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="container-x scroll-mt-24 pb-6 pt-24 md:pt-36">
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0f15] px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-[90px]" />
            <div className="absolute -bottom-40 left-[20%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
            <div className="relative grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="min-w-0"><div className="eyebrow">05 / Contact</div><h2 className="mt-7 max-w-[900px] text-[clamp(56px,8vw,118px)] font-semibold leading-[.89] tracking-[-.065em]">Let&apos;s build<br /><span className="gradient-text">something useful.</span></h2><a href="mailto:tisee656@gmail.com" className="focus-ring mt-10 inline-flex max-w-full items-center gap-3 break-all text-xl font-semibold text-white/72 transition hover:text-white sm:break-normal md:text-3xl">tisee656@gmail.com <Arrow diagonal /></a></div>
              <div className="grid min-w-0 gap-3 text-sm text-white/48 lg:min-w-[200px]">{[["LinkedIn", "https://linkedin.com/in/tisee/"], ["GitHub", "https://github.com/Tisee747"], ["Resume", RESUME]].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="focus-ring flex items-center justify-between border-b border-white/10 py-3 transition hover:text-white">{label}<Arrow diagonal /></a>)}</div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="container-x flex flex-col gap-3 py-8 text-xs text-white/28 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Tisee</span><span>Backend Engineering · Applied AI</span><span>Telkom University</span></footer>
    </main>
  );
}

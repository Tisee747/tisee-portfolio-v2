import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import SectionArtwork from "@/components/SectionArtwork";
import { journeyData } from "@/data/portfolioData";

const experienceCopy: Record<string, { title: string; description: string }> = {
  "university-medusa": {
    title: "Programming Intern",
    description:
      "Built backend and AI features during a programming internship, including Llama 3/RAG chatbot work, REST API deployment on AWS EC2, and LSL systems for virtual-world projects.",
  },
  "smk-indicator": {
    title: "IT & Data Intern",
    description:
      "Worked with Python, RegEx, and web scraping to collect and process data, while also contributing automation scripts and internal tooling.",
  },
  "smp-lensza": {
    title: "Digital Marketing Freelance",
    description:
      "Created promotional content and newsletters, scheduled product and content uploads, and supported day-to-day e-commerce customer interactions.",
  },
};

const stageLabels: Record<"SMP" | "SMK" | "University", string> = {
  SMP: "Junior Highschool",
  SMK: "Senior Highschool",
  University: "University",
};

const experiences = [...journeyData].reverse();

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative flex w-full justify-center overflow-hidden bg-white px-6 py-24 md:px-12 md:py-28">
      <SectionArtwork variant="experience" />

      <div className="relative z-10 w-full max-w-6xl">
        <FadeIn>
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Experience
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-zinc-950 md:text-5xl">
              Work that shaped how I build.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 md:text-lg">
              A few roles where I learned by shipping, debugging, automating, and working with real teams.
            </p>
          </div>
        </FadeIn>

        <div className="border-b border-zinc-100">
          {experiences.map((experience, index) => {
            const copy = experienceCopy[experience.id] ?? {
              title: experience.title,
              description: experience.description,
            };

            return (
              <FadeIn key={experience.id} delay={index * 0.08}>
                <article className="grid gap-7 border-t border-zinc-100 py-9 md:grid-cols-[110px_minmax(0,1fr)_250px] md:items-start md:gap-10 md:py-11 lg:grid-cols-[130px_minmax(0,1fr)_280px]">
                  <div className="flex items-center justify-between gap-4 md:block">
                    <span className="text-xs font-medium text-zinc-400">0{index + 1}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 md:mt-3 md:block">
                      {stageLabels[experience.stage]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-medium tracking-tight text-zinc-950 md:text-3xl">
                      {copy.title}
                    </h3>
                    <div className="mt-2 flex flex-col gap-1 text-sm text-zinc-500 sm:flex-row sm:items-center sm:gap-3 md:text-base">
                      <span>{experience.company}</span>
                      <span className="hidden h-1 w-1 rounded-full bg-zinc-200 sm:block" aria-hidden="true" />
                      <span>{experience.period}</span>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">
                      {copy.description}
                    </p>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] border border-zinc-100 bg-white md:aspect-[4/3]">
                    {experience.image ? (
                      <Image
                        src={experience.image}
                        alt={`${copy.title} at ${experience.company}`}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 768px) 250px, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-400">No image</div>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */

import SectionArtwork from "@/components/SectionArtwork";

const techStack = [
  { name: "Python", icon: "/images/tech/simple-icons/python-black.svg" },
  { name: "Go", icon: "/images/tech/simple-icons/go-black.svg" },
  { name: "Node.js", icon: "/images/tech/simple-icons/nodedotjs-black.svg" },
  { name: "React", icon: "/images/tech/simple-icons/react-black.svg" },
  { name: "Next.js", icon: "/images/tech/simple-icons/nextdotjs-black.svg" },
  { name: "Tailwind", icon: "/images/tech/simple-icons/tailwindcss-black.svg" },
  { name: "Laravel", icon: "/images/tech/simple-icons/laravel-black.svg" },
  { name: "PHP", icon: "/images/tech/simple-icons/php-black.svg" },
  { name: "Flutter", icon: "/images/tech/simple-icons/flutter-black.svg" },
  { name: "Dart", icon: "/images/tech/simple-icons/dart-black.svg" },
  { name: "PostgreSQL", icon: "/images/tech/simple-icons/postgresql-black.svg" },
  { name: "MySQL", icon: "/images/tech/simple-icons/mysql-black.svg" },
  { name: "MongoDB", icon: "/images/tech/simple-icons/mongodb-black.svg" },
  { name: "Redis", icon: "/images/tech/simple-icons/redis-black.svg" },
  { name: "AWS", icon: "/images/tech/aws.svg" },
  { name: "Docker", icon: "/images/tech/simple-icons/docker-black.svg" },
];

export default function CapabilitiesSection() {
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-8 md:py-10">
      <SectionArtwork variant="capabilities" />

      <div className="relative z-10 flex h-16 w-full items-center overflow-hidden md:h-20">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />

        <div className="tisee-tech-marquee flex w-max items-center gap-10 md:gap-14">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex shrink-0 items-center justify-center px-1 transition-opacity duration-200 hover:opacity-75"
              title={tech.name}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-8 w-8 object-contain md:h-10 md:w-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

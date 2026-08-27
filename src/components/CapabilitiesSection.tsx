"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useReducedMotion } from "framer-motion";

const techStack = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
];

export default function CapabilitiesSection() {
  const marqueeItems = [...techStack, ...techStack];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden bg-white py-8 md:py-10">
      <div className="relative flex h-16 w-full items-center md:h-20">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />

        <motion.div
          className="flex w-max items-center gap-10 md:gap-14"
          animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
          transition={shouldReduceMotion ? { duration: 0 } : { ease: "linear", duration: 38, repeat: Infinity }}
        >
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex shrink-0 items-center justify-center px-1 opacity-55 transition-opacity duration-200 hover:opacity-90"
              title={tech.name}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                draggable={false}
                className="h-8 w-8 object-contain grayscale brightness-0 md:h-10 md:w-10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

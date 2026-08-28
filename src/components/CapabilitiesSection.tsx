"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useReducedMotion } from "framer-motion";

const techStack = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python/09090B" },
  { name: "Go", icon: "https://cdn.simpleicons.org/go/09090B" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/09090B" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/09090B" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/09090B" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/09090B" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/09090B" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/09090B" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/09090B" },
  { name: "Dart", icon: "https://cdn.simpleicons.org/dart/09090B" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/09090B" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/09090B" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/09090B" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/09090B" },
  { name: "AWS", icon: "/images/tech/aws.svg" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/09090B" },
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
              className="flex shrink-0 items-center justify-center px-1 transition-opacity duration-200 hover:opacity-75"
              title={tech.name}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                draggable={false}
                className="h-8 w-8 object-contain md:h-10 md:w-10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  // Duplicate array to create a seamless loop
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section className="w-full bg-white py-6 md:py-8 flex flex-col items-center justify-center overflow-hidden border-y border-zinc-100">
      <div className="w-full relative flex items-center h-16 md:h-20">
        {/* Left & Right Gradients for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 md:gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {marqueeItems.map((tech, idx) => {
            // Slight vertical wave offset based on index to make it look like the reference image
            const yOffset = Math.sin((idx * Math.PI) / (techStack.length / 2)) * 12;

            return (
              <div
                key={idx}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 border border-zinc-100 flex items-center justify-center shadow-sm shrink-0 transition-all hover:scale-110 hover:shadow-md hover:border-zinc-200 group relative"
                style={{ transform: `translateY(${yOffset}px)` }}
                title={tech.name}
              >
                <div className="w-6 h-6 md:w-8 md:h-8 relative opacity-80 group-hover:opacity-100 transition-opacity">
                  <Image 
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Work", path: "/projects" },
  { name: "Experience", path: "/#experience" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > lastY && latest > 72);
    setLastY(latest);
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-white">
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: hidden ? -88 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-12"
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Tisee home">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-semibold tracking-[-0.04em] text-zinc-900 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.04]">
            T.
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.18em] text-zinc-900 sm:inline">TISEE</span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6 sm:gap-10">
          {navItems.map((item) => {
            const isWorkActive = item.path === "/projects" && pathname.startsWith("/projects");
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`group relative py-2 text-sm font-medium transition-colors ${
                  isWorkActive ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {item.name}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-black transition-transform duration-300 ${
                    isWorkActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <Link
          href="/#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors duration-300 hover:text-white sm:px-5"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-zinc-900 transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">Hire Me</span>
          <svg className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.nav>
    </div>
  );
}

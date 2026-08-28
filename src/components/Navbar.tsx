"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const navItems = [
  { name: "Work", shortName: "Work", path: "/projects" },
  { name: "Experience", shortName: "Exp.", path: "/#experience" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (shouldReduceMotion) {
      lastY.current = latest;
      return;
    }

    if (latest > lastY.current && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastY.current = latest;
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex w-full justify-center bg-white">
      <motion.nav
        initial={false}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
        className="w-full bg-white"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Tisee home"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
          >
            <BrandMark size={34} className="shrink-0 text-zinc-950" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] transition-[letter-spacing] duration-200 group-hover:tracking-[0.24em] sm:text-[13px]">
              Tisee
            </span>
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-2">
            {navItems.map((item) => {
              const isActive = item.path === "/projects" && pathname === "/projects";

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-1.5 text-xs font-medium transition-colors duration-200 after:absolute after:bottom-1.5 after:left-1.5 after:right-1.5 after:h-px after:origin-left after:bg-zinc-900 after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:px-3 sm:text-sm ${
                    isActive
                      ? "text-zinc-900 after:scale-x-100"
                      : "text-zinc-500 after:scale-x-0 hover:text-zinc-900 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  }`}
                >
                  <span className="sm:hidden">{item.shortName}</span>
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}

            <Link
              href="/#contact"
              className="group ml-0.5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-zinc-950 py-1 pl-3.5 pr-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:ml-1 sm:pl-4 sm:text-sm"
            >
              <span>Hire me</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

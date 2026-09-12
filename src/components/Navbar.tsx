"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const navItems = [
  { name: "Work", path: "/projects" },
  { name: "Experience", path: "/#experience" },
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
    <motion.div
      initial={false}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 flex w-full justify-center bg-white"
    >
      <nav className="w-full bg-white">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Tisee home"
            className="group inline-flex min-h-9 shrink-0 items-center gap-1.5 text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-3 sm:min-h-11 sm:gap-2"
          >
            <BrandMark size={30} className="h-[27px] w-[27px] shrink-0 text-zinc-950 sm:h-[30px] sm:w-[30px]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.13em] transition-[letter-spacing] duration-200 group-hover:tracking-[0.18em] sm:text-[13px] sm:tracking-[0.18em] sm:group-hover:tracking-[0.24em]">
              Tisee
            </span>
          </Link>

          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = item.path === "/projects" && pathname === "/projects";

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-9 items-center whitespace-nowrap px-1.5 text-[11px] font-medium leading-none text-zinc-950 transition-colors duration-200 after:absolute after:bottom-1 after:left-1.5 after:right-1.5 after:h-px after:origin-left after:bg-zinc-900 after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:min-h-11 sm:px-3 sm:text-[13px] sm:after:bottom-1.5 ${
                    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/#contact"
              className="group relative ml-0.5 inline-flex h-8 min-h-8 items-center justify-center overflow-hidden whitespace-nowrap rounded-[9px] bg-zinc-950 px-2.5 text-[10px] font-semibold leading-none tracking-[0.015em] text-white ring-1 ring-inset ring-zinc-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-black active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 motion-reduce:transform-none sm:ml-1 sm:h-9 sm:min-h-9 sm:rounded-[10px] sm:px-3 sm:text-[11px] sm:tracking-[0.025em]"
            >
              <span className="relative block overflow-hidden py-px">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                  Hire me
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                >
                  Hire me
                </span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

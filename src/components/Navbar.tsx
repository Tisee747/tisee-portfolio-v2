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
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Tisee home"
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:gap-2"
          >
            <BrandMark size={30} className="shrink-0 text-zinc-950" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] transition-[letter-spacing] duration-200 group-hover:tracking-[0.2em] sm:text-[13px] sm:tracking-[0.18em] sm:group-hover:tracking-[0.24em]">
              Tisee
            </span>
          </Link>

          <div className="flex min-w-0 items-center gap-0 sm:gap-2">
            {navItems.map((item) => {
              const isActive = item.path === "/projects" && pathname === "/projects";

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-1 text-[11px] font-medium transition-colors duration-200 after:absolute after:bottom-1.5 after:left-1 after:right-1 after:h-px after:origin-left after:bg-zinc-900 after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:px-3 sm:text-sm sm:after:left-1.5 sm:after:right-1.5 ${
                    isActive
                      ? "text-zinc-900 after:scale-x-100"
                      : "text-zinc-500 after:scale-x-0 hover:text-zinc-900 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/#contact"
              className="group relative ml-1 inline-flex min-h-10 items-center justify-center overflow-hidden rounded-[12px] border border-zinc-950 bg-white px-3 text-[11px] font-semibold tracking-[0.025em] text-zinc-950 shadow-[0_3px_0_#18181b,0_8px_20px_rgba(9,9,11,0.10)] transition-[transform,background-color,color,box-shadow] duration-200 ease-out before:pointer-events-none before:absolute before:inset-[3px] before:rounded-[8px] before:border before:border-zinc-200 before:content-[''] hover:-translate-y-px hover:bg-zinc-950 hover:text-white hover:shadow-[0_2px_0_#18181b,0_10px_24px_rgba(9,9,11,0.16)] active:translate-y-[2px] active:shadow-[0_1px_0_#18181b,0_6px_14px_rgba(9,9,11,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-3 motion-reduce:transform-none sm:min-h-11 sm:rounded-[14px] sm:px-5 sm:text-[13px] sm:tracking-[0.045em] sm:shadow-[0_4px_0_#18181b,0_10px_24px_rgba(9,9,11,0.10)] sm:before:rounded-[10px]"
            >
              <span className="relative z-10">Hire me</span>
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

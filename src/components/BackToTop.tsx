"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > 520);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-900 shadow-[0_10px_30px_rgba(24,24,27,0.14)] backdrop-blur transition-[opacity,transform,border-color,background-color] duration-200 hover:border-zinc-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 14V4M9 4L5 8M9 4L13 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

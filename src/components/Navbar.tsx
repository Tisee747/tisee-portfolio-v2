"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/#experience" },
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center w-full">
      <motion.nav 
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full bg-white/40 backdrop-blur-2xl flex items-center justify-center md:justify-center h-16 px-4 md:px-8"
      >
        <div className="flex gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/");
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  isActive 
                    ? "text-zinc-900 bg-black/5" 
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-black/5"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}

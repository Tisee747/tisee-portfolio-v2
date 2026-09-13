"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PandaState = "idle" | "curious" | "eating" | "rolling";

const clickReactions: Exclude<PandaState, "idle">[] = ["eating", "rolling", "curious"];

const spritePosition: Record<Exclude<PandaState, "rolling">, string> = {
  idle: "0% 0%",
  curious: "50% 0%",
  eating: "100% 0%",
};

const rollingPositions = ["0% 100%", "50% 100%", "100% 100%"];

export default function PandaPet() {
  const [state, setState] = useState<PandaState>("idle");
  const [reactionIndex, setReactionIndex] = useState(0);
  const [rollFrame, setRollFrame] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (state === "idle") return;

    if (state === "rolling") {
      setRollFrame(0);
      const frame1 = window.setTimeout(() => setRollFrame(1), 280);
      const frame2 = window.setTimeout(() => setRollFrame(2), 560);
      const done = window.setTimeout(() => setState("idle"), 920);
      return () => {
        window.clearTimeout(frame1);
        window.clearTimeout(frame2);
        window.clearTimeout(done);
      };
    }

    const duration = state === "eating" ? 2400 : 1500;
    const timer = window.setTimeout(() => setState("idle"), duration);
    return () => window.clearTimeout(timer);
  }, [state]);

  const react = () => {
    const nextState = clickReactions[reactionIndex % clickReactions.length];
    setReactionIndex((index) => index + 1);
    setState(nextState);
  };

  const backgroundPosition =
    state === "rolling" ? rollingPositions[rollFrame] : spritePosition[state];

  return (
    <motion.button
      type="button"
      onClick={react}
      onMouseEnter={() => {
        if (state === "idle") setState("curious");
      }}
      onMouseLeave={() => {
        if (state === "curious") setState("idle");
      }}
      aria-label="Play with panda mascot"
      title="Play with panda"
      className="fixed bottom-3 left-2 z-30 h-32 w-28 cursor-pointer overflow-hidden bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:bottom-4 sm:left-4 sm:h-[162px] sm:w-36"
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.965 }}
      animate={
        shouldReduceMotion
          ? { x: 0, y: 0, rotate: 0 }
          : state === "rolling"
            ? { x: [0, 6, 15, 0], y: [0, -4, 0, 0], rotate: [0, -5, 7, 0] }
            : state === "eating"
              ? { x: 0, y: [0, -1.5, 0], rotate: 0 }
              : state === "curious"
                ? { x: 0, y: -3, rotate: -2 }
                : { x: 0, y: [0, -2, 0], rotate: 0 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : state === "eating"
            ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            : state === "idle"
              ? { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25, ease: "easeOut" }
      }
      style={{ transformOrigin: "50% 78%" }}
    >
      <div
        aria-hidden="true"
        className="h-full w-full bg-no-repeat"
        style={{
          backgroundImage: "url('/images/panda/panda-mascot-sheet.webp')",
          backgroundSize: "300% 200%",
          backgroundPosition,
          filter: "brightness(1.025) contrast(1.015)",
        }}
      />
    </motion.button>
  );
}

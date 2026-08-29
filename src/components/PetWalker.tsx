"use client";

import { useEffect, useRef, useState } from "react";

const MAX_ROLL_STEPS = 5;
const EDGE_GUTTER = 8;

type PetPhase = "idle" | "rolling" | "returning";

export default function PetWalker() {
  const runnerRef = useRef<HTMLButtonElement>(null);
  const queuedRolls = useRef(0);
  const [step, setStep] = useState(0);
  const [travelX, setTravelX] = useState(0);
  const [phase, setPhase] = useState<PetPhase>("idle");

  function getTravelForStep(targetStep: number) {
    const runnerWidth = runnerRef.current?.offsetWidth ?? 0;
    const maxTravel = Math.max(0, window.innerWidth - runnerWidth - EDGE_GUTTER * 2);
    return (targetStep / MAX_ROLL_STEPS) * maxTravel;
  }

  function startRoll(targetStep: number) {
    const nextStep = Math.min(targetStep, MAX_ROLL_STEPS);
    setPhase("rolling");
    setStep(nextStep);
    setTravelX(getTravelForStep(nextStep));
  }

  useEffect(() => {
    const handleResize = () => {
      const runnerWidth = runnerRef.current?.offsetWidth ?? 0;
      const maxTravel = Math.max(0, window.innerWidth - runnerWidth - EDGE_GUTTER * 2);
      setTravelX((step / MAX_ROLL_STEPS) * maxTravel);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [step]);

  function requestRoll() {
    if (phase === "returning") return;

    if (phase === "rolling") {
      const remainingSteps = Math.max(0, MAX_ROLL_STEPS - step);
      queuedRolls.current = Math.min(queuedRolls.current + 1, remainingSteps);
      return;
    }

    startRoll(step + 1);
  }

  function handleTravelEnd(event: React.TransitionEvent<HTMLButtonElement>) {
    if (event.currentTarget !== event.target || event.propertyName !== "transform" || phase !== "rolling") {
      return;
    }

    if (step >= MAX_ROLL_STEPS) {
      queuedRolls.current = 0;
      setPhase("returning");
      return;
    }

    if (queuedRolls.current > 0) {
      queuedRolls.current -= 1;
      startRoll(step + 1);
      return;
    }

    setPhase("idle");
  }

  function handleReturnEnd(event: React.AnimationEvent<HTMLButtonElement>) {
    if (event.currentTarget !== event.target || event.animationName !== "tisee-panda-return") return;

    queuedRolls.current = 0;
    setStep(0);
    setTravelX(0);
    setPhase("idle");
  }

  return (
    <button
      ref={runnerRef}
      type="button"
      className={`tisee-pet-runner tisee-pet-${phase}`}
      style={{ transform: `translate3d(${travelX}px, 0, 0)` }}
      onClick={requestRoll}
      onTransitionEnd={handleTravelEnd}
      onAnimationEnd={handleReturnEnd}
      aria-label={phase === "returning" ? "Panda returning home" : "Roll the panda one step"}
      aria-disabled={phase === "returning"}
      title="Tap the panda to roll"
    >
      <span className="tisee-pet-shadow" aria-hidden="true" />
      <span className="tisee-pet-roll" aria-hidden="true">
        <span className="tisee-pet-squish">
          <svg viewBox="0 0 132 112" role="presentation" focusable="false" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="pandaFur" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.58" stopColor="#F4F4F5" />
                <stop offset="1" stopColor="#D4D4D8" />
              </linearGradient>
              <linearGradient id="pandaBlack" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#27272A" />
                <stop offset="1" stopColor="#09090B" />
              </linearGradient>
              <linearGradient id="bambooStem" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#166534" />
                <stop offset="0.48" stopColor="#22C55E" />
                <stop offset="1" stopColor="#15803D" />
              </linearGradient>
            </defs>

            <g className="tisee-panda-bamboo">
              <rect x="96" y="24" width="7" height="67" rx="3.5" fill="url(#bambooStem)" />
              <rect x="95" y="43" width="9" height="2.5" rx="1" fill="#14532D" opacity="0.72" />
              <rect x="95" y="65" width="9" height="2.5" rx="1" fill="#14532D" opacity="0.72" />
              <path d="M99 34C109 22 117 22 121 25C116 35 109 39 100 40Z" fill="#4ADE80" />
              <path d="M100 51C112 45 120 49 122 53C114 60 107 61 100 58Z" fill="#22C55E" />
              <path d="M99 72C109 69 116 73 118 78C110 83 104 82 99 79Z" fill="#4ADE80" />
            </g>

            <g className="tisee-panda-body">
              <ellipse cx="61" cy="78" rx="35" ry="27" fill="url(#pandaFur)" />
              <ellipse cx="35" cy="84" rx="14" ry="10" fill="url(#pandaBlack)" transform="rotate(20 35 84)" />
              <ellipse cx="87" cy="84" rx="14" ry="10" fill="url(#pandaBlack)" transform="rotate(-20 87 84)" />
              <ellipse cx="44" cy="96" rx="14" ry="8" fill="url(#pandaBlack)" transform="rotate(-10 44 96)" />
              <ellipse cx="78" cy="96" rx="14" ry="8" fill="url(#pandaBlack)" transform="rotate(10 78 96)" />

              <g className="tisee-panda-head">
                <circle cx="38" cy="31" r="14" fill="url(#pandaBlack)" />
                <circle cx="84" cy="31" r="14" fill="url(#pandaBlack)" />
                <rect x="27" y="25" width="68" height="58" rx="29" fill="url(#pandaFur)" />
                <ellipse cx="43" cy="48" rx="11" ry="14" fill="url(#pandaBlack)" transform="rotate(24 43 48)" />
                <ellipse cx="79" cy="48" rx="11" ry="14" fill="url(#pandaBlack)" transform="rotate(-24 79 48)" />
                <ellipse cx="44" cy="48" rx="3.4" ry="4.2" fill="#FAFAFA" />
                <ellipse cx="78" cy="48" rx="3.4" ry="4.2" fill="#FAFAFA" />
                <circle cx="45" cy="47" r="1.5" fill="#60A5FA" />
                <circle cx="79" cy="47" r="1.5" fill="#60A5FA" />
                <ellipse cx="61" cy="63" rx="15" ry="10" fill="#E4E4E7" />
                <path d="M56 59C58 56 64 56 66 59C65 63 63 65 61 65C59 65 57 63 56 59Z" fill="#18181B" />
                <path
                  className="tisee-panda-mouth"
                  d="M61 65C61 69 57.5 71 54.5 69.5M61 65C61 69 64.5 71 67.5 69.5"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <ellipse cx="37" cy="65" rx="5" ry="2.5" fill="#FDA4AF" opacity="0.45" />
                <ellipse cx="85" cy="65" rx="5" ry="2.5" fill="#FDA4AF" opacity="0.45" />
                <path d="M35 34C43 27 56 25 67 27" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
              </g>

              <g className="tisee-panda-paws">
                <ellipse cx="91" cy="66" rx="10" ry="14" fill="url(#pandaBlack)" transform="rotate(19 91 66)" />
                <ellipse cx="91" cy="80" rx="9" ry="13" fill="url(#pandaBlack)" transform="rotate(-12 91 80)" />
              </g>

              <path d="M36 74C48 68 76 67 88 74" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  );
}

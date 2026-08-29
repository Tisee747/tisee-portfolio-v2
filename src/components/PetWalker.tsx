"use client";

import { useRef, useState } from "react";

const MAX_ROLL_STEPS = 5;

type PetPhase = "idle" | "rolling" | "returning";

export default function PetWalker() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<PetPhase>("idle");
  const queuedRolls = useRef(0);

  const progress = step / MAX_ROLL_STEPS;
  const positionStyle = {
    left: `calc(8px + ${progress * 100}vw - ${progress * 16}px)`,
    transform: `translate3d(-${progress * 100}%, 0, 0)`,
  };

  function requestRoll() {
    if (phase === "returning") return;

    if (phase === "rolling") {
      const remainingSteps = Math.max(0, MAX_ROLL_STEPS - step);
      queuedRolls.current = Math.min(queuedRolls.current + 1, remainingSteps);
      return;
    }

    if (step >= MAX_ROLL_STEPS) {
      setPhase("returning");
      return;
    }

    setPhase("rolling");
    setStep((current) => Math.min(current + 1, MAX_ROLL_STEPS));
  }

  function handleTravelEnd(event: React.TransitionEvent<HTMLButtonElement>) {
    if (event.currentTarget !== event.target || event.propertyName !== "left" || phase !== "rolling") {
      return;
    }

    if (step >= MAX_ROLL_STEPS) {
      queuedRolls.current = 0;
      setPhase("returning");
      return;
    }

    if (queuedRolls.current > 0) {
      queuedRolls.current -= 1;
      setStep((current) => Math.min(current + 1, MAX_ROLL_STEPS));
      return;
    }

    setPhase("idle");
  }

  function handleReturnEnd(event: React.AnimationEvent<HTMLButtonElement>) {
    if (event.currentTarget !== event.target || event.animationName !== "tisee-panda-return") return;

    queuedRolls.current = 0;
    setStep(0);
    setPhase("idle");
  }

  return (
    <button
      type="button"
      className={`tisee-pet-runner tisee-pet-${phase}`}
      style={positionStyle}
      onClick={requestRoll}
      onTransitionEnd={handleTravelEnd}
      onAnimationEnd={handleReturnEnd}
      aria-label="Roll the panda"
      title="Roll the panda"
    >
      <span className="tisee-pet-shadow" aria-hidden="true" />
      <span className="tisee-pet-roll" aria-hidden="true">
        <span className="tisee-pet-squish">
          <svg
            viewBox="0 0 104 78"
            role="presentation"
            focusable="false"
            shapeRendering="geometricPrecision"
          >
            <g className="tisee-panda-bamboo">
              <path d="M79 12L72 66" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
              <path d="M75 28L88 20" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
              <path d="M74 39L89 45" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
              <path d="M77 22L69 16" stroke="#4ADE80" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            <g className="tisee-panda-body">
              <circle cx="28" cy="19" r="10" fill="#18181B" />
              <circle cx="66" cy="19" r="10" fill="#18181B" />

              <ellipse
                cx="47"
                cy="42"
                rx="31"
                ry="28"
                fill="#FFFFFF"
                stroke="#18181B"
                strokeWidth="3.5"
              />

              <ellipse cx="24" cy="51" rx="8" ry="13" fill="#18181B" transform="rotate(28 24 51)" />
              <ellipse cx="69" cy="50" rx="8" ry="13" fill="#18181B" transform="rotate(-28 69 50)" />
              <ellipse cx="34" cy="63" rx="8" ry="6" fill="#18181B" transform="rotate(-18 34 63)" />
              <ellipse cx="60" cy="63" rx="8" ry="6" fill="#18181B" transform="rotate(18 60 63)" />

              <ellipse cx="35" cy="36" rx="8" ry="10" fill="#18181B" transform="rotate(28 35 36)" />
              <ellipse cx="59" cy="36" rx="8" ry="10" fill="#18181B" transform="rotate(-28 59 36)" />
              <circle cx="36" cy="36" r="2.6" fill="#FFFFFF" />
              <circle cx="58" cy="36" r="2.6" fill="#FFFFFF" />
              <circle cx="36.7" cy="35.4" r="1" fill="#60A5FA" />
              <circle cx="58.7" cy="35.4" r="1" fill="#60A5FA" />

              <path
                d="M43 45C45 43 49 43 51 45C51 48 49 50 47 50C45 50 43 48 43 45Z"
                fill="#18181B"
              />
              <path
                className="tisee-panda-mouth"
                d="M47 50C47 53 44 54 42 53M47 50C47 53 50 54 52 53"
                fill="none"
                stroke="#18181B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <g className="tisee-panda-paws">
                <ellipse cx="74" cy="46" rx="6.5" ry="8" fill="#18181B" transform="rotate(16 74 46)" />
                <ellipse cx="71" cy="58" rx="6" ry="8" fill="#18181B" transform="rotate(-12 71 58)" />
              </g>

              <path
                d="M68 29C73 31 76 35 77 40"
                fill="none"
                stroke="#2563EB"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="77" cy="41" r="3" fill="#2563EB" stroke="#18181B" strokeWidth="1.5" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  );
}

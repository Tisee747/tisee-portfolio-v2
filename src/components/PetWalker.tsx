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
      title="Click the panda to roll"
    >
      <span className="tisee-pet-shadow" aria-hidden="true" />
      <span className="tisee-pet-roll" aria-hidden="true">
        <span className="tisee-pet-squish">
          <svg
            viewBox="0 0 128 96"
            role="presentation"
            focusable="false"
            shapeRendering="crispEdges"
          >
            <g className="tisee-panda-bamboo">
              <rect x="91" y="20" width="7" height="61" fill="#166534" />
              <rect x="92" y="22" width="3" height="57" fill="#22C55E" />
              <rect x="90" y="35" width="9" height="3" fill="#14532D" />
              <rect x="90" y="54" width="9" height="3" fill="#14532D" />
              <path d="M94 28L108 17L112 21L99 32Z" fill="#22C55E" />
              <path d="M95 47L111 39L114 44L98 51Z" fill="#4ADE80" />
              <path d="M94 63L106 69L103 74L96 68Z" fill="#22C55E" />
            </g>

            <g className="tisee-panda-body">
              <g className="tisee-panda-voxel-body">
                <path d="M31 52H73L84 60V82H41L31 74Z" fill="#E5E7EB" />
                <rect x="31" y="48" width="43" height="31" fill="#F8FAFC" />
                <path d="M74 48L86 56V78L74 79Z" fill="#C7CBD1" />
                <path d="M31 48L41 41H83L74 48Z" fill="#FFFFFF" />
                <rect x="27" y="58" width="11" height="22" fill="#111827" />
                <rect x="69" y="61" width="13" height="19" fill="#111827" />
                <rect x="36" y="76" width="18" height="10" fill="#111827" />
                <rect x="64" y="75" width="18" height="11" fill="#111827" />
                <rect x="40" y="80" width="11" height="3" fill="#374151" />
                <rect x="68" y="79" width="11" height="3" fill="#374151" />
              </g>

              <g className="tisee-panda-head">
                <rect x="32" y="13" width="15" height="15" fill="#0F172A" />
                <rect x="70" y="13" width="15" height="15" fill="#0F172A" />
                <rect x="35" y="17" width="45" height="40" fill="#F8FAFC" />
                <path d="M80 17L92 25V58L80 57Z" fill="#C7CBD1" />
                <path d="M35 17L45 10H82L92 17H80L75 14H47L42 17Z" fill="#FFFFFF" />
                <rect x="41" y="29" width="13" height="15" fill="#111827" />
                <rect x="63" y="29" width="13" height="15" fill="#111827" />
                <rect x="45" y="33" width="4" height="5" fill="#F8FAFC" />
                <rect x="67" y="33" width="4" height="5" fill="#F8FAFC" />
                <rect x="46" y="33" width="2" height="2" fill="#60A5FA" />
                <rect x="68" y="33" width="2" height="2" fill="#60A5FA" />
                <rect x="54" y="43" width="8" height="6" fill="#111827" />
                <rect className="tisee-panda-mouth" x="56" y="50" width="4" height="3" fill="#111827" />
                <rect x="38" y="22" width="4" height="8" fill="#FFFFFF" opacity="0.8" />
                <rect x="80" y="27" width="5" height="18" fill="#AEB4BD" />
              </g>

              <g className="tisee-panda-scarf">
                <rect x="38" y="54" width="36" height="5" fill="#2563EB" />
                <rect x="72" y="57" width="7" height="12" fill="#1D4ED8" />
                <rect x="75" y="66" width="5" height="4" fill="#60A5FA" />
              </g>

              <g className="tisee-panda-paws">
                <rect x="77" y="50" width="11" height="13" fill="#111827" />
                <rect x="80" y="60" width="10" height="12" fill="#111827" />
                <rect x="86" y="55" width="7" height="5" fill="#374151" />
              </g>

              <g opacity="0.7">
                <rect x="39" y="51" width="6" height="2" fill="#FFFFFF" />
                <rect x="48" y="51" width="15" height="2" fill="#E5E7EB" />
              </g>
            </g>
          </svg>
        </span>
      </span>
    </button>
  );
}

"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const MAX_ROLL_STEPS = 5;
const EDGE_GUTTER = 8;
const STEP_DURATION_MS = 560;
const RETURN_DURATION_MS = 1120;

type PetPhase = "idle" | "rolling" | "returning";

type PandaFrameProps = {
  className: string;
  src: string;
};

function PandaFrame({ className, src }: PandaFrameProps) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(max-width: 640px) 84px, 96px"
      className={className}
      loading="eager"
      draggable={false}
    />
  );
}

export default function PetWalker() {
  const runnerRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<PetPhase>("idle");
  const stepRef = useRef(0);
  const queuedRollsRef = useRef(0);
  const movementTokenRef = useRef(0);
  const returnTokenRef = useRef(0);
  const resizeFrameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const [phase, setPhase] = useState<PetPhase>("idle");
  const [step, setStep] = useState(0);
  const [travelX, setTravelX] = useState(0);
  const [maxTravel, setMaxTravel] = useState(0);
  const [rollToken, setRollToken] = useState(0);

  const getMaxTravel = useCallback(() => {
    if (typeof window === "undefined") return 0;

    const runnerWidth = runnerRef.current?.offsetWidth ?? 0;
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    return Math.max(0, viewportWidth - runnerWidth - EDGE_GUTTER * 2);
  }, []);

  const getTravelForStep = useCallback((targetStep: number) => {
    return (targetStep / MAX_ROLL_STEPS) * getMaxTravel();
  }, [getMaxTravel]);

  const petStyle = {
    transform: `translate3d(${travelX}px, 0, 0)`,
    "--tisee-pet-edge-travel": `${maxTravel}px`,
  } as CSSProperties;

  const setMotion = useCallback((nextPhase: PetPhase, nextStep: number) => {
    phaseRef.current = nextPhase;
    stepRef.current = nextStep;
    setPhase(nextPhase);
    setStep(nextStep);
  }, []);

  const finishReturn = useCallback((token: number) => {
    if (phaseRef.current !== "returning" || returnTokenRef.current !== token) return;

    queuedRollsRef.current = 0;
    setMotion("idle", 0);
    setTravelX(0);
  }, [setMotion]);

  const startReturn = useCallback(() => {
    if (phaseRef.current !== "rolling") return;

    queuedRollsRef.current = 0;
    returnTokenRef.current += 1;
    setMotion("returning", MAX_ROLL_STEPS);
  }, [setMotion]);

  const startRoll = useCallback((targetStep: number) => {
    const nextStep = Math.min(Math.max(targetStep, 1), MAX_ROLL_STEPS);

    movementTokenRef.current += 1;
    setMotion("rolling", nextStep);
    setTravelX(getTravelForStep(nextStep));
    setRollToken((token) => token + 1);
  }, [getTravelForStep, setMotion]);

  const advanceRollStep = useCallback(() => {
    if (phaseRef.current !== "rolling") return;

    const currentStep = stepRef.current;

    if (currentStep >= MAX_ROLL_STEPS) {
      startReturn();
      return;
    }

    if (queuedRollsRef.current > 0) {
      queuedRollsRef.current -= 1;
      startRoll(currentStep + 1);
      return;
    }

    setMotion("idle", currentStep);
  }, [setMotion, startReturn, startRoll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (phase === "rolling") {
      const movementToken = movementTokenRef.current;
      const delay = prefersReducedMotionRef.current ? 0 : STEP_DURATION_MS;
      const timer = window.setTimeout(() => {
        if (movementTokenRef.current === movementToken) advanceRollStep();
      }, delay);

      return () => window.clearTimeout(timer);
    }

    if (phase === "returning") {
      const returnToken = returnTokenRef.current;
      const delay = prefersReducedMotionRef.current ? 0 : RETURN_DURATION_MS;
      const timer = window.setTimeout(() => finishReturn(returnToken), delay);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [advanceRollStep, finishReturn, phase, step]);

  useEffect(() => {
    const updateTravel = () => {
      const nextMaxTravel = getMaxTravel();
      setMaxTravel(nextMaxTravel);
      setTravelX((stepRef.current / MAX_ROLL_STEPS) * nextMaxTravel);
    };
    const handleResize = () => {
      if (resizeFrameRef.current !== null) return;

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        updateTravel();
      });
    };

    updateTravel();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeFrameRef.current !== null) window.cancelAnimationFrame(resizeFrameRef.current);
    };
  }, [getMaxTravel]);

  function requestRoll() {
    const currentPhase = phaseRef.current;
    const currentStep = stepRef.current;

    if (currentPhase === "returning") return;

    if (currentPhase === "rolling") {
      const remainingSteps = Math.max(0, MAX_ROLL_STEPS - currentStep);
      queuedRollsRef.current = Math.min(remainingSteps, queuedRollsRef.current + 1);
      return;
    }

    if (currentStep < MAX_ROLL_STEPS) {
      queuedRollsRef.current = 0;
      startRoll(currentStep + 1);
    }
  }

  return (
    <button
      ref={runnerRef}
      type="button"
      className={`tisee-pet-runner tisee-pet-${phase}`}
      style={petStyle}
      onClick={requestRoll}
      aria-label={phase === "returning" ? "Panda is returning home" : "Roll the panda one step"}
      aria-disabled={phase === "returning"}
      data-panda-phase={phase}
      data-panda-step={step}
      title="Tap the panda to roll"
    >
      <span className="tisee-pet-shadow" aria-hidden="true" />
      <span className="tisee-pet-art" key={rollToken} aria-hidden="true">
        <span className="tisee-pet-idle-frames">
          <PandaFrame
            src="/images/panda/panda-idle-1.png"
            className="tisee-pet-frame tisee-pet-frame-idle-1"
          />
          <PandaFrame
            src="/images/panda/panda-idle-2.png"
            className="tisee-pet-frame tisee-pet-frame-idle-2"
          />
        </span>
        <span className="tisee-pet-roll-frames">
          <PandaFrame
            src="/images/panda/panda-roll-crouch.png"
            className="tisee-pet-frame tisee-pet-roll-frame tisee-pet-roll-frame-crouch"
          />
          <PandaFrame
            src="/images/panda/panda-roll-mid.png"
            className="tisee-pet-frame tisee-pet-roll-frame tisee-pet-roll-frame-mid"
          />
          <PandaFrame
            src="/images/panda/panda-roll-land.png"
            className="tisee-pet-frame tisee-pet-roll-frame tisee-pet-roll-frame-land"
          />
        </span>
      </span>
    </button>
  );
}

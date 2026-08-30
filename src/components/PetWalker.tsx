"use client";

import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DRAG_THRESHOLD_PX = 7;
const SPEECH_DURATION_MS = 3600;
const BUBBLE_GAP_PX = 13;
const BUBBLE_VIEWPORT_GUTTER_PX = 10;

const SPEECH_LINES = [
  "Welcome. Take a look around.",
  "Good to see you.",
  "Take your time.",
  "Ready when you are.",
  "Let’s make something useful.",
] as const;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Position = {
  x: number;
  y: number;
};

type DragState = Position & {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  moved: boolean;
};

type PandaStyle = CSSProperties & {
  "--tisee-panda-x": string;
  "--tisee-panda-y": string;
};

type ViewportBounds = {
  maxX: number;
  maxY: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  viewportHeight: number;
  viewportWidth: number;
};

function readPixels(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function PandaArtwork() {
  return (
    <svg
      aria-hidden="true"
      className="tisee-panda-svg"
      focusable="false"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tisee-panda-ink" x1="36" y1="24" x2="94" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#27272A" />
          <stop offset="1" stopColor="#09090B" />
        </linearGradient>
        <linearGradient id="tisee-panda-face" x1="47" y1="33" x2="76" y2="91" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4F4F5" />
        </linearGradient>
      </defs>

      <g className="tisee-panda-figure">
        <g className="tisee-panda-body">
          <path
            d="M39 71C42.8 64.5 51.1 60 64 60C76.9 60 85.2 64.5 89 71L96 99.5C97.2 104.3 93.6 109 88.7 109H39.3C34.4 109 30.8 104.3 32 99.5L39 71Z"
            fill="url(#tisee-panda-ink)"
          />
          <path
            d="M46 76.5C50.5 72.8 56.5 71 64 71C71.5 71 77.5 72.8 82 76.5L80.5 96.5C80.1 101.4 76 105 71.1 105H56.9C52 105 47.9 101.4 47.5 96.5L46 76.5Z"
            fill="url(#tisee-panda-face)"
          />
          <path
            d="M37 79C30.5 78.1 25.8 81.1 24 86.1C22.8 89.5 25.1 92.5 28.6 92C33 91.4 37.4 87.5 40 83L37 79Z"
            fill="#18181B"
          />
          <path
            d="M91 79C97.5 78.1 102.2 81.1 104 86.1C105.2 89.5 102.9 92.5 99.4 92C95 91.4 90.6 87.5 88 83L91 79Z"
            fill="#18181B"
          />
          <rect x="43" y="100" width="15" height="10" rx="6" fill="#18181B" />
          <rect x="70" y="100" width="15" height="10" rx="6" fill="#18181B" />
          <path d="M48 102.5H53" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M75 102.5H80" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M44 72.5C49.3 76 55.9 77.8 64 77.8C72.1 77.8 78.7 76 84 72.5" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" />
          <circle cx="64" cy="86" r="4.5" fill="#FFFFFF" />
          <circle cx="64" cy="86" r="1.6" fill="#18181B" />
        </g>

        <g className="tisee-panda-head">
          <circle cx="38" cy="28" r="15.5" fill="#111113" />
          <circle cx="90" cy="28" r="15.5" fill="#111113" />
          <path
            d="M27 41C27 28.3 37.3 18 50 18H78C90.7 18 101 28.3 101 41V56.5C101 70.6 89.6 82 75.5 82H52.5C38.4 82 27 70.6 27 56.5V41Z"
            fill="url(#tisee-panda-ink)"
          />
          <path
            d="M37 48.5C37 38.3 45.3 30 55.5 30H72.5C82.7 30 91 38.3 91 48.5V56.2C91 67.1 82.1 76 71.2 76H56.8C45.9 76 37 67.1 37 56.2V48.5Z"
            fill="url(#tisee-panda-face)"
          />
          <ellipse cx="47.5" cy="50.5" rx="8.8" ry="11.5" transform="rotate(27 47.5 50.5)" fill="#18181B" />
          <ellipse cx="80.5" cy="50.5" rx="8.8" ry="11.5" transform="rotate(-27 80.5 50.5)" fill="#18181B" />
          <g className="tisee-panda-eyes">
            <ellipse cx="49" cy="51" rx="2.4" ry="3.4" fill="#FFFFFF" />
            <ellipse cx="79" cy="51" rx="2.4" ry="3.4" fill="#FFFFFF" />
            <circle cx="49.4" cy="51.5" r="1.2" fill="#09090B" />
            <circle cx="78.6" cy="51.5" r="1.2" fill="#09090B" />
          </g>
          <path d="M60.2 61.1C62 59.7 66 59.7 67.8 61.1C68.7 61.8 68.3 63.3 67.1 63.7L65.8 64.1C64.6 64.5 63.4 64.5 62.2 64.1L60.9 63.7C59.7 63.3 59.3 61.8 60.2 61.1Z" fill="#09090B" />
          <path d="M64 64V66.5C64 68.1 62.7 69.3 61.1 69.3" stroke="#52525B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M64 66.5C64 68.1 65.3 69.3 66.9 69.3" stroke="#52525B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M54 36.5C58 33.5 70 33.5 74 36.5" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

export default function PandaCompanion() {
  const pandaRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const speechTimerRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const nextSpeechIndexRef = useRef(1);

  const [speech, setSpeech] = useState<(typeof SPEECH_LINES)[number]>(SPEECH_LINES[0]);
  const [isSpeechVisible, setIsSpeechVisible] = useState(true);

  const getViewportBounds = useCallback((): ViewportBounds => {
    const node = pandaRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (!node) {
      return {
        maxX: Math.max(0, viewportWidth - 112 - 24),
        maxY: Math.max(0, viewportHeight - 122 - 24),
        marginBottom: 12,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
        viewportHeight,
        viewportWidth,
      };
    }

    const computedStyle = window.getComputedStyle(node);
    const marginLeft = readPixels(computedStyle.marginLeft, 12);
    const marginRight = readPixels(computedStyle.marginRight, 12);
    const marginTop = readPixels(computedStyle.marginTop, 12);
    const marginBottom = readPixels(computedStyle.marginBottom, 12);
    const width = node.offsetWidth;
    const height = node.offsetHeight;

    return {
      maxX: Math.max(0, viewportWidth - marginLeft - marginRight - width),
      maxY: Math.max(0, viewportHeight - marginTop - marginBottom - height),
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      viewportHeight,
      viewportWidth,
    };
  }, []);

  const applyPosition = useCallback(
    (nextPosition: Position) => {
      const node = pandaRef.current;
      if (!node) return;

      const bounds = getViewportBounds();
      const clampedPosition = {
        x: Math.min(Math.max(nextPosition.x, 0), bounds.maxX),
        y: Math.min(Math.max(nextPosition.y, 0), bounds.maxY),
      };

      positionRef.current = clampedPosition;
      node.style.setProperty("--tisee-panda-x", `${clampedPosition.x}px`);
      node.style.setProperty("--tisee-panda-y", `${clampedPosition.y}px`);
    },
    [getViewportBounds],
  );

  const updateBubbleLayout = useCallback(() => {
    const node = pandaRef.current;
    const bubble = bubbleRef.current;
    if (!node || !bubble) return;

    const bounds = getViewportBounds();
    const pandaRect = node.getBoundingClientRect();
    const bubbleWidth = bubble.offsetWidth;
    const bubbleHeight = bubble.offsetHeight;
    const minBubbleLeft = bounds.marginLeft + BUBBLE_VIEWPORT_GUTTER_PX;
    const maxBubbleLeft = Math.max(
      minBubbleLeft,
      bounds.viewportWidth - bounds.marginRight - BUBBLE_VIEWPORT_GUTTER_PX - bubbleWidth,
    );
    const naturalBubbleLeft = pandaRect.left + pandaRect.width / 2 - bubbleWidth / 2;
    const bubbleShiftX = Math.min(
      Math.max(0, minBubbleLeft - naturalBubbleLeft),
      maxBubbleLeft - naturalBubbleLeft,
    );

    const naturalAboveTop = pandaRect.top - BUBBLE_GAP_PX - bubbleHeight;
    const naturalBelowTop = pandaRect.bottom + BUBBLE_GAP_PX;
    const safeTop = bounds.marginTop + BUBBLE_VIEWPORT_GUTTER_PX;
    const safeBottom = bounds.viewportHeight - bounds.marginBottom - BUBBLE_VIEWPORT_GUTTER_PX;
    const aboveFits = naturalAboveTop >= safeTop;
    const belowFits = naturalBelowTop + bubbleHeight <= safeBottom;
    const placeBelow = !aboveFits && (belowFits || naturalBelowTop - safeTop > safeBottom - naturalAboveTop - bubbleHeight);
    const naturalBubbleTop = placeBelow ? naturalBelowTop : naturalAboveTop;
    const clampedBubbleTop = Math.min(
      Math.max(naturalBubbleTop, safeTop),
      Math.max(safeTop, safeBottom - bubbleHeight),
    );

    node.dataset.bubblePlacement = placeBelow ? "below" : "above";
    node.style.setProperty("--tisee-panda-bubble-shift-x", `${bubbleShiftX}px`);
    node.style.setProperty("--tisee-panda-bubble-shift-y", `${clampedBubbleTop - naturalBubbleTop}px`);
  }, [getViewportBounds]);

  const clearSpeechTimer = useCallback(() => {
    if (speechTimerRef.current === null) return;

    window.clearTimeout(speechTimerRef.current);
    speechTimerRef.current = null;
  }, []);

  const hideSpeech = useCallback(() => {
    clearSpeechTimer();
    setIsSpeechVisible(false);
  }, [clearSpeechTimer]);

  const showSpeech = useCallback(
    (lineIndex: number) => {
      clearSpeechTimer();
      setSpeech(SPEECH_LINES[lineIndex]);
      setIsSpeechVisible(true);
      speechTimerRef.current = window.setTimeout(() => {
        speechTimerRef.current = null;
        setIsSpeechVisible(false);
      }, SPEECH_DURATION_MS);
    },
    [clearSpeechTimer],
  );

  const handleDialogue = useCallback(() => {
    const lineIndex = nextSpeechIndexRef.current;
    nextSpeechIndexRef.current = lineIndex >= SPEECH_LINES.length - 1 ? 1 : lineIndex + 1;
    showSpeech(lineIndex);
  }, [showSpeech]);

  const endPointerInteraction = useCallback((pointerId: number) => {
    const activeDrag = dragRef.current;
    if (!activeDrag || activeDrag.pointerId !== pointerId) return;

    if (activeDrag.moved) suppressClickRef.current = true;
    dragRef.current = null;

    const node = pandaRef.current;
    node?.removeAttribute("data-dragging");
    if (node?.hasPointerCapture(pointerId)) node.releasePointerCapture(pointerId);
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (dragRef.current) return;

      const node = pandaRef.current;
      if (!node) return;

      suppressClickRef.current = false;
      const bounds = getViewportBounds();
      const rect = node.getBoundingClientRect();
      const currentPosition = {
        x: Math.min(Math.max(rect.left - bounds.marginLeft, 0), bounds.maxX),
        y: Math.min(Math.max(rect.top - bounds.marginTop, 0), bounds.maxY),
      };

      positionRef.current = currentPosition;
      dragRef.current = {
        ...currentPosition,
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        moved: false,
      };
      node.setPointerCapture(event.pointerId);
      node.setAttribute("data-dragging", "true");
      hideSpeech();
    },
    [getViewportBounds, hideSpeech],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const activeDrag = dragRef.current;
      if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - activeDrag.startClientX;
      const deltaY = event.clientY - activeDrag.startClientY;
      if (!activeDrag.moved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;

      activeDrag.moved = true;
      event.preventDefault();
      applyPosition({ x: activeDrag.x + deltaX, y: activeDrag.y + deltaY });
    },
    [applyPosition],
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      endPointerInteraction(event.pointerId);
    },
    [endPointerInteraction],
  );

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") suppressClickRef.current = false;
  }, []);

  useEffect(() => {
    const node = pandaRef.current;
    if (!node) return undefined;

    applyPosition({ x: 0, y: getViewportBounds().maxY });
    updateBubbleLayout();

    const handleResize = () => {
      if (resizeFrameRef.current !== null) return;

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        applyPosition(positionRef.current);
        updateBubbleLayout();
      });
    };

    const visualViewport = window.visualViewport;
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(handleResize);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    visualViewport?.addEventListener("resize", handleResize);
    resizeObserver?.observe(node);
    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      visualViewport?.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
      if (resizeFrameRef.current !== null) window.cancelAnimationFrame(resizeFrameRef.current);
    };
  }, [applyPosition, getViewportBounds, updateBubbleLayout]);

  useIsomorphicLayoutEffect(() => {
    if (!isSpeechVisible) return undefined;

    updateBubbleLayout();
    return undefined;
  }, [isSpeechVisible, speech, updateBubbleLayout]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speechTimerRef.current = null;
      setIsSpeechVisible(false);
    }, SPEECH_DURATION_MS);
    speechTimerRef.current = timer;

    return () => {
      window.clearTimeout(timer);
      if (speechTimerRef.current === timer) speechTimerRef.current = null;
    };
  }, []);

  return (
    <button
      ref={pandaRef}
      type="button"
      className="tisee-panda-companion"
      style={
        {
          "--tisee-panda-x": "0px",
          "--tisee-panda-y": "calc(100dvh - var(--tisee-panda-height) - var(--tisee-panda-edge-top) - var(--tisee-panda-edge-bottom))",
        } as PandaStyle
      }
      aria-describedby="tisee-panda-hint"
      aria-label="Panda companion"
      data-panda-companion="true"
      data-speech-visible={isSpeechVisible ? "true" : "false"}
      draggable={false}
      onClick={() => {
        if (suppressClickRef.current) {
          suppressClickRef.current = false;
          return;
        }

        handleDialogue();
      }}
      onKeyDown={handleKeyDown}
      onLostPointerCapture={(event) => endPointerInteraction(event.pointerId)}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <span ref={bubbleRef} className={`tisee-panda-bubble${isSpeechVisible ? " is-visible" : ""}`} aria-live="polite" aria-atomic="true">
        {speech}
      </span>
      <span className="tisee-panda-shadow" aria-hidden="true" />
      <span className="tisee-panda-art" aria-hidden="true">
        <PandaArtwork />
      </span>
      <span id="tisee-panda-hint" className="tisee-panda-sr-only">
        Drag to reposition. Press Enter or Space to hear a note.
      </span>
    </button>
  );
}

"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const EDGE_GUTTER = 8;
const DRAG_THRESHOLD_PX = 4;

type Point = { x: number; y: number };

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
  const pointerIdRef = useRef<number | null>(null);
  const dragOriginRef = useRef<Point>({ x: 0, y: 0 });
  const pointerOriginRef = useRef<Point>({ x: 0, y: 0 });
  const positionRef = useRef<Point>({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const resizeFrameRef = useRef<number | null>(null);

  const [position, setPosition] = useState<Point>({ x: EDGE_GUTTER, y: EDGE_GUTTER });
  const [dragging, setDragging] = useState(false);

  const getBounds = useCallback(() => {
    if (typeof window === "undefined") {
      return { maxX: 0, maxY: 0 };
    }

    const runnerWidth = runnerRef.current?.offsetWidth ?? 0;
    const runnerHeight = runnerRef.current?.offsetHeight ?? 0;
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;

    return {
      maxX: Math.max(EDGE_GUTTER, viewportWidth - runnerWidth - EDGE_GUTTER),
      maxY: Math.max(EDGE_GUTTER, viewportHeight - runnerHeight - EDGE_GUTTER),
    };
  }, []);

  const clampPoint = useCallback(
    (point: Point) => {
      const { maxX, maxY } = getBounds();
      return {
        x: Math.min(Math.max(point.x, EDGE_GUTTER), maxX),
        y: Math.min(Math.max(point.y, EDGE_GUTTER), maxY),
      };
    },
    [getBounds],
  );

  const commitPosition = useCallback((next: Point) => {
    positionRef.current = next;
    setPosition(next);
  }, []);

  useEffect(() => {
    const initial = clampPoint({ x: EDGE_GUTTER, y: EDGE_GUTTER });
    commitPosition(initial);
  }, [clampPoint, commitPosition]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeFrameRef.current !== null) return;

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        commitPosition(clampPoint(positionRef.current));
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }
    };
  }, [clampPoint, commitPosition]);

  const finishDrag = useCallback((pointerId: number) => {
    if (pointerIdRef.current !== pointerId) return;

    pointerIdRef.current = null;
    draggingRef.current = false;
    setDragging(false);

    try {
      runnerRef.current?.releasePointerCapture(pointerId);
    } catch {
      // Pointer capture can already be released by the browser.
    }
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== null) return;

    pointerIdRef.current = event.pointerId;
    pointerOriginRef.current = { x: event.clientX, y: event.clientY };
    dragOriginRef.current = positionRef.current;
    draggingRef.current = false;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const dx = event.clientX - pointerOriginRef.current.x;
    const dy = event.clientY - pointerOriginRef.current.y;

    if (!draggingRef.current && Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX) {
      draggingRef.current = true;
      setDragging(true);
    }

    if (!draggingRef.current) return;

    event.preventDefault();
    commitPosition(
      clampPoint({
        x: dragOriginRef.current.x + dx,
        y: dragOriginRef.current.y - dy,
      }),
    );
  };

  const petStyle = {
    left: `${position.x}px`,
    bottom: `${position.y}px`,
  } as CSSProperties;

  return (
    <button
      ref={runnerRef}
      type="button"
      className={`tisee-pet-runner${dragging ? " is-dragging" : ""}`}
      style={petStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event.pointerId)}
      onPointerCancel={(event) => finishDrag(event.pointerId)}
      aria-label="Drag the panda companion"
      data-panda-dragging={dragging ? "true" : "false"}
      title="Drag the panda"
    >
      <span className="tisee-pet-shadow" aria-hidden="true" />
      <span className="tisee-pet-art" aria-hidden="true">
        <span className="tisee-pet-idle-frames">
          <PandaFrame
            src="/images/panda/panda-roll-land.png"
            className="tisee-pet-frame tisee-pet-frame-rest"
          />
          <PandaFrame
            src="/images/panda/panda-roll-crouch.png"
            className="tisee-pet-frame tisee-pet-frame-rest-alt"
          />
        </span>
      </span>
    </button>
  );
}

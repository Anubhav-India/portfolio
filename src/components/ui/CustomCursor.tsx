"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Position and animation refs (avoiding React re-renders on mousemove)
  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
    isHovered: false,
    isClicking: false,
    isInput: false,
    cursorLabel: "",
    isVisible: false,
  });

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // 1. Check if device supports hover and fine pointer (desktop / mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches) {
      return; // Touch device - use native touch interactions
    }

    setIsEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const state = posRef.current;
    let animationFrameId: number;

    // 2. Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      if (!state.isVisible) {
        state.isVisible = true;
        state.ringX = e.clientX;
        state.ringY = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // Check what element is under the cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect text inputs
        const isInputField =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        state.isInput = isInputField;

        // Detect interactive clickable elements
        const interactiveEl = target.closest(
          "a, button, [role='button'], [data-cursor], input[type='submit'], input[type='button'], .cursor-pointer"
        ) as HTMLElement | null;

        if (interactiveEl) {
          state.isHovered = true;
          const customLabel = interactiveEl.getAttribute("data-cursor") || "";
          state.cursorLabel = customLabel;
        } else {
          state.isHovered = false;
          state.cursorLabel = "";
        }
      }
    };

    // 3. Mouse down & up handlers
    const onMouseDown = () => {
      state.isClicking = true;
    };

    const onMouseUp = () => {
      state.isClicking = false;
    };

    // 4. Mouse leave window
    const onMouseLeave = () => {
      state.isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      state.isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // 5. 60 FPS Render loop using requestAnimationFrame
    const lerpFactor = reducedMotionQuery.matches ? 1 : 0.16;

    const render = () => {
      if (state.isVisible) {
        // Smooth spring interpolation for the outer ring
        state.ringX += (state.mouseX - state.ringX) * lerpFactor;
        state.ringY += (state.mouseY - state.ringY) * lerpFactor;

        // Update central dot position (zero latency)
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${state.mouseX}px, ${state.mouseY}px, 0) translate(-50%, -50%) scale(${
            state.isInput ? 0 : state.isHovered ? 0.3 : 1
          })`;
        }

        // Update outer ring position and scale
        if (ringRef.current) {
          let ringScale = 1;
          if (state.isInput) {
            ringScale = 0;
          } else if (state.isClicking) {
            ringScale = state.isHovered ? 1.4 : 0.85;
          } else if (state.isHovered) {
            ringScale = state.cursorLabel ? 2.1 : 1.7;
          }

          ringRef.current.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        }

        // Update contextual label
        if (labelRef.current) {
          if (state.cursorLabel && state.isHovered && !state.isInput) {
            labelRef.current.textContent = state.cursorLabel;
            labelRef.current.style.opacity = "1";
          } else {
            labelRef.current.style.opacity = "0";
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[99999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Central Solid Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--cursor-dot)] shadow-[0_0_8px_var(--cursor-dot)] opacity-0 transition-opacity duration-200 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Outer Smooth Interactive Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-[var(--cursor-ring)] bg-[var(--cursor-fill)] opacity-0 shadow-[0_0_15px_var(--cursor-fill)] flex items-center justify-center transition-[background-color,border-color,opacity] duration-200 pointer-events-none backdrop-blur-[0.5px]"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Contextual Micro-Label (e.g. "VIEW", "EXPLORE") */}
        <span
          ref={labelRef}
          className="text-[8px] font-mono font-bold tracking-widest text-[var(--accent-primary)] uppercase opacity-0 transition-opacity duration-150 pointer-events-none"
        />
      </div>
    </div>
  );
};

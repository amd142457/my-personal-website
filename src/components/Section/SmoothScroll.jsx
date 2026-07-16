"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }) {
  const smootherRef = useRef(null);

  useEffect(() => {
    // Build the smoother after the DOM (and #smooth-wrapper/#smooth-content) exists
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // higher = more "floaty" smoothing
      effects: true, // enables data-speed / data-lag parallax attributes
      smoothTouch: 0.1, // light smoothing on touch devices, keeps them responsive
    });

    return () => {
      smootherRef.current?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

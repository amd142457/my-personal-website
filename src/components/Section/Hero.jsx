"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// A lightweight canvas particle network — small dots drifting slowly,
// connected by faint lines when close together, gently pulled toward the
// mouse. Pure background texture: it never competes with the text on top.
function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, animationId;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function init() {
      resize();
      const count = Math.min(70, Math.floor((width * height) / 60000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160 * devicePixelRatio) {
          p.x += dx * 0.0025;
          p.y += dy * 0.0025;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = 130 * devicePixelRatio;
          if (d < maxD) {
            ctx.strokeStyle = `rgba(167,139,250,${0.12 * (1 - d / maxD)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,0.55)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * devicePixelRatio;
      mouse.y = (e.clientY - rect.top) * devicePixelRatio;
    }
    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    init();
    step();
    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-auto h-full w-full opacity-70"
      />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-7 pb-24 pt-44 md:pt-52">
      <HeroBackground />

      {/* soft glow behind the headline, sitting above the particles */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-80px] h-[500px] w-[900px] -translate-x-1/2 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, #0A0D12 0%, #0A0D1200 60%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[820px] flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center gap-2.5 font-mono text-sm text-[#F5A524]"
        >
          <span className="h-px w-4 bg-[#F5A524]" />
          FRONTEND DEVELOPER · N8N AUTOMATION SPECIALIST
          <span className="h-px w-4 bg-[#F5A524]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={0.08}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-4xl font-bold leading-[1.08] text-[#EAEFF4] sm:text-5xl md:text-6xl lg:text-[4rem]"
        >
          I build fast <span className="text-[#A78BFA]">web apps</span>, then
          wire up the <span className="text-[#A78BFA]">n8n workflows</span> that
          keep your business running while you sleep.
        </motion.h1>

        {/* Lede paragraph */}
        <motion.p
          custom={0.16}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-lg text-[#8C99A8]"
        >
          I'm Akramul — a frontend developer who ships clean, fast interfaces in
          React and Next.js, and an automation specialist who connects them to
          real business workflows: WhatsApp bots, lead pipelines, and AI agents
          that handle the repetitive work for you.
        </motion.p>

        {/* Actions */}
        <motion.div
          custom={0.24}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="inline-block rounded-md bg-[#A78BFA] px-6 py-3.5 text-sm font-semibold text-[#160F2E] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_#A78BFA55]"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="inline-block rounded-md border border-white/15 px-6 py-3.5 text-sm font-medium text-[#EAEFF4] transition-all hover:-translate-y-0.5 hover:border-[#A78BFA] hover:text-[#A78BFA]"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.span
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex items-center gap-2 font-mono text-xs text-[#5C6875]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A78BFA] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
          </span>
          currently taking new projects
        </motion.span>
      </div>
    </section>
  );
}

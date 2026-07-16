"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// lucide-react dropped brand/company logos, so these two are small hand-drawn SVGs
function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    icon: MessageCircle,
    href: "https://wa.me/966563239174",
    label: "WhatsApp",
  },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/your-profile",
    label: "LinkedIn",
  }, // TODO: your real URL
  {
    icon: FacebookIcon,
    href: "https://facebook.com/your-profile",
    label: "Facebook",
  }, // TODO: your real URL
  { icon: Mail, href: "mailto:amd142457@gmail.com", label: "Email" },
];

const HEADING = "I build fast web apps & n8n workflows.";

/* ---------------------------------------------------------------- */
/* Background — aurora blobs + noise texture (+ Spline slot ready)  */
/* ---------------------------------------------------------------- */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Replace this block with <Spline scene={SPLINE_SCENE_URL} className="absolute inset-0 h-full w-full" />
          once you have a Spline scene — see setup notes at the bottom of this file. */}
      <motion.div
        className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "#5EEAD4" }}
        animate={{ x: [0, 50, 0], y: [0, -35, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-44 top-4 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "#F5A524" }}
        animate={{ x: [0, -35, 0], y: [0, 45, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-[-180px] left-1/3 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "#8B7FF0" }}
        animate={{ x: [0, 35, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-10 h-[300px] w-[300px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "#5EEAD4" }}
        animate={{ y: [0, -25, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* subtle grid, gives a bit of structure behind all the softness */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#5EEAD4 1px, transparent 1px), linear-gradient(90deg, #5EEAD4 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, black 0%, transparent 75%)",
        }}
      />

      {/* noise texture overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* soft vignette to keep focus on the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, transparent 55%, #0A0D12 100%)",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Heading — GSAP timeline splits text into letters and reveals them */
/* ---------------------------------------------------------------- */
function AnimatedHeading({ text, start }) {
  const containerRef = useRef(null);
  const played = useRef(false);

  useEffect(() => {
    if (!start || played.current) return;
    played.current = true;
    const letters = containerRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letters,
      { y: 46, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.025 },
    );
  }, [start]);

  return (
    <h1
      ref={containerRef}
      className="max-w-3xl font-display text-4xl font-bold leading-[1.1] text-[#EAEFF4] sm:text-5xl md:text-6xl"
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="letter inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}

/* ---------------------------------------------------------------- */
/* Image — Motion fade+scale+float entrance, mouse-tilt on hover     */
/* ---------------------------------------------------------------- */
function HeroImage({ start }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={start ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8"
    >
      {/* continuous gentle float, independent of the entrance animation */}
      <motion.div
        animate={start ? { y: [0, -10, 0] } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 700 }}
          whileHover={{ scale: 1.03 }}
          className="group relative h-48 w-48 overflow-hidden rounded-full border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(94,234,212,0.35)] sm:h-64 sm:w-64 md:h-72 md:w-72"
        >
          <Image
            src="/Assete/Gemini_Generated_Image_76lvdc76lvdc76lv.png"
            alt="Akramul Hoq"
            fill
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
            className="object-cover"
          />
          {/* glow ring that appears on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[inset_0_0_0_2px_#5EEAD4] transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Scroll-down indicator                                             */
/* ---------------------------------------------------------------- */
function ScrollIndicator({ start }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={start ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-14 flex flex-col items-center gap-2 text-[#5C6875]"
    >
      <span className="font-mono text-[10px] tracking-[0.25em]">SCROLL</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
export default function Hero() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);
  // 0 = nothing yet · 1 = image · 2 = heading · 3 = description
  // 4 = buttons · 5 = social icons · 6 = scroll indicator

  // Master GSAP timeline: orchestrates the reveal order.
  // background is already animating on mount, so the timeline starts at "image".
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.call(() => setStep(1))
      .call(() => setStep(2), null, "+=3")
      .call(() => setStep(3), null, "+=3.5")
      .call(() => setStep(4), null, "+=3")
      .call(() => setStep(5), null, "+=3")
      .call(() => setStep(6), null, "+=2");
  }, []);

  // Scroll-out effect: Hero scales down and fades slightly as you scroll past it.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scale: 0.94,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const buttonContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const buttonItem = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const socialContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const socialItem = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 pt-24 text-center"
    >
      <HeroBackground />

      <div className="mb-5 flex items-center gap-2.5 font-mono text-sm text-[#F5A524]">
        <span className="h-px w-4 bg-[#F5A524]" />
        FRONTEND DEVELOPER · N8N AUTOMATION SPECIALIST
        <span className="h-px w-4 bg-[#F5A524]" />
      </div>

      <HeroImage start={step >= 1} />

      <AnimatedHeading text={HEADING} start={step >= 2} />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-xl text-lg text-[#8C99A8]"
      >
        I'm Akramul — a frontend developer who ships clean, fast interfaces in
        React and Next.js, and an automation specialist who wires them up to
        real n8n workflows that keep running while you sleep.
      </motion.p>

      <motion.div
        variants={buttonContainer}
        initial="hidden"
        animate={step >= 4 ? "show" : "hidden"}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.a
          variants={buttonItem}
          href="#work"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(94,234,212,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-md bg-[#5EEAD4] px-6 py-3.5 text-sm font-semibold text-[#04141A]"
        >
          See the work
        </motion.a>
        <motion.a
          variants={buttonItem}
          href="#contact"
          whileHover={{ scale: 1.05, borderColor: "#5EEAD4", color: "#5EEAD4" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-md border border-white/15 px-6 py-3.5 text-sm font-medium text-[#EAEFF4]"
        >
          Get in touch
        </motion.a>
      </motion.div>

      <motion.div
        variants={socialContainer}
        initial="hidden"
        animate={step >= 5 ? "show" : "hidden"}
        className="mt-8 flex items-center gap-4"
      >
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            variants={socialItem}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ rotate: 12, scale: 1.15, color: "#5EEAD4" }}
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8C99A8] transition-colors"
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </motion.div>

      <ScrollIndicator start={step >= 6} />
    </section>
  );
}

/*
  ---- Spline setup (optional) ----
  1. npm install @splinetool/react-spline @splinetool/runtime
  2. Build/pick a scene at spline.design, copy its scene URL
  3. At the top of this file:
       import Spline from "@splinetool/react-spline";
       const SPLINE_SCENE_URL = "https://prod.spline.design/xxxx/scene.splinecode";
  4. Inside HeroBackground(), replace the aurora blobs with:
       <Spline scene={SPLINE_SCENE_URL} className="absolute inset-0 h-full w-full" />
*/

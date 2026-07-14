"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ROLES = [
  "n8n Workflow Engineer",
  "WhatsApp Automation Specialist",
  "AI Agent Builder",
  "Lead Generation Architect",
];

const STATS = [
  { value: "3+", label: "Live workflows shipped" },
  { value: "< 8s", label: "Avg. auto-reply time" },
  { value: "100%", label: "Built on n8n, no lock-in" },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 flex h-6 items-center overflow-hidden font-mono text-sm text-[#5EEAD4]">
      <span className="mr-2 text-[#5C6875]">/</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function FloatingBadge({ children, className, delay = 0, duration = 4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.6 + delay,
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0D12]/90 px-3.5 py-2 font-mono text-xs text-[#EAEFF4] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Banner() {
  return (
    <section className="border-t border-white/10 px-7 py-24 md:py-28">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-14 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
        {/* Left — name & intro */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex items-center gap-2.5 font-mono text-sm text-[#F5A524]">
            <span className="h-px w-4 bg-[#F5A524]" />
            AI AUTOMATION ENGINEER
          </div>

          <h2 className="mt-5 font-display text-[2.6rem] font-bold leading-none text-[#EAEFF4] sm:text-6xl lg:text-7xl">
            Akramul
            <br />
            Hoq<span className="text-[#5EEAD4]">.</span>
          </h2>

          <RotatingRole />

          <p className="mt-5 max-w-[440px] text-lg text-[#8C99A8]">
            I turn manual, repetitive business tasks into n8n workflows and AI
            agents — so things keep moving even when you&apos;re offline. From a
            WhatsApp reply to a fully qualified lead in your sheet, every step
            is automated, tested, and built to actually run in production, not
            just in a demo.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Riyadh, Saudi Arabia", "Open for freelance"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-[#8C99A8]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
                {tag}
              </span>
            ))}
          </div>

          {/* stat row */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.1,
                }}
              >
                <div className="font-display text-2xl font-bold text-[#EAEFF4]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[#8C99A8]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — photo, fixed width/height (no fill, no aspect-ratio dependency) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto w-fit"
        >
          {/* rotating dashed ring behind the photo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="pointer-events-none absolute -inset-6 rounded-[28px] border border-dashed border-[#5EEAD4]/25"
          />

          {/* soft glow behind the photo */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, #5EEAD422 0%, transparent 70%)",
            }}
          />

          {/* the frame itself */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12161D]">
            <Image
              src="/Assete/Gemini_Generated_Image_76lvdc76lvdc76lv.png"
              alt="Akramul Hoq"
              width={340}
              height={425}
              priority
              className="block h-[425px] w-[340px] max-w-full object-cover"
            />

            {/* corner brackets */}
            <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-[#5EEAD4]" />
            <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-[#5EEAD4]" />
            <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-[#5EEAD4]" />
            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-[#5EEAD4]" />

            {/* status badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0D12]/85 px-3.5 py-2 font-mono text-xs text-[#EAEFF4] backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
              </span>
              Available for work
            </div>
          </div>

          {/* floating badges */}
          <FloatingBadge
            className="absolute -right-4 -top-5 hidden sm:block"
            delay={0}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
            n8n
          </FloatingBadge>
          <FloatingBadge
            className="absolute -left-6 top-1/3 hidden sm:block"
            delay={1.2}
            duration={4.6}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5A524]" />
            AI Agents
          </FloatingBadge>
          <FloatingBadge
            className="absolute -bottom-5 right-6 hidden sm:block"
            delay={0.6}
            duration={5}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
            WhatsApp API
          </FloatingBadge>
        </motion.div>
      </div>
    </section>
  );
}

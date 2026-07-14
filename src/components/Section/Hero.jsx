"use client";

import { motion } from "framer-motion";

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
      {/* soft glow behind the heading */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[500px] w-[900px] -translate-x-1/2 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, #5EEAD422 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1120x]">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center gap-2.5 font-mono text-sm text-[#F5A524]"
        >
          <span className="h-px w-4 bg-[#F5A524]" />
          AI AUTOMATION ENGINEER · RIYADH, SAUDI ARABIA
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={0.08}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-4xl font-bold leading-[1.08] text-[#EAEFF4] sm:text-5xl md:text-6xl lg:text-[4rem]"
        >
          I build the workflows that run your business{" "}
          <span className="text-[#5EEAD4]">while you sleep.</span>
        </motion.h1>

        {/* Lede paragraph */}
        <motion.p
          custom={0.16}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-lg text-[#8C99A8]"
        >
          I design and ship AI-powered automations — WhatsApp bots, lead
          pipelines, and AI agents — using n8n and LLM APIs, so Saudi businesses
          stop doing by hand what software should be doing for them.
        </motion.p>

        {/* Actions */}
        <motion.div
          custom={0.24}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="inline-block rounded-md bg-[#5EEAD4] px-6 py-3.5 text-sm font-semibold text-[#04141A] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_#5EEAD455]"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="inline-block rounded-md border border-white/15 px-6 py-3.5 text-sm font-medium text-[#EAEFF4] transition-all hover:-translate-y-0.5 hover:border-[#5EEAD4] hover:text-[#5EEAD4]"
          >
            Get in touch
          </a>
          <span className="flex items-center gap-2 font-mono text-xs text-[#5C6875]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
            </span>
            currently taking new projects
          </span>
        </motion.div>
      </div>
    </section>
  );
}

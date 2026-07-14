"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Hammer, FlaskConical, Handshake } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Map the manual work",
    desc: "We walk through your current process step by step and identify exactly where time and leads are being lost.",
  },
  {
    icon: PenTool,
    title: "Design the workflow",
    desc: "I sketch the automation as a flow — triggers, decisions, and outputs — and confirm it matches how your business actually runs.",
  },
  {
    icon: Hammer,
    title: "Build in n8n",
    desc: "The workflow is built and connected to your real tools — WhatsApp, Sheets, CRM, or email — with AI steps where judgment is needed.",
  },
  {
    icon: FlaskConical,
    title: "Test with real cases",
    desc: "Every workflow is run against real messages and edge cases before it touches a live customer.",
  },
  {
    icon: Handshake,
    title: "Hand off & support",
    desc: "You get a working system plus a plain-language walkthrough, with support as your business changes.",
  },
];

function StepRow({ step, index }) {
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
      {/* card slot — alternates left/right on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={
          isEven ? "md:order-1 md:text-right" : "md:order-3 md:text-left"
        }
      >
        <div
          className={`max-w-md rounded-2xl border border-white/10 bg-[#12161D] p-6 transition-colors hover:border-[#5EEAD4]/40 ${
            isEven ? "md:ml-auto" : "md:mr-auto"
          }`}
        >
          <h4 className="font-display text-lg font-semibold text-[#EAEFF4]">
            {step.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#8C99A8]">
            {step.desc}
          </p>
        </div>
      </motion.div>

      {/* center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative z-10 order-2 mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#5EEAD4] bg-[#0A0D12] text-[#5EEAD4]"
      >
        <Icon size={22} strokeWidth={1.75} />
        <span className="absolute -bottom-6 font-mono text-[10px] text-[#5C6875]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* empty spacer so the card only occupies one side on desktop */}
      <div className="hidden md:order-3 md:block" />
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="border-t border-white/10 px-7 py-28"
    >
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="font-mono text-sm text-[#5C6875]">04 / PROCESS</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
            How a project runs
          </h2>
        </motion.div>

        <div className="relative space-y-16">
          {/* background track (full height, dim) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
          {/* animated progress line that draws downward as you scroll */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-[#5EEAD4] md:block"
          />

          {STEPS.map((step, i) => (
            <StepRow key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

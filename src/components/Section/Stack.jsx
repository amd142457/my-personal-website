"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Workflow,
  MessageCircle,
  Route,
  Zap,
  Table2,
  Bot,
  Code2,
  Sparkles,
} from "lucide-react";

const SKILLS = [
  { icon: Workflow, label: "n8n", level: 90 },
  { icon: MessageCircle, label: "WhatsApp API", level: 75 },
  { icon: Route, label: "OpenRouter", level: 85 },
  { icon: Zap, label: "Groq", level: 70 },
  { icon: Table2, label: "Google Sheets", level: 88 },
  { icon: Bot, label: "Apify", level: 65 },
  { icon: Code2, label: "JavaScript", level: 70 },
  { icon: Sparkles, label: "Prompt Design", level: 80 },
];

const R = 30;
const CIRCUMFERENCE = 2 * Math.PI * R;

function SkillCard({ icon: Icon, label, level, index }) {
  const cardRef = useRef(null);

  // mouse-driven tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 18,
  });

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#12161D] px-5 py-7 text-center transition-colors hover:border-[#5EEAD4]/40"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={R}
            fill="none"
            stroke="#232A35"
            strokeWidth="4"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={R}
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            whileInView={{
              strokeDashoffset: CIRCUMFERENCE * (1 - level / 100),
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 + index * 0.06,
            }}
          />
        </svg>
        <Icon size={22} strokeWidth={1.75} className="text-[#5EEAD4]" />
      </div>

      <div>
        <div className="font-mono text-sm text-[#EAEFF4]">{label}</div>
        <div className="mt-1 font-mono text-xs text-[#5C6875]">{level}%</div>
      </div>
    </motion.div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="border-t border-white/10 px-7 py-28">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="font-mono text-sm text-[#5C6875]">05 / STACK</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
            Tools I work in
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.label} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

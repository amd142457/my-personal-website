"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  Workflow,
  MessageCircle,
  Send,
  Mail,
  MessageSquare,
  Route,
  Zap,
  Table2,
  Bot,
  Sparkles,
  Mic,
  Code2,
  Braces,
} from "lucide-react";

const ROW_1 = [
  { icon: Workflow, label: "n8n" },
  { icon: MessageCircle, label: "WhatsApp Business API" },
  { icon: Send, label: "Telegram Bot Automation" },
  { icon: Mail, label: "Gmail Automation" },
  { icon: MessageSquare, label: "Messenger Automation" },
  { icon: Route, label: "OpenRouter" },
  { icon: Zap, label: "Groq" },
];

const ROW_2 = [
  { icon: Table2, label: "Google Sheets" },
  { icon: Bot, label: "Apify" },
  { icon: Sparkles, label: "LLM Agents" },
  { icon: Mic, label: "AI Voice Agents" },
  { icon: Code2, label: "API Development" },
  { icon: Braces, label: "JavaScript" },
  { icon: Route, label: "Prompt Engineering" },
];

function Chip({ icon: Icon, label }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-[#171C24] px-4 py-2 transition-colors hover:border-[#5EEAD4]/50">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5EEAD4]/10 text-[#5EEAD4]">
        <Icon size={13} strokeWidth={1.75} />
      </span>
      <span className="font-mono text-sm text-[#8C99A8]">{label}</span>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 26 }) {
  const controls = useAnimationControls();
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  function play() {
    controls.start({
      x: [from, to],
      transition: { duration: speed, ease: "linear", repeat: Infinity },
    });
  }

  return (
    <div
      onMouseEnter={() => controls.stop()}
      onMouseLeave={play}
      className="overflow-hidden"
    >
      <motion.div
        animate={controls}
        onViewportEnter={play}
        initial={{ x: from }}
        className="flex w-max gap-4 pr-4"
      >
        {[...items, ...items].map((item, i) => (
          <Chip key={`${item.label}-${i}`} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative space-y-4 overflow-hidden border-y border-white/10 bg-[#0F1319] py-8"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* moving light sweep for a premium sheen */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 w-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, #5EEAD40D 40%, transparent 80%)",
        }}
        animate={{ x: ["-10%", "110%"] }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.5,
        }}
      />

      <MarqueeRow items={ROW_1} direction="left" speed={30} />
      <MarqueeRow items={ROW_2} direction="right" speed={34} />
    </div>
  );
}

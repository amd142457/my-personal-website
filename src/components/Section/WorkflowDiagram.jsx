"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  Bot,
  Table2,
  Route as RouteIcon,
  Send,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { title: "WhatsApp In", sub: "customer message", Icon: MessageCircle },
  { title: "AI Agent", sub: "LLM · intent + reply", Icon: Bot },
  { title: "Log Lead", sub: "Google Sheets", Icon: Table2 },
  { title: "Route Lead", sub: "qualify + assign", Icon: RouteIcon },
  { title: "Auto Reply", sub: "sent in < 8 sec", Icon: Send },
];

const LOG_LINES = [
  "whatsapp.message.received",
  'agent.intent → "booking_inquiry"',
  "sheet.append → leads",
  "lead.routed → sales_team",
  "reply.sent (6.8s)",
];

/* ---------------------------------------------------------------- */
/* Node card — Motion handles entrance + hover, GSAP handles the      */
/* pulsing border glow                                                */
/* ---------------------------------------------------------------- */
function Node({ title, sub, Icon, index }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(glowRef.current, {
      opacity: 0.75,
      duration: 1.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.15,
    });
    return () => tween.kill();
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className="relative z-10 w-full shrink-0 rounded-xl border border-white/10 bg-[#171C24] p-4 md:w-[190px]"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
        style={{
          boxShadow: "0 0 0 1.5px #5EEAD4, 0 0 18px 1px rgba(94,234,212,0.35)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5EEAD4]/10 text-[#5EEAD4]">
          <Icon size={16} strokeWidth={1.75} />
        </div>
        <div className="font-semibold text-[#EAEFF4] text-sm">{title}</div>
      </div>
      <div className="relative mt-2 text-xs text-[#8C99A8]">{sub}</div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Connector — a GSAP-animated dot traveling along the line.         */
/* Two versions render (one horizontal, one vertical); Tailwind      */
/* breakpoints show only the correct one for the current layout.     */
/* ---------------------------------------------------------------- */
function Connector({ delay = 0 }) {
  const hDotRef = useRef(null);
  const vDotRef = useRef(null);

  useEffect(() => {
    const tl1 = gsap.timeline({ repeat: -1, delay, repeatDelay: 0.5 });
    tl1.fromTo(
      hDotRef.current,
      { left: "0%" },
      { left: "100%", duration: 1.1, ease: "power1.inOut" },
    );

    const tl2 = gsap.timeline({ repeat: -1, delay, repeatDelay: 0.5 });
    tl2.fromTo(
      vDotRef.current,
      { top: "0%" },
      { top: "100%", duration: 1.1, ease: "power1.inOut" },
    );

    return () => {
      tl1.kill();
      tl2.kill();
    };
  }, [delay]);

  return (
    <>
      {/* horizontal version — desktop */}
      <div className="relative hidden h-px w-10 shrink-0 bg-white/10 md:block">
        <span
          ref={hDotRef}
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5EEAD4]"
          style={{ boxShadow: "0 0 8px #5EEAD4" }}
        />
      </div>
      {/* vertical version — mobile */}
      <div className="relative h-8 w-px shrink-0 bg-white/10 md:hidden">
        <span
          ref={vDotRef}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5EEAD4]"
          style={{ boxShadow: "0 0 8px #5EEAD4" }}
        />
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Live execution log                                                */
/* ---------------------------------------------------------------- */
function ExecutionLog() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let i = 0;
    setVisible([]);
    const interval = setInterval(() => {
      setVisible((prev) => {
        const next = [...prev, LOG_LINES[i]];
        return next.length > 4 ? next.slice(1) : next;
      });
      i = (i + 1) % LOG_LINES.length;
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 rounded-lg border border-white/10 bg-[#0A0D12] px-4 py-3 font-mono text-[11px] leading-relaxed">
      {visible.map((line, i) => (
        <motion.div
          key={line + i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[#8C99A8]"
        >
          <span className="text-[#5EEAD4]">$</span> {line}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main diagram                                                      */
/* ---------------------------------------------------------------- */
export default function WorkflowDiagram() {
  const cardRef = useRef(null);
  const chainRef = useRef(null);

  // GSAP ScrollTrigger: the whole node chain scrubs in slightly as the
  // section enters the viewport (on top of Motion's own per-node reveal).
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chainRef.current,
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        },
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-10">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl border border-white/10 bg-[#12161D] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-6"
      >
        {/* Header row */}
        <div className="mb-5 flex items-center justify-between px-1 font-mono text-xs text-[#8C99A8]">
          <span className="truncate">WORKFLOW — whatsapp-lead-agent.json</span>
          <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[#5EEAD4]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
            </span>
            running
          </span>
        </div>

        {/* Node chain — column on mobile, row on desktop */}
        <div
          ref={chainRef}
          className="flex flex-col items-stretch gap-0 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-0"
        >
          {NODES.map((node, i) => (
            <div
              key={node.title}
              className="flex flex-col items-center md:flex-row"
            >
              <Node {...node} index={i} />
              {i < NODES.length - 1 && <Connector delay={i * 0.25} />}
            </div>
          ))}
        </div>

        <ExecutionLog />
      </motion.div>
    </div>
  );
}

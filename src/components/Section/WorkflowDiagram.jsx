"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Bot,
  Table2,
  Route as RouteIcon,
  Send,
} from "lucide-react";

// ---------- Node ----------
function Node({ x, y, w, h, title, sub, Icon, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill="#171C24"
        stroke="#232A35"
        strokeWidth="1.5"
      />
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="1.5"
        animate={{ opacity: [0.15, 0.7, 0.15] }}
        transition={{
          duration: 2.6,
          ease: "easeInOut",
          repeat: Infinity,
          delay,
        }}
      />
      <foreignObject x={x + 14} y={y + 14} width="26" height="26">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-[#5EEAD4]/10 text-[#5EEAD4]">
          <Icon size={14} strokeWidth={1.75} />
        </div>
      </foreignObject>
      <text x={x + 50} y={y + 32} fontSize="13" fontWeight="600" fill="#EAEFF4">
        {title}
      </text>
      <text x={x + 14} y={y + h - 14} fontSize="11.5" fill="#8C99A8">
        {sub}
      </text>
    </motion.g>
  );
}

// ---------- Static connector track ----------
function Track({ d }) {
  return <path d={d} fill="none" stroke="#232A35" strokeWidth="1.5" />;
}

// ---------- Traveling data packet along a fixed set of waypoints ----------
function Packet({
  xKeyframes,
  yKeyframes,
  duration,
  delay = 0,
  color = "#5EEAD4",
}) {
  return (
    <motion.circle
      r="3.5"
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      animate={{ cx: xKeyframes, cy: yKeyframes }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
        delay,
        repeatDelay: 0.6,
      }}
    />
  );
}

// ---------- Live execution log under the diagram ----------
const LOG_LINES = [
  "whatsapp.message.received",
  'agent.intent → "booking_inquiry"',
  "sheet.append → leads",
  "lead.routed → sales_team",
  "reply.sent (6.8s)",
];

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
    <div className="mt-5 rounded-lg border border-white/10 bg-[#0A0D12] px-4 py-3 font-mono text-[11px] leading-relaxed">
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

export default function WorkflowDiagram() {
  return (
    <div className="mx-auto max-w-[1120px] px-7 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-x-auto rounded-xl border border-white/10 bg-[#12161D] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
      >
        {/* Header row */}
        <div className="mb-5 flex items-center justify-between px-2 font-mono text-xs text-[#8C99A8]">
          <span>WORKFLOW — whatsapp-lead-agent.json</span>
          <span className="flex items-center gap-1.5 text-[#5EEAD4]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
            </span>
            running
          </span>
        </div>

        <svg
          viewBox="0 0 960 300"
          className="block h-auto min-w-[820px] w-full"
        >
          {/* static tracks */}
          <Track d="M200 95 H260" />
          <Track d="M440 95 H500" />
          <Track d="M680 95 H740" />
          <Track d="M300 130 V245 H380" />
          <Track d="M550 130 V210" />

          {/* traveling packets — main chain */}
          <Packet
            xKeyframes={[200, 260, 260, 440, 440, 500, 500, 680, 680, 740]}
            yKeyframes={[95, 95, 95, 95, 95, 95, 95, 95, 95, 95]}
            duration={3.4}
          />
          {/* branch packets — Log Lead */}
          <Packet
            xKeyframes={[300, 300, 380]}
            yKeyframes={[130, 245, 245]}
            duration={1.6}
            delay={0.6}
            color="#F5A524"
          />
          <Packet
            xKeyframes={[550, 550]}
            yKeyframes={[130, 210]}
            duration={1}
            delay={1.4}
            color="#F5A524"
          />

          {/* Row 1 */}
          <Node
            x={20}
            y={60}
            w={180}
            h={70}
            title="WhatsApp In"
            sub="customer message"
            Icon={MessageCircle}
            delay={0}
          />
          <Node
            x={260}
            y={60}
            w={180}
            h={70}
            title="AI Agent"
            sub="LLM · intent + reply"
            Icon={Bot}
            delay={0.1}
          />
          <Node
            x={500}
            y={60}
            w={180}
            h={70}
            title="Route Lead"
            sub="qualify + assign"
            Icon={RouteIcon}
            delay={0.2}
          />
          <Node
            x={740}
            y={60}
            w={180}
            h={70}
            title="Auto Reply"
            sub="sent in < 8 sec"
            Icon={Send}
            delay={0.3}
          />

          {/* Branch node */}
          <Node
            x={380}
            y={210}
            w={180}
            h={70}
            title="Log Lead"
            sub="Google Sheets"
            Icon={Table2}
            delay={0.15}
          />
        </svg>

        <ExecutionLog />
      </motion.div>
    </div>
  );
}

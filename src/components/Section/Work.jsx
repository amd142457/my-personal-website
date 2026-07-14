"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Bot,
  Target,
  BarChart3,
  Workflow,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: MessageCircle,
    title: "WhatsApp Business Automation",
    desc: "Order taking, FAQ handling, and appointment booking through WhatsApp — connected to your existing sheets, CRM, or inventory, so no lead sits unanswered.",
  },
  {
    icon: Bot,
    title: "AI Agents on Your Data",
    desc: "LLM-powered agents that read your business documents, prices, and policies, and answer customers or staff accurately instead of guessing.",
  },
  {
    icon: Target,
    title: "Lead Generation Pipelines",
    desc: "Scraping and qualifying leads from Instagram, LinkedIn, and web sources, then routing warm leads straight into your outreach workflow.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Ops Automation",
    desc: "Daily and weekly reports — expenses, sales, inventory — generated automatically and delivered to your inbox with AI-written summaries.",
  },
  {
    icon: Workflow,
    title: "n8n Workflow Builds",
    desc: "Custom self-hosted n8n workflows connecting the tools you already use — Sheets, Gmail, APIs — without locking you into expensive SaaS.",
  },
  {
    icon: ClipboardCheck,
    title: "Workflow Audits",
    desc: "A review of your team's repetitive manual tasks, with a clear map of what can be automated first for the fastest return.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Work() {
  return (
    <section id="services" className="border-t border-white/10 px-7 py-28">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="font-mono text-sm text-[#5C6875]">
              02 / SERVICES
            </div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
              What I automate
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#8C99A8]">
            Every service is built on n8n, so nothing depends on a locked-in
            SaaS subscription.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12161D] p-7 transition-colors hover:border-[#5EEAD4]/50"
            >
              {/* glow that appears on hover */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "#5EEAD422" }}
              />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#171C24] text-[#5EEAD4]">
                <Icon size={20} strokeWidth={1.75} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold text-[#EAEFF4]">
                {title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[#8C99A8]">
                {desc}
              </p>

              <div className="relative mt-6 flex items-center gap-1.5 font-mono text-xs text-[#5C6875] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                learn more
                <ArrowUpRight size={14} className="text-[#5EEAD4]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

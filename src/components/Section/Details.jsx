"use client";

import { motion } from "framer-motion";
import { MessageSquare, Receipt, Users2 } from "lucide-react";

const PROJECTS = [
  {
    icon: MessageSquare,
    tag: "n8n · LLM Agent",
    title: "AI Weather Assistant",
    desc: "A conversational agent that answers natural-language weather questions in real time, built on n8n with an LLM tool-calling setup routed through OpenRouter for reliable, free-tier inference.",
    result:
      "Resolved model-routing & quota failures across 3 providers before landing on a stable setup",
    stack: ["n8n", "OpenRouter", "Llama 3.3 70B", "Tool calling"],
  },
  {
    icon: Receipt,
    tag: "n8n · Reporting",
    title: "Daily Expense Tracker",
    desc: "A form-to-inbox pipeline: expenses submitted through an n8n form are logged to Google Sheets, summarized by AI, and emailed as a daily spending report — zero manual entry.",
    result:
      "Removes manual spreadsheet updates entirely from the daily routine",
    stack: ["n8n Form", "Google Sheets", "Groq", "Gmail"],
  },
  {
    icon: Users2,
    tag: "n8n · Lead Gen",
    title: "Instagram & LinkedIn Lead Scraper",
    desc: "An automated pipeline using Apify scrapers inside n8n to pull qualified leads from Instagram and LinkedIn profiles into a structured, ready-to-contact list.",
    result: "Turns hours of manual profile-hunting into one scheduled run",
    stack: ["n8n", "Apify", "Data enrichment"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Work() {
  return (
    <section id="work" className="border-t border-white/10 px-7 py-28">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="font-mono text-sm text-[#5C6875]">03 / WORK</div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
              Recent builds
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#8C99A8]">
            Three real workflows, built and running end-to-end.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-5"
        >
          {PROJECTS.map(({ icon: Icon, tag, title, desc, result, stack }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#12161D] p-8 transition-colors hover:border-white/20 sm:grid-cols-[auto_1fr_auto] sm:items-start"
            >
              {/* icon badge */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#171C24] text-[#5EEAD4]">
                <Icon size={22} strokeWidth={1.75} />
              </div>

              {/* content */}
              <div>
                <span className="inline-block rounded-full border border-[#5EEAD4] px-3 py-1 font-mono text-xs text-[#5EEAD4]">
                  {tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#EAEFF4]">
                  {title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#8C99A8]">
                  {desc}
                </p>
                <div className="mt-3.5 font-mono text-xs text-[#F5A524]">
                  → {result}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-[#8C99A8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* status */}
              <div className="flex items-center gap-2 font-mono text-xs text-[#8C99A8] sm:justify-self-end">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" />
                </span>
                Live
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const facts = [
  { k: "LOCATION", v: "Riyadh, Saudi Arabia" },
  { k: "FOCUS", v: "n8n · WhatsApp · AI Agents" },
  { k: "LANGUAGES", v: "Bengali, English" },
  { k: "AVAILABILITY", v: "Freelance, part-time" },
  { k: "WORKS BEST WITH", v: "Saudi SMEs & solo founders" },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/10 px-7 py-28">
      <div className="mx-auto max-w-[1120px]">
        {/* Section head */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14"
        >
          <div className="font-mono text-sm text-[#5C6875]">01 / ABOUT</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
            From housekeeping shifts to shipping workflows
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1.1fr_0.9fr]">
          {/* Bio */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            <p className="max-w-xl text-lg text-[#8C99A8]">
              I&apos;m{" "}
              <strong className="font-semibold text-[#EAEFF4]">
                Akramul Hoq
              </strong>
              , based in Riyadh, working full-time while teaching myself
              automation engineering on the side. I started in frontend
              development, then moved fully into{" "}
              <strong className="font-semibold text-[#EAEFF4]">
                AI automation
              </strong>{" "}
              once I saw how much manual work Saudi small businesses were still
              doing by hand — replying to WhatsApp one message at a time,
              copying leads into spreadsheets, writing the same reports every
              week.
            </p>
            <p className="max-w-xl text-lg text-[#8C99A8]">
              I now build with{" "}
              <strong className="font-semibold text-[#EAEFF4]">n8n</strong> as
              my core tool, wiring together WhatsApp, LLMs, and the spreadsheets
              and inboxes businesses already use — instead of asking them to
              adopt new software. My background in JavaScript means I&apos;m
              comfortable going past drag-and-drop nodes into custom code when a
              workflow needs it.
            </p>
            <p className="max-w-xl text-lg text-[#8C99A8]">
              I&apos;m early in this specific path, and I say that upfront — but
              every workflow on this page is real, running, and built end-to-end
              by me.
            </p>
          </motion.div>

          {/* Fact panel */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-xl border border-white/10 bg-[#12161D]"
          >
            {facts.map((fact, i) => (
              <div
                key={fact.k}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== facts.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="font-mono text-xs text-[#5C6875]">
                  {fact.k}
                </span>
                <span className="text-right font-medium text-[#EAEFF4]">
                  {fact.v}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

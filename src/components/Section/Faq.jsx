"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Do I need to already use n8n or any automation tool?",
    a: "No. Most clients start with none of this in place. I set up the workflow, connect it to tools you already use like WhatsApp or Google Sheets, and hand it off ready to run.",
  },
  {
    q: "Will this replace my staff?",
    a: "Usually not the goal. Most automations remove the repetitive first-response or data-entry work, so your team spends time on the calls and decisions that actually need a person.",
  },
  {
    q: "What does a small project cost?",
    a: "It depends on how many steps and integrations the workflow needs. Send me what you're trying to automate and I'll give you a clear price before any work starts.",
  },
  {
    q: "Can you maintain the workflow after it's built?",
    a: "Yes. I offer ongoing support for changes as your business needs shift, priced separately from the initial build.",
  },
  {
    q: "Do you work with businesses outside Saudi Arabia?",
    a: "I'm based in Riyadh and focused on the Saudi market, but everything I build is remote-friendly and works for clients anywhere.",
  },
];

function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-5 py-6 text-left"
      >
        <span
          className={`font-mono text-sm transition-colors ${
            isOpen ? "text-[#5EEAD4]" : "text-[#5C6875]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`flex-1 font-display text-base font-medium transition-colors sm:text-lg ${
            isOpen
              ? "text-[#5EEAD4]"
              : "text-[#EAEFF4] group-hover:text-[#5EEAD4]"
          }`}
        >
          {faq.q}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            isOpen
              ? "border-[#5EEAD4] text-[#5EEAD4]"
              : "border-white/15 text-[#8C99A8]"
          }`}
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-11 text-sm leading-relaxed text-[#8C99A8]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="border-t border-white/10 px-7 py-28">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="font-mono text-sm text-[#5C6875]">06 / FAQ</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#EAEFF4] sm:text-3xl">
            Before you reach out
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/10"
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

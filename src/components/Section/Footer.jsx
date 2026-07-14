"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Trash2 } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

const STORAGE_KEY = "portfolio-feedback";

// ---------- Star rating ----------
function StarRating({ rating, hovered, onHover, onRate }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hovered || rating) >= n;
        return (
          <motion.button
            key={n}
            type="button"
            onMouseEnter={() => onHover(n)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onRate(n)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="text-[#5EEAD4]"
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              size={22}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

// ---------- Comment + rating widget ----------
function FeedbackWidget() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [entries, setEntries] = useState([]);

  // Load previously saved feedback from this browser
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setEntries(saved);
    } catch {
      setEntries([]);
    }
  }, []);

  function persist(next) {
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim() || rating === 0) return;

    const entry = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      message: message.trim(),
      rating,
    };
    persist([entry, ...entries]);
    setName("");
    setMessage("");
    setRating(0);
  }

  function handleDelete(id) {
    persist(entries.filter((e) => e.id !== id));
  }

  const average =
    entries.length > 0
      ? (
          entries.reduce((sum, e) => sum + e.rating, 0) / entries.length
        ).toFixed(1)
      : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#12161D] p-7 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-[#EAEFF4]">
          Leave a rating & comment
        </h3>
        {average && (
          <div className="flex items-center gap-2 font-mono text-sm text-[#8C99A8]">
            <Star size={15} fill="currentColor" className="text-[#F5A524]" />
            {average} · {entries.length} review{entries.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#5C6875]">YOUR RATING</span>
          <StarRating
            rating={rating}
            hovered={hovered}
            onHover={setHovered}
            onRate={setRating}
          />
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-lg border border-white/10 bg-[#171C24] px-4 py-2.5 text-sm text-[#EAEFF4] placeholder:text-[#5C6875] focus:border-[#5EEAD4] focus:outline-none"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What did you think?"
          rows={3}
          className="w-full resize-none rounded-lg border border-white/10 bg-[#171C24] px-4 py-2.5 text-sm text-[#EAEFF4] placeholder:text-[#5C6875] focus:border-[#5EEAD4] focus:outline-none"
        />

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-md bg-[#5EEAD4] px-5 py-2.5 text-sm font-semibold text-[#04141A] transition-shadow hover:shadow-[0_8px_24px_#5EEAD455] disabled:opacity-40"
          disabled={!message.trim() || rating === 0}
        >
          Submit
          <Send size={15} />
        </motion.button>
      </form>

      {entries.length > 0 && (
        <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start justify-between gap-3 overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#EAEFF4]">
                      {entry.name}
                    </span>
                    <span className="flex text-[#F5A524]">
                      {Array.from({ length: entry.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#8C99A8]">{entry.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="shrink-0 text-[#5C6875] opacity-0 transition-opacity hover:text-[#8C99A8] group-hover:opacity-100"
                  aria-label="Delete this comment"
                >
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <p className="mt-6 font-mono text-[11px] text-[#5C6875]">
        Reviews are stored in your browser only, for this demo.
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-7 pb-10 pt-24">
      <div className="mx-auto max-w-[1120px]">
        {/* Feedback widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <FeedbackWidget />
        </motion.div>

        {/* Link columns */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-10 border-t border-white/10 pb-11 pt-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 font-display font-semibold text-[#EAEFF4]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EEAD4]" />
              </span>
              Akramul Hoq
            </div>
            <p className="mt-3 max-w-[240px] text-sm text-[#8C99A8]">
              AI automation engineer in Riyadh, building n8n workflows, WhatsApp
              bots, and AI agents for Saudi businesses.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wide text-[#5C6875]">
              Navigate
            </h5>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#8C99A8] transition-colors hover:text-[#5EEAD4]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wide text-[#5C6875]">
              Services
            </h5>
            <div className="flex flex-col gap-3">
              {[
                "WhatsApp Automation",
                "AI Agents",
                "Lead Generation",
                "n8n Workflows",
              ].map((s) => (
                <a
                  key={s}
                  href="#services"
                  className="text-sm text-[#8C99A8] transition-colors hover:text-[#5EEAD4]"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wide text-[#5C6875]">
              Contact
            </h5>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:amd142457@gmail.com"
                className="text-sm text-[#8C99A8] transition-colors hover:text-[#5EEAD4]"
              >
                amd142457@gmail.com
              </a>
              <a
                href="https://wa.me/966563239174"
                className="text-sm text-[#8C99A8] transition-colors hover:text-[#5EEAD4]"
              >
                WhatsApp
              </a>
              <a
                href="#contact"
                className="text-sm text-[#8C99A8] transition-colors hover:text-[#5EEAD4]"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-xs text-[#5C6875] sm:flex-row">
          <span>© 2026 Akramul Hoq. All workflows built by hand.</span>
          <span>Built with n8n · LLMs · a lot of debugging</span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Highlight the nav link for whichever section is currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href),
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-[#0A0D12]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1122px] items-center justify-between gap-6 px-7 py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-semibold text-[#EAEFF4]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EEAD4]"></span>
          </span>
          Akramul Hoq
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-sm text-[#8C99A8] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors ${
                activeSection === link.href
                  ? "text-[#5EEAD4]"
                  : "hover:text-[#EAEFF4]"
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-0.5 h-px w-full bg-[#5EEAD4]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden shrink-0 rounded-md border border-[#5EEAD4] px-4 py-2 font-mono text-sm text-[#5EEAD4] transition-colors hover:bg-[#5EEAD4]/10 md:inline-block"
        >
          start a project
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            className="h-[1.5px] w-6 bg-[#EAEFF4]"
            animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-[1.5px] w-6 bg-[#EAEFF4]"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="h-[1.5px] w-6 bg-[#EAEFF4]"
            animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0D12]/95 md:hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
                closed: {},
              }}
              className="flex flex-col px-7 pb-6 pt-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 },
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10 py-3.5 text-[#EAEFF4]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -16 },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 rounded-md border border-[#5EEAD4] py-3 text-center font-mono text-sm text-[#5EEAD4]"
              >
                start a project
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

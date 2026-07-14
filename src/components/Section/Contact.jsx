"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

// lucide-react dropped brand/company logos, so these two are small hand-drawn SVGs
function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

// ---- Replace these with your real links ----
const CONTACT = {
  email: "amd142457@gmail.com",
  phoneDisplay: "+966 56 323 9174",
  phoneTel: "+966563239174", // used for tel: and wa.me links
  facebook: "https://facebook.com/your-profile", // TODO: put your real Facebook URL here
  linkedin: "https://linkedin.com/in/your-profile", // TODO: put your real LinkedIn URL here
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    primary: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    href: `https://wa.me/${CONTACT.phoneTel.replace("+", "")}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneTel}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: CONTACT.linkedin,
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "Message on Facebook",
    href: CONTACT.facebook,
  },
];

function ChannelCard({ icon: Icon, label, value, href, primary, index }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      whileHover={{ y: -4 }}
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 transition-colors ${
        primary
          ? "border-[#5EEAD4]/50 bg-[#5EEAD4]/[0.06] hover:border-[#5EEAD4] sm:col-span-2"
          : "border-white/10 bg-[#12161D] hover:border-[#5EEAD4]/40"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          primary
            ? "bg-[#5EEAD4] text-[#04141A]"
            : "bg-[#171C24] text-[#5EEAD4]"
        }`}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-mono text-xs text-[#5C6875]">{label}</div>
        <div className="truncate text-sm font-medium text-[#EAEFF4]">
          {value}
        </div>
      </div>

      <ArrowUpRight
        size={16}
        className="shrink-0 text-[#5C6875] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[#5EEAD4]"
      />
    </motion.a>
  );
}

export default function Contact() {
  // spotlight that follows the cursor, smoothed with a spring
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, #5EEAD41A 0%, transparent 60%)`;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-t border-white/10 px-7 py-28"
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[720px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-sm text-[#5C6875]"
        >
          07 / CONTACT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-3 font-display text-3xl font-bold text-[#EAEFF4] sm:text-4xl"
        >
          Have a process that still runs on copy-paste and manual replies?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-5 max-w-md text-[#8C99A8]"
        >
          Tell me what it is — I&apos;ll map it into a workflow and tell you
          honestly whether automation is worth it before we build anything.
        </motion.p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-2">
        {CHANNELS.map((channel, i) => (
          <ChannelCard key={channel.label} {...channel} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative mx-auto mt-14 flex max-w-[720px] flex-wrap justify-center gap-8 font-mono text-xs text-[#5C6875]"
      >
        <span>RIYADH, SAUDI ARABIA</span>
        <span>OPEN FOR FREELANCE</span>
        <span>RESPONDS WITHIN 24H</span>
      </motion.div>
    </section>
  );
}

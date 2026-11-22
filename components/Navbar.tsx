"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Logo } from "./Art";

const links = [
  { href: "#product", label: "Product" },
  { href: "#process", label: "How it's made" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-2 transition-all duration-500 ${
          scrolled ? "bg-cream/85 shadow-[0_8px_30px_rgba(28,106,44,0.12)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <a href="#" aria-label="Sweetzy Natura home">
          <Logo size="sm" />
        </a>
        <div className="hidden gap-8 font-head text-sm font-semibold text-forest md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded bg-lime transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-forest px-5 py-2.5 font-head text-sm font-bold text-cream shadow-md shadow-forest/25 transition-transform hover:scale-105 active:scale-95"
        >
          Buy now
        </a>
      </nav>
    </motion.header>
  );
}

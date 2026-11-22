"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { brand, badges } from "@/lib/content";
import { LeafShape, MonkFruit, Wave, BadgeIcon } from "./Art";

const floatingLeaves = [
  { l: "4%", t: "18%", w: 46, r: -30, d: 0 },
  { l: "46%", t: "12%", w: 30, r: 40, d: 1.2 },
  { l: "90%", t: "16%", w: 54, r: 20, d: 0.6 },
  { l: "52%", t: "78%", w: 34, r: -60, d: 2 },
  { l: "94%", t: "70%", w: 40, r: 70, d: 1.6 },
  { l: "2%", t: "76%", w: 28, r: 15, d: 0.9 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const fruitX = useTransform(sx, [-0.5, 0.5], [-25, 25]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = brand.tagline.split(" ");

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-screen items-center overflow-hidden pb-32 pt-28"
    >
      {/* green band at the top, like the pack */}
      <div className="absolute inset-x-0 top-0 h-3 bg-forest" />
      <motion.div
        className="absolute -left-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-mint blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-[28rem] w-[28rem] rounded-full bg-lime/25 blur-3xl"
        animate={{ x: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {floatingLeaves.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute ${i === 2 || i === 4 ? "" : "hidden md:block"}`}
          style={{ left: f.l, top: f.t, width: f.w }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1, y: [0, -22, 0], rotate: [f.r, f.r + 18, f.r] }}
          transition={{
            opacity: { delay: 0.8 + f.d * 0.3 },
            scale: { delay: 0.8 + f.d * 0.3, type: "spring" },
            y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: f.d },
            rotate: { duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: f.d },
          }}
        >
          <LeafShape className="w-full drop-shadow-md" color={i % 2 ? "#3f9a35" : "#5fae3c"} />
        </motion.div>
      ))}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-1.5 font-head text-xs font-bold uppercase tracking-wider text-cream"
          >
            <LeafShape className="w-3" color="#8cc63f" /> Made from monk fruit extract
          </motion.span>

          <h1 className="mt-6 font-round text-5xl font-semibold leading-[1.05] text-forest md:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 pr-3 align-bottom">
                <motion.span
                  className={`inline-block ${w.startsWith("Sweetness") ? "font-script font-normal text-leaf" : ""}`}
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-5 max-w-md text-lg text-bark/80"
          >
            {brand.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#product"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-forest px-7 py-4 font-head font-bold text-cream shadow-lg shadow-forest/30 transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Discover the product
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#process" className="inline-flex items-center rounded-full border-2 border-forest/25 px-7 py-4 font-head font-bold text-forest transition-colors hover:border-forest hover:bg-forest/5">
              How it&apos;s made
            </a>
          </motion.div>

          <div className="mt-10 grid max-w-md grid-cols-4 gap-3">
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center text-forest"
              >
                <BadgeIcon kind={b.icon} className="h-11 w-11" />
                <span className="mt-1.5 font-head text-[11px] font-extrabold uppercase leading-tight">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: yArt }} className="relative mx-auto h-[520px] w-full max-w-[440px] [perspective:1200px]">
          <motion.div
            className="absolute inset-x-6 bottom-6 top-16 rounded-full bg-gradient-to-b from-mint to-lime/40 blur-2xl"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, y: 120, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 60, damping: 14 }}
            className="relative h-full [transform-style:preserve-3d]"
          >
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sweetzy-pack.webp"
                alt="Sweetzy Natura Monk Fruit Sweetener 200 g pack"
                className="h-full w-full rounded-[2.5rem] object-cover shadow-[0_40px_80px_-20px_rgba(28,106,44,0.45)] ring-8 ring-white/70"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: fruitX }} className="absolute -bottom-4 -left-10 w-28">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
            >
              <MonkFruit className="w-full drop-shadow-xl" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [-8, 8, -8] }}
            transition={{ opacity: { delay: 1.4 }, scale: { delay: 1.4, type: "spring" }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -right-6 top-6 grid h-28 w-28 place-items-center rounded-[50%_50%_50%_10%] bg-forest p-3 text-center text-cream shadow-xl"
          >
            <span className="font-head text-[10px] font-bold uppercase leading-tight">
              Zero
              <span className="block font-script text-xl normal-case text-lime">Sugar</span>
              Calorie free
            </span>
          </motion.div>
        </motion.div>
      </div>

      <Wave className="absolute inset-x-0 bottom-0 h-24 w-full" top="#8cc63f" bottom="#1c6a2c" />
    </section>
  );
}

"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, animate, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Plus, Mail, Phone, Check, Sprout, Droplets, Sparkles, Coffee } from "lucide-react";
import { brand, badges, product, stats, steps, uses, faqs } from "@/lib/content";
import { Reveal } from "./Reveal";
import { LeafShape, MonkFruit, Wave, BadgeIcon, Logo } from "./Art";

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-head text-sm font-bold uppercase tracking-[0.2em] ${light ? "text-lime" : "text-leaf"}`}>
      <span className="h-px w-8 bg-current" /> {children} <span className="h-px w-8 bg-current" />
    </p>
  );
}

/* ---------- Marquee strip ---------- */
export function Marquee() {
  const items = ["100% Natural", "Zero Sugar", "Calorie Free", "Plant Based", "Made from Monk Fruit", "Perfect for Chai"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-forest py-4 text-cream">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-round text-2xl font-medium">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <LeafShape className="w-4" color="#8cc63f" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Animated counters ---------- */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(value === 0 ? 99 : 0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(value === 0 ? 99 : 0, value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="group relative overflow-hidden rounded-3xl border-2 border-forest/10 bg-white/70 p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-leaf/40 hover:shadow-xl hover:shadow-forest/10">
              <LeafShape className="absolute -right-3 -top-3 w-12 rotate-45 opacity-15 transition-transform duration-500 group-hover:rotate-90" />
              <div className="font-round text-5xl font-semibold text-forest md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 font-head text-xs font-bold uppercase tracking-wider text-bark/60">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Product spotlight with 3D tilt ---------- */
export function Product() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });
  const glare = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useTransform(glare, (g) => `radial-gradient(circle at ${g} 25%, rgba(255,255,255,0.55), transparent 45%)`);

  return (
    <section id="product" className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Our product</Eyebrow>
        </div>
        <h2 className="mt-4 font-head text-4xl font-extrabold uppercase text-bark md:text-6xl">Monk Fruit</h2>
        <p className="mt-1 flex items-center justify-center gap-3 font-head text-lg font-semibold uppercase tracking-[0.35em] text-bark/80">
          <span className="h-px w-8 bg-bark/50" /> Sweetener <span className="h-px w-8 bg-bark/50" />
        </p>
      </Reveal>

      <div className="mt-16 grid items-center gap-14 md:grid-cols-2">
        <Reveal className="[perspective:1100px]">
          <motion.div
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              x.set((e.clientX - r.left) / r.width - 0.5);
              y.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            style={{ rotateX: rx, rotateY: ry }}
            className="group relative mx-auto max-w-sm overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(28,106,44,0.45)] [transform-style:preserve-3d]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sweetzy-pack.webp" alt="Sweetzy Natura Monk Fruit Sweetener pack" className="w-full transition-transform duration-700 group-hover:scale-105" />
            <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glareBg }} />
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <Logo size="md" />
            <h3 className="mt-6 font-round text-3xl font-semibold text-forest md:text-4xl">
              {product.name} <span className="text-leaf">· {product.weight}</span>
            </h3>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {product.points.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08} y={20}>
                <li className="flex items-center gap-3 text-lg">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf text-cream">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <div className="mt-8 grid grid-cols-4 gap-2 rounded-3xl bg-mint/70 p-4">
              {badges.map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center text-forest">
                  <BadgeIcon kind={b.icon} className="h-10 w-10" />
                  <span className="mt-1 font-head text-[10px] font-extrabold uppercase leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-head text-xs font-bold uppercase tracking-wider text-bark/60">Net Wt. {product.weight}</p>
                <p className="font-round text-4xl font-semibold text-forest">{product.price}</p>
              </div>
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-full bg-forest px-8 py-4 font-head font-bold text-cream shadow-lg shadow-forest/30 transition-transform hover:scale-105"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Order now
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process with scroll-drawn line ---------- */
const stepIcons = [Sprout, Droplets, Sparkles, Coffee];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="process" className="relative bg-forest text-cream">
      <Wave className="absolute inset-x-0 -top-px h-20 w-full rotate-180" top="#8cc63f" bottom="#f8f3e6" />
      <div className="relative overflow-hidden py-32">
        <motion.div className="absolute -right-32 top-20 w-72 opacity-10" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity }}>
          <LeafShape className="w-full" color="#8cc63f" />
        </motion.div>
        <motion.div className="absolute -left-10 bottom-10 w-40 opacity-20" animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          <MonkFruit className="w-full" />
        </motion.div>
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <Eyebrow light>From fruit to spoon</Eyebrow>
            <h2 className="mt-4 font-round text-4xl font-semibold md:text-6xl">
              How it&apos;s <span className="font-script font-normal text-lime">made</span>
            </h2>
          </Reveal>
          <div ref={ref} className="relative mt-16">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-cream/15" />
            <motion.div style={{ scaleY }} className="absolute left-6 top-0 h-full w-0.5 origin-top bg-lime" />
            <div className="space-y-14">
              {steps.map((s, i) => {
                const Icon = stepIcons[i];
                return (
                  <Reveal key={s.title} delay={0.1}>
                    <div className="flex gap-8">
                      <motion.div
                        whileInView={{ scale: [0.5, 1.15, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-forest shadow-lg shadow-black/20"
                      >
                        <Icon size={20} />
                      </motion.div>
                      <div>
                        <span className="font-head text-xs font-bold uppercase tracking-wider text-cream/50">Step {i + 1}</span>
                        <h3 className="font-round text-3xl font-semibold">{s.title}</h3>
                        <p className="mt-2 max-w-md text-cream/80">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Wave className="absolute inset-x-0 -bottom-px h-20 w-full" top="#8cc63f" bottom="#f8f3e6" />
    </section>
  );
}

/* ---------- Uses ---------- */
export function Uses() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 text-center">
      <Reveal>
        <h2 className="mx-auto max-w-3xl font-round text-4xl font-semibold text-forest md:text-6xl">
          Sweeten <span className="font-script font-normal text-leaf">everything</span> you love
        </h2>
      </Reveal>
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        {uses.map((u, i) => (
          <motion.span
            key={u}
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ scale: 1.1, rotate: i % 2 ? 3 : -3 }}
            className={`flex cursor-default items-center gap-2 rounded-full px-6 py-3 font-head font-bold shadow-sm ${
              ["bg-mint text-forest", "bg-sand text-bark", "bg-forest text-cream", "bg-white text-forest"][i % 4]
            }`}
          >
            <LeafShape className="w-3" color={i % 4 === 2 ? "#8cc63f" : "#3f9a35"} /> {u}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ accordion ---------- */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 pb-24">
      <Reveal>
        <h2 className="text-center font-round text-4xl font-semibold text-forest md:text-5xl">Questions, answered</h2>
      </Reveal>
      <div className="mt-12 space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06}>
            <div className={`overflow-hidden rounded-2xl border-2 transition-colors ${open === i ? "border-leaf/40 bg-white" : "border-forest/10 bg-white/60"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-head text-lg font-bold text-forest">
                {f.q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint">
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 text-bark/80">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact CTA + footer ---------- */
export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative mt-10 bg-forest text-cream">
      <Wave className="absolute inset-x-0 -top-px h-20 w-full rotate-180" top="#8cc63f" bottom="#f8f3e6" />
      <div className="relative overflow-hidden px-6 pb-10 pt-32">
        {[{ l: "6%", t: "30%", w: 60 }, { l: "88%", t: "22%", w: 44 }, { l: "80%", t: "70%", w: 70 }].map((f, i) => (
          <motion.div key={i} className="absolute opacity-25" style={{ left: f.l, top: f.t, width: f.w }} animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }} transition={{ duration: 7 + i, repeat: Infinity }}>
            <LeafShape className="w-full" color="#8cc63f" />
          </motion.div>
        ))}
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-round text-4xl font-semibold md:text-6xl">
            Ready for the <span className="font-script font-normal text-lime">sweet switch?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-cream/75">Get offers, recipes and updates on where to buy. Shops and cafés are welcome to ask about bulk orders.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-white/10 px-6 py-4 text-cream outline-none ring-1 ring-white/25 placeholder:text-cream/40 focus:ring-2 focus:ring-lime"
            />
            <button className="rounded-full bg-lime px-7 py-4 font-head font-bold text-forest transition-transform hover:scale-105 active:scale-95">
              {sent ? "Thank you!" : "Notify me"}
            </button>
          </form>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-cream/75">
            <a href={`mailto:${brand.email}`} className="flex items-center gap-2 hover:text-lime">
              <Mail size={16} /> {brand.email}
            </a>
            <span className="flex items-center gap-2">
              <Phone size={16} /> {brand.phone}
            </span>
          </div>
        </Reveal>
        <footer className="relative mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-cream/15 pt-8 text-sm text-cream/60 md:flex-row">
          <span className="rounded-2xl bg-cream px-4 py-2">
            <Logo size="sm" />
          </span>
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
        </footer>
      </div>
    </section>
  );
}

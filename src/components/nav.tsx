"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#install", label: "Install" },
  { href: "#skills", label: "Skills" },
  { href: "#vs", label: "Compare" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const updateActiveSection = useCallback(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    let current = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      updateActiveSection();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateActiveSection]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className={`sticky top-0 z-50 transition-all ${
        scrolled || mobileOpen
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[var(--pop-pink)]"
        style={{ scaleX }}
      />

      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="#top"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--pop-pink)] text-ink transition-transform group-hover:rotate-[-8deg]">
            <span aria-hidden className="text-black text-lg">◆</span>
          </span>
          Superpowers
          <span className="hidden font-serif-accent text-base text-muted-foreground sm:inline">
            · a Datasense workshop
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-5 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium transition ${
                  activeSection === l.href.slice(1)
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
                {activeSection === l.href.slice(1) && (
                  <motion.div
                    layoutId="nav-active"
                    className="mt-0.5 h-[2px] rounded-full bg-[var(--pop-pink)]"
                    transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://github.com/obra/superpowers"
              target="_blank"
              className="sticker bg-[var(--pop-yellow)]"
            >
              GitHub ↗
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex size-10 items-center justify-center rounded-xl border-2 border-ink bg-paper md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            className="text-ink"
          >
            <motion.line
              x1="0" x2="18" y1="1" y2="1"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={mobileOpen ? { rotate: 45, y: 6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
              style={{ originX: "9px", originY: "1px" }}
              transition={{ duration: 0.25 }}
            />
            <motion.line
              x1="0" x2="18" y1="7" y2="7"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="0" x2="18" y1="13" y2="13"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={mobileOpen ? { rotate: -45, y: -6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
              style={{ originX: "9px", originY: "13px" }}
              transition={{ duration: 0.25 }}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-4 sm:px-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 font-display text-base font-semibold tracking-tight transition hover:bg-muted ${
                      activeSection === l.href.slice(1)
                        ? "text-foreground bg-muted"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: LINKS.length * 0.03 }}
                className="mt-2 flex items-center gap-3"
              >
                <Link
                  href="https://github.com/obra/superpowers"
                  target="_blank"
                  onClick={() => setMobileOpen(false)}
                  className="sticker bg-[var(--pop-yellow)] w-fit"
                >
                  GitHub ↗
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

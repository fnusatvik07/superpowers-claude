"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="relative bg-ink py-16 text-paper"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--pop-pink)] text-ink">
              <span aria-hidden className="text-xl">◆</span>
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">
              Superpowers
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-md text-base text-paper/60">
            A workshop landing page by{" "}
            <a
              href="https://datasense.in"
              className="underline decoration-[var(--pop-yellow)] underline-offset-4"
            >
              Datasense
            </a>
            . Content grounded in{" "}
            <a
              href="https://github.com/obra/superpowers"
              className="underline decoration-[var(--pop-yellow)] underline-offset-4"
            >
              obra/superpowers
            </a>{" "}
            v5.0.7 (MIT).
          </p>

          {/* Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-paper/60">
            <a href="#problem" className="transition hover:text-paper">Problem</a>
            <a href="#how-it-works" className="transition hover:text-paper">How it works</a>
            <a href="#install" className="transition hover:text-paper">Install</a>
            <a href="#skills" className="transition hover:text-paper">Skills</a>
            <a href="#compare" className="transition hover:text-paper">Compare</a>
            <a href="#faq" className="transition hover:text-paper">FAQ</a>
            <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener" className="transition hover:text-paper">GitHub ↗</a>
            <a href="https://discord.gg/35wsABTejz" target="_blank" rel="noopener" className="transition hover:text-paper">Discord ↗</a>
            <a href="mailto:hi@datasense.in" className="transition hover:text-paper">Contact</a>
          </div>

          {/* Bottom */}
          <div className="mt-10 border-t border-paper/10 pt-6 text-xs text-paper/40">
            © {new Date().getFullYear()} Datasense. Credit to Jesse Vincent (@obra) and contributors.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

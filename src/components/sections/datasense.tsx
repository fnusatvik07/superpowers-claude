"use client";

import { motion } from "motion/react";

export function Datasense() {
  return (
    <section
      id="datasense"
      className="relative border-b border-ink/15 bg-[var(--pop-yellow)] py-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="bg-squiggle absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
            Your workshop host
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter text-ink sm:text-6xl">
            This page is a{" "}
            <span className="font-serif-accent">Datasense</span> artifact.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Datasense runs hands-on workshops for teams adopting agentic
            coding. We distill frameworks like Superpowers down to what works
            in production, teach the mental models, and walk teams through
            real features together.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="https://datasense.in"
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-ink px-8 py-4 font-display text-lg font-bold text-paper"
            >
              Book a workshop →
            </motion.a>
            <a
              href="#resources"
              className="text-base font-medium text-ink/70 underline underline-offset-4 hover:text-ink"
            >
              See all resources ↓
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

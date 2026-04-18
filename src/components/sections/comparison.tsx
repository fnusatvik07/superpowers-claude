"use client";

import { motion } from "motion/react";
import { COMPARISON_ROWS } from "@/lib/data";

export function Comparison() {
  return (
    <section id="compare" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
            How it compares
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
            The{" "}
            <span className="highlight-pink">discipline</span> slot,
            <br className="hidden sm:block" />
            not the capabilities slot.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            Different tools, different angles.
            Superpowers gives your agent <em className="font-serif-accent">judgment</em> —
            pair it with anything.
          </p>
        </motion.div>

        {/* Card grid instead of table */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPARISON_ROWS.map((row, i) => {
            const isSuperpowers = row.tool === "Superpowers";
            return (
              <motion.div
                key={row.tool}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`rounded-2xl border-2 p-6 ${
                  isSuperpowers
                    ? "border-ink bg-[var(--pop-pink)]/10"
                    : "border-ink/40 bg-paper"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {row.tool}
                  </h3>
                  {isSuperpowers && (
                    <span className="rounded-full bg-[var(--pop-pink)] px-2.5 py-0.5 text-xs font-bold text-ink">
                      this page
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base text-foreground/80">
                  {row.focus}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Scope</span>
                    <span className="font-medium">{row.scope}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Opinion</span>
                    <span className="font-medium">{row.opinionation}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/60">
                  {row.bestFor}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

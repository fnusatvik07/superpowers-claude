"use client";

import { motion } from "motion/react";
import { PHILOSOPHY } from "@/lib/data";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative border-b border-ink/15 bg-ink py-20 text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-paper/40">
            Philosophy
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
            Four beliefs,{" "}
            <span className="font-serif-accent text-[var(--pop-yellow)]">
              enforced
            </span>
            .
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/80">
            Not aspirations. Not best practices. Iron laws with delete buttons
            and gates that stop the agent mid-turn.
          </p>
        </motion.div>

        {/* Full-width manifesto blocks */}
        <div className="mt-10 space-y-0 divide-y divide-paper/10">
          {PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid gap-3 py-6 sm:grid-cols-[80px_1fr] sm:items-start"
            >
              {/* Big number */}
              <div
                className="font-display text-5xl font-bold tracking-tighter sm:text-6xl"
                style={{ color: p.pop }}
              >
                0{i + 1}
              </div>
              {/* Content */}
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-paper/80 sm:text-xl">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-10 rounded-2xl border-2 border-[var(--pop-yellow)]/30 bg-[var(--pop-yellow)]/10 px-6 py-5 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-display text-xl font-bold text-[var(--pop-yellow)]">
            These aren't aspirations.{" "}
            <span className="font-serif-accent">They're gates.</span>{" "}
            The agent is stopped, mid-response, until the rule is satisfied.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

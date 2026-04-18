"use client";

import { motion } from "motion/react";

const PAINS = [
  {
    title: "It jumps straight to code",
    body: "You ask for a feature. It starts typing files before asking what you're actually building.",
    pop: "var(--pop-pink)",
  },
  {
    title: "It re-explains itself every session",
    body: "Skills, conventions, style: all wiped at /clear. You become a human README read aloud.",
    pop: "var(--pop-yellow)",
  },
  {
    title: "It claims done without checking",
    body: '"It should work now." Did you run the tests? Did you read the output? Probably not.',
    pop: "var(--pop-violet)",
  },
  {
    title: "It writes tests after the fact",
    body: "Or never. Vanilla Claude treats TDD as a suggestion. Superpowers treats deleting your pre-test code as a feature.",
    pop: "var(--pop-mint)",
  },
  {
    title: "It debugs by vibes",
    body: "Hypotheses stacked three deep, none verified. Symptom fixes. Shotgun refactors.",
    pop: "var(--pop-orange)",
  },
  {
    title: "It reviews its own work",
    body: 'Single model, single pass, "looks good to me." No skeptical second reader.',
    pop: "var(--pop-pink)",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
            The problem
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
            Vanilla Claude Code is{" "}
            <span className="font-serif-accent">brilliant</span> and{" "}
            <span className="highlight-pink">undisciplined</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
            The model is great. What's missing is the scaffolding a senior
            engineer takes for granted.
          </p>
        </motion.div>

        {/* Alternating editorial cards */}
        <div className="mt-10 space-y-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className={`flex items-stretch gap-0 overflow-hidden rounded-2xl border-2 border-ink ${
                i % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              {/* Color accent bar */}
              <div
                className="w-2 shrink-0 sm:w-3"
                style={{ background: p.pop }}
              />
              {/* Content */}
              <div className="flex-1 bg-paper px-6 py-5 sm:px-8 sm:py-6">
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-foreground/80 sm:text-lg">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

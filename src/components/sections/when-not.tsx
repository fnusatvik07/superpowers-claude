"use client";

import { motion } from "motion/react";

const NOTS = [
  {
    title: "A one-off throwaway script",
    body: "Brainstorming + spec + plan + worktree for a 20-line shell helper is theater. Override in your CLAUDE.md or skip the skill.",
    pop: "var(--pop-yellow)",
  },
  {
    title: "You don't want TDD",
    body: "Superpowers' TDD rule is iron. If that's not your culture, fight it in CLAUDE.md (user instructions outrank skills) or pick a different framework.",
    pop: "var(--pop-pink)",
  },
  {
    title: "A harness without subagents",
    body: "SDD is the headline. Without Task-like dispatch (Gemini CLI today), the two-stage review collapses to a single pass. You still get TDD and structured planning, just less review depth.",
    pop: "var(--pop-mint)",
  },
  {
    title: "Token budget is scarce",
    body: "Spec/plan/review all cost tokens. Superpowers caps review loops and recommends cheap models for mechanical work, but the baseline is still higher than raw prompting.",
    pop: "var(--pop-violet)",
  },
  {
    title: "You need deep domain specialists",
    body: "Superpowers is horizontal methodology. For a Kubernetes, forensics, or Solidity expert, pair it with wshobson/agents or anthropics/skills.",
    pop: "var(--pop-orange)",
  },
  {
    title: "You're allergic to opinionation",
    body: "Every skill lists red flags and a rationalization table. It will correct you, mid-turn. If that reads as nagging rather than scaffolding — not for you.",
    pop: "var(--pop-pink)",
  },
];

export function WhenNot() {
  return (
    <section id="when-not" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">When not to use it</p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
            Honest trade-offs.{" "}
            <span className="font-serif-accent">No hype.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            Every opinionated framework has a shape it fits and a shape it
            doesn't. These are the cases where Superpowers hurts more than it
            helps — from the docs and release notes, not marketing.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NOTS.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative rounded-2xl border-2 border-dashed border-ink/60 bg-paper p-6"
            >
              <div
                className="absolute -right-3 -top-3 size-10 rotate-12 rounded-full border-2 border-ink"
                style={{ background: n.pop }}
                aria-hidden
              />
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {n.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/85">{n.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

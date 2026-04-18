"use client";

import { motion } from "motion/react";

export function WhatIs() {
  return (
    <section id="what" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">What it is</p>
            <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-6xl">
              <span className="highlight-yellow">Not</span> a skill pack.{" "}
              <span className="font-serif-accent">A methodology</span> that
              happens to ship as skills.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              Built by{" "}
              <a
                href="https://blog.fsck.com"
                target="_blank"
                rel="noopener"
                className="underline decoration-[var(--pop-pink)] decoration-2 underline-offset-4 hover:text-foreground"
              >
                Jesse Vincent (obra)
              </a>{" "}
              and folks at{" "}
              <a
                href="https://primeradiant.com"
                target="_blank"
                rel="noopener"
                className="underline decoration-[var(--pop-pink)] decoration-2 underline-offset-4 hover:text-foreground"
              >
                Prime Radiant
              </a>
              , Superpowers is — in Jesse's own words — "a complete software
              development methodology for your coding agents, built on top of a
              set of composable skills and some initial instructions that make
              sure your agent uses them."
            </p>

            <div className="mt-6 space-y-4 text-foreground/90">
              <p>
                As soon as the agent sees you're building something, it{" "}
                <strong className="text-foreground">doesn't jump into code</strong>
                . It steps back. It asks what you're trying to do. It presents
                a design in sections. You sign off. Only then does it write a
                plan detailed enough for an{" "}
                <span className="font-serif-accent">
                  "enthusiastic junior engineer with poor taste, no judgement,
                  no project context, and an aversion to testing"
                </span>{" "}
                to follow.
              </p>
              <p>
                Then it launches{" "}
                <abbr title="Independent Claude Code instances dispatched via the Task tool to work on isolated subtasks in parallel" className="glossary-term no-underline">
                  subagents
                </abbr>{" "}
                per task — an implementer, a spec
                reviewer, a code-quality reviewer — and works autonomously for
                hours without drifting from the plan.
              </p>
              <p className="rounded-2xl border-2 border-ink bg-[var(--pop-yellow)] p-4 font-display text-lg leading-snug">
                "And because the skills trigger automatically, you don't need
                to do anything special. Your coding agent just has Superpowers."
                <span className="mt-1 block text-sm font-normal not-italic opacity-70">
                  — README.md
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chunky-border relative rounded-3xl bg-ink p-6 text-paper"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="size-3 rounded-full bg-[var(--pop-pink)]" />
              <span className="size-3 rounded-full bg-[var(--pop-yellow)]" />
              <span className="size-3 rounded-full bg-[var(--pop-mint)]" />
              <span className="ml-3 text-xs font-mono text-paper/60">
                claude — session-start
              </span>
            </div>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-paper/90">
{`[SessionStart hook fires]
→ reads skills/using-superpowers/SKILL.md
→ injects as additionalContext
→ labels it EXTREMELY_IMPORTANT

you:   let's build a CLI for parsing CSVs

claude (with superpowers):
  I'm invoking the \`brainstorming\` skill.
  Before we write anything: what are you
  actually trying to do?

  1) What's the input shape?
  2) Who's the user?
  3) What's already tried?

  (I'm asking one question at a time.)`}
            </pre>
            <div className="absolute -top-4 right-6 rotate-6">
              <span className="sticker bg-[var(--pop-yellow)]">
                the 1% rule
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";

const FLOW = [
  {
    id: "brainstorming",
    label: "brainstorming",
    sub: "design, not code.",
    pop: "var(--pop-pink)",
    detail:
      "Hard gate: NO code until design approved. Saves docs/superpowers/specs/YYYY-MM-DD-topic-design.md. Runs inline spec review.",
  },
  {
    id: "using-git-worktrees",
    label: "using-git-worktrees",
    sub: "isolate before you touch main.",
    pop: "var(--pop-violet)",
    detail:
      "Creates .worktrees/<feature>, detects toolchain, runs setup, verifies a clean test baseline. Requires .gitignore safety.",
  },
  {
    id: "writing-plans",
    label: "writing-plans",
    sub: "tasks small enough to commit.",
    pop: "var(--pop-yellow)",
    detail:
      "2–5 minute tasks. No placeholders. Each task independently readable. Inline self-review for placeholder anti-patterns.",
  },
  {
    id: "sdd",
    label: "subagent-driven-development",
    sub: "per task: implementer → spec review → code-quality review.",
    pop: "var(--pop-orange)",
    detail:
      "Three subagents per task. Spec reviewer is explicitly skeptical: reads code, doesn't trust reports. Code-quality only runs after spec compliance passes.",
  },
  {
    id: "tdd",
    label: "test-driven-development",
    sub: "enforced inside every subagent.",
    pop: "var(--pop-mint)",
    detail:
      'Iron law: no production code without a failing test. Wrote code first? "Delete it. Start over." Delete means delete.',
  },
  {
    id: "verify",
    label: "verification-before-completion",
    sub: "no claims without evidence.",
    pop: "var(--pop-pink)",
    detail:
      "Gate before asserting success. Run the command, read the full output, then claim the result. Hedging language flagged.",
  },
  {
    id: "review",
    label: "requesting-code-review",
    sub: "dispatches the code-reviewer agent.",
    pop: "var(--pop-violet)",
    detail:
      "Sends base/head SHAs, plan, description. Returns Critical / Important / Suggestions findings. Pairs with receiving-code-review for how to respond.",
  },
  {
    id: "finish",
    label: "finishing-a-development-branch",
    sub: "merge · PR · keep · discard.",
    pop: "var(--pop-yellow)",
    detail:
      "Exactly four options. Discard requires typed confirmation. Worktree cleanup for 1/2/4. Never merges with failing tests.",
  },
];

export function Collaboration() {
  return (
    <section
      id="collab"
      className="relative border-b border-ink/15 bg-ink py-20 text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="bg-grid absolute inset-0" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">Collaboration</p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
            Skills don't live in silos —{" "}
            <span className="font-serif-accent text-[var(--pop-yellow)]">
              they chain.
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/85">
            There is no orchestrator process. The chain is encoded in skill
            prose: <strong className="text-paper">REQUIRED BACKGROUND</strong>,{" "}
            <strong className="text-paper">REQUIRED SUB-SKILL</strong>, and{" "}
            <strong className="text-paper">Complementary skills</strong>{" "}
            markers. Here's the canonical workflow from the README.
          </p>
        </motion.div>

        {/* Compact flow summary */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border-2 border-paper/20 bg-paper/5 px-5 py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="mr-2 text-xs font-bold uppercase tracking-widest text-paper/50">the chain</span>
          {FLOW.map((step, i) => (
            <span key={step.id} className="flex items-center gap-2">
              <span
                className="rounded-full border border-ink px-2.5 py-1 font-mono text-xs font-bold text-ink"
                style={{ background: step.pop }}
              >
                {step.label.split("-").slice(0, 2).join("-")}
              </span>
              {i < FLOW.length - 1 && (
                <span className="text-paper/40" aria-hidden>→</span>
              )}
            </span>
          ))}
        </motion.div>

        <ol className="mt-8 space-y-4">
          {FLOW.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative grid gap-4 rounded-3xl border-2 border-paper/20 bg-paper/5 p-6 backdrop-blur md:grid-cols-[auto_auto_1fr] md:items-center"
            >
              <div
                className="font-display flex size-14 items-center justify-center rounded-2xl border-2 border-ink text-2xl font-bold text-ink"
                style={{ background: step.pop }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="min-w-[220px]">
                <div className="font-display text-2xl font-semibold tracking-tight">
                  {step.label}
                </div>
                <div className="text-sm font-serif-accent text-paper/60">
                  {step.sub}
                </div>
              </div>
              <p className="text-paper/90">{step.detail}</p>
              {i < FLOW.length - 1 && (
                <div
                  aria-hidden
                  className="absolute bottom-[-16px] left-[46px] h-6 w-0.5 bg-paper/30 md:bottom-[-18px]"
                />
              )}
            </motion.li>
          ))}
        </ol>

        <motion.div
          className="mt-14 grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="rounded-3xl border-2 border-paper/20 bg-paper/5 p-6">
            <div className="font-display text-lg font-bold">
              The <abbr title="Subagent-Driven Development — each plan task runs through implementer → spec reviewer → code-quality reviewer" className="glossary-term no-underline">SDD</abbr> inner loop
            </div>
            <p className="mt-2 text-sm text-paper/85">
              Inside every task, three subagents run in sequence:{" "}
              <span className="font-mono">implementer → spec reviewer → code-quality reviewer</span>.
              Spec review must pass before code-quality even starts.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-paper/20 bg-paper/5 p-6">
            <div className="font-display text-lg font-bold">
              Parallel when truly independent
            </div>
            <p className="mt-2 text-sm text-paper/85">
              <code className="font-mono">dispatching-parallel-agents</code>{" "}
              fans out, but only if tasks don't share state. Focused per-agent
              prompts, parallel dispatch, integrate.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-paper/20 bg-paper/5 p-6">
            <div className="font-display text-lg font-bold">
              Debugging injects here
            </div>
            <p className="mt-2 text-sm text-paper/85">
              <code className="font-mono">systematic-debugging</code> triggers on
              any bug/test-failure inside any phase. Finds root cause. Hands
              back to TDD for a failing test + minimal fix.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

type Phase = {
  id: string;
  skill: string;
  speaker: "human" | "agent" | "system";
  title: string;
  detail: string;
  note?: string;
};

const PHASES: Phase[] = [
  {
    id: "start",
    skill: "SessionStart hook",
    speaker: "system",
    title: "Session begins",
    detail:
      "The SessionStart hook fires automatically. It injects the full skill roster into the agent's context. Every skill is now available, no setup needed.",
  },
  {
    id: "ask",
    skill: "",
    speaker: "human",
    title: "You describe what to build",
    detail:
      '"Build me a rate limiter for our API." Natural language. No template, no format. Just say what you need.',
  },
  {
    id: "brainstorm-1",
    skill: "brainstorming",
    speaker: "agent",
    title: "Agent asks, doesn't code",
    detail:
      "Instead of jumping to code, the agent invokes brainstorming. It asks one clarifying question at a time: Per-user or per-IP? In-memory or Redis? What happens over limit?",
    note: "Iron law: NO code until design is approved.",
  },
  {
    id: "brainstorm-2",
    skill: "brainstorming",
    speaker: "agent",
    title: "Design options presented",
    detail:
      'Three approaches with trade-offs: (A) Token bucket, in-memory. (B) Redis-backed. (C) Sliding window log. "I\'ll wait for your pick."',
  },
  {
    id: "approve",
    skill: "",
    speaker: "human",
    title: "You approve the direction",
    detail:
      '"Go with B, Redis-backed token bucket." The agent saves a timestamped spec and runs an inline review for contradictions.',
  },
  {
    id: "worktree",
    skill: "git-worktrees",
    speaker: "agent",
    title: "Isolate in a worktree",
    detail:
      "Creates a feature worktree, detects toolchain, runs setup, verifies a clean test baseline. Main branch stays untouched.",
  },
  {
    id: "plan",
    skill: "writing-plans",
    speaker: "agent",
    title: "Plan: 6 tasks, each 2-5 min",
    detail:
      "Each task is small enough to commit independently. No placeholders. Inline self-review catches anti-patterns.",
    note: "Emphasis: true red/green TDD, YAGNI, DRY.",
  },
  {
    id: "go",
    skill: "",
    speaker: "human",
    title: '"Looks good. Go."',
    detail:
      "You reviewed the plan. One word is enough. The agent launches subagent-driven-development.",
  },
  {
    id: "sdd-1",
    skill: "subagent-driven-dev",
    speaker: "agent",
    title: "Task 1/6: dispatch implementer",
    detail:
      "A subagent picks up task 1 and follows TDD: failing test first → verify RED → minimal code → verify GREEN → commit.",
  },
  {
    id: "sdd-review",
    skill: "code-review",
    speaker: "agent",
    title: "Spec reviewer reads the code",
    detail:
      "A skeptical second subagent reads the actual code. Spec says 'per-user'; implementation uses IP. FAIL. Sends back.",
  },
  {
    id: "sdd-fix",
    skill: "TDD",
    speaker: "agent",
    title: "Fix, re-test, code-quality pass",
    detail:
      "Implementer fixes the mismatch. Spec reviewer re-checks: PASS. Code-quality reviewer runs. All clear. Commit.",
  },
  {
    id: "sdd-continue",
    skill: "subagent-driven-dev",
    speaker: "agent",
    title: "Tasks 2-6 complete autonomously",
    detail:
      "Same loop repeats: implementer → spec review → code-quality review → commit. Hours of autonomous work.",
  },
  {
    id: "verify",
    skill: "verification",
    speaker: "agent",
    title: "Evidence before claims",
    detail:
      "npm test → 28 passed, 0 failed. Load test: 1000 req at 100/s → 100 allowed, 900 rejected. Hard evidence.",
    note: "No hedging language. Run it, read it, then claim it.",
  },
  {
    id: "finish",
    skill: "finishing-branch",
    speaker: "agent",
    title: "Four finish options",
    detail:
      "Merge to main, open PR, keep branch, or discard. You pick. Worktree cleanup handled automatically.",
  },
  {
    id: "done",
    skill: "",
    speaker: "system",
    title: "Your agent just had Superpowers",
    detail:
      "All skills triggered automatically. Design, plan, build, test, review, ship. With discipline at every step.",
  },
];

const SPEAKER_CONFIG = {
  human: { label: "You", bg: "bg-[var(--pop-yellow)]" },
  agent: { label: "Claude", bg: "bg-[var(--pop-mint)]" },
  system: { label: "System", bg: "bg-[var(--pop-violet)]" },
} as const;

export function HowItWorks() {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const play = useCallback(() => {
    setPlaying(true);
    setStep((s) => (s < 0 ? 0 : s));
  }, []);

  const pause = useCallback(() => { setPlaying(false); clearTimer(); }, [clearTimer]);
  const reset = useCallback(() => { setPlaying(false); clearTimer(); setStep(-1); }, [clearTimer]);
  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => setStep((s) => Math.min(PHASES.length - 1, s + 1)), []);

  // Auto-advance
  useEffect(() => {
    if (!playing || step >= PHASES.length - 1) {
      if (step >= PHASES.length - 1) setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), 3000);
    return clearTimer;
  }, [playing, step, clearTimer]);

  const phase = step >= 0 ? PHASES[step] : null;
  const speaker = phase ? SPEAKER_CONFIG[phase.speaker] : null;
  const progress = step >= 0 ? ((step + 1) / PHASES.length) * 100 : 0;

  // Skills activated so far
  const activatedSkills = Array.from(
    new Set(PHASES.slice(0, step + 1).map((p) => p.skill).filter(Boolean))
  );

  return (
    <section
      id="how-it-works"
      className="relative border-b border-ink/15 bg-ink py-20 text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-paper/40">
            How it works
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            From prompt to PR
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/80">
            Watch the full Superpowers workflow, or step through it manually.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {step < 0 ? (
            <button
              onClick={play}
              className="chunky-border inline-flex items-center gap-3 rounded-2xl bg-[var(--pop-yellow)] px-8 py-4 font-display text-lg font-bold text-ink"
            >
              <Play className="size-5 fill-current" /> Play walkthrough
            </button>
          ) : (
            <>
              <button onClick={prev} disabled={step <= 0}
                className="flex size-12 items-center justify-center rounded-xl border-2 border-paper/20 bg-paper/10 disabled:opacity-20">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={playing ? pause : play}
                className="flex size-12 items-center justify-center rounded-xl border-2 border-paper/20 bg-paper/10">
                {playing ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
              </button>
              <button onClick={next} disabled={step >= PHASES.length - 1}
                className="flex size-12 items-center justify-center rounded-xl border-2 border-paper/20 bg-paper/10 disabled:opacity-20">
                <ChevronRight className="size-5" />
              </button>
              <button onClick={reset}
                className="flex size-12 items-center justify-center rounded-xl border-2 border-paper/20 bg-paper/10">
                <RotateCcw className="size-5" />
              </button>
              <span className="ml-2 font-display text-lg font-bold tabular-nums text-paper/80">
                {step + 1}
                <span className="text-paper/30"> / {PHASES.length}</span>
              </span>
            </>
          )}
        </div>

        {/* Progress bar */}
        {step >= 0 && (
          <div className="mx-auto mt-6 h-2 max-w-lg overflow-hidden rounded-full bg-paper/10">
            <motion.div
              className="h-full rounded-full bg-[var(--pop-yellow)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        {/* Main card — single step view */}
        <div className="mt-10 min-h-[280px]">
          {step < 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-3xl border-2 border-dashed border-paper/10">
              <p className="font-display text-2xl text-paper/20">
                15 steps from prompt to merged PR
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={phase!.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border-2 border-paper/20 bg-paper/[0.07] p-5 sm:p-7"
              >
                {/* Speaker + skill row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full ${speaker!.bg} px-4 py-1.5 text-sm font-bold text-ink`}>
                    {speaker!.label}
                  </span>
                  {phase!.skill && (
                    <span className="rounded-full border-2 border-paper/30 px-4 py-1.5 font-mono text-sm font-semibold text-paper">
                      {phase!.skill}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {phase!.title}
                </h3>

                {/* Detail */}
                <p className="mt-4 text-lg leading-relaxed text-paper/80 sm:text-xl">
                  {phase!.detail}
                </p>

                {/* Note */}
                {phase!.note && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 rounded-2xl border-2 border-[var(--pop-yellow)]/40 bg-[var(--pop-yellow)]/10 px-5 py-4"
                  >
                    <p className="font-display text-base font-bold text-[var(--pop-yellow)]">
                      {phase!.note}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Skills activated — horizontal bar */}
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-paper/10 bg-paper/[0.04] px-6 py-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-paper/35">
              Skills activated so far
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activatedSkills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-full border border-paper/30 bg-paper/10 px-3 py-1 text-sm font-medium text-paper"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

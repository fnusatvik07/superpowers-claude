"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type FlowStep = {
  title: string;
  detail: string;
};

type SkillFlow = {
  id: string;
  label: string;
  pop: string;
  summary: string;
  ironLaw?: string;
  steps: FlowStep[];
};

const SKILL_FLOWS: SkillFlow[] = [
  {
    id: "brainstorming",
    label: "brainstorming",
    pop: "var(--pop-pink)",
    summary: "Design before code. No exceptions.",
    ironLaw: "NO code until design is approved.",
    steps: [
      { title: "You describe the feature", detail: "Natural language. No template needed." },
      { title: "Agent asks clarifying questions", detail: "One at a time. Not a wall of questions." },
      { title: "Design options presented", detail: "With trade-offs for each approach." },
      { title: "You approve a direction", detail: "Agent waits. Doesn't assume." },
      { title: "Spec saved to docs/", detail: "Timestamped, machine-readable design doc." },
      { title: "Inline spec review runs", detail: "Checks for contradictions and gaps." },
    ],
  },
  {
    id: "tdd",
    label: "test-driven-development",
    pop: "var(--pop-mint)",
    summary: "Failing test first. Always.",
    ironLaw: "No production code without a failing test. Wrote code first? Delete it. Start over.",
    steps: [
      { title: "Write a failing test", detail: "Describes the behavior you want." },
      { title: "Verify RED", detail: "Run it. Confirm it fails for the right reason." },
      { title: "Write minimal code", detail: "Just enough to make the test pass." },
      { title: "Verify GREEN", detail: "Run again. Confirm it passes." },
      { title: "Refactor if needed", detail: "Clean up while tests protect you." },
      { title: "Commit", detail: "Small, tested, independently reviewable." },
    ],
  },
  {
    id: "sdd",
    label: "subagent-driven-dev",
    pop: "var(--pop-orange)",
    summary: "Three agents per task. Trust nothing.",
    steps: [
      { title: "Read the plan", detail: "Pick the next task from the plan doc." },
      { title: "Dispatch implementer", detail: "Subagent writes code following TDD." },
      { title: "Dispatch spec reviewer", detail: "Reads actual code. Doesn't trust reports." },
      { title: "Spec review gate", detail: "Must PASS before code-quality starts." },
      { title: "Dispatch code-quality reviewer", detail: "Style, patterns, edge cases." },
      { title: "Commit and next task", detail: "Move to the next plan item." },
    ],
  },
  {
    id: "debugging",
    label: "systematic-debugging",
    pop: "var(--pop-violet)",
    summary: "Root cause, not symptoms.",
    ironLaw: "No shotgun fixes. Find the actual bug.",
    steps: [
      { title: "Observe symptoms", detail: "Read the full error. Don't skim." },
      { title: "Reproduce reliably", detail: "If you can't reproduce it, you can't fix it." },
      { title: "Form one hypothesis", detail: "Not three. One at a time." },
      { title: "Test the hypothesis", detail: "Design an experiment that proves or disproves." },
      { title: "Identify root cause", detail: "Follow the chain to the source." },
      { title: "Hand off to TDD", detail: "Write a failing test for the bug, then fix." },
    ],
  },
  {
    id: "verification",
    label: "verification",
    pop: "var(--pop-yellow)",
    summary: "Evidence before claims.",
    ironLaw: "No asserting success without running the command and reading the output.",
    steps: [
      { title: "Run the actual command", detail: "Not 'it should work.' Run it." },
      { title: "Read the full output", detail: "Every line. Not just the exit code." },
      { title: "Check exit code", detail: "0 means success. Anything else: investigate." },
      { title: "Only then claim the result", detail: "Hedging language is flagged." },
    ],
  },
  {
    id: "code-review",
    label: "code-review",
    pop: "var(--pop-pink)",
    summary: "A skeptical second reader.",
    steps: [
      { title: "Prepare the diff", detail: "Base SHA, head SHA, plan reference." },
      { title: "Dispatch code-reviewer agent", detail: "Independent subagent. 6 review activities." },
      { title: "Agent reads actual code", detail: "Doesn't trust summaries or reports." },
      { title: "Findings categorized", detail: "Critical / Important / Suggestions." },
      { title: "Respond via receiving-code-review", detail: "Address each finding. No silent skips." },
    ],
  },
  {
    id: "finishing",
    label: "finishing-branch",
    pop: "var(--pop-yellow)",
    summary: "Four options. No ambiguity.",
    steps: [
      { title: "All tests must pass", detail: "Never merges with failing tests." },
      { title: "Choose: merge to main", detail: "Fast-forward or squash merge." },
      { title: "Choose: open a PR", detail: "Push branch, create PR with description." },
      { title: "Choose: keep branch", detail: "Leave worktree intact for later." },
      { title: "Choose: discard", detail: "Requires typed confirmation. Deletes worktree." },
    ],
  },
  {
    id: "using-superpowers",
    label: "using-superpowers",
    pop: "var(--pop-pink)",
    summary: "The bootloader. Runs every session.",
    ironLaw: "Even a 1% chance a skill applies means you must invoke it.",
    steps: [
      { title: "SessionStart hook fires", detail: "Triggered at startup, /clear, and /compact." },
      { title: "Reads SKILL.md", detail: "Loads the full skill roster into context." },
      { title: "Injects as additionalContext", detail: "Labelled EXTREMELY_IMPORTANT." },
      { title: "Agent now knows all 14 skills", detail: "Auto-invokes whichever applies to the task." },
    ],
  },
  {
    id: "writing-skills",
    label: "writing-skills",
    pop: "var(--pop-violet)",
    summary: "TDD for skills themselves.",
    ironLaw: "NO SKILL WITHOUT A FAILING TEST FIRST.",
    steps: [
      { title: "Write a failing test for the skill", detail: "A prompt that should trigger it + one that shouldn't." },
      { title: "Run test against isolated subagent", detail: "Trigger prompt should invoke skill — currently doesn't. RED." },
      { title: "Write SKILL.md", detail: "Trigger description (When to Use), not feature list. Under 200 words." },
      { title: "Re-run test", detail: "Subagent now invokes the skill on trigger, skips on unrelated. GREEN." },
    ],
  },
  {
    id: "writing-plans",
    label: "writing-plans",
    pop: "var(--pop-yellow)",
    summary: "Spec to tasks. No placeholders.",
    ironLaw: "No placeholders. Every task readable independently.",
    steps: [
      { title: "Read the approved design spec", detail: "The brainstorming output is the input." },
      { title: "Break into 2-5 minute tasks", detail: "Each task: failing test → minimal code → green → commit." },
      { title: "Inline self-review", detail: "Catches 'TODO', 'implement later', placeholder anti-patterns." },
      { title: "Save plan doc", detail: "Timestamped to docs/superpowers/plans/." },
    ],
  },
  {
    id: "executing-plans",
    label: "executing-plans",
    pop: "var(--pop-orange)",
    summary: "Run plans without subagents.",
    steps: [
      { title: "Read the plan", detail: "Load the plan doc into context." },
      { title: "Execute tasks sequentially", detail: "Uses TodoWrite to track progress." },
      { title: "Stop on blockers", detail: "Never guesses. Stops immediately and reports." },
      { title: "Verify each task", detail: "Run tests after each task completes." },
    ],
  },
  {
    id: "worktrees",
    label: "using-git-worktrees",
    pop: "var(--pop-violet)",
    summary: "Isolate before you touch main.",
    steps: [
      { title: "Create feature worktree", detail: "In .worktrees/<feature-name>." },
      { title: "Detect toolchain", detail: "Auto-discovers package manager, test runner, build tool." },
      { title: "Run setup", detail: "Install dependencies, build if needed." },
      { title: "Verify clean baseline", detail: "All existing tests must pass before writing new code." },
      { title: "Add .gitignore safety", detail: "Ensures worktree artifacts don't leak into git." },
    ],
  },
  {
    id: "parallel",
    label: "dispatching-parallel-agents",
    pop: "var(--pop-orange)",
    summary: "Fan out on independent tasks.",
    steps: [
      { title: "Identify independent work", detail: "Tasks must have zero shared state." },
      { title: "Write focused per-agent prompts", detail: "Each agent gets clear, scoped instructions." },
      { title: "Dispatch in parallel", detail: "Multiple subagents run simultaneously." },
      { title: "Integrate results", detail: "Merge outputs, resolve any conflicts." },
    ],
  },
  {
    id: "receiving-review",
    label: "receiving-code-review",
    pop: "var(--pop-pink)",
    summary: "React technically, not performatively.",
    ironLaw: "No performative acknowledgements. Acknowledge by action.",
    steps: [
      { title: "Restate the finding", detail: "Show you understood what was flagged." },
      { title: "Verify the claim", detail: "Read the code yourself. Don't take the reviewer's word." },
      { title: "Evaluate severity", detail: "Critical / Important / Suggestion." },
      { title: "Respond with action", detail: "Fix it, explain why not, or mark as won't-fix with reason." },
    ],
  },
];

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export function SkillFlows() {
  const [active, setActive] = useState(0);
  const flow = SKILL_FLOWS[active];

  return (
    <section
      id="skill-flows"
      className="relative border-b border-ink/15 bg-ink py-20 text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Inside each skill</p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-6xl">
            Pick a skill.{" "}
            <span className="font-serif-accent text-[var(--pop-yellow)]">
              Watch it work.
            </span>
          </h2>
          <p className="mt-4 text-lg text-paper/80">
            Every skill follows a strict sequence: gates that block progress,
            handoffs between agents, and iron laws that can't be overridden.
            Select a skill to see what fires inside.
          </p>
        </motion.div>

        {/* Skill selector */}
        <div className="mt-10 flex flex-wrap gap-2">
          {SKILL_FLOWS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="rounded-full border-2 px-5 py-2.5 font-display text-sm font-bold transition"
              style={{
                background: active === i ? s.pop : "transparent",
                color: active === i ? "var(--ink)" : "var(--paper)",
                borderColor: active === i ? "var(--ink)" : "oklch(1 0 0 / 20%)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Flow visualization */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: summary card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.id + "-summary"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: easeOutQuart }}
              className="self-start rounded-3xl border-2 border-paper/20 bg-paper/10 p-7"
            >
              <div
                className="inline-block rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink"
                style={{ background: flow.pop }}
              >
                {flow.label}
              </div>
              <p className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {flow.summary}
              </p>
              {flow.ironLaw && (
                <div className="mt-5 rounded-xl border-2 border-ink bg-[var(--pop-yellow)] p-3 text-ink">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    iron law
                  </div>
                  <p className="mt-1 font-mono text-base font-semibold leading-snug">
                    {flow.ironLaw}
                  </p>
                </div>
              )}
              <div className="mt-5 flex items-center gap-3 text-sm text-paper/50">
                <span className="font-display font-bold">{flow.steps.length} steps</span>
                <span className="text-paper/30">in this flow</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: animated step flow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.id + "-flow"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Timeline line */}
              <motion.div
                key={flow.id + "-line"}
                className="absolute left-[18px] top-4 bottom-4 w-px"
                style={{ background: flow.pop, opacity: 0.3 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuart }}
                layout={false}
              />

              <div className="space-y-3">
                {flow.steps.map((step, i) => (
                  <motion.div
                    key={`${flow.id}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.12 + i * 0.08,
                      ease: easeOutQuart,
                    }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Step number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15 + i * 0.08,
                        ease: easeOutQuart,
                      }}
                      className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-base font-bold text-ink"
                      style={{ background: flow.pop }}
                    >
                      {i + 1}
                    </motion.div>

                    {/* Step card */}
                    <div className="flex-1 rounded-2xl border border-paper/20 bg-paper/[0.06] px-5 py-4">
                      <div className="font-display text-lg font-bold tracking-tight">
                        {step.title}
                      </div>
                      <p className="mt-2 text-base leading-relaxed text-paper/80">{step.detail}</p>
                    </div>

                    {/* Arrow connector to next step */}
                    {i < flow.steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="absolute -bottom-2 left-[14px] text-xs"
                        style={{ color: flow.pop }}
                        aria-hidden
                      >
                        |
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Completion indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + flow.steps.length * 0.08,
                    ease: easeOutQuart,
                  }}
                  className="flex items-center gap-3 pl-1 pt-2"
                >
                  <div
                    className="flex size-9 items-center justify-center rounded-full border-2 border-ink font-display text-sm font-bold text-ink"
                    style={{ background: flow.pop }}
                  >
                    ✓
                  </div>
                  <span className="font-display text-sm font-semibold text-paper/50">
                    Skill complete. Next skill in the chain fires.
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

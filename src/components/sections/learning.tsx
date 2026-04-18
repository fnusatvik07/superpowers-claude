"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Step = {
  you: string;
  agent: string;
  skill: string;
  note?: string;
  pop: string;
};

type Scenario = {
  id: string;
  title: string;
  blurb: string;
  goal: string;
  steps: Step[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "feature",
    title: "Ship a feature with Superpowers",
    blurb: "End-to-end: from ask, to approved design, to merged PR.",
    goal: "Add a CSV-to-JSON converter to our CLI.",
    steps: [
      {
        you: "add a csv-to-json command to our cli",
        agent:
          "Invoking `brainstorming`. Before I touch code: is this a one-shot conversion or streaming? What delimiter defaults? What does 'json' mean here — one object, array, or NDJSON?",
        skill: "brainstorming",
        note: "One question at a time. No code yet.",
        pop: "var(--pop-pink)",
      },
      {
        you: "streaming, default comma, NDJSON output",
        agent:
          "Design options: (A) pipe-only, stdin→stdout. (B) --in/--out flags. (C) both. Pros/cons of each. I'll wait for approval before continuing.",
        skill: "brainstorming",
        pop: "var(--pop-pink)",
      },
      {
        you: "go with C",
        agent:
          "Design spec saved to `docs/superpowers/specs/2026-04-17-csv-to-json-design.md`. Ran inline self-review: no placeholders, no contradictions. Invoking `using-git-worktrees`...",
        skill: "using-git-worktrees",
        note: "Creates .worktrees/feat-csv2json, verifies clean tests.",
        pop: "var(--pop-violet)",
      },
      {
        you: "",
        agent:
          "Invoking `writing-plans`. 7 tasks, each 2–5 minutes, failing test → verify red → minimal code → verify green → commit. Saved to `docs/superpowers/plans/2026-04-17-csv-to-json.md`. Want to review before I start?",
        skill: "writing-plans",
        pop: "var(--pop-yellow)",
      },
      {
        you: "looks good, go",
        agent:
          "Invoking `subagent-driven-development`. Task 1/7 → dispatching implementer subagent... implementer reports DONE → dispatching spec reviewer (reads the code) → PASS → dispatching code-quality reviewer → Minor (1 comment). Committing.",
        skill: "subagent-driven-development",
        note: "Per task: implementer → spec review → code-quality review.",
        pop: "var(--pop-orange)",
      },
      {
        you: "",
        agent:
          "Tasks 2–7 complete. Running `verification-before-completion`: `npm test` passed (42 tests), `npm run lint` clean, exit code 0. Evidence before claims.",
        skill: "verification-before-completion",
        pop: "var(--pop-mint)",
      },
      {
        you: "",
        agent:
          "Invoking `finishing-a-development-branch`. Four options: (1) merge to main (2) open PR (3) keep branch (4) discard. Which?",
        skill: "finishing-a-development-branch",
        pop: "var(--pop-violet)",
      },
    ],
  },
  {
    id: "bug",
    title: "Hunt a bug without flailing",
    blurb: "A flaky test. A suspicious stack trace. No shotgun refactors.",
    goal: "Fix a test that passes locally and fails in CI.",
    steps: [
      {
        you: "this test fails in CI but passes locally",
        agent:
          "Invoking `systematic-debugging`. Phase 1 — root cause investigation. Reading the error output fully. Checking what CI differs from local: env, node version, ordering. Before I hypothesize, I want to reproduce locally.",
        skill: "systematic-debugging",
        pop: "var(--pop-mint)",
      },
      {
        you: "",
        agent:
          "Running `find-polluter.sh` (ships with the skill) — bisects the test ordering. Found it: `describe('cache', ...)` writes to a global Map and doesn't clean up. `describe('api', ...)` reads it, gets a hit when the suite runs in CI's order.",
        skill: "systematic-debugging",
        note: "Actual script in skills/systematic-debugging/find-polluter.sh.",
        pop: "var(--pop-mint)",
      },
      {
        you: "",
        agent:
          "Phase 3 — hypothesis test. Added `afterEach(() => cache.clear())` in the cache suite, ran the original failure order → green. Handing off to `test-driven-development` for the fix: failing test reproducing the CI order, minimal fix, green, commit.",
        skill: "test-driven-development",
        pop: "var(--pop-yellow)",
      },
      {
        you: "",
        agent:
          "`verification-before-completion`: `npm test --runInBand` green, `npm test --randomize` green. Fresh evidence. Claiming fixed.",
        skill: "verification-before-completion",
        pop: "var(--pop-pink)",
      },
    ],
  },
  {
    id: "skill",
    title: "Author a new skill",
    blurb: "How Superpowers extends itself. Yes — it's TDD all the way down.",
    goal: "Create a `sql-migration-safety` skill for our team.",
    steps: [
      {
        you: "write a skill that catches unsafe SQL migrations",
        agent:
          "Invoking `writing-skills`. First: a failing test for the skill. NO SKILL WITHOUT A FAILING TEST FIRST. Drafting a prompt that should trigger the skill on a migration diff + a test prompt that should NOT trigger it.",
        skill: "writing-skills",
        pop: "var(--pop-violet)",
      },
      {
        you: "",
        agent:
          "Test: presented both prompts to an isolated subagent. Trigger prompt → should invoke the skill → currently doesn't → RED. Good. Now writing SKILL.md with the trigger description (When to Use, not What it Does).",
        skill: "writing-skills",
        pop: "var(--pop-violet)",
      },
      {
        you: "",
        agent:
          "Re-running test. Subagent invokes `sql-migration-safety` on the migration prompt, skips it on the unrelated prompt. GREEN. Description kept under 200 words per the token budget.",
        skill: "writing-skills",
        pop: "var(--pop-violet)",
      },
    ],
  },
];

export function Learning() {
  const [active, setActive] = useState(0);

  return (
    <section id="learn" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">Learn by doing</p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
            Three scenarios.{" "}
            <span className="font-serif-accent">Watch the skills fire</span>.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            Every transcript below maps to a real skill invocation in the repo.
            Pick a scenario, scroll through the turns, and see which skill
            picks up — and what it enforces.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="chunky-border rounded-2xl px-4 py-3 text-left transition"
              style={{
                background:
                  active === i ? "var(--pop-yellow)" : "var(--paper)",
              }}
            >
              <div className="font-display text-lg font-semibold leading-tight">
                {s.title}
              </div>
              <div className="text-xs text-foreground/75">{s.blurb}</div>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <aside className="chunky-border rounded-3xl bg-paper p-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              scenario
            </div>
            <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight">
              {SCENARIOS[active].title}
            </h3>
            <p className="mt-3 text-foreground/75">{SCENARIOS[active].blurb}</p>
            <div className="mt-4 rounded-xl border-2 border-dashed border-ink/40 p-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                goal
              </div>
              <p className="mt-1 font-mono text-sm">{SCENARIOS[active].goal}</p>
            </div>
            <div className="mt-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                skills used
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Array.from(
                  new Set(SCENARIOS[active].steps.map((s) => s.skill))
                ).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-ink bg-paper px-2 py-0.5 font-mono text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="chunky-border rounded-3xl bg-ink p-5 text-paper">
            <div className="mb-4 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--pop-pink)]" />
              <span className="size-2.5 rounded-full bg-[var(--pop-yellow)]" />
              <span className="size-2.5 rounded-full bg-[var(--pop-mint)]" />
              <span className="ml-2 font-mono text-xs text-paper/60">
                claude-code · transcript
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {SCENARIOS[active].steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="space-y-2"
                  >
                    {step.you && (
                      <div className="flex items-start gap-2">
                        <span className="mt-1 rounded bg-paper/10 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-paper/60">
                          you
                        </span>
                        <p className="font-mono text-sm text-paper/90">
                          {step.you}
                        </p>
                      </div>
                    )}
                    <div className="rounded-xl bg-paper/5 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="rounded-md border border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink"
                          style={{ background: step.pop }}
                        >
                          {step.skill}
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-paper/90">
                        {step.agent}
                      </p>
                      {step.note && (
                        <p className="mt-2 rounded-md border border-paper/20 bg-paper/5 p-2 font-mono text-xs italic text-paper/60">
                          ↳ {step.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

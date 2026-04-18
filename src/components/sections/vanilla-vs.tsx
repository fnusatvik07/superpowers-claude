"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useSpring, useMotionValue } from "motion/react";

const PROMPT = "Build me a rate limiter for our API.";

const VANILLA_LINES = [
  "Sure! Here's a token-bucket rate limiter:",
  "```ts",
  "export class RateLimiter {",
  "  // ~80 lines of code",
  "}",
  "```",
  "Let me know if you want tests!",
];

const WITH_SP = [
  {
    label: "brainstorming",
    pop: "var(--pop-pink)",
    line: "Before I write anything: which rate-limit behavior do you need? Per-user, per-IP, per-endpoint, or per-API-key? What happens over limit: 429, queue, degrade? Persistence: in-memory, Redis, something else?",
  },
  {
    label: "brainstorming",
    pop: "var(--pop-pink)",
    line: "Three approaches: (A) Token bucket with in-memory LRU, simplest, doesn't survive restart. (B) Same, backed by Redis, survives and scales. (C) Sliding window log, precise but heavier. I'll wait for your pick.",
  },
  {
    label: "writing-plans",
    pop: "var(--pop-yellow)",
    line: "Plan saved to docs/superpowers/plans/2026-04-17-rate-limiter.md. 6 tasks, each 2–5 min: (1) failing test for allow-under-limit, (2) minimal bucket, (3) failing test for exceed-limit → 429, (4) TTL refill, (5) middleware integration, (6) load test.",
  },
  {
    label: "test-driven-development",
    pop: "var(--pop-mint)",
    line: "Task 1: writing failing test `allows 10 req/sec under limit`. Run → FAIL with 'rateLimiter is not defined'. Good, that's RED for the right reason. Now minimal code.",
  },
  {
    label: "subagent-driven-development",
    pop: "var(--pop-orange)",
    line: "Dispatching spec reviewer subagent. Reading code, not trusting report. Spec says 'per-user'; implementation uses IP. FAIL. Sending back with context.",
  },
  {
    label: "verification-before-completion",
    pop: "var(--pop-violet)",
    line: "npm test → 28 passed, 0 failed, exit 0. Load test: 1000 req at 100/s → 100 allowed, 900 × 429. Evidence. Claiming done.",
  },
];

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

/* ---------- Typewriter hook ---------- */
function useTypewriter(lines: string[], speed = 18, lineDelay = 300) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    const buf: string[] = [];

    const tick = () => {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      charIdx++;
      buf[lineIdx] = line.slice(0, charIdx);
      setDisplayed([...buf]);

      if (charIdx >= line.length) {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, lineDelay);
      } else {
        setTimeout(tick, speed);
      }
    };
    tick();
  }, [lines, speed, lineDelay]);

  return { displayed, done, start };
}

/* ---------- Animated counter ---------- */
function CountUp({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) mv.set(to);
  }, [isInView, to, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v: number) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="chunky-border rounded-2xl bg-[var(--pop-yellow)] p-5"
    >
      <div className="font-display text-3xl font-bold tabular-nums tracking-tighter">
        0 → {display}
      </div>
      <div className="mt-1 text-sm">{label}</div>
    </motion.div>
  );
}

/* ---------- Main component ---------- */
export function VanillaVs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const { displayed, done, start } = useTypewriter(VANILLA_LINES, 20, 350);
  const [spRevealCount, setSpRevealCount] = useState(0);

  // Start typewriter when section enters view
  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  // After vanilla finishes, reveal Superpowers steps one by one
  useEffect(() => {
    if (!done) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setSpRevealCount(i);
      if (i >= WITH_SP.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [done]);

  return (
    <section id="vs" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">Vanilla vs Superpowers</p>
          <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
            Same prompt.{" "}
            <span className="font-serif-accent">Different species</span> of
            output.
          </h2>
          <p className="mt-3 text-foreground/85">
            The prompt below goes to vanilla Claude Code and to Claude Code
            with Superpowers installed. Watch the difference unfold.
          </p>
        </motion.div>

        <motion.div
          className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="sticker bg-[var(--pop-yellow)]">prompt</span>
          <p className="font-mono text-sm sm:text-base">{PROMPT}</p>
        </motion.div>

        <div ref={sectionRef} className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* ---- Vanilla panel ---- */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="chunky-border rounded-3xl bg-paper p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-bold">
                  Vanilla Claude Code
                </div>
                <div className="text-xs text-muted-foreground">
                  no skills, no plan, eager-to-please
                </div>
              </div>
              <span className="sticker" style={{ background: "var(--pop-orange)" }}>
                jumps to code
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-ink p-4 text-paper">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-paper/90">
                {displayed.length > 0
                  ? displayed.map((l, i) => `> ${l}${i === displayed.length - 1 && !done ? "▌" : ""}`).join("\n")
                  : <span className="text-paper/40">Waiting for prompt...</span>
                }
              </pre>
            </div>

            <motion.ul
              className="mt-4 space-y-1.5 text-sm text-foreground/85"
              initial={{ opacity: 0 }}
              animate={done ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <li>No clarifying questions</li>
              <li>No failing test first</li>
              <li>No persistence / scale discussion</li>
              <li>"Let me know if you want tests!"</li>
            </motion.ul>
          </motion.div>

          {/* ---- Superpowers panel ---- */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="chunky-border rounded-3xl bg-ink p-6 text-paper"
            style={{
              boxShadow: done
                ? "6px 6px 0 0 var(--ink), 0 0 30px 0 oklch(0.65 0.22 290 / 15%)"
                : "6px 6px 0 0 var(--ink)",
              transition: "box-shadow 1s ease",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-bold">
                  Claude Code + Superpowers
                </div>
                <div className="text-xs text-paper/80">
                  skills auto-fire, process enforced
                </div>
              </div>
              <span
                className="sticker"
                style={{ background: "var(--pop-mint)" }}
              >
                earns the code
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {WITH_SP.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={
                    i < spRevealCount
                      ? { opacity: 1, x: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="rounded-xl bg-paper/8 p-3"
                  style={{ visibility: i < spRevealCount ? "visible" : "hidden" }}
                >
                  <motion.span
                    className="inline-block rounded-md border border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink"
                    style={{ background: t.pop }}
                    initial={{ scale: 0.8 }}
                    animate={i < spRevealCount ? { scale: [0.8, 1.1, 1] } : {}}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {t.label}
                  </motion.span>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-paper/90">
                    {t.line}
                  </p>
                </motion.div>
              ))}

              {spRevealCount === 0 && done && (
                <div className="flex items-center gap-2 py-8 text-paper/40">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="size-2 rounded-full bg-[var(--pop-mint)]"
                  />
                  <span className="font-mono text-sm">Skills activating...</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ---- Stats with count-up ---- */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <CountUp to={6} label="skills auto-invoked" />
          <CountUp to={6} label="tasks with failing tests first" />
          <CountUp to={3} label="subagents reviewing work" />
        </div>

        {/* ---- When NOT to use (folded in) ---- */}
        <motion.div
          className="mt-12 rounded-2xl border-2 border-dashed border-ink/40 bg-muted/50 p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-lg font-bold">
            Honest caveat: Superpowers isn't for everything.
          </p>
          <ul className="mt-3 space-y-1.5 text-base text-foreground/80">
            <li>One-off throwaway scripts? Overkill. Skip the skill.</li>
            <li>Your team doesn't want TDD? The iron law will fight you.</li>
            <li>No subagent support (e.g. Gemini CLI)? Two-stage review collapses to one pass.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

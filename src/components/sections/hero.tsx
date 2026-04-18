"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const MARQUEE_ITEMS = [
  "brainstorming",
  "writing-plans",
  "test-driven-development",
  "systematic-debugging",
  "subagent-driven-development",
  "verification-before-completion",
  "using-git-worktrees",
  "requesting-code-review",
  "receiving-code-review",
  "finishing-a-development-branch",
  "dispatching-parallel-agents",
  "writing-skills",
  "using-superpowers",
  "executing-plans",
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeOutQuart = [0.25, 1, 0.5, 1] as const;

/* ---------- Terminal demo data ---------- */
type TermLine = {
  speaker: "you" | "claude" | "system";
  text: string;
  skill?: string;
};

const TERMINAL_LINES: TermLine[] = [
  { speaker: "system", text: "[SessionStart hook fires]" },
  { speaker: "system", text: "Skill roster injected. 14 skills active." },
  { speaker: "you", text: "build me a rate limiter for our API" },
  { speaker: "claude", text: "Invoking brainstorming.", skill: "brainstorming" },
  { speaker: "claude", text: "Before I write anything:" },
  { speaker: "claude", text: "  Per-user, per-IP, or per-endpoint?" },
  { speaker: "claude", text: "  What happens over limit: 429 or queue?" },
  { speaker: "claude", text: "  (asking one question at a time)" },
  { speaker: "you", text: "per-user, 429, Redis-backed" },
  { speaker: "claude", text: "Design saved. Invoking writing-plans.", skill: "writing-plans" },
  { speaker: "claude", text: "Plan: 6 tasks, each 2-5 min, TDD enforced." },
  { speaker: "you", text: "go" },
  { speaker: "claude", text: "Invoking subagent-driven-development.", skill: "SDD" },
  { speaker: "claude", text: "Task 1/6: failing test first... RED... code... GREEN." },
  { speaker: "claude", text: "Spec reviewer: reads code, not report. PASS." },
  { speaker: "claude", text: "All 6 tasks done. npm test: 28 passed, 0 failed.", skill: "verification" },
];

function useTerminalTyping() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [typing, setTyping] = useState(false);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setTyping(true);
    setLines([]);

    let i = 0;
    const addLine = () => {
      if (i >= TERMINAL_LINES.length) {
        setTyping(false);
        return;
      }
      const line = TERMINAL_LINES[i];
      setLines((prev) => [...prev, line]);
      i++;
      const delay = line.speaker === "you" ? 800 : 400;
      setTimeout(addLine, delay);
    };
    setTimeout(addLine, 600);
  }, []);

  const reset = useCallback(() => {
    started.current = false;
    setLines([]);
    setTyping(false);
  }, []);

  const done = !typing && lines.length > 0;

  return { lines, typing, done, start, reset };
}

/* ---------- Component ---------- */
export function Hero() {
  const { lines, typing, done, start, reset } = useTerminalTyping();
  const termRef = useRef<HTMLDivElement>(null);

  // Start terminal after hero loads
  useEffect(() => {
    const timer = setTimeout(start, 2000);
    return () => clearTimeout(timer);
  }, [start]);

  // Auto-scroll terminal
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeOutExpo }}
          className="font-display max-w-4xl text-center text-4xl font-bold leading-[0.85] tracking-tighter sm:text-6xl md:text-8xl"
        >
          <span className="font-serif-accent text-[var(--pop-pink)]">Super</span>Powers
          <br />
          <span className="text-[0.75em] text-foreground/80">Give Claude Code a </span>
          <span className="highlight-yellow">spine.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: easeOutQuart }}
          className="mt-4 max-w-md text-center text-base text-foreground/70 sm:text-lg"
        >
          14 skills. One plugin install. Your coding agent goes from eager junior to disciplined engineer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOutQuart }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link
              href="#install"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-ink px-6 py-3 font-display text-base font-semibold text-paper transition hover:bg-ink/90"
            >
              Install in 60s →
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link
              href="https://www.skool.com/the-agent-lab-3899/about"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--pop-yellow)] bg-[var(--pop-yellow)] px-6 py-3 font-display text-base font-semibold text-ink transition hover:bg-[var(--pop-yellow)]/90"
            >
              Join AI Launchpad
            </Link>
          </motion.div>
          <Link
            href="https://github.com/obra/superpowers"
            target="_blank"
            className="text-sm text-foreground/50 underline decoration-dotted underline-offset-4 transition hover:text-foreground"
          >
            GitHub ↗
          </Link>
        </motion.div>

        {/* Animated terminal demo — the "wow" moment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: easeOutQuart }}
          className="mt-8 w-full max-w-2xl"
        >
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-2xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-2.5">
              <span className="size-3 rounded-full bg-[var(--pop-pink)]" />
              <span className="size-3 rounded-full bg-[var(--pop-yellow)]" />
              <span className="size-3 rounded-full bg-[var(--pop-mint)]" />
              <span className="ml-3 font-mono text-xs text-paper/40">
                claude-code — superpowers active
              </span>
              {typing && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-auto size-2 rounded-full bg-[var(--pop-mint)]"
                />
              )}
            </div>

            {/* Terminal content */}
            <div
              ref={termRef}
              className="h-[180px] overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed sm:h-[220px] sm:px-4 sm:text-sm"
            >
              {lines.filter(Boolean).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-1"
                >
                  {line.speaker === "you" ? (
                    <span>
                      <span className="text-[var(--pop-yellow)]">you </span>
                      <span className="text-paper/90">{line.text}</span>
                    </span>
                  ) : line.speaker === "system" ? (
                    <span className="text-paper/40">{line.text}</span>
                  ) : (
                    <span>
                      {line.skill && (
                        <span className="mr-2 rounded bg-[var(--pop-pink)]/20 px-1.5 py-0.5 text-xs text-[var(--pop-pink)]">
                          {line.skill}
                        </span>
                      )}
                      <span className="text-paper/80">{line.text}</span>
                    </span>
                  )}
                </motion.div>
              ))}
              {typing && lines.length > 0 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block text-[var(--pop-mint)]"
                >
                  _
                </motion.span>
              )}
              {done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 flex items-center gap-3"
                >
                  <button
                    onClick={() => { reset(); setTimeout(start, 300); }}
                    className="rounded-lg border border-paper/20 bg-paper/10 px-3 py-1.5 text-xs font-medium text-paper/60 transition hover:bg-paper/20 hover:text-paper"
                  >
                    Replay
                  </button>
                  <span className="text-xs text-paper/30">
                    Session complete
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-20 sm:bottom-14"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-foreground/30"
          >
            <ChevronDown className="size-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: easeOutQuart }}
        className="relative border-y-2 border-ink bg-ink py-3 text-paper"
      >
        <div
          aria-hidden="true"
          className="marquee flex whitespace-nowrap font-display text-xl font-bold uppercase tracking-tight sm:text-2xl"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6">
              <span>{item}</span>
              <span className="text-[var(--pop-yellow)]">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

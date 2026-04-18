"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

function AnimatedNode({
  label,
  sub,
  pop,
  delay,
  active,
}: {
  label: string;
  sub?: string;
  pop: string;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, ease: easeOutQuart }}
      className="rounded-2xl border-2 border-ink bg-paper px-4 py-3 text-center text-ink shadow-sm"
    >
      <div
        className="mx-auto mb-1.5 h-1 w-10 rounded-full"
        style={{ background: pop }}
      />
      <div className="font-display text-sm font-bold tracking-tight sm:text-base">
        {label}
      </div>
      {sub && (
        <div className="mt-0.5 text-xs text-ink/60">{sub}</div>
      )}
    </motion.div>
  );
}

function Arrow({ delay, active, vertical }: { delay: number; active: boolean; vertical?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center justify-center text-foreground/30 ${vertical ? "py-1" : "px-1"}`}
    >
      {vertical ? (
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <path d="M7 0 L7 14 M2 10 L7 16 L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <path d="M0 7 L14 7 M10 2 L16 7 L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.div>
  );
}

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="architecture" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
            Architecture
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
            Five layers.{" "}
            <span className="font-serif-accent">One</span> hook to rule them all.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            No runtime orchestrator. The LLM steers itself, guided by the
            session-start injection and the 1% rule.
          </p>
        </motion.div>

        {/* Animated SVG architecture diagram */}
        <div ref={ref} className="mt-16 overflow-x-auto">
          <div className="mx-auto min-w-[600px] max-w-3xl">
            {/* Layer 1: SessionStart hook */}
            <div className="flex justify-center">
              <AnimatedNode
                label="SessionStart hook"
                sub="fires at startup, /clear, /compact"
                pop="var(--pop-pink)"
                delay={0}
                active={isInView}
              />
            </div>

            <Arrow delay={0.2} active={isInView} vertical />

            {/* Layer 2: Meta skills */}
            <div className="flex items-center justify-center gap-3">
              <AnimatedNode
                label="using-superpowers"
                sub="bootloader, injects all skills"
                pop="var(--pop-violet)"
                delay={0.3}
                active={isInView}
              />
              <AnimatedNode
                label="writing-skills"
                sub="authoring guide"
                pop="var(--pop-violet)"
                delay={0.4}
                active={isInView}
              />
            </div>

            <Arrow delay={0.5} active={isInView} vertical />

            {/* Layer 3: Workflow skills — main chain */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="rounded-2xl border-2 border-dashed border-foreground/20 bg-muted/30 p-4"
            >
              <div className="mb-3 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-foreground/40">
                Workflow skills (10)
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { l: "brainstorming", p: "var(--pop-pink)", d: 0.7 },
                  { l: "writing-plans", p: "var(--pop-yellow)", d: 0.8 },
                  { l: "executing-plans", p: "var(--pop-orange)", d: 0.85 },
                  { l: "SDD", p: "var(--pop-orange)", d: 0.9 },
                  { l: "parallel-agents", p: "var(--pop-orange)", d: 0.95 },
                  { l: "TDD", p: "var(--pop-mint)", d: 1.0 },
                  { l: "debugging", p: "var(--pop-mint)", d: 1.05 },
                  { l: "verification", p: "var(--pop-mint)", d: 1.1 },
                  { l: "code-review", p: "var(--pop-pink)", d: 1.15 },
                  { l: "git-worktrees", p: "var(--pop-violet)", d: 1.2 },
                ].map((s) => (
                  <motion.span
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: s.d }}
                    className="rounded-full border border-ink px-3 py-1.5 text-xs font-bold text-ink"
                    style={{ background: s.p }}
                  >
                    {s.l}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <Arrow delay={1.3} active={isInView} vertical />

            {/* Layer 4: Code-reviewer agent */}
            <div className="flex justify-center">
              <AnimatedNode
                label="code-reviewer agent"
                sub="6 review activities, 3 severity buckets"
                pop="var(--pop-mint)"
                delay={1.4}
                active={isInView}
              />
            </div>
          </div>
        </div>

        {/* What's NOT here */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl rounded-2xl border-2 border-ink bg-[var(--pop-yellow)] p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-lg font-bold text-ink">
            What's <em className="font-serif-accent">not</em> here:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "no runtime orchestrator",
              "no MCP server",
              "no telemetry",
              "no third-party deps",
              "no CLAUDE.md rewrites",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

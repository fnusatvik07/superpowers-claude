"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS, CATEGORY_META, type SkillCategory } from "@/lib/data";

const ORDER: SkillCategory[] = [
  "meta",
  "planning",
  "execution",
  "testing",
  "debugging",
  "review",
  "git",
];

export function SkillsCatalog() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? SKILLS : SKILLS.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <section id="skills" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">Skills catalog</p>
            <h2 className="font-display mt-3 text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
              All <span className="highlight-yellow">14 skills</span>, grouped
              by what they <span className="font-serif-accent">actually do</span>.
            </h2>
            <p className="mt-3 text-lg text-foreground/80">
              Tap a card for the trigger, iron law, collaborators, and the
              files it ships. Every claim is pulled from the actual SKILL.md in
              obra/superpowers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{visible.length} of {SKILLS.length}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
            all
          </FilterPill>
          {ORDER.map((cat) => (
            <FilterPill
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
              pop={CATEGORY_META[cat].pop}
            >
              {CATEGORY_META[cat].label}
            </FilterPill>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => {
              const meta = CATEGORY_META[s.category];
              const isOpen = open === s.id;
              return (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink/30 bg-paper p-5 text-left transition hover:border-ink/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="rounded-full border border-ink px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{ background: meta.pop }}
                    >
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {s.files?.length ?? 1} {(s.files?.length ?? 1) === 1 ? "file" : "files"}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/75">{s.oneLiner}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 grid gap-4 border-t-2 border-dashed border-ink/30 pt-4 md:grid-cols-2">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              trigger
                            </div>
                            <p className="mt-1 text-base">{s.trigger}</p>
                          </div>
                          {s.ironLaw && (
                            <div>
                              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                iron law
                              </div>
                              <p className="mt-1 rounded-lg border-2 border-ink bg-[var(--pop-yellow)] p-3 font-mono text-sm">
                                {s.ironLaw}
                              </p>
                            </div>
                          )}
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              collaborates with
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {s.collaborators.map((c) => (
                                <span
                                  key={c}
                                  className="rounded-md border border-ink bg-paper px-1.5 py-0.5 font-mono text-xs"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          {s.files && (
                            <div>
                              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                ships
                              </div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {s.files.map((f) => (
                                  <code
                                    key={f}
                                    className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs"
                                  >
                                    {f}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <code className="font-mono">skills/{s.name}/</code>
                    <span>{isOpen ? "close −" : "expand +"}</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  pop,
  children,
}: {
  active: boolean;
  onClick: () => void;
  pop?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-semibold transition"
      style={
        active
          ? { background: pop ?? "var(--ink)", color: pop ? "var(--ink)" : "var(--paper)" }
          : { background: "var(--paper)" }
      }
    >
      {children}
    </button>
  );
}

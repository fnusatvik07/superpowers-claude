"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Host = {
  id: string;
  label: string;
  commands: string[];
  note?: string;
};

const HOSTS: Host[] = [
  {
    id: "claude-official",
    label: "Claude Code",
    commands: ["/plugin install superpowers@claude-plugins-official"],
    note: "The Anthropic marketplace. Single command.",
  },
  {
    id: "claude-sp",
    label: "SP Marketplace",
    commands: [
      "/plugin marketplace add obra/superpowers-marketplace",
      "/plugin install superpowers@superpowers-marketplace",
    ],
    note: "Release-channel updates from obra.",
  },
  {
    id: "codex-cli",
    label: "Codex CLI",
    commands: ["/plugins", "# search 'superpowers', then install"],
  },
  {
    id: "cursor",
    label: "Cursor",
    commands: ["/add-plugin superpowers"],
  },
  {
    id: "copilot",
    label: "Copilot CLI",
    commands: [
      "copilot plugin marketplace add obra/superpowers-marketplace",
      "copilot plugin install superpowers@superpowers-marketplace",
    ],
  },
  {
    id: "gemini",
    label: "Gemini CLI",
    commands: ["gemini extensions install https://github.com/obra/superpowers"],
    note: "No subagents — SDD falls back to executing-plans.",
  },
];

export function Install() {
  const [active, setActive] = useState("claude-official");
  const [copied, setCopied] = useState<string | null>(null);

  const host = HOSTS.find((h) => h.id === active)!;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(text);
    }
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <section id="install" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
            Install
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-6xl">
            One command.{" "}
            <span className="font-serif-accent">Done.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-foreground/80">
            Pick your host, copy the command, reload. Skills are active
            on the next session.
          </p>
        </motion.div>

        {/* Host selector */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {HOSTS.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              className={`rounded-full border-2 px-4 py-2 font-display text-sm font-bold transition ${
                active === h.id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/30 bg-transparent text-foreground/80 hover:border-ink/60"
              }`}
            >
              {h.label}
            </button>
          ))}
        </motion.div>

        {/* Terminal */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-lg">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-2.5">
              <span className="size-3 rounded-full bg-[var(--pop-pink)]" />
              <span className="size-3 rounded-full bg-[var(--pop-yellow)]" />
              <span className="size-3 rounded-full bg-[var(--pop-mint)]" />
              <span className="ml-3 font-mono text-xs text-paper/40">
                {host.label.toLowerCase()}
              </span>
            </div>

            {/* Commands */}
            <div className="space-y-1 p-4">
              {host.commands.map((c) => (
                <button
                  key={c}
                  onClick={() => copy(c)}
                  className="group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left font-mono text-sm transition hover:bg-paper/10 sm:gap-4 sm:text-base"
                >
                  <span className="whitespace-pre-wrap break-all text-paper/90">
                    {c.startsWith("#") ? (
                      <span className="text-paper/40">{c}</span>
                    ) : (
                      <>
                        <span className="text-[var(--pop-mint)]">$ </span>
                        {c}
                      </>
                    )}
                  </span>
                  <span className="shrink-0 rounded-md border border-paper/20 px-2 py-1 text-xs text-paper/50 opacity-0 transition group-hover:opacity-100">
                    {copied === c ? "copied!" : "copy"}
                  </span>
                </button>
              ))}
            </div>

            {host.note && (
              <div className="border-t border-paper/10 px-4 py-3">
                <p className="text-sm text-paper/50">{host.note}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* What happens */}
        <motion.div
          className="mt-8 rounded-2xl border-2 border-ink bg-[var(--pop-yellow)] p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-display text-lg font-bold text-ink">
            What happens next
          </p>
          <div className="mt-3 grid gap-3 text-sm text-ink/80 sm:grid-cols-2">
            <div><strong className="text-ink">1.</strong> Plugin manifest registered</div>
            <div><strong className="text-ink">2.</strong> SessionStart hook wired</div>
            <div><strong className="text-ink">3.</strong> Next session loads all 14 skills</div>
            <div><strong className="text-ink">4.</strong> Ask to build something — brainstorming fires</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

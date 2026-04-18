"use client";

import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/lib/data";

const LINKS = [
  {
    group: "Source",
    items: [
      { label: "obra/superpowers", href: "https://github.com/obra/superpowers" },
      { label: "Superpowers marketplace", href: "https://github.com/obra/superpowers-marketplace" },
      { label: "Release notes (v5.0.7)", href: "https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md" },
      { label: "Jesse Vincent's blog post", href: "https://blog.fsck.com/2025/10/09/superpowers/" },
    ],
  },
  {
    group: "Ecosystem",
    items: [
      { label: "anthropics/skills", href: "https://github.com/anthropics/skills" },
      { label: "Get Shit Done (GSD)", href: "https://github.com/gsd-build/get-shit-done" },
      { label: "wshobson/agents", href: "https://github.com/wshobson/agents" },
      { label: "pbakaus/impeccable", href: "https://github.com/pbakaus/impeccable" },
    ],
  },
  {
    group: "Community",
    items: [
      { label: "Superpowers Discord", href: "https://discord.gg/35wsABTejz" },
      { label: "Prime Radiant newsletter", href: "https://primeradiant.com/superpowers/" },
    ],
  },
];

export function Resources() {
  return (
    <section id="resources" className="relative border-b border-ink/15 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-foreground/40">
            Resources & FAQ
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tighter sm:text-5xl">
            Go deeper.{" "}
            <span className="font-serif-accent">Verify everything.</span>
          </h2>
        </motion.div>

        {/* Links grid */}
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {LINKS.map((grp) => (
            <div key={grp.group}>
              <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-foreground/40">
                {grp.group}
              </p>
              <ul className="mt-3 space-y-2">
                {grp.items.map((l) => (
                  <li key={l.href}>
                    <motion.a
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group flex items-center gap-2 text-base text-foreground/80 transition hover:text-foreground"
                    >
                      <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                        {l.label}
                      </span>
                      <span className="text-xs text-foreground/40 transition group-hover:text-foreground/80">↗</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <motion.div
          id="faq"
          className="mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-center font-display text-xs font-bold uppercase tracking-[0.25em] text-foreground/40">
            Frequently asked
          </p>
          <h3 className="mt-3 text-center font-display text-3xl font-bold tracking-tighter sm:text-4xl">
            Blunt answers.
          </h3>
          <Accordion className="mx-auto mt-8 max-w-2xl">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-b border-ink/20"
              >
                <AccordionTrigger className="group py-5 text-left hover:no-underline">
                  <span className="font-display text-lg font-bold tracking-tight transition group-hover:text-foreground">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-foreground/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

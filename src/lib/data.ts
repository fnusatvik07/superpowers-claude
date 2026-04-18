export type SkillCategory =
  | "meta"
  | "planning"
  | "execution"
  | "testing"
  | "debugging"
  | "review"
  | "git";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  oneLiner: string;
  trigger: string;
  ironLaw?: string;
  collaborators: string[];
  files?: string[];
};

export const SKILLS: Skill[] = [
  {
    id: "using-superpowers",
    name: "using-superpowers",
    category: "meta",
    oneLiner:
      "The bootloader. Injected at every session start, it teaches the agent how to find and invoke every other skill — and enforces the 1% rule.",
    trigger: "Every session start (auto-injected via SessionStart hook)",
    ironLaw:
      "Even a 1% chance a skill might apply means you must invoke it to check.",
    collaborators: ["every other skill"],
    files: ["SKILL.md", "references/codex-tools.md", "references/gemini-tools.md", "references/copilot-tools.md"],
  },
  {
    id: "writing-skills",
    name: "writing-skills",
    category: "meta",
    oneLiner:
      "How to author new skills. TDD for skills themselves, with strict token budgets and the Description Trap warning.",
    trigger: "Creating, editing, or reviewing a new skill",
    ironLaw: "NO SKILL WITHOUT A FAILING TEST FIRST.",
    collaborators: ["test-driven-development"],
    files: ["SKILL.md", "anthropic-best-practices.md", "persuasion-principles.md", "examples/"],
  },
  {
    id: "brainstorming",
    name: "brainstorming",
    category: "planning",
    oneLiner:
      "The hard gate before any feature. Explores intent, proposes 2–3 approaches, saves a dated design spec, runs inline self-review.",
    trigger: "Any creative work — new feature, new behavior, or modification",
    ironLaw:
      "Do NOT write code, scaffold a project, or take implementation action until the user approves the design.",
    collaborators: ["writing-plans", "visual-companion (browser UI)"],
    files: ["SKILL.md", "visual-companion.md", "scripts/server.cjs"],
  },
  {
    id: "writing-plans",
    name: "writing-plans",
    category: "planning",
    oneLiner:
      "Turns a design spec into 2–5-minute tasks with complete code and TDD structure. No placeholders, no 'add error handling.'",
    trigger: "Approved design spec ready for implementation",
    ironLaw: "No placeholders. Every task readable independently.",
    collaborators: ["subagent-driven-development", "executing-plans"],
    files: ["SKILL.md"],
  },
  {
    id: "executing-plans",
    name: "executing-plans",
    category: "execution",
    oneLiner:
      "Runs a written plan sequentially with TodoWrite. Stops immediately on blockers — never guesses.",
    trigger: "Ready-to-go plan on a harness without subagents",
    collaborators: [
      "writing-plans",
      "using-git-worktrees",
      "finishing-a-development-branch",
    ],
    files: ["SKILL.md"],
  },
  {
    id: "subagent-driven-development",
    name: "subagent-driven-development",
    category: "execution",
    oneLiner:
      "Per task: dispatch an implementer subagent, then a spec reviewer, then a code-quality reviewer. Two-stage review is non-negotiable.",
    trigger:
      "Executing a plan on a subagent-capable harness (Claude Code, Codex)",
    ironLaw:
      "Do not trust the report. Verify by reading the code, not by trusting the report.",
    collaborators: [
      "writing-plans",
      "using-git-worktrees",
      "code-reviewer agent",
      "test-driven-development",
    ],
    files: [
      "SKILL.md",
      "implementer-prompt.md",
      "spec-reviewer-prompt.md",
      "code-quality-reviewer-prompt.md",
    ],
  },
  {
    id: "dispatching-parallel-agents",
    name: "dispatching-parallel-agents",
    category: "execution",
    oneLiner:
      "Fan out on 2+ truly independent tasks — clear per-agent prompts, parallel dispatch, then integrate.",
    trigger: "Work splits into domains with no shared state",
    collaborators: ["subagent-driven-development"],
    files: ["SKILL.md"],
  },
  {
    id: "test-driven-development",
    name: "test-driven-development",
    category: "testing",
    oneLiner:
      "RED → verify-red → GREEN → verify-green → REFACTOR. Not a suggestion. An iron law with a delete button.",
    trigger: "Implementing any feature or bugfix",
    ironLaw:
      "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST. Wrote code first? Delete it. Start over.",
    collaborators: ["systematic-debugging", "verification-before-completion"],
    files: ["SKILL.md", "testing-anti-patterns.md"],
  },
  {
    id: "systematic-debugging",
    name: "systematic-debugging",
    category: "debugging",
    oneLiner:
      "Four phases: root cause → pattern analysis → hypothesis test → minimal fix. Ships with a polluter-finder script and defense-in-depth guide.",
    trigger: "Any bug, test failure, or unexpected behavior",
    ironLaw:
      "Always find root cause before attempting fixes. Symptom fixes are failure.",
    collaborators: ["test-driven-development"],
    files: [
      "SKILL.md",
      "root-cause-tracing.md",
      "defense-in-depth.md",
      "condition-based-waiting.md",
      "find-polluter.sh",
    ],
  },
  {
    id: "verification-before-completion",
    name: "verification-before-completion",
    category: "debugging",
    oneLiner:
      "A gate: run the command, read the full output, THEN claim the result. Bans hedging language.",
    trigger: "About to claim something is done, fixed, or passing",
    ironLaw: "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.",
    collaborators: ["cross-cuts every other skill"],
    files: ["SKILL.md"],
  },
  {
    id: "requesting-code-review",
    name: "requesting-code-review",
    category: "review",
    oneLiner:
      "Dispatches the superpowers:code-reviewer subagent with the right base/head SHAs, plan, and description.",
    trigger: "After each SDD task, after major features, before merge to main",
    collaborators: ["code-reviewer agent"],
    files: ["SKILL.md"],
  },
  {
    id: "receiving-code-review",
    name: "receiving-code-review",
    category: "review",
    oneLiner:
      "React technically, not performatively. Restate, verify, evaluate, respond, implement — one item at a time.",
    trigger: "Code review feedback arrives",
    ironLaw:
      'No performative acknowledgements ("You\'re absolutely right!"). Acknowledge by action.',
    collaborators: ["requesting-code-review"],
    files: ["SKILL.md"],
  },
  {
    id: "using-git-worktrees",
    name: "using-git-worktrees",
    category: "git",
    oneLiner:
      "Isolates feature work in .worktrees/, auto-detects toolchains, verifies a clean test baseline before doing anything.",
    trigger: "Starting feature work or before executing a plan",
    collaborators: [
      "brainstorming",
      "subagent-driven-development",
      "executing-plans",
      "finishing-a-development-branch",
    ],
    files: ["SKILL.md"],
  },
  {
    id: "finishing-a-development-branch",
    name: "finishing-a-development-branch",
    category: "git",
    oneLiner:
      "Four options, typed confirmations, no ambiguity: merge, PR, keep, or discard.",
    trigger: "Work is complete; time to integrate",
    collaborators: ["using-git-worktrees"],
    files: ["SKILL.md"],
  },
];

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; blurb: string; pop: string }
> = {
  meta: {
    label: "Meta",
    blurb: "Skills about skills — the framework itself.",
    pop: "var(--pop-violet)",
  },
  planning: {
    label: "Planning",
    blurb: "Before you touch code, you earn the right to.",
    pop: "var(--pop-pink)",
  },
  execution: {
    label: "Execution",
    blurb: "From plan to shipped, with two-stage review per task.",
    pop: "var(--pop-orange)",
  },
  testing: {
    label: "Testing",
    blurb: "RED-GREEN-REFACTOR or it didn't happen.",
    pop: "var(--pop-yellow)",
  },
  debugging: {
    label: "Debugging",
    blurb: "Root cause or bust. Evidence before assertions.",
    pop: "var(--pop-mint)",
  },
  review: {
    label: "Review",
    blurb: "A skeptical reviewer that reads code, not reports.",
    pop: "var(--pop-pink)",
  },
  git: {
    label: "Git workflow",
    blurb: "Worktrees in, ambiguity out.",
    pop: "var(--pop-violet)",
  },
};

export const PHILOSOPHY = [
  {
    title: "Test-Driven Development",
    body: "Write tests first. Always. Code written before a failing test gets deleted — not kept 'for reference.'",
    pop: "var(--pop-yellow)",
  },
  {
    title: "Systematic over ad-hoc",
    body: "Process over guessing. Four debugging phases, one hypothesis at a time, no vibes-based fixes.",
    pop: "var(--pop-mint)",
  },
  {
    title: "Complexity reduction",
    body: "Simplicity as the primary goal. YAGNI, DRY, and tasks small enough a junior can follow them.",
    pop: "var(--pop-pink)",
  },
  {
    title: "Evidence over claims",
    body: 'Run the command. Read the full output. Then claim the result. "Seems," "probably," "should" are red flags.',
    pop: "var(--pop-violet)",
  },
] as const;

export const COMPARISON_ROWS = [
  {
    tool: "Superpowers",
    scope: "14 skills + 1 agent + 1 hook",
    focus: "Engineering methodology",
    install: "/plugin install superpowers@claude-plugins-official",
    opinionation: "High",
    bestFor: "Teams wanting disciplined agent-coding habits",
    pop: "var(--pop-pink)",
  },
  {
    tool: "Get Shit Done (GSD)",
    scope: "50+ commands, phase pipeline",
    focus: "Spec-driven phase machine",
    install: "npx get-shit-done-cc@latest",
    opinionation: "Very high",
    bestFor: "Solo devs shipping long features reliably",
  },
  {
    tool: "anthropics/skills",
    scope: "Reference set + spec",
    focus: "The Skill format itself",
    install: "/plugin marketplace add anthropics/skills",
    opinionation: "Low",
    bestFor: "Learning what a Skill is",
  },
  {
    tool: "wshobson/agents",
    scope: "184 agents / 78 plugins",
    focus: "Domain specialists (breadth)",
    install: "/plugin marketplace add wshobson/agents",
    opinionation: "Low per-agent",
    bestFor: "On-demand domain experts",
  },
  {
    tool: "Impeccable",
    scope: "1 skill + 18 commands",
    focus: "Frontend design quality",
    install: "bundle download or npx impeccable detect",
    opinionation: "High within domain",
    bestFor: "Designers fighting AI-ugly UI",
  },
  {
    tool: "claude-code-templates",
    scope: "100+ aggregated components",
    focus: "Meta-installer / dashboard",
    install: "npx claude-code-templates",
    opinionation: "Low",
    bestFor: "Discovery / multi-source setup",
  },
];

export const FAQ = [
  {
    q: "Does Superpowers require a particular Claude model?",
    a: "No. It's prose + prompts. It works with any Claude model Claude Code supports. SDD docs recommend picking cheaper models for mechanical tasks and stronger ones for architecture/review — the selection is explicit in the skill.",
  },
  {
    q: "Will it rewrite my CLAUDE.md or touch my project files?",
    a: "No. Superpowers installs as a plugin. It creates docs/superpowers/specs/ and docs/superpowers/plans/ when you use the workflow, and .worktrees/ when you start features. Your CLAUDE.md is untouched and, in fact, takes priority over the skills.",
  },
  {
    q: "What's the relationship between skills, agents, commands, and hooks?",
    a: "14 skills (the substance), 1 subagent (code-reviewer), 1 SessionStart hook (injects using-superpowers), and 3 deprecated commands (stubs pointing back to skills). That's the whole surface area.",
  },
  {
    q: "Does it work outside Claude Code?",
    a: "Yes. Same plugin ships bootstraps for OpenAI Codex CLI & App, Cursor, GitHub Copilot CLI, OpenCode, and Gemini CLI. Skills fall back gracefully on harnesses without subagents.",
  },
  {
    q: "Can I mix it with Impeccable, wshobson, or anthropics/skills?",
    a: "Yes — they're orthogonal. Superpowers is process; those are capabilities. They compose cleanly.",
  },
  {
    q: "What changes in my workflow on day one?",
    a: "Claude stops jumping to code. You'll get questions first, then a design doc you approve section by section, then a plan, then small commits with tests. If that's too heavy for a one-off script, override in your CLAUDE.md — user instructions outrank skills.",
  },
] as const;

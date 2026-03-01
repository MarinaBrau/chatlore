import { exportAsMarkdown } from "../src/lib/exporters/markdown";
import { exportAsProjectInstructions } from "../src/lib/exporters/project-instructions";
import { exportAsClaudeMd } from "../src/lib/exporters/claude-md";
import type { ConversationAnalysis } from "../src/lib/types";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

const singleAnalysis: ConversationAnalysis = {
  id: "1",
  title: "TypeScript Discussion",
  summary: "The user discussed TypeScript best practices and type safety.",
  topics: ["TypeScript", "Type Safety", "Generics"],
  preferences: ["Prefers strict mode", "Likes concise code"],
  patterns: ["Asks for code examples", "Iterates quickly"],
};

const multiAnalyses: ConversationAnalysis[] = [
  singleAnalysis,
  {
    id: "2",
    title: "React Architecture",
    summary: "The user explored React component patterns.",
    topics: ["React", "Component Patterns", "TypeScript"],
    preferences: ["Prefers functional components"],
    patterns: ["Asks for code examples"],
  },
];

console.log("\n--- Exporter Tests ---\n");

// Markdown
console.log("Markdown exporter:");
const md = exportAsMarkdown([singleAnalysis]);
assert(md.includes("# TypeScript Discussion"), "Has title");
assert(md.includes("## Summary"), "Has summary section");
assert(md.includes("## Topics"), "Has topics section");
assert(md.includes("- TypeScript"), "Topics as bullet list");
assert(md.includes("## Preferences"), "Has preferences section");
assert(md.includes("## Patterns"), "Has patterns section");

const mdMulti = exportAsMarkdown(multiAnalyses);
assert(mdMulti.includes("---"), "Multi has separator");
assert(mdMulti.includes("# React Architecture"), "Multi has second title");

// Project Instructions
console.log("\nProject Instructions exporter:");
const pi = exportAsProjectInstructions([singleAnalysis]);
assert(pi.includes("# User Context"), "Has context header");
assert(pi.includes("## About the User"), "Has about section");
assert(pi.includes("## Communication Preferences"), "Has preferences");
assert(pi.includes("The user prefers:"), "Directive tone");
assert(pi.includes("personalized"), "Has usage instructions");

const piMulti = exportAsProjectInstructions(multiAnalyses);
assert(piMulti.includes("TypeScript"), "Merged has TS topic");
assert(piMulti.includes("React"), "Merged has React topic");

// CLAUDE.md
console.log("\nCLAUDE.md exporter:");
const cmd = exportAsClaudeMd([singleAnalysis]);
assert(cmd.includes("# User Context"), "Has context header");
assert(cmd.includes("> Migrated from ChatGPT"), "Has migration note");
assert(cmd.includes("## Background"), "Has background");
assert(cmd.includes("## Domain Knowledge"), "Has domain knowledge");
assert(cmd.includes("## User Preferences"), "Has preferences");
assert(cmd.includes("## Interaction Style"), "Has interaction style");

// All formats are different
console.log("\nFormat differentiation:");
assert(md !== pi, "Markdown != Project Instructions");
assert(pi !== cmd, "Project Instructions != CLAUDE.md");
assert(md !== cmd, "Markdown != CLAUDE.md");

console.log("\n--- All exporter tests passed! ---\n");

import { parseGeminiExport } from "../src/lib/parsers/gemini";
import { parseClaudeExport } from "../src/lib/parsers/claude";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

// --- Gemini Parser Tests ---

console.log("\n--- Gemini Parser Tests ---");

const mockGeminiExport = JSON.stringify([
  {
    conversations: [
      {
        title: "Gemini Chat 1",
        messages: [
          { role: "user", content: "What is Google?" },
          { role: "assistant", content: "A search engine." }
        ]
      }
    ]
  }
]);

try {
  const geminiResult = parseGeminiExport(mockGeminiExport);
  assert(geminiResult.length === 1, "Parses 1 Gemini conversation");
  assert(geminiResult[0].title === "Gemini Chat 1", "Correct Gemini title");
  assert(geminiResult[0].messageCount === 2, "Correct Gemini message count");
} catch (e) {
  console.error("Gemini Test Failed:", e instanceof Error ? e.message : e);
}

// --- Claude Parser Tests ---

console.log("\n--- Claude Parser Tests ---");

const mockClaudeExport = JSON.stringify([
  {
    name: "Claude Chat 1",
    chat_messages: [
      { sender: "human", text: "Hello Claude" },
      { sender: "assistant", text: "Hello human" }
    ]
  }
]);

try {
  const claudeResult = parseClaudeExport(mockClaudeExport);
  assert(claudeResult.length === 1, "Parses 1 Claude conversation");
  assert(claudeResult[0].title === "Claude Chat 1", "Correct Claude title");
  assert(claudeResult[0].messages[0].role === "user", "Human sender normalized to user");
} catch (e) {
  console.error("Claude Test Failed:", e instanceof Error ? e.message : e);
}

// --- Edge Case: Empty/Invalid ---

console.log("\n--- Edge Case Tests ---");

try {
  parseClaudeExport("[]");
  assert(true, "Handles empty array without crashing");
} catch (e) {
  console.error("Empty array test failed:", e instanceof Error ? e.message : e);
}

console.log("\n--- Universal tests finished! ---");

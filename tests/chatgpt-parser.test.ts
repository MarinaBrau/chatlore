import { parseChatGPTExport } from "../src/lib/parsers/chatgpt";

// Minimal mock of ChatGPT conversations.json format
const mockExport = JSON.stringify([
  {
    title: "Test conversation",
    create_time: 1700000000,
    update_time: 1700001000,
    current_node: "node-3",
    mapping: {
      "node-0": {
        id: "node-0",
        message: {
          id: "msg-0",
          author: { role: "system" },
          content: { content_type: "text", parts: ["You are a helpful assistant."] },
          create_time: 1700000000,
        },
        parent: null,
        children: ["node-1"],
      },
      "node-1": {
        id: "node-1",
        message: {
          id: "msg-1",
          author: { role: "user" },
          content: { content_type: "text", parts: ["Hello, how are you?"] },
          create_time: 1700000100,
        },
        parent: "node-0",
        children: ["node-2"],
      },
      "node-2": {
        id: "node-2",
        message: {
          id: "msg-2",
          author: { role: "assistant" },
          content: {
            content_type: "text",
            parts: ["I'm doing well! How can I help you today?"],
          },
          create_time: 1700000200,
        },
        parent: "node-1",
        children: ["node-3"],
      },
      "node-3": {
        id: "node-3",
        message: {
          id: "msg-3",
          author: { role: "user" },
          content: { content_type: "text", parts: ["Tell me about TypeScript"] },
          create_time: 1700000300,
        },
        parent: "node-2",
        children: [],
      },
    },
  },
  {
    title: "Second conversation",
    create_time: 1700100000,
    update_time: 1700101000,
    current_node: "n-2",
    mapping: {
      "n-0": {
        id: "n-0",
        message: null,
        parent: null,
        children: ["n-1"],
      },
      "n-1": {
        id: "n-1",
        message: {
          id: "m-1",
          author: { role: "user" },
          content: { content_type: "text", parts: ["What is React?"] },
          create_time: 1700100100,
        },
        parent: "n-0",
        children: ["n-2"],
      },
      "n-2": {
        id: "n-2",
        message: {
          id: "m-2",
          author: { role: "assistant" },
          content: { content_type: "text", parts: ["React is a JavaScript library."] },
          create_time: 1700100200,
        },
        parent: "n-1",
        children: [],
      },
    },
  },
]);

// --- Tests ---

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

console.log("\n--- ChatGPT Parser Tests ---\n");

// Test: basic parsing
console.log("Basic parsing:");
const result = parseChatGPTExport(mockExport);
assert(result.length === 2, "Parses 2 conversations");
assert(result[0].title === "Second conversation", "Sorted by most recent first");
assert(result[1].title === "Test conversation", "Older conversation second");

// Test: messages extraction
console.log("\nMessage extraction:");
const conv1 = result.find((c) => c.title === "Test conversation")!;
assert(conv1.messageCount === 3, "3 messages (system excluded)");
assert(conv1.messages[0].role === "user", "First message is user (system skipped)");
assert(conv1.messages[0].content === "Hello, how are you?", "User message content correct");
assert(conv1.messages[1].role === "assistant", "Second message is assistant");
assert(conv1.messages[2].content === "Tell me about TypeScript", "Last message content correct");

// Test: preview
console.log("\nPreview:");
assert(conv1.preview === "Hello, how are you?", "Preview is first user message");

// Test: timestamps
console.log("\nTimestamps:");
assert(conv1.createTime instanceof Date, "createTime is Date");
assert(conv1.createTime.getTime() === 1700000000 * 1000, "createTime value correct");

// Test: conversation with null message node
console.log("\nNull message nodes:");
const conv2 = result.find((c) => c.title === "Second conversation")!;
assert(conv2.messageCount === 2, "Handles null message nodes correctly");

// Test: error handling
console.log("\nError handling:");
try {
  parseChatGPTExport("not valid json");
  assert(false, "Should throw on invalid JSON");
} catch (e) {
  assert(e instanceof Error && e.message.includes("Invalid JSON"), "Throws on invalid JSON");
}

try {
  parseChatGPTExport(JSON.stringify({ foo: "bar" }));
  assert(false, "Should throw on non-array");
} catch (e) {
  assert(e instanceof Error && e.message.includes("Expected a JSON array"), "Throws on non-array");
}

// Test: empty parts / multimodal
console.log("\nEdge cases:");
const emptyPartsExport = JSON.stringify([
  {
    title: "Empty parts",
    create_time: 1700000000,
    update_time: 1700001000,
    current_node: "n-1",
    mapping: {
      "n-0": {
        id: "n-0",
        message: null,
        parent: null,
        children: ["n-1"],
      },
      "n-1": {
        id: "n-1",
        message: {
          id: "m-1",
          author: { role: "user" },
          content: {
            content_type: "multimodal_text",
            parts: [{ content_type: "image_asset_pointer" }, "Text after image"],
          },
          create_time: 1700000100,
        },
        parent: "n-0",
        children: [],
      },
    },
  },
]);
const emptyResult = parseChatGPTExport(emptyPartsExport);
assert(emptyResult.length === 1, "Parses multimodal conversation");
assert(
  emptyResult[0].messages[0].content === "Text after image",
  "Extracts only string parts from multimodal"
);

console.log("\n--- All tests passed! ---\n");

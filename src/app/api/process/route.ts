import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeWithClaude } from "@/lib/claude";
import { buildAnalysisPrompt } from "@/lib/prompts";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Message } from "@/lib/parsers/types";

const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system", "tool"]),
  content: z.string(),
  timestamp: z.string().nullable(),
});

const ConversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(MessageSchema).min(1),
});

const RequestSchema = z.object({
  conversations: z.array(ConversationSchema).min(1).max(10),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const { allowed, retryAfterMs } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again shortly.",
        retryAfterMs,
      },
      { status: 429 }
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request data" },
      { status: 400 }
    );
  }

  // Process conversations sequentially to avoid API rate limits
  try {
    const results = [];
    for (const conv of parsed.data.conversations) {
      const prompt = buildAnalysisPrompt(conv.title, conv.messages as unknown as Message[]);
      const analysis = await analyzeWithClaude(prompt);
      results.push({
        id: conv.id,
        title: conv.title,
        ...analysis,
      });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Claude API error:", err);

    return NextResponse.json(
      { error: "AI processing failed. Please try again." },
      { status: 502 }
    );
  }
}

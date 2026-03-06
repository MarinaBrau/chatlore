import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeWithClaude } from "@/lib/claude";
import { buildAnalysisPrompt, ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Message } from "@/lib/parsers/types";

const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system", "tool"]),
  content: z.string(),
  timestamp: z.string().or(z.date()).nullable().transform(val => val instanceof Date ? val : (val ? new Date(val) : null)),
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

  // Process conversations sequentially to avoid API rate limits and ensure robustness
  try {
    const results = [];
    for (const conv of parsed.data.conversations) {
      // conv.messages is now correctly typed as Message[] after Zod transformation
      const prompt = buildAnalysisPrompt(conv.title, conv.messages as Message[]);
      const analysis = await analyzeWithClaude(prompt, ANALYSIS_SYSTEM_PROMPT);
      
      results.push({
        id: conv.id,
        title: conv.title,
        ...analysis,
      });

      // Optional: small delay between items if processing many
      if (parsed.data.conversations.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("AI processing error:", err);

    return NextResponse.json(
      { error: "AI processing failed. Our team has been notified. Please try again with fewer conversations." },
      { status: 502 }
    );
  }
}

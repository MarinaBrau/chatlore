import { NextRequest, NextResponse } from "next/server";
import { analyzeWithClaude } from "@/lib/claude";
import { buildAnalysisPrompt } from "@/lib/prompts";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Message } from "@/lib/parsers/types";

interface ConversationPayload {
  id: string;
  title: string;
  messages: Message[];
}

interface RequestBody {
  conversations: ConversationPayload[];
}

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
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (
    !body.conversations ||
    !Array.isArray(body.conversations) ||
    body.conversations.length === 0
  ) {
    return NextResponse.json(
      { error: "Request must include a non-empty 'conversations' array" },
      { status: 400 }
    );
  }

  if (body.conversations.length > 10) {
    return NextResponse.json(
      { error: "Maximum 10 conversations per request" },
      { status: 400 }
    );
  }

  // Validate each conversation
  for (const conv of body.conversations) {
    if (!conv.id || !conv.title || !Array.isArray(conv.messages)) {
      return NextResponse.json(
        {
          error:
            "Each conversation must have 'id', 'title', and 'messages' fields",
        },
        { status: 400 }
      );
    }
  }

  // Process conversations sequentially to avoid API rate limits
  try {
    const results = [];
    for (const conv of body.conversations) {
      const prompt = buildAnalysisPrompt(conv.title, conv.messages);
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

# ChatLore

**Import your ChatGPT history into Claude.**

ChatLore transforms your ChatGPT conversation history into structured context files -- summaries, preferences, topics, and interaction patterns -- ready to use with Claude. Make Claude feel like you've used it for years, from day one.

100% free. No sign-up. No usage limits.

**Live at [chatlore.app](https://chatlore.app)**

---

## How It Works

1. **Export from ChatGPT** -- Go to ChatGPT Settings > Data controls > Export data. Download the zip and extract `conversations.json`.
2. **Upload & select** -- Drag and drop the file into ChatLore. Your file is parsed entirely in the browser -- nothing leaves your machine. Search, sort, and pick the conversations that best reflect your preferences.
3. **Review the analysis** -- Claude analyzes each selected conversation and extracts a summary, recurring topics, stated preferences, and behavioral patterns.
4. **Export & use** -- Copy or download the result in the format that fits your workflow.

## Export Formats

| Format | Best for | Where to put it |
|---|---|---|
| Plain Text | Quick, one-off conversations | Paste at the start of any chat |
| Project Instructions | Claude.ai power users | Project settings > Instructions |
| CLAUDE.md | Claude Code developers | Repo root or `~/.claude/` |

## Features

- **Client-side parsing** -- The ChatGPT export file is parsed entirely in a Web Worker inside your browser. No upload to any server.
- **AI-powered analysis** -- Selected conversations are sent to Claude's API (stateless, zero data retention) to extract structured insights.
- **Multiple export targets** -- Plain text (clipboard), Project Instructions (clipboard), or CLAUDE.md (file download).
- **Individual and combined views** -- Review analysis per conversation or as a merged summary across all selected conversations.
- **Search and sort** -- Find specific conversations by title or keyword, sort by date or message count.
- **Rate limiting** -- Built-in server-side rate limiting to prevent abuse.
- **CRO-optimized landing page** -- Hero, social proof, how-it-works flow, trust pillars, FAQ, and structured data (JSON-LD).
- **Step-by-step guide** -- Dedicated `/guide` page walking users through the full process.

## Privacy

- File parsing happens in the browser via a Web Worker. The raw file never leaves your machine.
- Only the conversations you explicitly select are sent to the server for analysis.
- The server makes stateless calls to the Claude API. No database, no logs, no data retention.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Animations | Framer Motion |
| AI | Anthropic Claude API (`@anthropic-ai/sdk`) |
| Validation | Zod |
| Virtualization | TanStack Virtual |
| Hosting | Vercel |
| DNS | Cloudflare |

## Project Structure

```
src/
├── app/
│   ├── api/process/route.ts    # POST endpoint: sends conversations to Claude for analysis
│   ├── conversations/page.tsx  # Browse and select parsed conversations
│   ├── guide/page.tsx          # Step-by-step usage guide
│   ├── results/page.tsx        # View analysis results and export
│   ├── upload/page.tsx         # File upload page
│   ├── layout.tsx              # Root layout (fonts, providers, analytics)
│   └── page.tsx                # Landing page
├── components/
│   ├── landing/                # Landing page sections (Hero, FAQ, HowItWorks, etc.)
│   ├── mockups/                # Visual mockups for the landing page
│   ├── ui/                     # shadcn/ui primitives (button, dialog, accordion, etc.)
│   ├── ConversationList.tsx    # Searchable, sortable conversation list
│   ├── ExportButtons.tsx       # Copy/download in all three formats
│   ├── ResultCard.tsx          # Displays a single conversation analysis
│   ├── UploadZone.tsx          # Drag-and-drop file upload
│   └── ...
├── context/
│   └── conversations.tsx       # React context for parsed conversations
├── lib/
│   ├── exporters/              # Markdown, Project Instructions, CLAUDE.md generators
│   ├── parsers/
│   │   ├── chatgpt.ts          # ChatGPT conversations.json parser
│   │   ├── types.ts            # Parsed conversation/message types
│   │   └── use-parser.ts       # React hook wrapping the Web Worker
│   ├── claude.ts               # Anthropic SDK wrapper
│   ├── prompts.ts              # Analysis prompt builder
│   ├── rate-limit.ts           # In-memory IP-based rate limiter
│   ├── analytics.ts            # Event tracking helpers
│   └── types.ts                # Shared types (ConversationAnalysis)
├── workers/
│   └── parse-worker.ts         # Web Worker for off-main-thread JSON parsing
└── tests/
    ├── chatgpt-parser.test.ts
    └── exporters.test.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- An Anthropic API key

### Installation

```bash
git clone https://github.com/MarinaBrau/chatlore.git
cd chatlore
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=sk-ant-...
```

This is the only required variable. The key is used server-side only (in the API route) and is never exposed to the browser.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Bundle Analysis

```bash
ANALYZE=true npm run build
```

## Deployment

The app is deployed on [Vercel](https://vercel.com). Set the `ANTHROPIC_API_KEY` environment variable in your Vercel project settings. No other configuration is needed.

## License

All rights reserved.

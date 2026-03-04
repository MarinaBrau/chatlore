# ChatLore Universal (v3) 

**Universal AI Context Hub — Transfer your chat history, memory, and style between ChatGPT, Claude, and Gemini in seconds.**

ChatLore solves the "AI cold start" problem. When you move to a new AI assistant, you lose months of context: your coding style, your communication preferences, and your specific project knowledge. ChatLore allows you to import your history from any major AI and generate a structured "Universal AI Profile" that works everywhere.

## ✨ Features

-   **Any Input**: Supports exports from ChatGPT (`conversations.json`), Gemini, and Claude.
-   **Any Output**: Generate optimized context for Claude (Project Instructions, `CLAUDE.md`), ChatGPT (Custom Instructions), Gemini (System Instructions), and Cursor (`.cursorrules`).
-   **100% Private**: Parsing happens entirely in your browser. Your files never leave your machine.
-   **Smart Compression**: Automatically prioritizes and squeezes your context to fit ChatGPT's strict 1500-character limit.
-   **Zero Setup**: No sign-up, no database, no tracking of your chat content.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **AI Analysis**: [Anthropic Claude API](https://www.anthropic.com/api) (Stateless processing)
-   **Parsing**: Web Workers for heavy client-side JSON processing

## 🚀 Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your `.env.local`:
    ```env
    ANTHROPIC_API_KEY=your_key_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

-   `src/lib/parsers/`: Adapters for different AI export formats.
-   `src/lib/exporters/`: Templates and logic for different AI outputs.
-   `src/lib/utils/compressor.ts`: Logic for context prioritization and truncation.
-   `src/components/landing/`: High-quality, animated marketing components.
-   `src/components/mockups/`: Stateless React components mimicking AI interfaces.

## 📜 Privacy Note

ChatLore is built on the principle of **Zero Data Retention**.
-   **Local Parse**: Your export files are read locally via `FileReader`.
-   **Stateless API**: Only the text of conversations you *manually select* is sent to the AI for analysis.
-   **No Database**: We do not store your chat history or the generated results.


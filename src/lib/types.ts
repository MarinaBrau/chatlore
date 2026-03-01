/** Result from the /api/process endpoint for a single conversation */
export interface ConversationAnalysis {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  preferences: string[];
  patterns: string[];
}

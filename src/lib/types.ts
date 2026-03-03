export interface ConversationAnalysis {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  preferences: string[];
  patterns: string[];
  toneAdjectives: string[];
  negativeConstraints: string[];
}

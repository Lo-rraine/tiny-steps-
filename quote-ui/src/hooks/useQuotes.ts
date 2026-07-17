import { useState, useEffect } from 'react';

export interface Quote {
  timestamp: string;
  date: string;
  time: string;
  author: string;
  text: string;
}

export interface QuoteData {
  quotes: Quote[];
  datesWithQuotes: Set<string>;
  lastUpdated: Date;
  error?: string;
}

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Lo-rraine/tiny-steps-/main/QUOTES.md';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

function parseQuotesMarkdown(markdown: string): Quote[] {
  const lines = markdown.split('\n');
  const quotes: Quote[] = [];

  for (const line of lines) {
    const match = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/);
    if (match && !line.includes('Timestamp')) {
      const [, timestamp, author, text] = match;
      const [date, time] = timestamp.trim().split(' ');

      if (date && time && author && text) {
        quotes.push({
          timestamp: timestamp.trim(),
          date,
          time,
          author: author.trim(),
          text: text.trim(),
        });
      }
    }
  }

  return quotes;
}

export function useQuotes() {
  const [data, setData] = useState<QuoteData>({
    quotes: [],
    datesWithQuotes: new Set(),
    lastUpdated: new Date(),
  });
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(GITHUB_RAW_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const markdown = await response.text();
      const quotes = parseQuotesMarkdown(markdown);
      const datesWithQuotes = new Set(quotes.map((q) => q.date));

      setData({
        quotes,
        datesWithQuotes,
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch quotes';
      setData((prev) => ({
        ...prev,
        error: errorMsg,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { ...data, loading, refetch: fetchQuotes };
}

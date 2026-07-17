import { Quote } from '../hooks/useQuotes';
import '../styles/QuoteDisplay.css';

interface QuoteDisplayProps {
  quotes: Quote[];
  selectedDate: string;
  lastUpdated: Date;
}

export function QuoteDisplay({ quotes, selectedDate, lastUpdated }: QuoteDisplayProps) {
  const quotesForDate = quotes.filter((q) => q.date === selectedDate);

  if (quotesForDate.length === 0) {
    return (
      <div className="quote-display empty">
        <p>No quotes for this date</p>
      </div>
    );
  }

  return (
    <div className="quote-display">
      <div className="quote-meta">
        <h3>{selectedDate}</h3>
        <p className="update-time">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      </div>

      <div className="quotes-list">
        {quotesForDate.map((quote, index) => (
          <div key={index} className="quote-card">
            <div className="quote-time">{quote.time}</div>
            <div className="quote-text">"{quote.text}"</div>
            <div className="quote-author">— {quote.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

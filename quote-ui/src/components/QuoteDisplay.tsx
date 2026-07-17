import type { Quote } from '../hooks/useQuotes';
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
        <h2>{selectedDate}</h2>
        <p className="update-time">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      </div>

      <div className="quotes-list">
        {quotesForDate.map((quote, index) => (
          <div key={index} className={`quote-card ${index === 0 ? 'featured' : ''}`}>
            <div className="quote-content">
              <div className="quote-text">"{quote.text}"</div>
              <div className="quote-footer">
                <span className="quote-author">— {quote.author}</span>
                <span className="quote-time">{quote.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

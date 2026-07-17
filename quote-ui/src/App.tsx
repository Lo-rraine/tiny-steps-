import { useState } from 'react';
import { useQuotes } from './hooks/useQuotes';
import { Calendar } from './components/Calendar';
import { QuoteDisplay } from './components/QuoteDisplay';
import './App.css';

function App() {
  const { quotes, datesWithQuotes, lastUpdated, loading, error } = useQuotes();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


  return (
    <div className="app">
      <header className="header">
        <h1>Daily Quotes</h1>
        <p className="subtitle">Engineering wisdom, one quote at a time</p>
      </header>

      {error && <div className="error-banner">Error: {error}</div>}

      {loading ? (
        <div className="loading">Loading quotes...</div>
      ) : (
        <div className="container">
          <div className="main-content">
            <QuoteDisplay quotes={quotes} selectedDate={selectedDate} lastUpdated={lastUpdated} />
          </div>

          <div className="sidebar">
            <Calendar
              datesWithQuotes={datesWithQuotes}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Quotes auto-refresh every 5 minutes</p>
      </footer>
    </div>
  );
}

export default App;

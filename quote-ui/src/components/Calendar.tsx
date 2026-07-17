import { useState } from 'react';
import '../styles/Calendar.css';

interface CalendarProps {
  datesWithQuotes: Set<string>;
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function Calendar({ datesWithQuotes, selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDayOfWeek }, () => null);
  const calendarDays = [...blanks, ...days];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const formatDate = (day: number) => {
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0];
  };

  const hasQuotes = (day: number | null) => {
    if (!day) return false;
    const dateStr = formatDate(day);
    return datesWithQuotes.has(dateStr);
  };

  const isSelected = (day: number | null) => {
    if (!day) return false;
    return formatDate(day) === selectedDate;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPrevMonth} className="nav-button">←</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={goToNextMonth} className="nav-button">→</button>
      </div>

      <div className="calendar-days-header">
        {dayNames.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            className={`calendar-day ${!day ? 'empty' : ''} ${hasQuotes(day) ? 'has-quotes' : ''} ${isSelected(day) ? 'selected' : ''}`}
            onClick={() => {
              if (day) onDateSelect(formatDate(day));
            }}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

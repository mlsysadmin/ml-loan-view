import React, { useState, useEffect } from 'react';

interface DatePickerDropdownProps {
  onChange?: (date: { month: number; day: number; year: number }) => void;
}

const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ onChange }) => {
  const currentYear = new Date().getFullYear();

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const [month, setSelectedMonth] = useState<number | null>(null);
  const [day, setSelectedDay] = useState<number | null>(null);
  const [year, setSelectedYear] = useState<number | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const padNumber = (num: number) => num.toString().padStart(2, '0');

  // Update days in month when both month and year are selected
  useEffect(() => {
    if (month && year) {
      const totalDays = new Date(year, month, 0).getDate();
      setDaysInMonth([...Array(totalDays)].map((_, i) => i + 1));

      // Reset day if it exceeds new month’s limit
      if (day && day > totalDays) {
        setSelectedDay(totalDays);
      }
    } else {
      setDaysInMonth([]);
      setSelectedDay(null);
    }
  }, [month, year]);

  // Trigger parent onChange only if all are selected
  useEffect(() => {
    if (month && day && year && onChange) {
      onChange({ month, day, year });
    }
  }, [month, day, year]);

  return (
    <div className="select-wrapper" style={{ display: 'flex', gap: '0.5rem' }}>
      {/* Year */}
      <div className="select">
        <select
          className="select__field"
          value={year ?? ''}
          onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Year</option>
          {[...Array(100)].map((_, i) => {
            const yearOption = currentYear - i;
            return (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>
      </div>
      {/* Month */}
      <div className="select">
        <select
          className="select__field"
          value={month ?? ''}
          onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Month</option>
          {months.map((label, index) => (
            <option key={index + 1} value={index + 1}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {/* Day */}
      <div className="select">
        <select
          className="select__field"
          value={day ?? ''}
          onChange={(e) => setSelectedDay(e.target.value ? parseInt(e.target.value) : null)}
          disabled={!month || !year}
        >
          <option value="">Day</option>
          {daysInMonth.map((d) => (
            <option key={d} value={d}>
              {padNumber(d)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DatePickerDropdown;

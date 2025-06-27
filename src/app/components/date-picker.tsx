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

  const [month, setSelectedMonth] = useState(1); // Start at 1 (JAN)
  const [day, setSelectedDay] = useState(1);
  const [year, setSelectedYear] = useState(currentYear);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const padNumber = (num: number) => num.toString().padStart(2, '0');

  useEffect(() => {
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth([...Array(days)].map((_, i) => i + 1));

    if (day > days) {
      setSelectedDay(days);
    }

    if (onChange) {
      onChange({
        month, // numeric, starts at 1
        day,   // numeric
        year,
      });
    }
  }, [month, day, year]);

  return (
    <div className="select-wrapper">
      {/* Month Dropdown */}
      <div className="select">
        <select
          className="select__field"
          value={month}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {months.map((label, index) => (
            <option className="small regular" key={index + 1} value={index + 1}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Day Dropdown */}
      <div className="select">
        <select
          className="select__field"
          value={day}
          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
        >
          {daysInMonth.map((d) => (
            <option className="small regular" key={d} value={d}>
              {padNumber(d)}
            </option>
          ))}
        </select>
      </div>

      {/* Year Dropdown */}
      <div className="select">
        <select
          className="select__field"
          value={year}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {[...Array(100)].map((_, i) => {
            const yearOption = currentYear - i;
            return (
              <option className="small regular" key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DatePickerDropdown;

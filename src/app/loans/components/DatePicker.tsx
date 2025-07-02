import React, { useState, useEffect, useRef } from 'react';

interface DatePickerDropdownProps {
  onChange?: (date: { month: number; day: number; year: number }) => void;
  value?: { month: number; day: number; year: number };
}

const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ onChange, value }) => {
  const currentYear = new Date().getFullYear();

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const [month, setSelectedMonth] = useState<number | null>(null);
  const [monthLabel, setSelectedMonthLabel] = useState<string | null>(null);
  const [day, setSelectedDay] = useState<number | null>(null);
  const [year, setSelectedYear] = useState<number | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    if (value) {
      setSelectedYear(value.year);
      setSelectedMonth(value.month);
      setSelectedDay(value.day);
      setSelectedMonthLabel(months[value.month - 1]);
    }
  }, [value]);

  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setYearDropdownOpen(false);
        setMonthDropdownOpen(false);
        setDayDropdownOpen(false);
      }
    };
    if (yearDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    if (monthDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    if (dayDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [yearDropdownOpen, monthDropdownOpen, dayDropdownOpen]);

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
    <>
      <div className="date-picker-wrapper" ref={dropdownRef}>
        {/* Year */}
        <div className='full-width'>
          <div className='date-picker-dropdown' onClick={() => {
            setYearDropdownOpen(!yearDropdownOpen);
            setMonthDropdownOpen(false);
            setDayDropdownOpen(false)
          }}>
            <span className='readble'>{year ?? 'Year'}</span> <span className='date-picker-dropdown-carret'>▼</span>
          </div>

          {yearDropdownOpen && (
            <div className='date-picker-dropdown-select scrollbar' >
              {[...Array(100)].map((_, i) => {
                const yearOption = currentYear - i;
                return (
                  <div className='date-picker-dropdown-option'
                    key={yearOption}
                    onClick={() => {
                      setSelectedYear(yearOption);
                      setYearDropdownOpen(false);
                    }}>
                    <span>{yearOption}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Month */}
        <div className='full-width'>
          <div className='date-picker-dropdown' onClick={() => {
            setMonthDropdownOpen(!monthDropdownOpen)
            setYearDropdownOpen(false);
            setDayDropdownOpen(false)
          }}>
            <span className='readble'>{monthLabel ?? 'Month'}</span> <span className='date-picker-dropdown-carret'>▼</span>
          </div>

          {monthDropdownOpen && (
            <div className='date-picker-dropdown-select scrollbar' >
              {months.map((label, index) => (
                <div className='date-picker-dropdown-option'
                  key={index + 1}
                  onClick={() => {
                    setSelectedMonth(index + 1);
                    setMonthDropdownOpen(false);
                    setSelectedMonthLabel(label);
                  }}>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Day */}
        <div className='full-width'>
          <div className='date-picker-dropdown' onClick={() => {
            setDayDropdownOpen(!dayDropdownOpen);
            setYearDropdownOpen(false);
            setMonthDropdownOpen(false);
          }}>
            <span className='readble'>{day ?? 'Day'}</span> <span className='date-picker-dropdown-carret'>▼</span>
          </div>

          {dayDropdownOpen && (
            <div className='date-picker-dropdown-select scrollbar'>
              {daysInMonth.map((d) => (
                <div className='date-picker-dropdown-option'
                  key={d}
                  onClick={() => {
                    setSelectedDay(d);
                    setDayDropdownOpen(false);
                  }}>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DatePickerDropdown;

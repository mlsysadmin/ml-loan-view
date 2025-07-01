'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

interface PhoneInputProps {
  value: string;
  onChange: (formatted: string) => void;
  country: string;
  onCountryChange?: (code: string) => void;
  ref?: (() => void) | undefined;
}

const countryOptions: Record<string, { code: string; flag: string; placeholder: string }> = {
  PH: { code: '+63', flag: 'ph', placeholder: '900 000 0000' },
  US: { code: '+1', flag: 'us', placeholder: '(000) 000 0000' },
  CA: { code: '+1', flag: 'ca', placeholder: '(000) 000 0000' },
};

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, country, onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(country);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCountrySelect = (countryKey: string) => {
    setSelectedCountry(countryKey);
    setDropdownOpen(false);
    onCountryChange?.(countryOptions[countryKey].code);
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (selectedCountry === 'PH') {
      return digits.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '$1 $2 $3').trim();
    } else {
      return digits.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '($1) $2 $3').trim();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className='mobile-input-wrapper' ref={dropdownRef}>
      {/* Country Dropdown Toggle */}
      <div
        className='country-code-dropdown'
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={`/images/flags/${countryOptions[selectedCountry].flag}-circle.png`}
          alt="Flag"
          className='country-code-dropdown-img'
        />
        <span style={{ fontSize: '14px' }}>{countryOptions[selectedCountry].code}</span>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className='country-code-dropdown-select' >
          {Object.entries(countryOptions).map(([key, { code, flag }]) => (
            <div
            className='country-code-dropdown-option'
              key={key}
              onClick={() => handleCountrySelect(key)}
            >
              <Image
                src={`/images/flags/${flag}-circle.png`}
                alt={`${flag} flag`}
                width={20}
                height={20}
              />
              <span style={{ fontSize: '14px' }}>{code}</span>
            </div>
          ))}
        </div>
      )}

      {/* Phone Input */}
      <input
        className="form-control mobile-input"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={countryOptions[selectedCountry].placeholder}
      />
    </div>
  );
};

export default PhoneInput;

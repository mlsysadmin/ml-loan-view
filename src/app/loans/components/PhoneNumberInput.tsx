'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

interface PhoneInputProps {
  value: string;
  onChange: (formatted: string) => void;
  country: string;
  countryCode?: string;
  onCountryChange?: (flag: string) => void;
}

const countryOptions: Record<string, { code: string; country: string; flag: string; placeholder: string }> = {
  // CA: { code: '+1', country: 'Canada', flag: 'ca', placeholder: '000 888 8888' },
  PH: { code: '+63', country: 'Philippines', flag: 'ph', placeholder: '988 888 8888' },
  // US: { code: '+1', country: 'United States', flag: 'us', placeholder: '(000) 888 8888' },
};

const PhoneInput: React.FC<PhoneInputProps> = ({ value, countryCode, onChange, country, onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(country);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countryCode) {
      const foundKey = Object.keys(countryOptions).find(
        (key) => countryOptions[key].flag === countryCode.toLowerCase()
      );
      if (foundKey) {
        setSelectedCountry(foundKey);
      }
    }
  }, [countryCode]);

  const handleCountrySelect = (countryKey: string) => {
    setSelectedCountry(countryKey);
    setDropdownOpen(false);
    onCountryChange?.(countryOptions[countryKey].flag);
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (selectedCountry === 'PH') {
      return digits.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '$1 $2 $3').trim();
    }
    if (selectedCountry === 'US') {
      return digits.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '($1) $2 $3').trim();
    }
    if (selectedCountry === 'CA') {
      return digits.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '$1 $2 $3').trim();
    }
    return digits;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let raw = e.target.value.replace(/\D/g, '');

  //   if (selectedCountry === 'PH') {
  //     // Only allow numbers starting with 9
  //     if (raw.length === 1 && raw !== '9') return;
  //     if (raw.length > 0 && raw[0] !== '9') return;
  //   }

  //   const formatted = formatPhone(raw);
  //   onChange(formatted);
  // };

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
        <Image
          src={`/images/flags/${countryOptions[selectedCountry].flag}-circle.png`}
          alt="Flag"
          className='country-code-dropdown-img'
          width={20}
          height={20}
        />
        <span className='readble'>{countryOptions[selectedCountry].code}</span>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className='country-code-dropdown-select scrollbar' >
          {Object.entries(countryOptions).map(([key, { code, country, flag }]) => (
            <div className='country-code-dropdown-option' key={key} onClick={() => handleCountrySelect(key)}>
              <Image
                src={`/images/flags/${flag}-circle.png`}
                alt={`${flag} flag`}
                width={22}
                height={22}
              />
              <span className=''>{country}</span> <span className='small text-muted'>{code}</span>
            </div>
          ))}
        </div>
      )}

      {/* Phone Input */}
      <input
        className="form-control mobile-input full-width"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={countryOptions[selectedCountry].placeholder}
      />
    </div>
  );
};

export default PhoneInput;

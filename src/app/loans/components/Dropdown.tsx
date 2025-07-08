import React, { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
    label?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    value,
    options,
    onChange,
    placeholder = 'Select',
    className = '',
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`__dropdown-wrapper ${className}`} ref={dropdownRef}>
            <div
                className="__dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <span className="__dropdown-label">
                    {value === null || value === undefined || value === '' ? placeholder : value}
                </span>
                <span className="__dropdown-caret">▼</span>
            </div>

            {dropdownOpen && (
                <div className="__dropdown-list scrollbar">
                    {options.length > 0 ? (
                        options.map((option, i) => (
                            <div
                                key={i}
                                className={`__dropdown-option ${value === option ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(option);
                                    setDropdownOpen(false);
                                }}
                            >
                                <span>{option}</span>
                            </div>
                        ))
                    ) : (
                        <div className="__dropdown-empty">No options</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;

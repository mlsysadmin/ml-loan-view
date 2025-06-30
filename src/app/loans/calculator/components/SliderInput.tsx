import { SquarePen } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Mark {
  value: number;
  label: string;
}

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
  customMarks?: Mark[];
  secondaryValue?: number; // for percent-based inputs (e.g. purchasePrice)
  showFloatingLabel?: boolean;
  suffix?: string;
  editableAmountInstead?: boolean;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  customMarks,
  secondaryValue,
  showFloatingLabel = false,
  suffix = '',
  editableAmountInstead = false, // used for Down Payment
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [manualAmount, setManualAmount] = useState('');

  useEffect(() => {
    if (isEditing && editableAmountInstead && secondaryValue) {
      const computedPHP = (secondaryValue * value) / 100;
      setManualAmount(computedPHP.toFixed(0));
    }
  }, [value, secondaryValue, isEditing, editableAmountInstead]);

  const editRef = useRef<HTMLDivElement | null>(null);

  const percentage = ((value - min) / (max - min)) * 100;
  const computedPHP =
    typeof secondaryValue === 'number' ? (secondaryValue * value) / 100 : value;

  const isEditable =
    label.toLowerCase().includes('price') ||
    label.toLowerCase().includes('down payment') ||
    label.toLowerCase().includes('amount to borrow') ||
    label.toLowerCase().includes('estimated price');

  // Click outside to close input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply edited amount
  const applyManualAmount = () => {
    if (!manualAmount) {
      setIsEditing(false);
      return;
    }

    const parsed = parseFloat(manualAmount.replace(/[^0-9.]/g, ''));

    if (editableAmountInstead && secondaryValue) {
      // Down Payment: convert PHP input → % with clamping
      const maxPHP = (secondaryValue * max) / 100;
      const minPHP = (secondaryValue * min) / 100;
      const clampedPHP = Math.min(Math.max(parsed, minPHP), maxPHP);
      const newPercent = (clampedPHP / secondaryValue) * 100;
      onChange(Number(newPercent.toFixed(2)));
    } else {
      // Price or other numeric inputs: clamp directly between min/max
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(Number(clamped.toFixed(0)));
    }

    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <div
        className="slider-value-wrapper"
        ref={editRef}
      >
        <div className="text-sm font-medium text-gray-700">
          {label}
          {/* Term: no value */}
          {isEditing ? (
            <input
              className="manual-input ml-1"
              type="text"
              value={editableAmountInstead && secondaryValue
                ? Math.round((secondaryValue * value) / 100)  // PHP amount from %
                : value
              }
              onChange={(e) => {
                const raw = Number(e.target.value);
                if (/^\d*$/.test(e.target.value)) {
                  if (editableAmountInstead && secondaryValue) {
                    // Convert PHP back to % and clamp within range
                    const percent = Math.min(
                      Math.max((raw / secondaryValue) * 100, min),
                      max
                    );
                    onChange(Math.round(percent));
                  } else {
                    const clamped = Math.min(Math.max(raw, min), max);
                    onChange(clamped);
                  }
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
            />
          ) : (
            <span className="ml-1">
              {editableAmountInstead && secondaryValue
                ? `${(secondaryValue * value / 100).toLocaleString()}`
                : formatValue(value)
              }
              {suffix}
            </span>
          )}

        </div>

        {/* Show pen icon if editable */}
        {isEditable && (
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsEditing(true);
              setManualAmount(computedPHP.toFixed(0));
            }}
          >
            {/* <SquarePen size={18} strokeWidth={1.5} /> */}
            <Image
              src="/images/edit.svg"
              alt="Logo"
              width={20}
              height={20}
            />
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider w-full"
        />
        {showFloatingLabel && (
          <div
            className="slider-floating-label bottom"
            style={{ left: `${percentage}%` }}
          >
            {label.toLowerCase().includes('down') || label.toLowerCase().includes('amount to borrow')
              ? `${value.toFixed(0)}%`
              : `${value}${suffix}`}
          </div>
        )}
      </div>

      {/* Bottom marks */}
      <div className="details text-xs mt-3 relative">
        {customMarks ? (
          <>
            {customMarks.map((mark) => (
              <small
                key={mark.value}
                style={{
                  left: `${((mark.value - min) / (max - min)) * 100}%`,
                }}
                className={`absolute ${value === mark.value ? 'font-bold color: red' : ''
                  }`}
              >
                {mark.label} {value === mark.value && 'mons.'}
              </small>
            ))}
          </>
        ) : (
          <>
            <small>{formatValue(min)}</small>
            <small>{formatValue(max)}</small>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderInput;

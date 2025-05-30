import React from 'react';

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
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">{formatValue(value)}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="slider"
        />
        
        <div 
          className=""
          style={{ left: `${percentage}%` }}
        >
          <div className=""></div>
        </div>
      </div>
      
      <div className="details">
        {customMarks ? (
          <>
            {customMarks.map((mark) => (
              <small 
                key={mark.value}
                className={`${value === mark.value ? 'font-bold color: red' : ''}`}
                style={{ 
                    left: `${((mark.value - min) / (max - min)) * 100}%`, 
                    // transform: 'translateX(-20%)' 
                  }}
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
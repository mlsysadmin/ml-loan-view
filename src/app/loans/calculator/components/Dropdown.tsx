'use client';
import { Dropdown } from 'react-bootstrap';
import '../index.css';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string; // error message prop
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = 'w-100',
  error, // include in destructuring
}) => {
  return (
    <div className={className}>
      <Dropdown>
        <Dropdown.Toggle
          className="form-control form-input dropdown-text full-width"
          variant=""
          id="dropdown-basic"
        >
          {value || placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdow-menu">
          {options.map((option) => (
            <Dropdown.Item
              key={option}
              className="dropdown-menu-item"
              onClick={() => onChange(option)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {error && (
        <small className="red">{error}</small>
      )}
    </div>
  );
};

export default CustomDropdown;

'use client';
import { Dropdown } from 'react-bootstrap';
import '../index.css';

const propertyType = [
  'House & Lot',
  'Condominium',
  'Lot only',
];

interface PropertyTypeProps {
  value: string;
  onChange: (value: string) => void;
}

const PropertyDropdown: React.FC<PropertyTypeProps> = ({ value, onChange }) => {
  return (
    <Dropdown className='w-100'>
      <Dropdown.Toggle className='form-control form-input dropdown-text' variant="" id="dropdown-basic">
        {value || 'Select Property Type'}
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropdow-menu'>
        {propertyType.map(type => (
          <Dropdown.Item className='dropdown-menu-item' key={type} onClick={() => onChange(type)}>
            {type}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PropertyDropdown;

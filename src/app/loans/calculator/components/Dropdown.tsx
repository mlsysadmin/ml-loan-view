// 'use client';
// import { Dropdown } from 'react-bootstrap';
// import '../index.css';

// const propertyType = [
//   'House & Lot',
//   'Condominium',
//   'Lot only',
// ];

// interface PropertyTypeProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// const PropertyDropdown: React.FC<PropertyTypeProps> = ({ value, onChange }) => {
//   return (
//     <Dropdown className='w-100'>
//       <Dropdown.Toggle className='form-control form-input dropdown-text full-width' variant="" id="dropdown-basic">
//         {value || 'Select Property Type'}
//       </Dropdown.Toggle>

//       <Dropdown.Menu className='dropdow-menu'>
//         {propertyType.map(type => (
//           <Dropdown.Item className='dropdown-menu-item' key={type} onClick={() => onChange(type)}>
//             {type}
//           </Dropdown.Item>
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default PropertyDropdown;



'use client';
import { Dropdown } from 'react-bootstrap';
import '../index.css';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = 'w-100',
}) => {
  return (
    <Dropdown className={className}>
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
  );
};

export default CustomDropdown;


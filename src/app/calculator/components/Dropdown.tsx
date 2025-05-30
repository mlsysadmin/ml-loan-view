import Dropdown from 'react-bootstrap/Dropdown';
import '../index.css';

const loanTypes = [
    'Purchase of Vacant Lot', 
    'Purchase of House & Lot', 
    'Purchase of Condominium', 
    'Construction of House', 
    'Renovation House Improvement',
    'Refinancing / Take-Out From', 
    'Re-Imbursement of Acquisition Cost',
    'Others'
];

function BasicExample() {
  return (
    <Dropdown className=''>
      <Dropdown.Toggle className='form-control form-input dropdown-text' variant="" id="dropdown-basic">
        Select Loan Type
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdow-menu'>
        {loanTypes.map(type => <Dropdown.Item className='dropdown-menu-item' key={type}>{type}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
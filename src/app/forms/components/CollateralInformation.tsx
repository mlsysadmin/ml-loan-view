'use client'
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Container } from 'react-bootstrap';

const CollateralInformationPage: React.FC = () => {
  return (
    <Container>
      <div className='form-card'>
        <div className='card-title'>
          Collateral Information
        </div>

        <div className='form-section'>
          <div className='form-fields full'>
            <label htmlFor="">Property Details</label>
            <input type="text" className='form-control' placeholder='House No. / Subdivision / Street / Barangay / City or Municipality / Province / Zipcode' />
          </div>
        </div>

        <div className='form-section'>
          <div className='form-fields'>
            <label htmlFor="">Registered Owner</label>
            <input type="text" className='form-control' placeholder='First Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <input type="text" className='form-control' placeholder='Middle Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <input type="text" className='form-control' placeholder='Last Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <select name="" id="" className='form-control'>
              <option value="">Surfix</option>
              <option value="">Sr.</option>
              <option value="">Jr.</option>
              <option value="">II</option>
              <option value="">III</option>
              <option value="">IV</option>
            </select>
          </div>
        </div>
        <div className='form-section'>
          <div className='form-fields'>
            <label htmlFor="">Contact Person</label>
            <input type="text" className='form-control' placeholder='First Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <input type="text" className='form-control' placeholder='Middle Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <input type="text" className='form-control' placeholder='Last Name' />
          </div>
          <div className='form-fields'>
            <label htmlFor="">&nbsp;</label>
            <select name="" id="" className='form-control'>
              <option value="">Surfix</option>
              <option value="">Sr.</option>
              <option value="">Jr.</option>
              <option value="">II</option>
              <option value="">III</option>
              <option value="">IV</option>
            </select>
          </div>
        </div>
        <div className='form-section'>
          <div className='form-fields'>
            <label htmlFor="">Contact Number</label>
            <input type="text" className='form-control' placeholder='09' />
          </div>
        </div>
        <div className='form-btn-container'>
          <button  className="btn btn-continue">
              Next Step <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Container>
  );
}

export default CollateralInformationPage;
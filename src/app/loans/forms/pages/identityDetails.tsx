'use client'
import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useLoanStore, useFinalLoanStore } from '@/app/loans/store/dataStore';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import CustomDropdown from '../../components/Dropdown';

interface Props {
  data: any;
  onBack: () => void;
}

const IdentityDetailsPage: React.FC<Props> = ({ data, onBack }) => {
  const [laonType, setLoanType] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem('loanType');
    stored && setLoanType(stored)
  })

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [birthdate, setBirthdate] = useState<{ month: number; day: number; year: number } | undefined>(undefined);
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("");
  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [empOrBusiness, setEmpOrBusiness] = useState("");
  const [designation, setDesignation] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [unitOrPropertyType, setUnitOrPropertyType] = useState("");

  const [ref, setRef] = useState('');
  const contactNumber = data.contactNumber;
  const countryCode = data.countryCode;
  const email = data.email
  const birthdate = data.birthdate;
  const citizenship = data.citizenship;
  const firstName = data.firstName;
  const middleName = data.middleName
  const lastName = data.lastName;
  const suffix = data.suffix;
  const country = data.country;
  const provinceOrState = data.provinceOrState;
  const cityOrTown = data.cityOrTown;
  const barrangay = data.barrangay;
  const streetNameAndSpecAddress = data.streetNameAndSpecAddress;
  const loanData = useLoanStore((state) => state.data);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    generateRandomString();
    if (data.ckycData) {
      console.log('=== DATA+++++ =', data.birthdate)
      setSourceOfIncome(data.ckycData.occupation.sourceOfIncome);
      setEmpOrBusiness(data.ckycData.occupation.organizationName);
      setDesignation(data.ckycData.occupation.workPosition);
    }
    setIsLoading(false)
  }, []);

  useEffect(() => {
    if (laonType === '"home"') {
      setHeaderText('HOUSING');
      setUnitOrPropertyType(loanData?.propertyType || '')
    } else if (laonType === '"car"') {
      setHeaderText('CAR');
      setUnitOrPropertyType(loanData?.unitType || '')
    }
  });

  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const finalLoanStore = useFinalLoanStore((state) => state.data);

  function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setRef(`(LEH)${result}`);
  }


  const sendEmail = async () => {
    setIsLoading(true);
    // const res = await fetch(`/api/mailer-service`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: 'kenneth88877@gmail.com',
    //     cc: 'kenneth.simbulan@mlhuillier.com',
    //     // cc: 'kenneth.simbulan@mlhuillier.com, mercy.borlas@mlhuillier.com, jeane.cardiente@mlhuillier.com',
    //     subject: 'Home Loan Application',
    //     text: `Applicant: ${firstName} ${lastName} ${lastName} ${suffix} <br/> `,
    //     htmlContent: htmlContent
    //   }),
    // });
    // const data = await res.json();
    // console.log('data::::::', data)


    const res = await fetch('/api/mailer-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'kenneth88877@gmail.com',
        // cc: 'kenneth.simbulan@mlhuillier.com',
        cc: 'kenneth.simbulan@mlhuillier.com, mercy.borlas@mlhuillier.com, jeane.cardiente@mlhuillier.com',
        subject: 'Loan Application',
        text: `Please find the attached loan application from ${firstName} ${lastName} ${lastName} ${suffix}`,
        ...finalData
      }),
    });

    const data = await res.json();
    console.log('data::::::', data)

  };

  let finalData = {
    contactNumber: contactNumber,
    email: email,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    suffix: suffix,
    birthdate: birthdate,
    citizenship: citizenship,
    grossMonthlyIncome: grossMonthlyIncome,
    sourceOfIncome: sourceOfIncome,
    empOrBusiness: empOrBusiness,
    designation: designation,
    loanData: loanData,
    unitOrPropertyType: unitOrPropertyType,
    country: country,
    provinceOrState: provinceOrState,
    cityOrTown: cityOrTown,
    barrangay: barrangay,
    streetNameAndSpecAddress: streetNameAndSpecAddress,
    countryCode: countryCode,
    headerText: headerText,
    ref: ref
  };

  async function submitData() {
    console.log('FINAL DATA :::::::::', finalData)
    setIsLoading(true)
    setFinalLoanData({
      ref: ref,
      applicationTimeStamp: new Date().toISOString(),
      contactNumber,
      email,
      firstName,
      middleName,
      lastName,
      suffix,
      birthdate,
      citizenship,
      grossMonthlyIncome,
      sourceOfIncome,
      empOrBusiness,
      designation,
      loanData,
      found: data.found,
      country,
      provinceOrState,
      cityOrTown,
      barrangay,
      streetNameAndSpecAddress,
      countryCode
    });
    setShow(true);
    await sendEmail()
    router.push('/loans/pre-approval');
  }

  return (
    <Container>
      <br />
      <label className='readable medium'>Income Details</label>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          <CustomDropdown
            label="Suffix"
            value={sourceOfIncome}
            options={['SALARY', 'BUSINESS', 'PENSION', 'REGULAR REMITTANCE ABROAD']}
            onChange={(val) => {
              setSourceOfIncome(val.toUpperCase())
            }}
            placeholder="Type of Income"
          />
        </div>
        <div className='form-fields full-width'>
          <input type="text" className='form-control full-width' value={empOrBusiness || ""} onChange={(e) => setEmpOrBusiness(e.target.value.toUpperCase())} placeholder='Employer / Business Name' />
        </div>
      </div>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          <input type="text" className='form-control full-width' value={designation || ""} onChange={(e) => setDesignation(e.target.value.toUpperCase())} placeholder='Position' />
        </div>
        <div className='form-fields full-width'>
          <input type="text"
            className='form-control full-width '
            value={grossMonthlyIncome}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setGrossMonthlyIncome(value);
              }
            }}
            placeholder='Gross Monthly Income' />
        </div>
      </div>
      <div className='form-btn-container'>
        <button className='__btn btn-white' onClick={onBack}>
          Back
        </button>
        <button className="__btn btn-black" onClick={submitData}>
          Continue
        </button>
      </div>
      <Modal show={show} onHide={handleClose} keyboard={false} autoFocus={false} className='modal'>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <Modal.Body>
              Analyzing...
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default IdentityDetailsPage;
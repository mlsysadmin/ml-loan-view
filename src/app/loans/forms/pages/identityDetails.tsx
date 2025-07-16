'use client'
import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useLoanStore, useFinalLoanStore } from '@/app/loans/store/dataStore';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import CustomDropdown from '../../components/Dropdown';
import { readFileSync } from 'fs';
import path from 'path';

interface Props {
  data: any;
  onBack: () => void;
  loanType?: string;
}

const IdentityDetailsPage: React.FC<Props> = ({ data, onBack }) => {
  const [loanType, setLoanType] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem('loanType');
    if (stored) {
      try {
        setLoanType(JSON.parse(stored));
      } catch {
        setLoanType(stored);
      }
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [birthdate, setBirthdate] = useState<{ month: number; day: number; year: number } | undefined>(undefined);
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("");
  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [empOrBusiness, setEmpOrBusiness] = useState("");
  const [designation, setDesignation] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [unitOrPropertyType, setUnitOrPropertyType] = useState("");
  const [pref, setPref] = useState('NON');

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
    console.log('========', loanType)
    if (loanType === 'car' || loanType === '"car"') {
      console.log('-=as0d-a0d-as0d-0as-0d-asd0--a', unitOrPropertyType)
      switch (unitOrPropertyType) {
        case '2-wheel':
        case '3-wheel':
          setPref('LMC');
          break;
        case '4-wheel':
          setPref('LCR');
          break;
        case 'Commercial':
          setPref('LCC');
          break;
        case 'Construction':
          setPref('LHV');
          break;
      }
    } else if (loanType === 'home' || loanType === '"home"') setPref('LEH');
    console.log('adasdasdasdasdas>>>>>>', pref)
    generateRandomString();
  }, [unitOrPropertyType, loanType]);

  useEffect(() => {
    if (data.ckycData) {
      setSourceOfIncome(data.ckycData.occupation.sourceOfIncome);
      setEmpOrBusiness(data.ckycData.occupation.organizationName);
      setDesignation(data.ckycData.occupation.workPosition);
    }
    setIsLoading(false)
  }, []);

  useEffect(() => {
    if (loanType === 'home' || loanType === '"home"') {
      setHeaderText('HOUSING');
      setUnitOrPropertyType(loanData?.propertyType || '')
    } else if (loanType === 'car' || loanType === '"car"') {
      setHeaderText('CAR');
      setUnitOrPropertyType(loanData?.unitType || '')
    }
  }, [loanType, loanData]);

  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const finalLoanStore = useFinalLoanStore((state) => state.data);

  function generateRandomString(length = 8) {
    console.log('=final pref:::', pref)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setRef(`${pref}${result}`);
  }


  const sendEmail = async () => {
    setIsLoading(true);
    const { firstName, lastName, suffix } = finalData;

    const res = await fetch('/api/mailer-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: '',
        // cc: 'kenneth.simbulan@mlhuillier.com',
        cc: 'kenneth.simbulan@mlhuillier.com, mercy.borlas@mlhuillier.com, jeane.cardiente@mlhuillier.com, nenia.lanohan@mlhuillier.com, merry.ajoc@mlhuillier.com',
        subject: 'Loan Application',
        text: `Please find the attached loan application from ${firstName} ${lastName} ${suffix || ''}`,
        ...finalData,
      }),
    });
  };

  const submit = async () => {
    await fetch('/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    });
  }

  const sendSMS = () => {
    fetch('/api/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobileno: contactNumber,
        firstName,
        lastName,
        loanType: loanType,
        ref,
      }),
    });
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
    setIsLoading(true)
    setFinalLoanData({
      ref: ref,
      applicationTimeStamp: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
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
      countryCode,
      ckycData: undefined
    });
    setShow(true);
    await submit(); // SAVE TO DB
    await sendEmail();
    sendSMS();
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
            className='form-control full-width'
            value={grossMonthlyIncome}
            // onChange={(e) => {
            //   const value = e.target.value;
            //   if (/^\d*$/.test(value)) {
            //     setGrossMonthlyIncome(value);
            //   }
            // }}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, ''); // remove commas
              if (/^\d*$/.test(rawValue)) {
                const numericValue = Number(rawValue);
                const formatted = numericValue.toLocaleString(); // add commas
                setGrossMonthlyIncome(formatted);
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
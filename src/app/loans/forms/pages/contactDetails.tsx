'use client'
import { ArrowRight, Link, SquareUserRound } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Modal, } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import DatePicker from '@/app/loans/components/date-picker';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSearchCKYC } from "../../hooks/use-search-ckyc";
import AppProvider from '../../../../../providers/app-provider';
import moment from 'moment';
import { useFinalLoanStore } from '@/app/loans/store/dataStore';
// import { useLoader } from '../../contexts/LoaderContext';

interface Props {
  onNext: (data: any) => void;
};

const ContactDetailsPage: React.FC<Props> = ({ onNext }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthdate, setBirthdate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [birthdateFromCKYC, setBirthdateFromCKYC] = useState(Date);
  const [country, setCountry] = useState("");
  const [cityOrMunicipality, setCityOrMunicipality] = useState("");
  const [barrangay, setBarrangay] = useState("");
  const [specAddress, setSpecAddress] = useState("");

  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("");
  const [empOrBusiness, setEmpOrBusiness] = useState("");
  const [designation, setDesignation] = useState("");
  const [yearsEmpOrBus, setYearsEmpOrBus] = useState("");

  // const [searchText, setSearchText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const storedData = useFinalLoanStore((state) => state.data);
  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const [errorContactNumber, setErrorContactNumber] = useState('');
  const [errorBdate, setErrorBdate] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [errorCityMuni, setErrorCityMuni] = useState('');
  const [errorBarrangay, setErrorBarrangay] = useState('');
  const [errorSpecAdd, setErrorSpecAdd] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  const contactRef = useRef<HTMLInputElement>(null);
  const [found, setFound] = useState(false);


  const {
    data: ckycData,
    isFetching,
    refetch,
    error,
  } = useSearchCKYC(contactNumber);

  useEffect(() => {
    const stored = localStorage.getItem("ckycData")
    const parsed = stored ? JSON.parse(stored) : null
    setContactNumber(parsed?.cellphoneNumber ?? "")
  }, []);

  useEffect(() => {
    if (storedData) {
      setContactNumber(storedData.contactNumber || '');
      setEmail(storedData.email || '');
      setFirstName(storedData.firstName || '');
      setmiddleName(storedData.middleName || '');
      setLastName(storedData.lastName || '');
      setSuffix(storedData.suffix || '');
      setBirthdate(storedData.birthdate || null);
      setCountry(storedData.country || '');
      setCityOrMunicipality(storedData.cityOrMunicipality || '');
      setBarrangay(storedData.barrangay || '');
      setSpecAddress(storedData.specAddress || '');
    }
  }, []);

  useEffect(() => {
    if (!isFetching && ckycData && Object.keys(ckycData).length > 0) {
      contactRef.current?.blur();
      setErrorContactNumber('');
      setBirthdateFromCKYC(ckycData.birthDate);
      setShow(true);
      setFound(true);
    }
  }, [isFetching, ckycData]);

  function maskStringExceptFirst(str: string) {
    if (!str || str.length === 0) return "";
    return str.charAt(0) + "*".repeat(str.length - 1);
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleDateChange = (date: { day: number; month: number; year: number }) => {
    setBirthdate(date);
    setErrorBdate('');
  };

  const dataHandle = () => {
    if (contactNumber === '') setErrorContactNumber('Mobile number is required.');
    if (email === '') setErrorEmail('Email is required.');
    if (!isValidEmail) setErrorEmail('Invalid email.');
    if (firstName === '') setErrorFirstName('First name is required.');
    if (lastName === '') setErrorLastName('Last name is required.');
    if (country === '') setErrorCountry('Country is required.');
    if (cityOrMunicipality === '') setErrorCityMuni('City or Municipality is required.');
    if (barrangay === '') setErrorBarrangay('Barrangay is required.');
    if (specAddress === '') setErrorSpecAdd('House no. / Sitio / Purok is required.');
  }

  const handleContinue = () => {
    setIsValidEmail(emailRegex.test(email));
    
    if (firstName && lastName && contactNumber && email && isValidEmail && country && cityOrMunicipality && barrangay && specAddress) {
      setFinalLoanData({
        contactNumber,
        email,
        firstName,
        middleName,
        lastName,
        suffix,
        birthdate,
        country,
        cityOrMunicipality,
        barrangay,
        specAddress,
        found: ckycData ? true : false,
        ckycData: ckycData
      });
      onNext({
        contactNumber,
        email,
        firstName,
        middleName,
        lastName,
        suffix,
        birthdate,
        country,
        cityOrMunicipality,
        barrangay,
        specAddress,
        found: ckycData ? true : false,
        ckycData: ckycData
      });
    } else dataHandle()
  };

  function comapreBirthdates() {
    let bday = moment(`${birthdate?.year}-${birthdate?.month}-${birthdate?.day}`).format("YYYY-MM-DD")
    let ckycBdate = birthdateFromCKYC
    console.log('========', bday, ckycBdate, bday === ckycBdate)
    if (bday === ckycBdate) {
      setContactNumber(ckycData?.cellphoneNumber);
      setFirstName(ckycData?.name.firstName);
      setmiddleName(ckycData?.name.middleName);
      setLastName(ckycData?.name.lastName);
      setSuffix(ckycData?.name.suffix);
      setBirthdate(birthdate);
      setEmail(ckycData?.email);
      setCitizenship(ckycData?.nationality);
      setCountry(ckycData?.addresses.current.addressL0Name)
      setCityOrMunicipality(ckycData?.addresses.current.addressL2Name)
      setBarrangay(ckycData?.addresses.current.otherAddress)
      setConfirmed(true);
      handleClose();
    } else setErrorBdate('Birth date not matched.');
  }

  return (
    <Container>
      <label className='readable medium'>Contact Details</label>
      <div className='form-fields'>
        {/* <label className='readable medium'>Contact Details</label> */}

        <input placeholder="Enter mobile"
          ref={contactRef}
          className='form-control'
          value={contactNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setErrorContactNumber('');
              setContactNumber(value);
            }
          }}
        />
        <small>{isFetching ? "Searching..." : ""}</small>
        <small className='red'>{errorContactNumber}</small>
      </div>

      <div className='form-fields'>
        {/* <label htmlFor="">&nbsp;</label> */}
        <input className='form-control' value={email} onChange={(e) => { setEmail(e.target.value); setErrorEmail(''); }} type="email" placeholder='Email Address (juan.d@gmail.com)' />
        <small className='red'>{errorEmail}</small>
      </div>

      <br />

      <label className='readable medium'>Personal Details</label>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>Personal Details</label> */}
          <input type="text" className='form-control full-width' value={firstName} onChange={(e) => { setFirstName(e.target.value); setErrorFirstName(''); }} placeholder='First Name' />
          <small className='red'>{errorFirstName}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={middleName} onChange={(e) => setmiddleName(e.target.value)} placeholder='Middle Name' />
        </div>
        <div className='form-fields full-width'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={lastName} onChange={(e) => { setLastName(e.target.value); setErrorLastName(''); }} placeholder='Last Name' />
          <small className='red'>{errorLastName}</small>
        </div>
        <div className='form-fields half-width'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <div className='select full-width'>
            <select value={suffix} onChange={(e) => setSuffix(e.target.value)} className='select__field'>
              <option value="">Suffix &nbsp;&nbsp;</option>
              <option value="SR.">SR</option>
              <option value="JR">JR</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
          </div>
        </div>
      </div>
      <div className='details-wrapper'>
        {!found ? (
          <div className='form-fields date-wrapper'>
            {/* <label className='readable medium'>&nbsp;</label> */}
            <DatePicker onChange={handleDateChange} />
          </div>
        ) : (
          <div className='form-fields'>
            {/* <label className='readable medium'>&nbsp;</label> */}
            <div className='disabled-date-wrapper'>
              <input className='disabled-date-fields form-control' type="text" value={birthdate?.month} disabled />
              <input className='disabled-date-fields form-control' type="text" value={birthdate?.day} disabled />
              <input className='disabled-date-fields form-control' type="text" value={birthdate?.year} disabled />
            </div>
          </div>
        )}
        <div className='form-fields citizenship-wrapper'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <div className='select full-width-select'>
            <select onChange={(e) => setCitizenship(e.target.value)} id="" className='select__field' value={citizenship}>
              <option value="">Citizenship&nbsp;&nbsp;&nbsp;</option>
              <option value="FILIPINO">FILIPINO</option>
              <option value="">Not Filipino</option>
            </select>
          </div>
        </div>
      </div>

      <br />
      <label className='readable medium'>Address</label>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={country} onChange={(e) => { setCountry(e.target.value); setErrorCountry(''); }} placeholder='Country' />
          <small className='red'>{errorCountry}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={cityOrMunicipality} onChange={(e) => { setCityOrMunicipality(e.target.value); setErrorCityMuni(''); }} placeholder='City / Municipality' />
          <small className='red'>{errorCityMuni}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={barrangay} onChange={(e) => { setBarrangay(e.target.value); setErrorBarrangay(''); }} placeholder='Barrangay' />
          <small className='red'>{errorBarrangay}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={specAddress} onChange={(e) => { setSpecAddress(e.target.value); setErrorSpecAdd(''); }} placeholder='House no., Sitio/Purok' />
          <small className='red'>{errorSpecAdd}</small>
        </div>
      </div>

      {/* <div className='hide'>
        <br />
        <label className='readable medium'>Income Details</label>
        <div className='details-wrapper'>
          <div className='form-fields full-width'>
            <div className='select'>
              <select onChange={(e) => setSourceOfIncome(e.target.value)} className='select__field' value={sourceOfIncome}>
                <option value="">Type of Income</option>
                <option value="salary">Salary</option>
                <option value="business">Business</option>
                <option value="pension">Pension</option>
                <option value="REGULAR REMITTANCE ABROAD">REGULAR REMITTANCE ABROAD</option>
              </select>
            </div>
          </div>
          <div className='form-fields full-width'>
            <input type="text" className='form-control full-width' value={empOrBusiness || ""} onChange={(e) => setEmpOrBusiness(e.target.value)} placeholder='Employer / Business Name' />
          </div>
        </div>
        <div className='details-wrapper'>
          <div className='form-fields full-width'>
            <input type="text" className='form-control full-width' value={designation || ""} onChange={(e) => setDesignation(e.target.value)} placeholder='Position' />
          </div>
          <div className='form-fields full-width'>
            <input type="number" className='form-control full-width ' value={grossMonthlyIncome} onChange={(e) => setGrossMonthlyIncome(e.target.value)} placeholder='Gross Monthly Income' />
          </div>
        </div>
      </div> */}
      <div className='form-btn-container'>
        <button className='__btn btn-white' onClick={() => router.push('/calculator')} >
          Back
        </button>
        <button className="__btn btn-black" onClick={handleContinue}>
          Continue
        </button>
      </div>
      <br />
      <br />

      <Modal show={show} onHide={handleClose} keyboard={false} autoFocus={false} className='modal'>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className='id-modal-icon-wrapper'>
              <div className='id-modal-icon'>
                <Image src="/images/user-tag.svg" alt="Logo" width={41} height={41} />
              </div>
            </div>
            <Modal.Body>
              <div className='id-modal-wrapper'>
                <div className='title medium text-center'>Identity Verification</div>
                <div className='readable'>A customer matching this number was found.</div>
                <div className='readable'>
                  Name: <span className='medium'>{maskStringExceptFirst(ckycData?.name.firstName)} {maskStringExceptFirst(ckycData?.name.middleName)} {maskStringExceptFirst(ckycData?.name.lastName)}</span><br />
                  Mobile No.: <span className='medium'>{ckycData?.cellphoneNumber}</span>
                </div>
                <div className='readable'>If this is you, provide your birth date.</div>
                <DatePicker onChange={handleDateChange} />
                <small className='red text-center'>{errorBdate}</small>
                <div className='modal-btn-wrapper'>
                  <button className='btn-white modal-btn' onClick={() => handleContinue()}>This is not me</button>
                  <button className='btn-red modal-btn' onClick={comapreBirthdates}>Confirm</button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default ContactDetailsPage;

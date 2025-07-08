'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Modal, } from 'react-bootstrap';
import DatePicker from '@/app/loans/components/DatePicker';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSearchCKYC } from "../../hooks/use-search-ckyc";
import moment from 'moment';
import { useFinalLoanStore, useLoanStore } from '@/app/loans/store/dataStore';
import PhoneInput from '@/app/loans/components/PhoneNumberInput';
import CustomDropdown from '../../components/Dropdown';
// import { useLoader } from '../../contexts/LoaderContext';

interface Props {
  onNext: (data: any) => void;
};

const ContactDetailsPage: React.FC<Props> = ({ onNext }) => {
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    const raw = localStorage.getItem('prevURL');
    if (raw) {
      const cleaned = raw.replace(/^\/?"?|"?\/?$/g, '');
      const fixedUrl = cleaned.startsWith('/') ? cleaned : '/' + cleaned;
      fixedUrl && setPrevURL(fixedUrl)
    }
  })

  const router = useRouter();
  const [show, setShow] = useState(false);
  const storedData = useFinalLoanStore((state) => state.data);
  const loanData = useLoanStore((state) => state.data);
  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const [phone, setPhone] = useState(''); // formated value
  const [countryCode, setCountryCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthdate, setBirthdate] = useState<{ month: number; day: number; year: number } | undefined>(undefined);
  const [birthdateFromCKYC, setBirthdateFromCKYC] = useState(Date);
  const [country, setCountry] = useState("");
  const [provinceOrState, setProvinceOrState] = useState("");
  const [cityOrTown, setCityOrTown] = useState("");
  const [barrangay, setBarrangay] = useState("");
  const [streetName, setStreetName] = useState("");
  const [specAddress, setSpecAddress] = useState("");

  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("");
  const [empOrBusiness, setEmpOrBusiness] = useState("");
  const [designation, setDesignation] = useState("");
  const [yearsEmpOrBus, setYearsEmpOrBus] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [errorContactNumber, setErrorContactNumber] = useState('');
  const [errorBdate, setErrorBdate] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorBirthdate, setErrorBirthday] = useState('');
  const [errorCitizenship, setErrorCitizenship] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [errorProvinceOrState, setErrorProvinceOrState] = useState('');
  const [errorCityOrTown, setErrorCityOrTown] = useState('');
  const [errorBarrangay, setErrorBarrangay] = useState('');
  const [errorStreet, setErrorStreet] = useState('');
  const [errorSpecAdd, setErrorSpecAdd] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const contactRef = useRef<HTMLInputElement>(null);
  const [found, setFound] = useState(false);

  const [unitType, setUnitType] = useState('');

  const {
    data: ckycData,
    isFetching,
    refetch,
    error,
  } = useSearchCKYC(contactNumber);

  useEffect(() => {
    console.log('LOAN DATA:::::::', loanData)
    const stored = localStorage.getItem("ckycData")
    const parsed = stored ? JSON.parse(stored) : null
    setContactNumber(parsed?.cellphoneNumber ?? "")
  }, []);

  useEffect(() => {
    if (storedData) {
      setPhone(storedData.contactNumber.slice(1))
      setContactNumber(storedData.contactNumber || '');
      setEmail(storedData.email || '');
      setFirstName(storedData.firstName || '');
      setmiddleName(storedData.middleName || '');
      setLastName(storedData.lastName || '');
      setSuffix(storedData.suffix || '');
      if (storedData.birthdate) {
        handleDateChange(storedData.birthdate);
      }
      setCitizenship(storedData.citizenship || '');
      setCountry(storedData.country || '');
      setProvinceOrState(storedData.provinceOrState || '');
      setCityOrTown(storedData.cityOrTown || '');
      setBarrangay(storedData.barrangay || '');
      setStreetName(storedData.streetName || '');
      setSpecAddress(storedData.specAddress || '');
      setCountryCode(storedData.countryCode || '');
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

  const maskStringExceptFirst = (str: string) => {
    if (!str || str.length === 0) return "";
    return str.charAt(0) + "*".repeat(str.length - 1);
  };

  const handleClose = () => {
    setShow(false);
    setFound(false);
  };

  const handleDateChange = (date: { month: number; day: number; year: number }) => {
    setBirthdate(date);
    setErrorBdate('');
    setErrorBirthday('');
  };

  const dataHandle = () => {
    console.log('====::AS:D:AS', birthdate)
    if (contactNumber === '') setErrorContactNumber('Mobile number is required.');
    if (email === '') setErrorEmail('Email is required.');
    if (!isValidEmail && email !== '') setErrorEmail('Invalid email.');
    if (firstName === '') setErrorFirstName('First name is required.');
    if (lastName === '') setErrorLastName('Last name is required.');
    if (birthdate === undefined) setErrorBirthday('Birthday is required.');
    if (citizenship === '') setErrorCitizenship('Citizenship is required.');
    if (country === '') setErrorCountry('Country is required.');
    if (provinceOrState === '') setErrorProvinceOrState('Province/State is required.');
    if (cityOrTown === '') setErrorCityOrTown('City or Town is required.');
    if (barrangay === '') setErrorBarrangay('Barrangay is required.');
    if (streetName === '') setErrorStreet('Street name is required.');
    if (specAddress === '') setErrorSpecAdd('House no. / Sitio / Purok is required.');
  };

  const handleContinue = () => {
    setIsValidEmail(emailRegex.test(email));

    if (firstName && lastName && contactNumber && email && isValidEmail && birthdate && citizenship && country && cityOrTown && barrangay && specAddress) {
      setFinalLoanData({
        contactNumber,
        countryCode,
        email,
        firstName,
        middleName,
        lastName,
        suffix,
        birthdate,
        citizenship,
        country,
        provinceOrState,
        cityOrTown,
        barrangay,
        streetName,
        specAddress,
        found: ckycData ? true : false,
        ckycData
      });
      onNext({
        contactNumber,
        countryCode,
        email,
        firstName,
        middleName,
        lastName,
        suffix,
        birthdate,
        citizenship,
        country,
        provinceOrState,
        cityOrTown,
        barrangay,
        streetName,
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
      setCityOrTown(ckycData?.addresses.current.addressL2Name)
      setBarrangay(ckycData?.addresses.current.otherAddress)
      setConfirmed(true);
      handleClose();
    } else setErrorBdate('Birth date not matched.');
  };

  return (
    <Container>
      <label className='readable medium'>Contact Details</label>
      <br />
      <div className='form-fields contact-details-wrapper'>
        <div className='form-fields'>
          <small>{isFetching ? "Searching..." : ""}</small>
          <PhoneInput
            value={phone}
            onChange={(formatted) => {
              setPhone(formatted);
              const unformatted = formatted.replace(/\D/g, '');
              if (/^\d*$/.test(unformatted)) {
                setErrorContactNumber('');
                setContactNumber('0' + unformatted);
              }
            }}
            country="PH" // shoul have default
            countryCode={countryCode}
            onCountryChange={(code) => setCountryCode(code)}
          />
          <small className='red'>{errorContactNumber}</small>
        </div>
        <div className='form-fields'>
          <input className='form-control full-width' value={email} onChange={(e) => { setEmail(e.target.value); setErrorEmail(''); }} type="email" placeholder='Email Address (juan.d@gmail.com)' autoComplete="off" />
          <small className='red'>{errorEmail}</small>
        </div>
      </div>

      <br />

      <label className='readable medium'>Personal Details</label>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>Personal Details</label> */}
          <input type="text" className='form-control full-width' value={firstName} onChange={(e) => { setFirstName(e.target.value.toUpperCase()); setErrorFirstName(''); }} placeholder='First Name' />
          <small className='red'>{errorFirstName}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={middleName} onChange={(e) => setmiddleName(e.target.value.toUpperCase())} placeholder='Middle Name' />
          <small>Leave blank if you legally don't have one</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={lastName} onChange={(e) => { setLastName(e.target.value.toUpperCase()); setErrorLastName(''); }} placeholder='Last Name' />
          <small className='red'>{errorLastName}</small>
        </div>
        <div className='form-fields half-width'>
          <CustomDropdown
            label="Suffix"
            value={suffix}
            options={['SR', 'JR', 'II', 'III', 'IV', 'V']}
            onChange={(val) => {
              setSuffix(val.toUpperCase())
              setErrorCitizenship('');
            }}
            placeholder="Suffix"
          />
          {/* <label htmlFor="" className='readable medium'>&nbsp;</label> */}
          {/* <div className='select one-third-width'>
            <select value={suffix} onChange={(e) => setSuffix(e.target.value.toUpperCase())} className='select__field'>
              <option value="">Suffix &nbsp;&nbsp;</option>
              <option value="SR.">SR</option>
              <option value="JR">JR</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
          </div> */}
        </div>
      </div>
      <div className='details-wrapper'>
        {!found ? (
          <div className='form-fields date-wrapper'>
            {/* <label className='readable medium'>&nbsp;</label> */}
            <DatePicker
              value={birthdate}
              onChange={handleDateChange}
            />
            <small className='red'>{errorBirthdate}</small>
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
          <CustomDropdown
            label="Citizenship"
            value={citizenship}
            options={['FILIPINO', 'NOT FILIPINO']}
            onChange={(val) => {
              setCitizenship(val);
              setErrorCitizenship('');
            }}
            placeholder="Citizenship"
          />
          {/* <div className='select full-width-select'>
            <select onChange={(e) => { setCitizenship(e.target.value); setErrorCitizenship('') }} id="" className='select__field' value={citizenship}>
              <option value="">Citizenship&nbsp;&nbsp;&nbsp;</option>
              <option value="FILIPINO">FILIPINO</option>
              <option value="">Not Filipino</option>
            </select>
            <small className='red'>{errorCitizenship}</small>
          </div> */}
        </div>
      </div>

      <br />

      <label className='readable medium'>Address</label>
      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={country} onChange={(e) => { setCountry(e.target.value.toUpperCase()); setErrorCountry(''); }} placeholder='Country' />
          <small className='red'>{errorCountry}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={provinceOrState} onChange={(e) => { setProvinceOrState(e.target.value.toUpperCase()); setErrorProvinceOrState(''); }} placeholder='Province/State' />
          <small className='red'>{errorProvinceOrState}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={cityOrTown} onChange={(e) => { setCityOrTown(e.target.value.toUpperCase()); setErrorCityOrTown(''); }} placeholder='City/Town' />
          <small className='red'>{errorCityOrTown}</small>
        </div>
      </div>

      <div className='details-wrapper'>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={barrangay} onChange={(e) => { setBarrangay(e.target.value.toUpperCase()); setErrorBarrangay(''); }} placeholder='Barrangay/District' />
          <small className='red'>{errorBarrangay}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={streetName} onChange={(e) => { setStreetName(e.target.value.toUpperCase()); setErrorStreet(''); }} placeholder='Street Name' />
          <small className='red'>{errorStreet}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={specAddress} onChange={(e) => { setSpecAddress(e.target.value.toUpperCase()); setErrorSpecAdd(''); }} placeholder='Unit/House No.' />
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
        <button className='__btn btn-white' onClick={() => router.push('/loans/' + prevURL)} >
          Back
        </button>
        <button className="__btn btn-black" onClick={handleContinue}>
          Continue
        </button>
      </div>
      <br />
      <br />

      <Modal show={show} onHide={handleClose} keyboard={false} autoFocus={false} className='modal' dialogClassName="custom-width-modal">
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className='id-modal-icon-wrapper'>
              <div className='id-modal-icon'>
                <Image src="/images/user-tag.svg" alt="Logo" width={41} height={41} />
              </div>
            </div>
            <Modal.Body>
              <div className='id-modal-wrapper'>
                <div className='modal-header-text regular text-center'>Identity Verification</div>
                <div className='smaller'>A customer matching this number was found.</div>
                <div className='smaller'>
                  Name: <span className='medium'>{maskStringExceptFirst(ckycData?.name.firstName)} {maskStringExceptFirst(ckycData?.name.middleName)} {maskStringExceptFirst(ckycData?.name.lastName)}</span><br />
                  Mobile No.: <span className='medium'>{ckycData?.cellphoneNumber}</span>
                </div>
                <div className='smaller'>If this is you, provide your birth date.</div>
                <DatePicker onChange={handleDateChange} />
                <small className='red text-center'>{errorBdate}</small>
                <div className='modal-btn-wrapper'>
                  <button className='btn-red modal-btn' onClick={comapreBirthdates}>Confirm</button>
                  <button className='btn-white modal-btn' onClick={() => handleClose()}>This is not me</button>
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

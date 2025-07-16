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

// interface Props {
//   data: any;
//   onBack: () => void;
//   loanType?: string;
// }

interface CKYCData {
  cellphoneNumber: string;
  email: string;
  nationality: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix?: string;
  };
  birthDate: string;
  addresses: {
    current: {
      addressL0Name: string;
      addressL1Name: string;
      addressL2Name: string;
      addressL3Name: string;
      otherAddress: string;
    };
  };
}

interface initialCKYCData {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
  }
}

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
  const [birthdateInit, setBirthdateInit] = useState<{ month: number; day: number; year: number } | undefined>(undefined);
  const [country, setCountry] = useState("");
  const [provinceOrState, setProvinceOrState] = useState("");
  const [cityOrTown, setCityOrTown] = useState("");
  const [barrangay, setBarrangay] = useState("");
  const [streetNameAndSpecAddress, setStreetNameAndSpecAddress] = useState("");

  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(0);
  const [empOrBusiness, setEmpOrBusiness] = useState("");
  const [designation, setDesignation] = useState("");

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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const contactRef = useRef<HTMLInputElement>(null);
  const [found, setFound] = useState(false);
  const [ckycData, setCKYCData] = useState<CKYCData | null>(null);
  // const [initialCKYCData, setInitialCKYCData] = useState<initialCKYCData | null>(null);

  const {
    data: ckyc,
    isFetching,
    refetch,
    error,
  } = useSearchCKYC(contactNumber);

  useEffect(() => {
    if (loanData === null) router.push('/loans/' + prevURL)
    const stored = localStorage.getItem("ckycData")
    const parsed = stored ? JSON.parse(stored) : null
    // setContactNumber(parsed?.cellphoneNumber ?? "")
  }, [prevURL]);

  useEffect(() => {
    if (storedData) {
      console.log('--------', storedData.contactNumber)
      setPhone(storedData.contactNumber.slice(1))
      setContactNumber(storedData.contactNumber);
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
      setStreetNameAndSpecAddress(storedData.streetNameAndSpecAddress || '');
      setCountryCode(storedData.countryCode || '');
    }
  }, []);

  useEffect(() => {
    if (!isFetching && ckyc && Object.keys(ckyc).length > 0) {
      contactRef.current?.blur();
      setErrorContactNumber('');
      !firstName && setShow(true);
    }
  }, [isFetching, ckyc]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDateChange = (date: { month: number; day: number; year: number }) => {
    setBirthdate(date);
    setErrorBdate('');
    setErrorBirthday('');
  };

  const handleModalDateChange = (date: { month: number; day: number; year: number }) => {
    setBirthdateInit(date)
    setErrorBdate('');
    setErrorBirthday('');
  };

  const dataHandle = () => {
    const validEmail = emailRegex.test(email);
    if (Number(contactNumber.length) <= 10) {
      if (Number(contactNumber.length) === 0 || Number(contactNumber.length === 1)) setErrorContactNumber('Mobile number is required.');
      else setErrorContactNumber('Invalid mobile number.');
    }
    if (!/^09\d{9}$/.test(contactNumber) && contactNumber !== '' && Number(contactNumber.length) >= 2) setErrorContactNumber('Invalid mobile number.');
    if (email === '') setErrorEmail('Email is required.');
    if (validEmail === false && email !== '') setErrorEmail('Invalid email.');
    if (firstName === '') setErrorFirstName('First name is required.');
    if (lastName === '') setErrorLastName('Last name is required.');
    if (birthdate === undefined) setErrorBirthday('Birthday is required.');
    if (citizenship === '' || citizenship === null || citizenship === undefined) setErrorCitizenship('Citizenship is required.');
    if (country === '' || country === null || country === undefined) setErrorCountry('Country is required.');
    if (provinceOrState === '' || provinceOrState === null || provinceOrState === undefined) setErrorProvinceOrState('Province/State is required.');
    if (cityOrTown === '' || cityOrTown === null || cityOrTown === undefined) setErrorCityOrTown('City or Town is required.');
    if (barrangay === '' || barrangay === null || barrangay === undefined) setErrorBarrangay('Barangay is required.');
    if (streetNameAndSpecAddress === '' || streetNameAndSpecAddress === null || streetNameAndSpecAddress === undefined) setErrorStreet('House No., Street / Sitio is required.');
  };

  const handleContinue = () => {
    const validEmail = emailRegex.test(email);
    // if (!/^09\d{9}$/.test(contactNumber)) {
    //   setErrorContactNumber('Invalid mobile number.');
    // } else {
    if (/^09\d{9}$/.test(contactNumber) &&
      firstName &&
      lastName &&
      Number(contactNumber.length) === 11 &&
      email &&
      validEmail &&
      birthdate &&
      citizenship &&
      country &&
      cityOrTown &&
      barrangay &&
      streetNameAndSpecAddress
    ) {
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
        streetNameAndSpecAddress,
        found: ckycData ? true : false,
        ckycData,
        grossMonthlyIncome,
        sourceOfIncome,
        empOrBusiness,
        designation,
        loanData,
        applicationTimeStamp: '',
        ref: ''
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
        streetNameAndSpecAddress,
        found: ckycData ? true : false,
        ckycData: ckycData
      });
    } else {
      dataHandle();
    }
    // }
  };


  async function comapreBirthdates() {
    const bdate = moment(`${birthdateInit?.year}-${birthdateInit?.month}-${birthdateInit?.day}`).format("YYYY-MM-DD");

    try {
      const res = await fetch(`/api/ckyc-check-bdate?cellphoneNumber=${contactNumber}&bdate=${bdate}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch CKYC data');
      }
      const data = await res.json();
      setCKYCData(data.data);

      if (data.match) {
        setFound(true);
        setContactNumber(data.data.cellphoneNumber || '');
        data.data.cellphoneNumber && setErrorContactNumber('')
        setFirstName(data.data.name.firstName || '');
        data.data.name.firstName && setErrorFirstName('')
        setmiddleName(data.data.name.middleName || '');
        setLastName(data.data.name.lastName || '');
        data.data.name.lastName && setErrorLastName('')
        setSuffix(data.data.name.suffix || '');
        setBirthdate(birthdateInit);
        birthdateInit && setErrorBirthday('')
        setEmail(data.data.email || '');
        data.data.email && setErrorEmail('')
        setCitizenship(data.data.nationality || '');
        data.data.nationality && setErrorCitizenship('')
        setCountry(data.data.addresses.current.addressL0Name || '');
        data.data.addresses.current.addressL0Name && setErrorCountry('')
        setProvinceOrState(data.data.addresses.current.addressL1Name || '');
        data.data.addresses.current.addressL1Name && setErrorProvinceOrState('')
        setCityOrTown(data.data.addresses.current.addressL2Name || '');
        data.data.addresses.current.addressL2Name && setErrorCityOrTown('')
        setBarrangay(data.data.addresses.current.addressL3Name || '');
        data.data.addresses.current.addressL3Name && setErrorBarrangay('')
        setStreetNameAndSpecAddress(data.data.addresses.current.otherAddress || '');
        data.data.addresses.current.otherAddress && setErrorStreet('')
        handleClose();
      } else setErrorBdate('Birth date did not match.');
    } catch (err) {
      console.error('CKYC Fetch Error:', err);
      setCKYCData(null);
    }
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
            country="PH" // should have default
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
          <div className='form-fields half-width'>
            {/* <label className='readable medium'>&nbsp;</label> */}
            <div className='disabled-date-wrapper'>
              <input className='disabled-date-fields form-control' type="text" value={moment(`${birthdate?.month}/${birthdate?.day}/${birthdate?.year}`).format('MMM')} disabled />
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
          <small className='red'>{errorCitizenship}</small>
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
          <input type="text" className='form-control full-width' value={barrangay} onChange={(e) => { setBarrangay(e.target.value.toUpperCase()); setErrorBarrangay(''); }} placeholder='Barangay/District' />
          <small className='red'>{errorBarrangay}</small>
        </div>
        <div className='form-fields full-width'>
          {/* <label className='readable medium'>&nbsp;</label> */}
          <input type="text" className='form-control full-width' value={streetNameAndSpecAddress} onChange={(e) => { setStreetNameAndSpecAddress(e.target.value.toUpperCase()); setErrorStreet(''); }} placeholder='House No., Street / Sitio' />
          <small className='red'>{errorStreet}</small>
        </div>
      </div>
      <div className='form-btn-container'>
        <button className='__btn btn-white' onClick={() => {router.push('/loans/' + prevURL)}} >
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
                  Name: <span className='medium'>{ckyc?.name.firstName} {ckyc?.name.middleName} {ckyc?.name.lastName}</span><br />
                  Mobile No.: <span className='medium'>{ckyc?.cellphoneNumber}</span>
                </div>
                <div className='smaller'>If this is you, provide your birth date.</div>
                <DatePicker onChange={handleModalDateChange} />
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

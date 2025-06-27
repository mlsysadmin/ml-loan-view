'use client'
import { ArrowRight, Link, SquareUserRound } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Modal, } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import DatePicker from '@/app/components/date-picker';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSearchCKYC } from "../../hooks/use-search-ckyc";
import AppProvider from '../../../../providers/app-provider';
import moment from 'moment';
import { useFinalLoanStore } from '@/app/store/dataStore';
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


  // const [searchText, setSearchText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const storedData = useFinalLoanStore((state) => state.data);
  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const [errorContactNumber, setErrorContactNumber] = useState('');
  const [errorBdate, setErrorBdate] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const contactRef = useRef<HTMLInputElement>(null);
  const [found, setFound] = useState(false)


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
    if (contactNumber === '') setErrorContactNumber('Mobile number is required.')
    else if (email === '') setErrorEmail('Email is required.')
    else if (firstName === '') setErrorFirstName('First name is required.')
    else if (lastName === '') setErrorLastName('Last name is required.')
  }

  const handleContinue = () => {
    if (firstName && lastName && contactNumber && email) {
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
    <Container>::{found}
      <div className='form-fields'>
        <label className='readable medium'>Contact Details</label>
        <input placeholder="Enter mobile" ref={contactRef} className='form-control' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <small>{isFetching ? "Searching..." : ""}</small>
        <small className='red'>{errorContactNumber}</small>
      </div>

      <div className='form-fields'>
        <label htmlFor="">&nbsp;</label>
        <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Address (juan.d@gmail.com)' />
        <small className='red'>{errorEmail}</small>
      </div>

      <br />

      <div className='form-fields'>
        <label className='readable medium'>Personal Details</label>
        <input type="text" className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
        <small className='red'>{errorFirstName}</small>
      </div>
      <div className='form-fields'>
        <label htmlFor="">&nbsp;</label>
        <input type="text" className='form-control' value={middleName} onChange={(e) => setmiddleName(e.target.value)} placeholder='Middle Name' />
      </div>
      <div className='form-fields'>
        <label htmlFor="">&nbsp;</label>
        <input type="text" className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
        <small className='red'>{errorLastName}</small>
      </div>
      <div className='form-fields'>
        <label htmlFor="">&nbsp;</label>
        <div className='select'>
          <select value={suffix} onChange={(e) => setSuffix(e.target.value)} className='select__field'>
            <option value="">Suffix</option>
            <option value="SR.">SR</option>
            <option value="JR">JR</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
          </select>
        </div>
      </div>

      {!found ? (
        <div className='form-fields'>
          <label className='readable medium'>&nbsp;</label>
          <DatePicker onChange={handleDateChange} />
        </div>
      ) : (
        <div className='form-fields'>
          <label className=''>&nbsp;</label>
          <div className='disabled-date-wrapper'>
            <input className='disabled-date-fields form-control' type="text" value={birthdate?.day} disabled />
            <input className='disabled-date-fields form-control' type="text" value={birthdate?.month} disabled />
            <input className='disabled-date-fields form-control' type="text" value={birthdate?.year} disabled />
          </div>
        </div>
      )}
      <div className='form-fields'>
        <label htmlFor="">&nbsp;</label>
        <div className='select'>
          <select onChange={(e) => setCitizenship(e.target.value)} id="" className='select__field' value={citizenship}>
            <option value="">Citizenship</option>
            <option value="FILIPINO">FILIPINO</option>
            <option value="">Not Filipino</option>
          </select>
        </div>
      </div>
      <br />
      <div className='form-fields'>
        <label className='readable medium'>Address</label>
        <input type="text" className='form-control' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
        <small className='red'>{ }</small>
      </div>
      <div className='form-fields'>
        <label className=''>&nbsp;</label>
        <input type="text" className='form-control' value={cityOrMunicipality} onChange={(e) => setCityOrMunicipality(e.target.value)} placeholder='City / Municipality' />
        <small className='red'>{ }</small>
      </div>
      <div className='form-fields'>
        <label className=''>&nbsp;</label>
        <input type="text" className='form-control' value={barrangay} onChange={(e) => setBarrangay(e.target.value)} placeholder='Barrangay' />
        <small className='red'>{ }</small>
      </div>
      <div className='form-fields'>
        <label className=''>&nbsp;</label>
        <input type="text" className='form-control' value={specAddress} onChange={(e) => setSpecAddress(e.target.value)} placeholder='House no., Sitio/Purok' />
        <small className='red'>{ }</small>
      </div>

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

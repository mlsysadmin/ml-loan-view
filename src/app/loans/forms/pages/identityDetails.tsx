'use client'
import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useLoanStore, useFinalLoanStore } from '@/app/loans/store/dataStore';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import moment from 'moment';

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
  const streetName = data.streetName;
  const specAddress = data.specAddress;

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

  const setFinalLoanData = useFinalLoanStore((state) => state.setFinalLoanData);
  const loanData = useLoanStore((state) => state.data);
  const finalLoanStore = useFinalLoanStore((state) => state.data);

  function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setRef(`(LEH)${result}`);
  }

  let otherData = '';
  let headerType = '';

  if (laonType === 'home') {
    otherData += `
    <div class="detail-item">
      <span class="detail-label">Property Type</span>
      <span class="detail-value">${loanData?.propertyType}</span>
    </div>
  `;
    headerType += `HOUSING `
  }

  if (laonType === 'car') {
    otherData += `
    <div class="detail-item">
      <span class="detail-label">Loan Purpose</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Preferred Type of Unit</span>
      <span class="detail-value">${loanData?.unitType}</span>
    </div>
  `;
    headerType += `CAR `
  }

  const htmlContent = `
 <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Housing Loan Application Document</title>
      <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.4;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: white;
            padding: 30px 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .logo-section h1 {
            font-size: 24px;
            font-weight: bold;
            color: #e53e3e;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }

        .document-title {
            text-align: right;
        }

        .document-title h2 {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .content {
            padding: 10px 40px 40px 40px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }

        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            font-size: 14px;
        }

        .detail-label {
            color: #666;
            font-weight: normal;
        }

        .detail-value {
            color: #333;
            font-weight: normal;
            text-align: right;
        }

        .summary-section {
            background: #f8f8f8;
            margin: 0 -40px 40px -40px;
            padding: 20px 40px;
        }

        .summary-section .section-title {
            border-bottom: none;
            margin-bottom: 10px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            font-size: 14px;
        }

        .summary-label {
            color: #666;
            font-weight: normal;
        }

        .summary-value {
            color: #333;
            font-weight: normal;
            text-align: right;
        }

        .highlight-value {
            color: #e53e3e;
            font-weight: bold;
        }
        .address {
            justify-content: flex-start !important;
            gap: 50px;
        }
    </style>
  </head>
  <body>
    <!-- Header -->
    <div class="header">
        <div class="logo-section">
            <img src="https://mlhuillier.com/img/revamp/ml-logo.svg" alt="M Lhuillier Logo">
        </div>
        <div class="document-title">
            <h2>${headerType} LOAN APPLICATION</h2>
            <div class="detail-item">
              <span class="detail-label">Ref No</span>
              <h3 class="detail-value">${ref}</h3>
            </div>
            <span class="detail-value">${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </div>
    </div>

    <div class="content">
      <!-- Loan Details Section -->
      <section class="section">
        <div class="section-title">Loan Details</div>
        
        <div class="details-grid">
          <div>
            <div class="detail-item">
              <span class="detail-label">Loan Type</span>
              <span class="detail-value">${loanData?.loanOption}</span>
            </div>
            
            ${otherData}
          </div>
          
          <div>
            <div class="detail-item">
              <span class="detail-label">Estimated Price</span>
              <span class="detail-value">PHP ${loanData?.ammountFinanced.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">Amount Borrow</span>
              <span class="detail-value">PHP ${loanData?.ammountFinanced.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div class="detail-item">
              <span class="detail-label">Term</span>
              <span class="detail-value">${Math.floor(Number(loanData?.loanTerm)) / 12}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Summary Section -->
      <section class="summary-section">
          <div class="section-title">Summary</div>
          
          <div class="summary-grid">
            <div>
              <div class="summary-item">
                <span class="summary-label">Amount Financed</span>
                <span class="summary-value">PHP 6,800,000.00</span>
              </div>
              
              <div class="summary-item">
                <span class="summary-label">Down Payment</span>
                <span class="summary-value">PHP ${loanData?.downPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            
            <div>
              <div class="summary-item">
                <span class="summary-label">Monthly Payment</span>
                <span class="summary-value">PHP ${loanData?.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              
              <div class="summary-item">
                <span class="summary-label">Loan Term (months)</span>
                <span class="summary-value"> ${loanData?.loanTerm} </span>
              </div>
            </div>
          </div>
      </section>

      <!-- Applicant Details Section -->
      <section class="section">
          <div class="section-title">Applicant Details</div>
          
          <div class="details-grid">
            <div>
              <div class="detail-item">
                <span class="detail-label">Borrower</span>
                <span class="detail-value">${firstName} ${middleName && middleName} ${lastName} ${suffix && suffix}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Mobile Number</span>
                <span class="detail-value">${contactNumber}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Email Address</span>
                <span class="detail-value">${email}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Birthday</span>
                <span class="detail-value">${moment(`${birthdate?.year}-${birthdate?.month}-${birthdate?.day}`).format("MMM DD YYYY")}</span>
              </div>
            </div>
            <div>
              <div class="detail-item">
                <span class="detail-label">Type of Income</span>
                <span class="detail-value">${sourceOfIncome ? sourceOfIncome : '---'}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Employer/Business Name</span>
                <span class="detail-value">${empOrBusiness ? empOrBusiness : '---'}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Role/Designation</span>
                <span class="detail-value">${designation ? designation : '---'}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Gross Monthly Income</span>
                <span class="detail-value"> ${grossMonthlyIncome ? 'PHP ' + grossMonthlyIncome : '---'}</span>
              </div>
            </div>
          </div>
          <div class="detail-item address">
            <span class="detail-label">Address</span>
            <span class="detail-value"> ${specAddress && specAddress}, ${barrangay && barrangay}, ${cityOrTown && cityOrTown}, ${country && country}</span>
          </div>
      </section>
    </div>
  </body>
  </html>
`;

  const sendEmail = async () => {
    setIsLoading(true);
    const res = await fetch('/api/mailer-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'kenneth88877@gmail.com',
        cc: 'kenneth.simbulan@mlhuillier.com',
        // cc: 'kenneth.simbulan@mlhuillier.com, mercy.borlas@mlhuillier.com, jeane.cardiente@mlhuillier.com',
        subject: 'Home Loan Application',
        text: `Applicant: ${firstName} ${lastName} ${lastName} ${suffix} <br/> `,
        htmlContent: htmlContent
      }),
    });
    const data = await res.json();
    console.log('data::::::', data)
  };

  let finalData = [
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
    country,
    provinceOrState,
    cityOrTown,
    barrangay,
    streetName,
    specAddress,
    countryCode
  ];

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
      streetName,
      specAddress,
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
          <div className='select'>
            <select onChange={(e) => setSourceOfIncome(e.target.value)} className='select__field' value={sourceOfIncome}>
              <option value="">Type of Income</option>
              <option value="SALARY">SALARY</option>
              <option value="BUSINESS">BUSINESS</option>
              <option value="PENSION">PENSION</option>
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
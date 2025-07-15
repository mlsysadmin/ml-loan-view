'use client'
import React, { useState } from 'react';
import ContactDetails from './pages/contactDetails';
import IdentityDetails from './pages/identityDetails';
import { Container } from 'react-bootstrap';
import './index.css';
import { useSearchParams } from 'next/navigation';

export default function FormPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const goToNext = (data: any) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        setStep(step + 1);
    };

    const goBack = () => setStep(step - 1);

    return (
        <Container>
            <br />
            <div className="col-md-9">
                <p className='medium title'> Let me get to know you better </p>
                <span className='readable'>Complete the form to begin your loan application process.</span>
            </div><br />
            {step === 1 && <ContactDetails onNext={goToNext} />}
            {step === 2 && <IdentityDetails data={formData} onBack={goBack} />}
            {/* <IdentityDetails /> */}
        </Container>
    );
}


// import LoansPageWrapper from './formWrapper';

// export default function LoansPage() {
//   return <LoansPageWrapper />;
// }

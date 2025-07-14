'use client'
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useFinalLoanStore } from '@/app/loans/store/dataStore';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// This is the salary loan approval page
const type = 'salary';

export default function SalaryPreApprovalPage() {
    const router = useRouter();
    const data = useFinalLoanStore((state) => state.data);
    const clearFinalLoanData = useFinalLoanStore((state) => state.clearFinalLoanData);
    const [dataRef, setDataRef] = useState<string>('');
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true); // Mark as mounted on client
        // Check for salary loan data in localStorage
        const salaryLoanData = typeof window !== 'undefined' ? localStorage.getItem('salaryLoanData') : null;
        if (salaryLoanData) {
            const parsedData = JSON.parse(salaryLoanData);
            setDataRef(parsedData.ref);
        } else if (data?.ref) {
            setDataRef(data.ref);
        }
    }, [data?.ref]);

    function handleBtnAction(action: string) {
        clearFinalLoanData();
        // Clear salary loan data from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('salaryLoanData');
        }
        action === 'home' ? router.push('/') : router.push('/calculator');
    }

    // Avoid rendering until mounted to prevent hydration mismatch
    if (!mounted) return null;

    return (
        <Container>
            <br />
            <div className="pre-approval">
                <Image
                    src="/images/approved.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <br/>
                <div className='title medium'>
                    You have been approved!
                </div>
                <div className='pre-approval-text'>
                    <p className='readable regular '>
                        Please check your MCash in the next few minutes while we transfer your funds.
                    </p>
                </div>
                <p className='readable medium'>Ref. No. {dataRef}</p>

                <br /><br /><br />
                <br /><br /><br />
                <br /><br /><br />
                <div className='btn-wrapper2'>
                    <button className='__btn2 btn-black' onClick={() => handleBtnAction('home')}> Home </button>                  
                </div>
            </div>
        </Container>
    );
} 
'use client'
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useFinalLoanStore } from '@/app/loans/store/dataStore';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// This is the salary loan approval page
const type = 'salary';

export default function NotElligible() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // const data = useFinalLoanStore((state) => state.data);
    // const clearFinalLoanData = useFinalLoanStore((state) => state.clearFinalLoanData);
    // const [dataRef, setDataRef] = useState<string>('');

    // useEffect(() => {
    //     // Check for salary loan data in localStorage
    //     const salaryLoanData = localStorage.getItem('salaryLoanData');
    //     if (salaryLoanData) {
    //         const parsedData = JSON.parse(salaryLoanData);
    //         setDataRef(parsedData.ref);
    //     } else if (data?.ref) {
    //         setDataRef(data.ref);
    //     }
    // }, [data?.ref]);

    function handleBtnAction(action: string) {
        // clearFinalLoanData();
        // Clear salary loan data from localStorage
        // localStorage.removeItem('salaryLoanData');
        action === 'home' ? router.push('/') : router.push('/calculator');
    }

    return (
        <Container>
            <br />
            <div className="pre-approval">
                <Image
                    src="/images/not-approved.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <br />
                <div className='title medium'>
                Not Eligible
                </div>
                
                <div className='pre-approval-text'>
                    <p className='readable regular '>
                    You are currently not eligible for Salary Loan. Keep using ML Services and we’ll let you know when you can apply.
                    </p>
                </div>
                {/* <p className='readable medium'>Ref. No. {dataRef}</p> */}

                <br /><br /><br />
                <br /><br /><br />
                <br /><br /><br />
                <div className='btn-wrapper2'>
                    <button className='__btn3 btn-white' onClick={() => handleBtnAction('home')}> Home </button>
                    <button className='__btn3 btn-black'> Reset & Retry Again </button>
                </div>
            </div>
        </Container>
    );
} 
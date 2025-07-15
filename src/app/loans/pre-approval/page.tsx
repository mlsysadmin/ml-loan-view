'use client'
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useFinalLoanStore } from '@/app/loans/store/dataStore';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PreApprovalPage() {
    const router = useRouter();
    const data = useFinalLoanStore((state) => state.data);
    const clearFinalLoanData = useFinalLoanStore((state) => state.clearFinalLoanData); // ← Grab the clear method
    const [dataRef, setDataRef] = useState<string>('');

    useEffect(() => {
        // Check for salary loan data in localStorage
        const salaryLoanData = localStorage.getItem('salaryLoanData');
        if (salaryLoanData) {
            const parsedData = JSON.parse(salaryLoanData);
            console.log('::::::', parsedData)
            setDataRef(parsedData.ref);
        } else if (data?.ref) {
            setDataRef(data.ref);
        }
        
        // const birthdate = `${data?.birthdate.month}/${data?.birthdate.day}/${data?.birthdate.year}`;
        // const age = moment().diff(moment(birthdate, "MM/DD/YYYY"), 'years');
        // if (age > 21) {
        //     setQualified(true); 
        // }
    }, [data?.ref]);

    function handleBtnAction(action: string) {
        clearFinalLoanData();
        // Clear salary loan data from localStorage
        // localStorage.removeItem('salaryLoanData');
        action === 'home' ? router.push('/') : router.push('/calculator');
    }

    return (
        <Container>
            <br />
            <div className="pre-approval">
                {/* {qualified ? (
                    <> */}
                <Image
                    src="/images/approved.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <div className='title medium'>
                    You have been pre-approved!
                </div>
                <div className='pre-approval-text'>
                    <p className='readable regular'>
                        A loan officer will contact
                        <br /> you in 1 to 3 business days.
                    </p>
                    <p className='readable medium'>Ref. No.: {dataRef}</p>
                </div>
                <br /><br /><br />
                <br /><br /><br />
                <br /><br /><br />
                <div className='btn2-wrapper'>
                    <button className='__btn2 btn-black' onClick={() => handleBtnAction('home')}> Home </button>
                </div>
                {/* </>
                ) : (
                    <>
                        <Image
                            src="/images/not-approved.png"
                            alt="Logo"
                            width={100}
                            height={100}
                        /><br />
                        <div className='title medium'>
                            Not qualified at this time.
                        </div>
                        <div className='pre-approval-text'>
                            <p className='readable regular'>
                                You currently do not meet the
                                minimum requirements to apply
                                for a home loan.
                            </p>
                            <p className='readable regular'>
                                If you are married, consider applying with your spouse's combined income.
                            </p>
                            <p className='readable regular'>
                                If you are a non-Filipino married to a Filipino citizen, consider applying using your spouse's details.
                            </p>
                        </div>
                        <br /><br />
                        <div className='btn-wrapper'>
                            <button className='__btn btn-black' onClick={() => handleBtnAction('reset')}> Reset & Try Again </button>
                            <button className='__btn btn-white' onClick={() => handleBtnAction('home')}> Home </button>
                        </div>
                    </>
                )} */}
            </div>
        </Container>
    );
}
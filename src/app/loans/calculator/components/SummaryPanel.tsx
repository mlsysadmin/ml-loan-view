import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import '../index.css'
import { useLoanStore } from '@/app/loans/store/dataStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SummaryPanelProps {
    ammountFinanced: number,
    purchasePrice: number;
    downPayment: number;
    monthlyPayment: number;
    loanTerm: number;
    loanOption: string;
    propertyType: string;
    unitType: string;
    formError: string;
    onConfirm: () => void;
    canProceed: boolean;
    interest: number;
}


const SummaryPanel: React.FC<SummaryPanelProps> = ({
    ammountFinanced,
    purchasePrice,
    downPayment,
    monthlyPayment,
    loanTerm,
    loanOption,
    propertyType,
    unitType,
    formError,
    onConfirm,
    canProceed,
    interest
}) => {
    // const pathname = usePathname();
    const searchParams = useSearchParams();

    let loanType = searchParams.get('type');

    useEffect(() => {
        if (searchParams) {
            const query = searchParams.toString();
            const full = `/calculator${query ? `?${query}` : ''}`;
            console.log('_+_AS_D+_+AS_D', full)
            localStorage.setItem('prevURL', JSON.stringify(full));
        }
    }, [searchParams]);


    const setLoanData = useLoanStore((state) => state.setLoanData);
    const router = useRouter();

    useEffect(() => {
        if (canProceed) {
            submitData();
        }
    }, [canProceed]);

    function submitData() {
        let data = {
            ammountFinanced,
            purchasePrice, // Estimate(prenda), ammountFinanced(buy)
            downPayment, // amount borrowed(prenda), downPayment(buy)
            monthlyPayment,
            loanTerm,
            propertyType,
            loanOption,
            unitType
        }
        setLoanData({
            ammountFinanced,
            purchasePrice,
            downPayment,
            monthlyPayment,
            loanTerm,
            propertyType,
            loanOption,
            unitType
        });
        console.log('==Caculator summary====', data)
        router.push('/loans/forms');
    }
    return (
        <div className='summary-container'>
            <p className='medium title red'>Summary</p>
            <div className="space-y-4">
                <div className="details-wrapper">
                    <div className='contents'>
                        <span className="font-medium">Ammount Financed</span>
                        <span className="font-medium">Down Payment</span>
                        <span className="font-medium">Loan Term <small></small></span>
                        <span className="font-medium medium">Monthly Payment</span>
                    </div>
                    <div className='contents'>
                        <span className="font-medium">PHP {ammountFinanced.toLocaleString()}</span>
                        <span className="font-medium">PHP {downPayment.toLocaleString()}</span>
                        <span className="font-medium">{loanTerm} months</span>
                        <span className="font-medium medium">PHP {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
            <div className='form-btn-container-summary form-btn-container'>
                {/* <Link href=${'/loans/forms?type='}> */}
                <Link href={`${'/loans?type=' + loanType}`}>
                    <button onClick={submitData} className="__btn btn-white">
                        Back
                    </button>
                </Link>

                <button onClick={onConfirm} className="__btn btn-black">
                    Continue
                </button>

            </div>
            {formError && (
                <small className="red">
                    {formError}
                </small>
            )}
        </div>
    );
};

export default SummaryPanel;
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
    loanPurpose: string;
    formError: string;
    onConfirm: () => void;
    canProceed: boolean;
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
    loanPurpose,
    formError,
    onConfirm,
    canProceed
}) => {
    // const pathname = usePathname();
    const searchParams = useSearchParams();

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
            loanPurpose,
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
            loanPurpose,
            unitType
        });
        console.log('==Caculator summary====', data)
        router.push('/loans/forms');
    }
    return (
        <div className='summary-container'>
            <p className='medium title red'>Summary</p>
            <br />
            <div className="space-y-4">
                <div className="details">
                    <span className="text-gray-600">Ammount Financed</span>
                    <span className="font-medium">₱ {ammountFinanced.toLocaleString()}</span>
                </div>

                <div className="details">
                    <span className="text-gray-600">Down Payment</span>
                    <span className="font-medium">₱ {downPayment.toLocaleString()}</span>
                </div>

                <div className="details">

                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">₱ {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="details">
                    <span className="text-gray-600">Loan Term <small></small></span>
                    <span className="font-medium">{loanTerm} months</span>
                </div>
            </div>
            <div className='form-btn-container-summary'>
                {/* <Link href="/loans/forms">
                    <button onClick={submitData} className="btn btn-continue">
                    Continue
                    </button>
                    </Link> */}
                <button onClick={onConfirm} className="btn btn-continue">
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
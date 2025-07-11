import { ArrowRight } from 'lucide-react';
import React from 'react';
import Link from "next/link";
import '../index.css'
import { useLoanStore } from '@/app/store/dataStore';

interface SummaryPanelProps {
    ammountFinanced: number,
    purchasePrice: number;
    downPayment: number;
    monthlyPayment: number;
    loanTerm: number;
    propertyType: string;
    loanOption: string;
}


const SummaryPanel: React.FC<SummaryPanelProps> = ({
    ammountFinanced,
    purchasePrice,
    downPayment,
    monthlyPayment,
    loanTerm,
    propertyType,
    loanOption
}) => {
    const setLoanData = useLoanStore((state) => state.setLoanData);

    function submitData() {
        let data = {
            ammountFinanced, 
            purchasePrice, // Estimate(prenda), ammountFinanced(buy)
            downPayment, // amount borrowed(prenda), downPayment(buy)
            monthlyPayment,
            loanTerm,
            propertyType,
            loanOption
        }
        setLoanData({
            ammountFinanced,
            purchasePrice,
            downPayment,
            monthlyPayment,
            loanTerm,
            propertyType,
            loanOption
        });
        console.log('==Caculator summary====', data)
    }
    return (
        <div className="col lg-6">
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
                <div className='form-btn-container'>
                    <Link href="/forms">
                        <button onClick={submitData} className="btn btn-continue">
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default SummaryPanel;
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Link from "next/link";
import '../index.css'

interface SummaryPanelProps {
    ammountFinanced: number,
    purchasePrice: number;
    downPayment: number;
    monthlyPayment: number;
    loanTerm: number;
}


const SummaryPanel: React.FC<SummaryPanelProps> = ({
    ammountFinanced,
    purchasePrice,
    downPayment,
    monthlyPayment,
    loanTerm,
}) => {
    function submitData() {
        let data = {
            ammountFinanced,
            purchasePrice,
            downPayment,
            monthlyPayment,
            loanTerm
        }
        console.log('======', data)
    }
    return (
        <div className="col lg-6">
            <div className='summary-container'>
                <p className='red bold'>Summary</p>

                <div className="space-y-4">
                    <div className="details">
                        <span className="text-gray-600">Ammount Financed</span>
                        <span className="font-medium">{ammountFinanced.toLocaleString()}</span>
                    </div>

                    <div className="details">
                        <span className="text-gray-600">Down Payment</span>
                        <span className="font-medium">{downPayment.toLocaleString()}</span>
                    </div>

                    <div className="details">
                        
                        <span className="text-gray-600">*Monthly Payment</span>
                        <span className="font-medium">{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>

                    <div className="details">
                        <span className="text-gray-600">Loan Term <small>(months)</small></span>
                        <span className="font-medium">{loanTerm}</span>
                    </div>
                </div>

                <br />
                <br />
                <div className='form-btn-container'>
                    <Link href="/forms">
                        <button onClick={submitData} className="btn btn-continue">
                            Continue <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>
            </div>
            <div  className='foot-note'>
                <small>*Subject for approval</small>
            </div>
        </div>
    );
};

export default SummaryPanel;
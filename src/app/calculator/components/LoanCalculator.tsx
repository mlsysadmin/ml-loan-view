'use client'
import React, { useState, useEffect } from 'react';
import SliderInput from './SliderInput';
import SummaryPanel from './SummaryPanel';
import Dropdown from './Dropdown';
import '../index.css';

const LoanCalculator: React.FC = () => {
    const [purchasePrice, setPurchasePrice] = useState(10000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(30);
    const [loanTerm, setLoanTerm] = useState(48); // months
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [ammountFinanced, setammountFinanced] = useState(0);

    // Calculate the loan details whenever inputs change
    useEffect(() => {
        // Calculate down payment amount
        const downPayment = (purchasePrice * downPaymentPercent) / 100;
        setDownPaymentAmount(downPayment);

        // Calculate monthly payment
        const loanAmount = purchasePrice - downPayment;
        setammountFinanced(loanAmount)
        const monthlyAmount = (loanAmount / loanTerm);
        setMonthlyPayment(monthlyAmount);
    }, [purchasePrice, downPaymentPercent, loanTerm]);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="calculator-container">
                <div className="col-md-6">
                    <p className='header-text'><span className="red">Home Loan</span> Calculator</p>
                    <p> Please provide your property information </p>
                    <Dropdown /> 
                    <div className='slider-card'>

                        <div className="mb-8">
                            {/* <h2 className="text-sm font-medium mb-4">Purchase of House & Lot</h2> */}
                            <SliderInput
                                label="Price: PHP "
                                value={purchasePrice}
                                onChange={setPurchasePrice}
                                min={1000000}
                                max={20000000}
                                step={100000}
                                formatValue={(value) => value.toLocaleString()}
                            />
                        </div>
                    </div>

                    <div className='slider-card'>
                        <div className="mb-8">
                            <SliderInput
                                label="Down Payment: "
                                value={downPaymentPercent}
                                onChange={setDownPaymentPercent}
                                min={10}
                                max={70}
                                step={1}
                                formatValue={(value) => `${value}%`}
                            />
                        </div>
                    </div>

                    <div className='slider-card'>
                        <div className="mb-8">
                            <SliderInput
                                label="Term: "
                                value={loanTerm}
                                onChange={setLoanTerm}
                                min={12}
                                max={60}
                                step={12}
                                formatValue={(value) => `${value/12} years` }
                                customMarks={[
                                    { value: 12, label: '12' },
                                    { value: 24, label: '24' },
                                    { value: 36, label: '36' },
                                    { value: 48, label: '48' },
                                    { value: 60, label: '60' },
                                ]}
                            />
                        </div>
                    </div>

                </div>

                <SummaryPanel
                    ammountFinanced={ammountFinanced}
                    purchasePrice={purchasePrice}
                    downPayment={downPaymentAmount}
                    monthlyPayment={monthlyPayment}
                    loanTerm={loanTerm}
                />
            </div>
        </div>
    );
};

export default LoanCalculator;
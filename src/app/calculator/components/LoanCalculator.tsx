'use client'
import React, { useState, useEffect } from 'react';
import SliderInput from './SliderInput';
import SummaryPanel from './SummaryPanel';
import PropertyDropdown from './Dropdown';
import '../index.css';

const LoanCalculator: React.FC = () => {
    const [purchasePrice, setPurchasePrice] = useState(10000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(30);
    const [loanTerm, setLoanTerm] = useState(48); // months
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [ammountFinanced, setammountFinanced] = useState(0);
    const [loanOption, setOption] = useState('Buy');
    const [propertyType, setPropertyType] = useState('House & Lot');
    // const [errorPropertyType, setErrorPropertyType] = useState('');

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

    const selectOption = (e: any) => {
        console.log('====', e.target.value)
        setOption(e.target.value)
    };

    return (
        <div className="calculator-container">
            <div className="col-md-6">
                <p className='medium title'>Loan Calculator</p>
                <p> Please provide your property information </p>
                <div>
                    <label className="__radio-option">
                        <input type="radio" checked={loanOption === 'Buy'} onChange={selectOption} value="Buy" name="paymentOption" />
                        <span className="__radio"><span></span></span>
                        <span>Buy a Home</span>
                    </label>
                </div>
                <div>
                    <label className="__radio-option">
                        <input type="radio" checked={loanOption === 'Prenda'} onChange={selectOption} value="Prenda" name="paymentOption" />
                        <span className="__radio"><span></span></span>
                        <span>Prenda my Home</span>
                    </label>
                </div>

                <PropertyDropdown value={propertyType} onChange={setPropertyType} />
                
                <div className='slider-card'>

                    <div className="mb-8">
                        {/* <h2 className="text-sm font-medium mb-4">Purchase of House & Lot</h2> */}
                        <SliderInput
                            label={loanOption === 'Prenda' ? 'Estimated Price: ' : 'Price: '}
                            value={purchasePrice}
                            onChange={setPurchasePrice}
                            min={1000000}
                            max={20000000}
                            step={100000}
                            formatValue={(value) => value.toLocaleString()}
                        // showFloatingLabel={true}
                        />
                    </div>
                </div>

                <div className='slider-card'>
                    <div className="mb-8">
                        <SliderInput
                            label={loanOption === 'Prenda' ? 'Amount to Borrow: ' : 'Down Payment: '}
                            value={downPaymentPercent}
                            onChange={setDownPaymentPercent}
                            min={0}
                            max={70}
                            step={1}
                            formatValue={(value) => `${value}%`}
                            // suffix="%"
                            secondaryValue={purchasePrice}
                            showFloatingLabel={true}
                            editableAmountInstead={true}
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
                            formatValue={(value) => `${value / 12} ${value === 12 ? 'year' : 'years'}`}
                            // suffix=" mons."
                            customMarks={[
                                { value: 12, label: '12' },
                                { value: 24, label: '24' },
                                { value: 36, label: '36' },
                                { value: 48, label: '48' },
                                { value: 60, label: '60' },
                            ]}
                        // showFloatingLabel={true}
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
                propertyType={propertyType} 
                loanOption={loanOption}            
            />
        </div>
    );
};

export default LoanCalculator;
'use client'
import React, { useState, useEffect } from 'react';
import SliderInput from './SliderInput';
import SummaryPanel from './SummaryPanel';
import PropertyDropdown from './Dropdown';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import '../../index.css';

const LoanCalculator: React.FC = () => {
    const searchParams = useSearchParams();
    const loanType = searchParams.get('type');
    const router = useRouter();
    const [purchasePrice, setPurchasePrice] = useState(10000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(30);
    const [loanTerm, setLoanTerm] = useState(48); // months
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [ammountFinanced, setammountFinanced] = useState(0);
    const [loanOption, setOption] = useState('');
    const [propertyType, setPropertyType] = useState(''); // for Home Loan
    const [purpose, setPurpose] = useState(''); // for Car Loan
    const [unitType, setUnitType] = useState(''); // for Car Loan
    const [formError, setFormError] = useState('');
    const [dropdownErrors, setDropdownErrors] = useState<Record<number, string>>({});
    const [canProceed, setCanProceed] = useState(false);

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

    const [options, setOptions] = useState<typeof carOptions | typeof homeOptions | null>(null);
    const [dropdownSelections, setDropdownSelections] = useState<Record<number, string>>({});

    const homeOptions = {
        radio: [
            { 
                type: 'Buy', 
                displayText: 'Buy a Home' 
            }, { 
                type: 'Prenda', 
                displayText: 'Prenda my Home' 
            },
        ],
        dropdown: [
            {
                id: 0,
                label: 'Property Type',
                values: ['House & Lot', 'Condominium', 'Lot only'],
            },
        ],
    };


    const carOptions = {
        radio: [
            { 
                type: 'Brand New', 
                displayText: 'Brand New' 
            }, { 
                type: 'Second Hand', 
                displayText: 'Second Hand' 
            },
        ],
        dropdown: [
            {
                id: 0,
                label: 'Purpose',
                values: [
                    'Acquisition or Purchase of Vehicle',
                    'Refinancing or Re-Loan of Vehicle',
                    'Equity Cash Reimbursement',
                ],
            },
            {
                id: 1,
                label: 'Unit Type',
                values: [
                    'Sedan/SUV/Pickup/Van for private use',
                    'Motorcycle for private use',
                    'Truck / Pickup',
                    'Van / MPV',
                    'Motorcycle',
                    'Electric Vehicle (EV)',
                ],
            },
        ],
    };

    useEffect(() => {
        if (loanType === 'car') setOptions(carOptions);
        else if (loanType === 'home') setOptions(homeOptions);
        else notFound();

    }, [loanType]);

    useEffect(() => {
        if (options?.radio?.length && !loanOption) {
            const firstOption = options.radio[0].type ?? '';
            setOption(firstOption);
        }
    }, [options, loanOption]);

    useEffect(() => {
        if (loanType === 'car') {
            setOptions(carOptions);
            setDropdownSelections(
                Object.fromEntries(
                    carOptions.dropdown.map((item) => [item.id, item.label])
                )
            );
        } else if (loanType === 'home') {
            setOptions(homeOptions);
            setDropdownSelections(
                Object.fromEntries(
                    homeOptions.dropdown.map((item) => [item.id, item.label])
                )
            );
        }
    }, [loanType]);

    const handleContinue = () => {
        let errors: Record<number, string> = {};
        let hasError = false;

        if (loanType === 'car') {
            const purposeId = carOptions.dropdown.find(item => item.label === 'Purpose')?.id;
            const unitTypeId = carOptions.dropdown.find(item => item.label === 'Unit Type')?.id;

            if (!purpose && purposeId !== undefined) {
                errors[purposeId] = 'Loan Purpose is required.';
                hasError = true;
            }

            if (!unitType && unitTypeId !== undefined) {
                errors[unitTypeId] = 'Unit Type is required.';
                hasError = true;
            }
        }

        if (loanType === 'home') {
            const propertyId = homeOptions.dropdown.find(item => item.label === 'Property Type')?.id;

            if (!propertyType && propertyId !== undefined) {
                errors[propertyId] = 'Property Type is required.';
                hasError = true;
            }
        }

        if (hasError) {
            setDropdownErrors(errors);
            setFormError('Please fill out all required fields.');
            setCanProceed(false);
            return;
        }

        // No errors
        setFormError('');
        // router.push('/loans/forms');
        setCanProceed(true);
    };


    return (
        <div className="calculator-container">
            <div className="col-md-6">
                <span className='medium title'>Loan Calculator</span>
                <p> Tell me about the property </p>
                <div className='option-wrapper'>
                    {options?.radio.map((o, index) =>
                        <label key={o.type} className="__radio-option">
                            <input type="radio" checked={loanOption === o.type} onChange={selectOption} value={o.type} name="paymentOption" />
                            <span className="__radio"><span></span></span>
                            <span>{o.displayText}</span>
                        </label>
                    )}
                </div>

                {options?.dropdown.map((item) => (
                    <div key={item.id} className="mb-3">
                        <PropertyDropdown
                            options={item.values}
                            value={dropdownSelections[item.id] || ''}
                            onChange={(selectedValue) => {
                                setFormError('');
                                // update selected value
                                setDropdownSelections((prev) => ({
                                    ...prev,
                                    [item.id]: selectedValue,
                                }));

                                // clear error
                                setDropdownErrors((prev) => ({
                                    ...prev,
                                    [item.id]: '',
                                }));

                                // update specific state
                                if (loanType === 'home') {
                                    if (item.label === 'Property Type') setPropertyType(selectedValue);
                                }

                                if (loanType === 'car') {
                                    if (item.label === 'Purpose') setPurpose(selectedValue);
                                    if (item.label === 'Unit Type') setUnitType(selectedValue);
                                }
                            }}
                            placeholder={`Select ${item.label}`}
                            error={dropdownErrors[item.id]}
                        />
                    </div>
                ))}

                <div className='slider-card'>

                    <div className="mb-8">
                        <SliderInput
                            label={loanOption === 'Prenda' ? 'Estimated Price: ₱' : 'Price: ₱'}
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
                            label={loanOption === 'Prenda' ? 'Amount to Borrow: ₱' : 'Down Payment: ₱'}
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
                            // formatValue={(value) => `${value / 12} ${value === 12 ? 'year' : 'years'}`}
                            formatValue={(value) => `${value} months`}
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
            <div className="col-md-6">
                <SummaryPanel
                    ammountFinanced={ammountFinanced}
                    purchasePrice={purchasePrice}
                    downPayment={downPaymentAmount}
                    monthlyPayment={monthlyPayment}
                    loanTerm={loanTerm}
                    loanOption={loanOption}
                    propertyType={propertyType}
                    unitType={unitType}
                    loanPurpose={purpose}
                    onConfirm={handleContinue}
                    formError={formError}
                    canProceed={canProceed}
                />
            </div>
        </div>
    );
};

export default LoanCalculator;
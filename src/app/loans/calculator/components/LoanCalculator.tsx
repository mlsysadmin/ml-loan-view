'use client';
import React, { useState, useEffect } from 'react';
import SliderInput from './SliderInput';
import SummaryPanel from './SummaryPanel';
import PropertyDropdown from './Dropdown';
import { useRouter, useSearchParams } from 'next/navigation';
// import { notFound } from 'next/navigation';
import '../../index.css';

const LoanCalculator: React.FC = () => {
    const searchParams = useSearchParams();


    const loanType = searchParams.get('type');
    const selectedType = searchParams.get('loanType');
    const selectedVehicle = searchParams.get('vehicle');



    const router = useRouter();
    const [purchasePrice, setPurchasePrice] = useState(10000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(30);
    const [loanTerm, setLoanTerm] = useState(48); // months
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [ammountFinanced, setammountFinanced] = useState(0);
    const [formError, setFormError] = useState('');
    const [dropdownErrors, setDropdownErrors] = useState<Record<number, string>>({});
    const [canProceed, setCanProceed] = useState(false);
    const [interest, setInterest] = useState(0);

    const [loanOption, setOption] = useState('');
    const [propertyType, setPropertyType] = useState(''); // for Home Loan
    const [unitType, setUnitType] = useState(''); // for Car Loan (selectedVehicle)
    const [maxDP, setMaxDP] = useState(0);
    const [minDP, setMinDP] = useState(0);
    const [maxTerm, setMaxTerm] = useState(0);
    const [minTerm, setMinTerm] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        if (loanType === 'car') {
            console.log('======>>>>>>>>', loanType)
            if (selectedType === 'Prenda my Vehicle') {
                console.log('selectedType ::::::::::', selectedType )
                if (selectedVehicle === '2-wheel') setInterest(1.50)
                if (selectedVehicle === '3-wheel') setInterest(2)
                if (selectedVehicle === '4-wheel') setInterest(1.50)
                console.log('=as=d==a=d=as=d=as=d', interest)
            }
        }
    });

    // Calculate the loan details whenever inputs change
    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        // Calculate down payment amount
        const downPayment = (purchasePrice * downPaymentPercent) / 100;
        setDownPaymentAmount(downPayment);

        // Calculate monthly payment
        const loanAmount = purchasePrice - downPayment;
        setammountFinanced(loanAmount)
        const monthlyAmount = (loanAmount / loanTerm) + ((loanAmount / loanTerm) * (interest / 100));
        setMonthlyPayment(monthlyAmount);
    }, [purchasePrice, downPaymentPercent, loanTerm]);

    const selectOption = (e: any) => {
        console.log('====', e.target.value)
        setOption(e.target.value)
        if (loanType === 'home') setInterest(2)
    };

    const [options, setOptions] = useState<typeof carOptions | typeof homeOptions | null>(null);
    const [dropdownSelections, setDropdownSelections] = useState<Record<number, string>>({});


    useEffect(() => {
        const dropdownLabel = loanType === 'car' ? 'Unit Type' : 'Property Type';
        const selectedDropdownValue = dropdownSelections[0]; // assuming it's always index 0
        const selectedLoanType = loanOption;

        // Get the correct dropdown item
        const dropdownData = options?.dropdown.find(item => item.label === dropdownLabel);
        const selectedItem = dropdownData?.values.find((v: any) => v.type === selectedDropdownValue);

        if (!selectedItem) return;

        // Get the config based on selected loan option
        const loanConfig = selectedItem.loanType.find((l: any) => l.type === selectedLoanType);

        if (!loanConfig) return;

        setMinPrice(loanConfig.price.min);
        setMaxPrice(loanConfig.price.max);
        setMinDP(loanConfig.downPayment.min);
        setMaxDP(loanConfig.downPayment.max);
        setMinTerm(loanConfig.term.min);
        setMaxTerm(loanConfig.term.max);

        // Optional: clamp current values to new bounds
        setPurchasePrice(prev => Math.min(Math.max(prev, loanConfig.price.min), loanConfig.price.max));
        setDownPaymentPercent(prev => Math.min(Math.max(prev, loanConfig.downPayment.min), loanConfig.downPayment.max));
        setLoanTerm(prev => Math.min(Math.max(prev, loanConfig.term.min), loanConfig.term.max));
    }, [loanOption, dropdownSelections, options]);

    const termMarks = Array.from({ length: (maxTerm - minTerm) / 12 + 1 }, (_, i) => {
        const value = minTerm + i * 12;
        return { value, label: value.toString() };
    });

    useEffect(() => {
        if (options?.radio?.length && !loanOption) {
            const defaultOption = options.radio.find(r => r.type === 'Buy a New Vehicle') || options.radio[0];
            setOption(defaultOption.type);
        }
    }, [options, loanOption]);

    useEffect(() => {
        ///////////////// TO DISPLAY DEFAULTS /////////////////
        console.log('======>>>>', selectedType, selectedVehicle)
        if (!loanType) return;
        if (loanType === 'car') {
            setOptions(carOptions);

            const defaultRadio = selectedType || 'Buy a New Vehicle';
            const defaultUnitType = selectedVehicle ||
                carOptions.dropdown[0].values[0].type;

            setOption(defaultRadio);
            setUnitType(defaultUnitType);

            setDropdownSelections({
                0: defaultUnitType
            });
        }
        if (loanType === 'home') {
            setOptions(homeOptions);

            const defaultPropertyType = homeOptions.dropdown[0].values[0].type;

            setOption('Buy');
            setPropertyType(defaultPropertyType);

            setDropdownSelections({
                0: defaultPropertyType
            });
        }
        if (loanType !== 'car' && loanType !== 'home') {
            router.replace('/404');
        }
    }, [loanType, selectedType, selectedVehicle]);


    const homeOptions = {
        radio: [{
            type: 'Buy',
            displayText: 'Buy a Home'
        }, {
            type: 'Prenda',
            displayText: 'Prenda my Home'
        }],
        dropdown: [{
            id: 0,
            label: 'Property Type',
            // values: ['House & Lot', 'Condominium', 'Lot only'],
            values: [{
                type: 'House & Lot',
                loanType: [{
                    type: 'Buy',
                    downPayment: {
                        min: 0, //%
                        max: 70 //%
                    },
                    term: {
                        min: 12, // months
                        max: 60 // months
                    },
                    price: {
                        min: 1000000,
                        max: 20000000
                    },
                    interrest: 0
                }, {
                    type: 'Prenda',
                    downPayment: { // Amount to Borrow
                        min: 10, //%
                        max: 70 //%
                    },
                    term: {
                        min: 12, // months
                        max: 60 // months
                    },
                    price: {
                        min: 1000000,
                        max: 20000000
                    },
                    interrest: 2
                }
                ]
            }, {
                type: 'Condominium',
                loanType: [
                    {
                        type: 'Buy',
                        downPayment: {
                            min: 0, //%
                            max: 70 //%
                        },
                        term: {
                            min: 12, // months
                            max: 60 // months
                        },
                        price: {
                            min: 1000000,
                            max: 20000000
                        },
                        interrest: 0
                    }, {
                        type: 'Prenda',
                        downPayment: {
                            min: 0, //%
                            max: 70 //%
                        },
                        term: {
                            min: 12, // months
                            max: 60 // months
                        },
                        price: {
                            min: 1000000,
                            max: 20000000
                        },
                        interrest: 2
                    }
                ]
            }, {
                type: 'Lot only',
                loanType: [
                    {
                        type: 'Buy',
                        downPayment: {
                            min: 0, //%
                            max: 70 //%
                        },
                        term: {
                            min: 12, // months
                            max: 60 // months
                        },
                        price: {
                            min: 1000000,
                            max: 20000000
                        },
                        interrest: 0
                    }, {
                        type: 'Prenda',
                        downPayment: {
                            min: 0, //%
                            max: 70 //%
                        },
                        term: {
                            min: 12, // months
                            max: 60 // months
                        },
                        price: {
                            min: 1000000,
                            max: 20000000
                        },
                        interrest: 2
                    }
                ]
            }]
        },
        ],
    };


    const carOptions = {
        radio: [
            {
                type: 'Buy a New Vehicle',
                displayText: 'Buy a New Vehicle'
            }, {
                type: 'Buy a Used Vehicle',
                displayText: 'Buy a Used Vehicle'
            }, {
                type: 'Prenda my Vehicle',
                displayText: 'Prenda my Vehicle'
            }
        ],
        dropdown: [{
            id: 0,
            label: 'Unit Type',
            // values: [
            //     'Acquisition or Purchase of Vehicle',
            //     'Refinancing or Re-Loan of Vehicle',
            //     'Equity Cash Reimbursement',
            // ]
            values: [{
                type: '4-wheel',
                loanType: [{
                    type: 'Buy a New Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 400000,
                        max: 30000000
                    },
                    interrest: 0
                }, {
                    type: 'Buy a Used Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 300000,
                        max: 2000000
                    },
                    interrest: 0
                }, {
                    type: 'Prenda my Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 70 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 300000,
                        max: 2000000
                    },
                    interrest: 1.50
                }]
            }, {
                type: '2-wheel',
                loanType: [{
                    type: 'Buy a New Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 2000000
                    },
                    interrest: 0
                }, {
                    type: 'Buy a Used Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 1000000
                    },
                    interrest: 0
                }, {
                    type: 'Prenda my Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 70 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 1000000
                    },
                    interrest: 1.50
                }]
            }, {
                type: '3-wheel',
                loanType: [{
                    type: 'Buy a New Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 1000000
                    },
                    interrest: 0
                }, {
                    type: 'Buy a Used Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 1000000
                    },
                    interrest: 0
                }, {
                    type: 'Prenda my Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 70 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 40000,
                        max: 1000000
                    },
                    interrest: 2
                }]
            }, {
                type: 'Commercial',
                loanType: [{
                    type: 'Buy a New Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 200000,
                        max: 10000000
                    },
                    interrest: 0
                }, {
                    type: 'Buy a Used Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 200000,
                        max: 5000000
                    },
                    interrest: 0
                }]
            }, {
                type: 'Construction',
                loanType: [{
                    type: 'Buy a New Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 200000,
                        max: 10000000
                    },
                    interrest: 0
                }, {
                    type: 'Buy a Used Vehicle',
                    downPayment: {
                        min: 0, //%
                        max: 90 //%
                    },
                    term: {
                        min: 12, // months
                        max: 48 // months
                    },
                    price: {
                        min: 200000,
                        max: 5000000
                    },
                    interrest: 0
                }]
            }],
        }],
    };


    const handleContinue = () => {
        let errors: Record<number, string> = {};
        let hasError = false;

        if (loanType === 'car') {
            const unitTypeId = carOptions.dropdown.find(item => item.label === 'Unit Type')?.id;
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
                <span className='regular title'>Loan Calculator</span>
                <p> Tell me about the property </p>

                {loanType === 'home' && (
                    <div className='option-wrapper'>
                        {options?.radio.map((o, index) =>
                            <label key={o.type} className="__radio-option">
                                <input type="radio" checked={loanOption === o.type} onChange={selectOption} value={o.type} name="paymentOption" />
                                <span className="__radio"><span></span></span>
                                <span>{o.displayText}</span>
                            </label>
                        )}
                    </div>
                )}

                {(loanType === 'home' && loanOption === 'Buy') && options?.dropdown.map((item) => (
                    <div key={item.id} className="mb-3">
                        <PropertyDropdown
                            options={item.values.map((v: any) => v.type)}
                            value={dropdownSelections[item.id] || ''}
                            onChange={(selectedValue) => {
                                setFormError('');
                                // update selected value
                                setDropdownSelections((prev) => ({
                                    ...prev,
                                    [item.id]: selectedValue,
                                }));
                                setDropdownErrors((prev) => ({
                                    ...prev,
                                    [item.id]: '',
                                }));
                                if (item.label === 'Property Type') setPropertyType(selectedValue); // HOME LOAN
                                if (item.label === 'Unit Type') setUnitType(selectedValue); // CAR LOAN
                            }}
                            placeholder={`Select ${item.label}`}
                            error={dropdownErrors[item.id]}
                        />
                    </div>
                ))}

                <div className='slider-card'>
                    <div className="mb-8">
                        <SliderInput
                            label={loanOption === 'Prenda' || loanOption === 'Prenda my Vehicle' ? 'Estimated Price: ₱' : 'Price: ₱'}
                            value={purchasePrice}
                            onChange={setPurchasePrice}
                            min={minPrice}
                            max={maxPrice}
                            step={Math.max((maxPrice - minPrice) / 50, 1)}
                            formatValue={(value) => value.toLocaleString()}
                        />
                    </div>
                </div>

                <div className='slider-card'>
                    <div className="mb-8">
                        <SliderInput
                            label={loanOption === 'Prenda' || loanOption === 'Prenda my Vehicle' ? 'Amount to Borrow: ₱' : 'Down Payment: ₱'}
                            value={downPaymentPercent}
                            onChange={setDownPaymentPercent}
                            min={minDP}
                            max={maxDP}
                            step={1}
                            formatValue={(value) => `${value}%`}
                            secondaryValue={purchasePrice}
                            // showFloatingLabel={true}
                            showSecondatyLabel={true}
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
                            min={minTerm}
                            max={maxTerm}
                            step={12}
                            formatValue={(value) => `${value} months`}
                            // suffix=" mons."
                            customMarks={termMarks}
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
                    onConfirm={handleContinue}
                    formError={formError}
                    canProceed={canProceed}
                    interest={interest}
                />
                <div className='foot-note'>
                    <i>*Subject for approval</i>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
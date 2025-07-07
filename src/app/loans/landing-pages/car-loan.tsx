'use client';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Col, Container, Row } from 'react-bootstrap';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import router from 'next/router';
// import { Col, Container, Row } from "react-bootstrap";


export default function CarLoanLandingPage() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const userAgent = navigator.userAgent;
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
    }, []);

    const searchParams = useSearchParams();
    const referrer = searchParams.get('type');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [step, setStep] = useState(0);

    const handleContinue = () => {
        console.log('==+++=+', step)
        if (step === 0) {
            if (selectedType) setStep(1)
        }
    }


    const typeArr = [
        {
            code: 'new',
            title: 'Buy a New Vehicle',
            img: 'buy-new-vehicle',
            width: 55,
            hieght: 55
        }, {
            code: 'used',
            title: 'Buy a Used Vehicle',
            img: 'buy-used-vehicle',
            width: 55,
            hieght: 55
        }, {
            code: 'prenda',
            title: 'Prenda my Vehicle',
            img: 'prenda-my-vehicle',
            width: 55,
            hieght: 55
        }
    ];

    const vehicleArr = [
        {
            vehicleType: '2-wheel',
            forTypes: [
                'new', 'used', 'prenda'
            ],
            img: '2-wheel'
        }, {
            vehicleType: '3-wheel',
            forTypes: [
                'new', 'used', 'prenda'
            ],
            img: '3-wheel',
        }, {
            vehicleType: '4-wheel',
            forTypes: [
                'new', 'used', 'prenda'
            ],
            img: '4-wheel'
        },
        {
            vehicleType: 'Commercial',
            forTypes: [
                'new', 'used'
            ],
            img: 'commercial',
        }
        , {
            vehicleType: 'Construction',
            forTypes: [
                'new', 'used'
            ],
            img: 'construction'
        }
    ]

    const whatYouNeed = [{
        title: 'Requirements',
        constents: [
            'Government ID',
            'Proof of Income',
            'Proof of Address',
        ]
    }, {
        title: 'Who can apply',
        constents: [
            'At least 21 years old',
            'Filipino Citizen*',
            'Stable source of income'
        ]
    }, {
        title: 'Loan Details',
        constents: [
            'Up to PHP 10,000,000',
            'From 12 to 6 months',
            'Quick approval',
        ]
    }];

    function whatYouNeedContents(contents: any[]) {
        return contents.map(content =>
            <div key={content} className="card-check-list">
                <Image
                    className="check"
                    src="/images/check.svg"
                    alt="MLhuillier logo"
                    width={10}
                    height={10}
                />
                {content}
            </div>
        )
    }

    return (
        <>

            <div className="container car-banner">
                <div className="banner-content-wrapper">
                    <div>
                        <p className="banner-text regular title">Own your dream <span className="red">Car</span> with a <span className="red">Loan</span> that works you.</p>
                        <p className="regular readable">Your dream car is just a few clicks away.</p>

                    </div>
                    {/* <div className="hero-buttons">
                        <Link href={'/loans/calculator?type=' + referrer}>
                            <button className="btn btn-start-here">Start here &nbsp; <ArrowRight size={20} /></button>
                        </Link>
                    </div> */}
                </div>
                <div className="home-loan-img-wrapper">
                    <Image
                        className="car-loan-img"
                        src="/images/car-loan.svg"
                        alt="MLhuillier logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <br />
            <div className='car-loan-type-container '>
                {/* <Col lg="12"> */}
                <div className="car-loan-type-wrapper container">
                    <p className="banner-text regular title">{step === 0 ? 'I want to..' : 'Choose a vehicle type'}</p>
                    <div className="">
                        <Row>
                            {(step === 0 ? typeArr : selectedType ? vehicleArr.filter(v => v.forTypes.includes(
                                typeArr.find(t => t.title === selectedType)?.code ?? ''
                            )) : []).map((item) => {
                                const isTypeStep = step === 0;
                                const key = isTypeStep ? (item as typeof typeArr[0]).title : (item as typeof vehicleArr[0]).vehicleType;
                                const label = key;
                                const isSelected = isTypeStep ? selectedType === (item as typeof typeArr[0]).title : selectedVehicle === (item as typeof vehicleArr[0]).vehicleType;
                                const imgName = isSelected ? ((item.img ? item.img + '-white' : 'default-white')) : (item.img || 'default');

                                return (
                                    <div key={key} className="col-md-4">
                                        <div
                                            className={`car-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => {
                                                if (isTypeStep) {
                                                    setSelectedType((item as typeof typeArr[0]).title);
                                                    setSelectedVehicle(null);
                                                } else {
                                                    setSelectedVehicle((item as typeof vehicleArr[0]).vehicleType);
                                                }
                                            }}
                                        >
                                            <Image
                                                src={`/images/car_loan_icons/${imgName}.svg`}
                                                alt={label}
                                                width={'width' in item ? item.width : 55}
                                                height={'hieght' in item ? item.hieght : 55}
                                            />
                                            <div className="regular readable mt-2">{label} {(isMobile && step === 1) && ' Vehicle'}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Row>
                    </div>
                    <div className='form-btn-container'>
                        <button className='__btn btn-white' onClick={() => setStep(0)}>
                            Back
                        </button>
                        {step === 0 ? (
                            <button className="__btn btn-black" onClick={handleContinue}>
                                Continue
                            </button>
                        ) : (
                            <Link  href={`${'/loans/calculator?type=' + referrer + '&loanType=' + selectedType + '&vehicle=' + selectedVehicle}`}>
                                <button className="__btn btn-black" disabled={!selectedVehicle}>
                                    Continue
                                </button>
                            </Link>
                        )}
                    </div>

                    <br />
                    <p className="banner-text regular title">What you need</p>
                    <br />
                    <Row className="">
                        {whatYouNeed.map(item => (
                            <div key={item.title} className="col-md-4 mb-5 mb-md-0 d-flex">
                                <div className="what-you-need-card what-card flex-grow-1 h-100">
                                    <div className="card-title smaller regular">
                                        {item.title}
                                    </div>
                                    <div className="card-check-list-wrapper">
                                        {whatYouNeedContents(item.constents)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                    <br />
                    {/* <div className="text-muted regular">* Except for condominium (see details)</div> */}
                </div>
                {/* </Col> */}
            </div>
        </>
    );
}
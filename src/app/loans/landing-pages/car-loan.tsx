'use client';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
// import { Col, Container, Row } from "react-bootstrap";


export default function CarLoanLandingPage() {
    const searchParams = useSearchParams();
    const referrer = searchParams.get('type');


    const typeArr = [
        {
            title: 'Buy a New Vehicle',
            img: 'buy-new-vehicle',
            width: 10,
            hieght: 10
        }, {
            title: 'Buy a Used Vehicle',
            img: 'buy-used-vehicle',
            width: 10,
            hieght: 10
        }, {
            title: 'Prenda my Vehicle',
            img: 'prenda-my-vehicle',
            width: 10,
            hieght: 10
        }
    ];

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
            {/* <Col lg="12"> */}
            <div className='car-loan-type-container '>
                <Container>
                    
                </Container>
                <div className="car-loan-type-wrapper container ">
                    <p className="banner-text regular title">I want to..</p>
                    <div className="">
                        <Row>
                            {typeArr.map(item =>
                                <div key={item.title} className="col-md-4">
                                    <div className='car-card'>
                                        <Image
                                            src={'/images/car_loan_icons/home/' + item.img + '.svg'}
                                            alt={item.img}
                                            width={item.width}
                                            height={item.hieght}
                                        />
                                        <div className='regular readable'>{item.title}</div>
                                    </div>
                                </div>
                            )}
                        </Row>
                    </div>


                    <div className='form-btn-container'>
                        <button className='__btn btn-white' >
                            Back
                        </button>
                        <button className="__btn btn-black" >
                            Continue
                        </button>
                    </div>

                    <br />
                    <p className="banner-text regular title">What you need</p>
                    <br />
                    <Row className="">
                        {whatYouNeed.map(item =>
                            <div key={item.title} className="col-md-4 mb-5 mb-md-0 ">
                                <div className="what-you-need-card what-card">
                                    <div className="card-title  smaller regular">
                                        {item.title}
                                    </div>
                                    <div className="card-check-list-wrapper">
                                        {whatYouNeedContents(item.constents)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Row>
                    <br />
                    {/* <div className="text-muted regular">* Except for condominium (see details)</div> */}
                </div>
            </div>
            {/* </Col> */}
        </>
    );
}
'use client';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
// import { Col, Container, Row } from "react-bootstrap";


export default function CarLoanLandingPage() {
    const searchParams = useSearchParams();
    const referrer = searchParams.get('type');


    const typeArr = [
        {
            option: 'Prenda',
            type: [
                {
                    type: 'Motorcycple',
                    img: 'motorcycle',
                    width: 75,
                    hieght: 65
                }, {
                    type: 'Car | SUV | Pickup | Van',
                    img: '4-wheels',
                    width: 80,
                    hieght: 65
                }
            ]
        },
        {
            option: 'Buy New',
            type: [
                {
                    type: 'Motorcycple',
                    img: 'motorcycle',
                    width: 75,
                    hieght: 65
                }, {
                    type: 'Car | SUV | Pickup | Van',
                    img: '4-wheels',
                    width: 80,
                    hieght: 65
                }, {
                    type: '3-Wheeled Vehicle',
                    img: '3-wheels',
                    width: 80,
                    hieght: 65
                }, {
                    type: 'Commercial Truck or Bus',
                    img: 'commercial',
                    width: 100,
                    hieght: 65
                }, {
                    type: 'Construction Vehicle',
                    img: 'heavy',
                    width: 80,
                    hieght: 65
                }

            ]
        },
        {
            option: 'Buy Used',
            type: [
                {
                    type: 'Car | SUV | Pickup | Van',
                    img: '4-wheels',
                    width: 80,
                    hieght: 65
                }, {
                    type: 'Commercial Truck or Bus',
                    img: 'commercial',
                    width: 100,
                    hieght: 65
                }, {
                    type: 'Construction Vehicle',
                    img: 'heavy-2',
                    width: 85,
                    hieght: 45
                }

            ]
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
            <div className="container home-banner">
                <div className="banner-content-wrapper">
                    <div>
                        <p className="banner-text regular title">Own your dream <span className="red">Car</span> with a <span className="red">Loan</span> that works you.</p>
                        <p className="regular readable">Your dream car is just a few clicks away.</p>

                    </div>
                    <div className="hero-buttons">
                        <Link href={'/calculator?type=' + referrer}>
                            <button className="btn btn-start-here">Start here &nbsp; <ArrowRight size={20} /></button>
                        </Link>
                    </div>
                </div>
                <div className="home-loan-img-wrapper">
                    <Image
                        className="home-loan-img"
                        src="/images/car-loan.svg"
                        alt="MLhuillier logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <br />
            <Col lg="12">
                <div className="what-you-need-container">
                    <p className="banner-text regular title">I want to...</p>
                    <div className="">
                        {typeArr.map(item =>
                            <div key={item.option} className="mb-4">
                                <p className='regular title red'>{item.option}</p>
                                <Row>
                                    {item.type.map(item =>
                                        <div key={item.type} className="col-md-4">
                                            <div key={item.type} className='car-card'>
                                                <Image
                                                    className={item.img}
                                                    src={'/images/' + item.img + '.svg'}
                                                    alt="MLhuillier logo"
                                                    width={item.width}
                                                    height={item.hieght}
                                                />
                                                <div className='regular readable'>{item.type}</div>
                                            </div>
                                        </div>
                                    )}
                                </Row>
                                {/* <div className="card-title  smaller regular">
                                    </div> */}
                                {/* <div className="card-check-list-wrapper">
                                        {whatYouNeedContents(item.constents)}
                                    </div> */}
                            </div>
                        )}
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
                    <div className="text-muted regular">* Except for condominium (see details)</div>
                </div>
            </Col>
        </>
    );
}
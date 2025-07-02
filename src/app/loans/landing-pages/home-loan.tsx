'use client';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Row } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
// import { Col, Container, Row } from "react-bootstrap";

export default function HomeLoanLandingPage() {
    const searchParams = useSearchParams();
    const referrer = searchParams.get('type');


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
                        <p className="banner-text regular title">Match your dream <span className="red">Home</span> with a <span className="red">Loan</span> that fits you.</p>
                        <p className="regular readable">Your dream homeis just a few clicks away.</p>

                    </div>
                    <div className="hero-buttons">
                        <Link href={'/loans/calculator?type=' + referrer}>
                            <button className="btn btn-start-here">Start here &nbsp; <ArrowRight size={20} /></button>
                        </Link>
                    </div>
                </div>
                <div className="home-loan-img-wrapper">
                    <Image
                        className="home-loan-img"
                        src="/images/home-loan.svg"
                        alt="MLhuillier logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>

            <div className='container'>
                <div className="what-you-need-container">
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
                </div>
            </div>

        </>
    );
}
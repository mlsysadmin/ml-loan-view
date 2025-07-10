'use client'
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import HomeLoanPage from './landing-pages/home-loan'
import CarLoanPage from './landing-pages/car-loan'
import SalaryLoanPage from './landing-pages/salary-loan'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import SalaryLoanLandingPage from "./landing-pages/salary-loan";

function homeContents() {

    const searchParams = useSearchParams();
    const referrer = searchParams.get('type');

    useEffect(() => {
        localStorage.setItem('loanType', JSON.stringify(referrer));
    })

    const whyCard = [
        {
            title: 'Low Interest Rates',
            description: (referrer === 'car') ? 'Lock in a low interest car loan and keep more cash in your pocket.' : 'Enjoy competitive rates that make home-ownership more affordable.',
            img: 'low-interest'
        },
        {
            title: 'Quick and Easy Application',
            description: 'Apply online in minutes with fast processing and approvals.',
            img: 'easy-apply'
        },
        {
            title: 'Flexible Payment Terms',
            description: 'Choose repayment periods that suit income and lifestyle.',
            img: 'flexible-payment-terms'
        }
    ];


    return (
        <>
            {/* <Container> */}
            {referrer === 'car' && <CarLoanPage />}
            {referrer === 'home' && <HomeLoanPage />}
            {referrer === 'salary' && <SalaryLoanPage />}


            <Container className="why">
                <div className="center-why">
                    <span className="red banner-text regular title">Why M. Lhuillier</span> <br />
                    <div className=" why-text">
                        <span className="regular readable">We've reinvented the way you get a home loan because you deserve bettter.</span>
                    </div>
                </div>
                <br />
                <br />
                <div className="row text-center">
                    {whyCard.map(item =>
                        <div key={item.title} className="col-md-4 mb-5 mb-md-0 order-md-1 order-2">
                            <div className="icon-wrapper mb-4">
                                <Image
                                    src={'/images/' + referrer + '_loan_icons/' + item.img + '.svg'}
                                    alt="MLhuillier logo"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="medium readable mb-2">
                                {item.title}
                            </div>
                            <p className="readable">{item.description}</p>
                        </div>
                    )}
                </div>
            </Container>
            {/* </Container> */}
        </>
    );
}

export default homeContents;
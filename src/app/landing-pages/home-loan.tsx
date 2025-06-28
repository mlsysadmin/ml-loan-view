'use client';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
// import { Col, Container, Row } from "react-bootstrap";

export default function HomeLoanLandingPage() {


    return (
        <>
            <div className="container home-banner">
                <div className="banner-content-wrapper">
                    <div>
                        <p className="banner-text regular title">Match your dream <span className="red">Home</span> with a <span className="red">Loan</span> that fits you.</p>
                        <p className="regular readable">Your dream homeis just a few clicks away.</p>

                    </div>
                    <div className="hero-buttons">
                        <Link href="/calculator">
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
        </>
    );
}
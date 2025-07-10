"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
// import { Col, Container, Row } from "react-bootstrap";

export default function SalaryLoanLandingPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setReferrer(searchParams.get('type'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const salaryLoanWhatYouNeed = [
    {
      title: "Basic Requirements",
      constents: [
        "One (1) valid government-issued ID",
        "Latest 1 month payslip",
        "Certificate of Employment (COE) with compensation",
        "Proof of billing (utility bill, etc.)",
        "Company ID",
      ],
    },
    {
      title: "Who can apply",
      constents: [
        "Filipino citizen, at least 21 years old",
        "Currently employed (government or private)",
        "Minimum monthly salary of PHP 10,000",
        "With active contact number",
      ],
    },
    {
      title: "Salary Loan Features",
      constents: [
        "Loan amount from PHP 5,000 up to PHP 500,000",
        "Flexible repayment terms (6, 12, 18, or 24 months)",
        "Fast approval and release",
        "No collateral required",
      ],
    },
  ];

  function renderSalaryLoanWhatYouNeed(contents: any[]) {
    return contents.map((content) => (
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
    ));
  }

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <div className="container salary-banner">
        <div className="banner-content-wrapper">
          <div>
            <p className="banner-text regular title">
              Your <span className="red">Salary Loan</span> is just a few clicks
              away!
            </p>
            <p className="regular readable">
              Apply for a salary loan and get fast approval with minimal
              requirements.
            </p>
            <div className="hero-buttons">
              <Link href={"/loans/calculator?type=" + (referrer || "salary")}> {/* fallback to 'salary' if null */}
                <button className="btn btn-start-here">
                  Start here &nbsp; <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home-loan-img-wrapper">
          <Image
            className="home-loan-img"
            src="/images/salary-loan.png"
            alt="Salary Loan"
            width={100}
            height={100}
          />
        </div>
      </div>
      <br />
      <div className="car-loan-type-container ">
        {/* <Col lg="12"> */}
        <div className="car-loan-type-wrapper container">
          <br />
          <p className="banner-text regular title">
            What you need for your Salary Loan
          </p>
          <br />
          <Row className="">
            {salaryLoanWhatYouNeed.map((item) => (
              <div key={item.title} className="col-md-4 mb-5 mb-md-0 d-flex">
                <div className="what-you-need-card what-card flex-grow-1 h-100">
                  <div className="card-title smaller regular">{item.title}</div>
                  <div className="card-check-list-wrapper">
                    {renderSalaryLoanWhatYouNeed(item.constents)}
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

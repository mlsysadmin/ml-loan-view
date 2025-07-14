"use client";
import React, { useState, useEffect } from "react";
// import SalarySliderInput from "./SalarySliderInput";
// import SummaryPanel from "./SummaryPanel";
// import PropertyDropdown from "./Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
// import { notFound } from 'next/navigation';
import "../../index.css";
import Link from "next/link";
import { Modal } from "react-bootstrap";
// import SalaryLoanSummaryPanel from "./SalaryLoanSummaryPanel";

const SalaryPreConfirmation: React.FC = () => {
  const searchParams = useSearchParams();

  const loanType = searchParams.get("type");
  // const selectedType = searchParams.get("loanType");
  // const selectedVehicle = searchParams.get("salary");

  // Get loan details from search parameters
  const borrowedAmountParam = searchParams.get("borrowedAmount");
  const monthlyPaymentParam = searchParams.get("monthlyPayment");
  const loanTermParam = searchParams.get("loanTerm");
  const interestRateParam = searchParams.get("interestRate");

  const router = useRouter();

  // State variables
  const [isLoading, setIsLoading] = useState(false);

  // Salary loan defaults
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [loanTerm, setLoanTerm] = useState(1); // months, default to 1
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // SSR-safe: Start at 0, set to 500 on client for salary loan
  const [ammountFinanced, setammountFinanced] = useState(500); // Use the default you want
  const [ref, setRef] = useState("");
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false); // Add mounted flag

  const handleClose = () => {
    setShow(false);
  };
  // Set values from search parameters on component mount
  useEffect(() => {
    setMounted(true); // Mark as mounted on client
    if (loanType === "salary") {
      // Set values from search parameters if available
      if (borrowedAmountParam) {
        setammountFinanced(parseFloat(borrowedAmountParam));
      }
      if (monthlyPaymentParam) {
        setMonthlyPayment(parseFloat(monthlyPaymentParam));
      }
      if (loanTermParam) {
        setLoanTerm(parseInt(loanTermParam));
      }
    }
    // Generate reference number on component mount (client only)
    if (!ref) {
      setRef(generateRandomString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateRandomString(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `QSL${result}`;
  }

  async function submitConfirmation() {
    setIsLoading(true);
    // Generate reference number if not already set
    let currentRef = ref;
    if (!currentRef) {
      currentRef = generateRandomString();
      setRef(currentRef);
    }
    // Store loan data in localStorage for the pre-approval page
    const loanData = {
      ref: currentRef,
      applicationTimeStamp: new Date().toISOString(),
      loanType: "salary",
      ammountFinanced,
      monthlyPayment,
      loanTerm,
      interestRate: interestRateParam ? parseFloat(interestRateParam) : 0.05,
    };
    localStorage.setItem("salaryLoanData", JSON.stringify(loanData));
    setShow(true);
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      router.push("/loans/pre-approval/salary");
    }, 1000);
  }

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="calculator-container">
      <div className="flex-col full-width">
        <div className="col-md-6">
          <span className="regular title">Loan Confirmation</span>
          <p style={{ color: "#555555", fontSize: 16, marginBottom: 10, width: "100%" }}>
            Please review the details carefully before proceeding.
          </p>
        </div>
        <div className="center-parent">
          <div className="col-md-6 ">
            <div className="summary-containers">
              <p
                style={{
                  color: "#333333",
                  fontSize: 16,
                  marginBottom: 20,
                  fontWeight: 600,
                }}
              >
                Loan Details
              </p>
              <div className="details-wrapper">
                <div className="contents1">
                  <span>Borrowed Amount</span>
                  <span>Interest</span>
                  <span className="font-medium">
                    Payable Month <small></small>
                  </span>
                </div>
                <div className="contents2">
                  <span>
                    PHP{" "}
                    {ammountFinanced.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span>
                    {interestRateParam
                      ? (parseFloat(interestRateParam) * 100).toFixed(1) + "%"
                      : "5.0%"}
                  </span>
                  <span className="font-medium">
                    {loanTerm} mos.{" "}
                    <span style={{ fontSize: 12 }}>(every payroll)</span>
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px dashed #333333",
                  paddingTop: 25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="font-medium medium">Monthly Payment</span>
                <span>
                  <span className="font-medium medium">
                    PHP{" "}
                    {monthlyPayment.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
              </div>
            </div>
            <div className="info-container ">
              <div className="details-wrapper">
                <span
                  style={{
                    color: "#555555",
                    fontSize: 16,
                    width: "100%",
                    display: "block",
                    textAlign: "justify",
                  }}
                >
                  I authorize M. Lhuillier Financial Services Inc. to deduct ₱
                  {monthlyPayment.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  bi-monthly from my MCash account as payment for my Salary
                  Loan.
                </span>
              </div>
              <br />
              <div className="form-btn-container-summary2 form-btn-container">
                <Link href={`${"/loans/calculator?type=" + loanType}`}>
                  <button className="__btn2 btn-white" disabled={isLoading}>
                    Back
                  </button>
                </Link>
                <Link href={""}>
                  <button
                    className="__btn2 btn-black"
                    onClick={submitConfirmation}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Proceed"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6">
          
        </div> */}
      </div>
      {/* <Modal show={show} onHide={handleClose} keyboard={false} autoFocus={false} className='modal'>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <Modal.Body>
              Analyzing...
            </Modal.Body>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default SalaryPreConfirmation;

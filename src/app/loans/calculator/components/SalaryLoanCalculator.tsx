"use client";
import React, { useState, useEffect } from "react";
import SalarySliderInput from "./SalarySliderInput";
import SummaryPanel from "./SummaryPanel";
import PropertyDropdown from "./Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
// import { notFound } from 'next/navigation';
import "../../index.css";
import SalaryLoanSummaryPanel from "./SalaryLoanSummaryPanel";

const SalaryLoanCalculator: React.FC = () => {
  const searchParams = useSearchParams();

  const loanType = searchParams.get("type");
  // const selectedType = searchParams.get("loanType");
  // const selectedVehicle = searchParams.get("salary");

  const router = useRouter();
  // Salary loan defaults
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [loanTerm, setLoanTerm] = useState(1); // months, default to 1
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // SSR-safe: Start at 0, set to 500 on client for salary loan
  const [ammountFinanced, setammountFinanced] = useState(0);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [editAmountValue, setEditAmountValue] = useState("");

  // Set default to 500 only on client after mount to avoid hydration mismatch
  useEffect(() => {
    // Only set default if loanType is salary and ammountFinanced is 0
    if (loanType === "salary" && ammountFinanced === 0) {
      setTimeout(() => {
        setammountFinanced(500);
        // Also set the correct monthly payment with interest for default
        let interestRate = loanTerm === 2 ? 0.1 : 0.05;
        const totalWithInterest = 500 + 500 * interestRate;
        setMonthlyPayment(totalWithInterest / loanTerm);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanType, ammountFinanced, loanTerm]);

  const [formError, setFormError] = useState("");
  const [dropdownErrors, setDropdownErrors] = useState<Record<number, string>>(
    {}
  );
  const [canProceed, setCanProceed] = useState(false);
  const [amountError, setAmountError] = useState("");

  const [loanOption, setOption] = useState("");
  const [propertyType, setPropertyType] = useState(""); // for Home Loan
  const [unitType, setUnitType] = useState(""); // for Car Loan (selectedVehicle)
  // const [maxDP, setMaxDP] = useState(0);
  // const [minDP, setMinDP] = useState(0);
  const [maxTerm, setMaxTerm] = useState(0);
  const [minTerm, setMinTerm] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);
  // const [minPrice, setMinPrice] = useState(0);

  // Calculate the loan details whenever inputs change
  useEffect(() => {
    // For salary loan, borrowed amount is the slider value, monthly payment is borrowed/term
    if (loanType === "salary") {
      setDownPaymentAmount(0);
      // If user hasn't moved the slider, keep at 0
      const borrowed = ammountFinanced || 0;
      setammountFinanced(borrowed);
      // Apply interest: 1 month = 5%, 2 months = 10%
      let interestRate = 0;
      if (loanTerm === 1) interestRate = 0.05;
      else if (loanTerm === 2) interestRate = 0.1;
      const totalWithInterest = borrowed + borrowed * interestRate;
      setMonthlyPayment(loanTerm > 0 ? totalWithInterest / loanTerm : 0);
    } else {
      // Calculate down payment amount
      const downPayment = (purchasePrice * downPaymentPercent) / 100;
      setDownPaymentAmount(downPayment);
      // Calculate monthly payment
      const loanAmount = purchasePrice - downPayment;
      setammountFinanced(loanAmount);
      const monthlyAmount = loanAmount / loanTerm;
      setMonthlyPayment(monthlyAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasePrice, downPaymentPercent, loanTerm]);

  // const selectOption = (e: any) => {
  //   console.log("====", e.target.value);
  //   setOption(e.target.value);
  // };

  // const termMarks = Array.from(
  //   { length: (maxTerm - minTerm) / 12 + 1 },
  //   (_, i) => {
  //     const value = minTerm + i * 12;
  //     return { value, label: value.toString() };
  //   }
  // );

  const validateAmount = (value: number): string => {
    if (isNaN(value)) {
      return "Please enter a valid number";
    }
    if (value < 500) {
      return "It must be no less than the MIN amount.";
    }
    if (value > 4600) {
      return "It must not exceed the MAX amount.";
    }
    return "";
  };

  const handleContinue = () => {
    let errors: Record<number, string> = {};
    let hasError = false;

    if (hasError) {
      setDropdownErrors(errors);
      setFormError("Please fill out all required fields.");
      setCanProceed(false);
      return;
    }

    // No errors
    setFormError("");
    setCanProceed(true);
    // Navigate to pre-approval confirmation page with loanType and loan details as query params
    if (loanType) {
      const params = new URLSearchParams({
        type: loanType,
        borrowedAmount: ammountFinanced.toString(),
        monthlyPayment: monthlyPayment.toString(),
        loanTerm: loanTerm.toString(),
        interestRate: loanTerm === 1 ? "0.05" : "0.1"
      });
      router.push(`/loans/calculator/confirmation?${params.toString()}`);
    }
  };

  return (
    <div className="calculator-container">
      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}
      {(loanType === "salary") && (
        <>
          <div className="col-md-6">
            <span className="regular title">Loan Calculator</span>
            <p style={{ color: "#555555", fontSize: 16, marginBottom: 15 }}>
              You are eligible for M. Lhuillier Salary Loan of up to ₱ 4,600.00
              at only 5.0% per month!
            </p>
            {/* Salary Loan UI like the provided screenshot */}
            {loanType === "salary" && (
              <div className="salary-loan-ui">
                <div className="mb-3">
                  <label
                    style={{
                      fontSize: 16,
                      color: "#555555",
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Monthly Payment
                  </label>
                  <div
                    className="salary-loan-mobile-center"
                    style={{
                      //   border: "1px solid #ccc",
                      borderRadius: 5,
                      padding: 8,
                      background: "#F1F1F1",
                      textAlign: "center",
                      width: "100%",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{ color: "red", fontWeight: 600, fontSize: 22 }}
                    >
                      ₱
                      {monthlyPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span style={{ color: "#888", fontSize: 14 }}>/mo.</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    style={{
                      fontSize: 16,
                      color: "#555555",
                      fontWeight: 500,
                      marginBottom: 2,
                      alignContent: "center"
                    }}
                  >
                    Borrowed Amount
                  </label>
                  <div
                    style={{
                      borderRadius: 5,
                      padding: 8,
                      background: "#F1F1F1",
                      fontWeight: 600,
                      fontSize: 22,
                      width: "100%",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    {isEditingAmount ? (
                      <input
                        type="number"
                        value={editAmountValue}
                        onChange={(e) => setEditAmountValue(e.target.value)}
                        onBlur={() => {
                          const value = parseFloat(editAmountValue);
                          const error = validateAmount(value);
                          setAmountError(error);
                          
                          if (!error) {
                            setammountFinanced(value);
                            // Update monthly payment with interest
                            let interestRate = 0;
                            if (loanTerm === 1) interestRate = 0.05;
                            else if (loanTerm === 2) interestRate = 0.1;
                            const totalWithInterest = value + value * interestRate;
                            setMonthlyPayment(loanTerm > 0 ? totalWithInterest / loanTerm : 0);
                            setIsEditingAmount(false);
                            setEditAmountValue("");
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(editAmountValue);
                            const error = validateAmount(value);
                            setAmountError(error);
                            
                            if (!error) {
                              setammountFinanced(value);
                              // Update monthly payment with interest
                              let interestRate = 0;
                              if (loanTerm === 1) interestRate = 0.05;
                              else if (loanTerm === 2) interestRate = 0.1;
                              const totalWithInterest = value + value * interestRate;
                              setMonthlyPayment(loanTerm > 0 ? totalWithInterest / loanTerm : 0);
                              setIsEditingAmount(false);
                              setEditAmountValue("");
                            }
                          }
                        }}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: "4px",
                          fontSize: 22,
                          fontWeight: 600,
                          width: "90px",
                          textAlign: "end",
                        
                          color: "#4F4F4F",
                        }}
                        autoFocus
                      />
                    ) : (
                      <span>₱{ammountFinanced.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</span>
                    )}
                    <img
                      src="/images/edit.svg"
                      alt="Edit"
                      width={20}
                      height={20}
                      style={{ alignItems: "center", cursor: "pointer" }}
                      onClick={() => {
                        setIsEditingAmount(true);
                        setEditAmountValue(ammountFinanced.toString());
                        setAmountError(""); // Clear any previous errors when starting to edit
                      }}
                    />
                  </div>
                  {amountError && (
                    <div
                      style={{
                        color: "#FF0000",
                        fontSize: 13,
                        marginTop: 2,
                        fontWeight: 500,
                      }}
                    >
                      {amountError}
                    </div>
                  )}

                  <div
                    style={{
                      color: "#555555",
                      fontSize: 16,
                      padding: "10px 0",
                    }}
                  >
                    Move the slider to select loan amount.
                  </div>
                  
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 16,
                        color: "#885555558",

                        width: "100%",
                      }}
                    >
                      <span>MIN</span>
                      <span>MAX</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        width: "100%",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <SalarySliderInput
                          label="Loan Amount: ₱"
                          value={ammountFinanced}
                          onChange={(val) => {
                            setammountFinanced(val);
                            // For salary loan, update monthly payment immediately with interest
                            if (loanType === "salary") {
                              let interestRate = 0;
                              if (loanTerm === 1) interestRate = 0.05;
                              else if (loanTerm === 2) interestRate = 0.1;
                              const totalWithInterest =
                                val + val * interestRate;
                              setMonthlyPayment(
                                loanTerm > 0 ? totalWithInterest / loanTerm : 0
                              );
                            }
                          }}
                          min={500}
                          max={4600}
                          step={100}
                          formatValue={(value) => `₱${value.toLocaleString()}`}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 8,
                        width: "100%",
                        fontSize: 16,
                        color: "#555555",
                      }}
                    >
                      <span>₱500</span>
                      <span>₱4,600</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <label
                    style={{
                      fontSize: 16,
                      color: "#555555",
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Payable Month
                  </label>
                  <div
                    style={{
                      display: "flex",
                      //   border: "1px solid #ccc",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        background: loanTerm === 1 ? "#555555" : "#F1F1F1",
                        color: loanTerm === 1 ? "#fff" : "#555555",
                        fontWeight: loanTerm === 1 ? 700 : 400,
                        border: "none",
                        borderRadius: "5px 0 0 5px",
                        padding: "10px 0",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onClick={() => {
                        setLoanTerm(1);
                        if (loanType === "salary") {
                          let interestRate = 0.05;
                          const totalWithInterest =
                            ammountFinanced + ammountFinanced * interestRate;
                          setMonthlyPayment(totalWithInterest / 1);
                        }
                      }}
                    >
                      1 Month
                    </button>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        background: loanTerm === 2 ? "#555555" : "#F1F1F1",
                        color: loanTerm === 2 ? "#fff" : "#555555",
                        fontWeight: loanTerm === 2 ? 700 : 400,
                        border: "none",
                        borderRadius: "0 5px 5px 0",
                        padding: "10px 0",
                        // transition: "background 0.1s, color 0.1s",
                      }}
                      onClick={() => {
                        setLoanTerm(2);
                        if (loanType === "salary") {
                          let interestRate = 0.1;
                          const totalWithInterest =
                            ammountFinanced + ammountFinanced * interestRate;
                          setMonthlyPayment(totalWithInterest / 2);
                        }
                      }}
                    >
                      2 Months
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <SalaryLoanSummaryPanel
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
              // Add auto-generated outcome for salary loan
              outcome={
                loanType === "salary"
                  ? ammountFinanced === 0
                    ? "Please select a borrowed amount to see your outcome."
                    : `If you borrow PHP ${ammountFinanced.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )} for ${loanTerm} month${
                        loanTerm > 1 ? "s" : ""
                      }, your monthly payment will be PHP ${monthlyPayment.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}.`
                  : undefined
              }
            />
            <div className="foot-note">
              <i>*Subject for approval</i>
            </div>
          </div>
        </>
      )}
      {/* {loanType === 'salary' && (
                <div className="col-md-12 text-center">
                    <span className='regular title'>Salary Loan Calculator</span>
                    <p>Salary loan calculator coming soon. Please contact us for more information.</p>
                </div>
            )} */}
    </div>
  );
};

export default SalaryLoanCalculator;

import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../index.css";
import { useLoanStore } from "@/app/loans/store/dataStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SalaryLoanSummaryPanelProps {
  ammountFinanced: number;
  purchasePrice: number;
  downPayment: number;
  monthlyPayment: number;
  loanTerm: number;
  loanOption: string;
  propertyType: string;
  unitType: string;
  formError: string;
  onConfirm: () => void;
  canProceed: boolean;
  outcome?: string;
}

const SalaryLoanSummaryPanel: React.FC<SalaryLoanSummaryPanelProps> = ({
  ammountFinanced,
  purchasePrice,
  downPayment,
  monthlyPayment,
  loanTerm,
  loanOption,
  propertyType,
  unitType,
  formError,
  onConfirm,
  canProceed,
  outcome,
}) => {
  // const pathname = usePathname();
  const searchParams = useSearchParams();

  let loanType = searchParams.get("type");

  useEffect(() => {
    if (searchParams) {
      const query = searchParams.toString();
      const full = `/calculator${query ? `?${query}` : ""}`;
      localStorage.setItem("prevURL", JSON.stringify(full));
    }
  }, [searchParams]);

  const setLoanData = useLoanStore((state) => state.setLoanData);
  const router = useRouter();

  useEffect(() => {
    if (canProceed) {
      submitData();
    }
  }, [canProceed]);

  function submitData() {
    let data = {
      ammountFinanced,
      purchasePrice, // Estimate(prenda), ammountFinanced(buy)
      downPayment, // amount borrowed(prenda), downPayment(buy)
      monthlyPayment,
      loanTerm,
      propertyType,
      loanOption,
      unitType,
    };
    setLoanData({
      ammountFinanced,
      purchasePrice,
      downPayment,
      monthlyPayment,
      loanTerm,
      propertyType,
      loanOption,
      unitType,
    });
    // router.push("/loans/forms");
  }
  // Calculate interest and monthly payment with interest
  function calculateMonthlyPaymentWithInterest() {
    // Only apply for salary loan (interest logic)
    // 1 month = 5%, 2 months = 10%
    let interestRate = 0;
    if (loanTerm === 1) interestRate = 0.05;
    else if (loanTerm === 2) interestRate = 0.1;
    // Add more logic if more terms are added in the future
    const totalWithInterest = ammountFinanced + ammountFinanced * interestRate;
    const monthly = loanTerm > 0 ? totalWithInterest / loanTerm : 0;
    return { totalWithInterest, monthly };
  }

  const { totalWithInterest, monthly } = calculateMonthlyPaymentWithInterest();

  return (
    <div className="summary-container">
      <p className="medium title red">Summary</p>
      <div className="space-y-1">
        <div className="details-wrapper">
          <div className="contents">
            <span>Borrowed Amount</span>
            <span className="font-medium">
              Payable Month <small></small>
            </span>
            <span className="font-medium medium">Monthly Payment</span>
          </div>
          <div className="contents">
            <span>
              PHP{" "}
              {ammountFinanced.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="font-medium">{loanTerm} mos.</span>
            <span className="font-medium medium">
              PHP{" "}
              {monthly.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
      {/* <div style={{ color: '#888', fontSize: 13, margin: '8px 0 0 0' }}>
                <span>
                    (Includes {loanTerm === 1 ? '5%' : loanTerm === 2 ? '10%' : ''} interest)
                </span>
            </div> */}
      <div className="form-btn-container-summary form-btn-container">
        {/* <Link href=${'/loans/forms?type='}> */}
        <Link href={`${"/loans?type=" + loanType}`}>
          <button onClick={submitData} className="__btn btn-white">
            Back
          </button>
        </Link>


        <button onClick={onConfirm} className="__btn btn-black">
          Continue
        </button>

      </div>
      {formError && <small className="red">{formError}</small>}
    </div>
  );
};

export default SalaryLoanSummaryPanel;

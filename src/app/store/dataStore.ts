import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { create } from 'zustand';

interface LoanData {
    ammountFinanced: number;
    purchasePrice: number;
    downPayment: number;
    monthlyPayment: number;
    loanTerm: number;
    propertyType: string;
    loanOption: string;
    interest: number;
}

interface LoanStore {
    data: LoanData | null;
    setLoanData: (data: LoanData) => void;
}

export const useLoanStore = create<LoanStore>((set) => ({
    data: null,
    setLoanData: (data) => set({ data }),
}));



interface FinalLoanData {
    contactNumber: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    birthdate: any;
    country: string,
    cityOrMunicipality: string,
    barrangay: string,
    specAddress: string,
    citizenship: string;
    grossMonthlyIncome: number | string;
    sourceOfIncome: string;
    empOrBusiness: string;
    designation: string;
    yearsEmpOrBus: number | string;
    loanData: LoanData | null;
    found: boolean;
    applicationTimeStamp: Timestamp | string;
    ref: string;
}



interface FinalLoanStore {
    data: FinalLoanData | null;
    setFinalLoanData: (data: FinalLoanData) => void;
    clearFinalLoanData: () => void;
}

export const useFinalLoanStore = create<FinalLoanStore>((set) => ({
    data: null,
    setFinalLoanData: (data) => set({ data }),
    clearFinalLoanData: () => set({ data: null }),
}));
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CarLoanPage from './landing-pages/car-loan';
import HomeLoanPage from './landing-pages/home-loan';

export default function LoansPageClient() {
  const searchParams = useSearchParams();
  const [loanType, setLoanType] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('type');
    setLoanType(ref);
    if (ref) localStorage.setItem('loanType', ref);
  }, [searchParams]);

  return (
    <>
      {loanType === 'car' && <CarLoanPage />}
      {loanType === 'home' && <HomeLoanPage />}
    </>
  );
}

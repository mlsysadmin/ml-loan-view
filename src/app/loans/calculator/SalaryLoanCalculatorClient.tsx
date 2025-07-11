'use client';

import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

const LoanCalculatorClient = dynamic(() => import('./components/SalaryLoanCalculator'), {
  ssr: false,
});

export default function SalaryLoanCalculatorClient() {
  return (
    <Container>
      <LoanCalculatorClient />
    </Container>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

const LoanCalculatorClient = dynamic(() => import('./components/LoanCalculator'), {
  ssr: false,
});

export default function CalculatorPageClient() {
  return (
    <Container>
      <LoanCalculatorClient />
    </Container>
  );
}

import React from 'react';
import LoanCalculator from './components/LoanCalculator';
import { Calculator } from 'lucide-react';
import { Container } from 'react-bootstrap';

export default function CalculatorPage() {
  return (
    <Container>
      <LoanCalculator />
    </Container>
  );
}
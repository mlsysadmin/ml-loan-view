// import React from 'react';
// import LoanCalculator from './components/LoanCalculator';
// import { Calculator } from 'lucide-react';
// import { Container } from 'react-bootstrap';

// export default function CalculatorPage() {
//   return (
//     <Container>
//       <LoanCalculator />
//     </Container>
//   );
// }

"use client";

import CalculatorPageClient from './CalculatorPageClient';
import SalaryLoanCalculatorClient from './SalaryLoanCalculatorClient';
import { useSearchParams } from 'next/navigation';

function CalculatorSwitcher() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  if (type === 'salary') {
    return <SalaryLoanCalculatorClient />;
  }
  return <CalculatorPageClient />;
}

export default function Page() {
  return <CalculatorSwitcher />;
}

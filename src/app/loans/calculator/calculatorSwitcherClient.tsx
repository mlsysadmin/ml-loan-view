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
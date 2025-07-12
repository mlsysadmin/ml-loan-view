'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CalculatorSwitcherClient = dynamic(() => import('./calculatorSwitcherClient'));

export default function calculatorSwitcherClient() {
  return (
    <Suspense fallback={<div>Loading loan options...</div>}>
      <CalculatorSwitcherClient />
    </Suspense>
  );
}

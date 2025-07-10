'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LoansPageClient = dynamic(() => import('./LoansPageClient'));

export default function LoansPageWrapper() {
  return (
    <Suspense fallback={<div>Loading loan options...</div>}>
      <LoansPageClient />
    </Suspense>
  );
}

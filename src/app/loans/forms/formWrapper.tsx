'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FormClient = dynamic(() => import('./formClient'));

export default function LoansPageWrapper() {
  return (
    <Suspense fallback={<div>Loading loan options...</div>}>
      <FormClient />
    </Suspense>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ConfirmationPageClient = dynamic(() => import('./confirmationPageClient'));

export default function confirmationPageWrapper() {
  return (
    <Suspense fallback={<div>Loading loan options...</div>}>
      <ConfirmationPageClient />
    </Suspense>
  );
}

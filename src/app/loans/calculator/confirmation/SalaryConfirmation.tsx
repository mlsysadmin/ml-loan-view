'use client';

import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

const SalaryPreConfirmation = dynamic(() => import('./components/SalaryPreConfirmation'), {
  ssr: false,
});

export default function SalaryConfirmation() {
  return (
    <Container>
      <SalaryPreConfirmation />
    </Container>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android|Mobile|IEMobile|Opera Mini/i.test(ua));
  }, []);

  return (
    <>
      {!isMobile && <Navbar />}
      {children}
      {!isMobile && <Footer />}
    </>
  );
}

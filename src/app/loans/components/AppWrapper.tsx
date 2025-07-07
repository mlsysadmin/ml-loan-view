'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    // setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));

    // const userAgent = req.headers['user-agent'] || '';

    const isAndroidWebView = userAgent.includes('wv') || userAgent.includes('Version/');
    const isIOSWebView = /iPhone|iPad|iPod/.test(userAgent) && !userAgent.includes('Safari');

    const isMobile = isAndroidWebView || isIOSWebView;
  }, []);


  return (
    <>
      {!isMobile && <Navbar />}
      {children}
      {!isMobile && <Footer />}
    </>
  );
}

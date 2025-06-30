// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 1000); // simulate a 1s load
//     return () => clearTimeout(t);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">

//         <Image
//           src="/images/Diamante.png"
//           alt="Diamante Logo"
//           width={200}
//           height={200}
//           className="w-full h-full object-contain animate-pulse-gentle transition-transform duration-300"
//           priority
//         />

//         <div className="animate-pulse text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }



// src/components/PageLoader.tsx (or your path)
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface PageLoaderProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
  minLoadTime?: number;
}

const PageLoader = ({
  isLoading = true,
  onLoadingComplete,
  minLoadTime = 2000,
}: PageLoaderProps) => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        onLoadingComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-800 ease-in-out ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Your loader content */}
      <div className="w-32 h-32 relative">
        <Image
          src="/images/Diamante.png"
          alt="Diamante Logo"
          fill
          className="object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default PageLoader;

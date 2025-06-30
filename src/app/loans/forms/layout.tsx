import AppProvider from '../.././../../providers/app-provider';

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import AppProvider from '../../../providers/app-provider';

// export default function FormLayout({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 1000); // optional: simulate load
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <AppProvider>
//       {loading ? (
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="animate-pulse text-xl text-gray-600">Loading...</div>
//         </div>
//       ) : (
//         children
//       )}
//     </AppProvider>
//   );
// }


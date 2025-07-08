import "./globals.css";
import AppWrapper from "@/app/loans/components/AppWrapper";


export default function LoansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppWrapper>
      {children}
    </AppWrapper>
  );
}

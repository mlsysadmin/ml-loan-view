// "use client";
// import { useSearchParams } from "next/navigation";
// import SalaryConfirmation from "./SalaryConfirmation";


// function CalculatorSwitcher() {
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");

//   if (type === "salary") {
//     return <SalaryConfirmation />;
//   }
//   return ;
// }

// export default function Page() {
//   return <CalculatorSwitcher />;
// }



import ConfirmationPageWrapper from './confirmationPageWrapper';

export default function CalculatorSwitcher() {
  return <ConfirmationPageWrapper />;
}

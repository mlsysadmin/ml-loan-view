/**
 * Calculate the monthly payment amount for a home loan
 * 
 * @param principal The loan amount (purchase price - down payment)
 * @param interestRate Annual interest rate as a percentage (e.g., 5 for 5%)
 * @param termMonths Loan term in months
 * @returns Monthly payment amount
 */
export const calculateMonthlyPayment = (
  principal: number,
  interestRate: number = 6, // Default interest rate of 6%
  termMonths: number
): number => {
  // Convert annual interest rate to monthly decimal rate
  const monthlyRate = interestRate / 100 / 12;
  
  // If interest rate is 0, simple division
  if (monthlyRate === 0) return principal / termMonths;
  
  // Standard mortgage formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
    
  return payment;
};

/**
 * Calculate the total interest paid over the life of the loan
 * 
 * @param principal The loan amount
 * @param monthlyPayment The calculated monthly payment
 * @param termMonths Loan term in months
 * @returns Total interest paid
 */
export const calculateTotalInterest = (
  principal: number,
  monthlyPayment: number,
  termMonths: number
): number => {
  return (monthlyPayment * termMonths) - principal;
};
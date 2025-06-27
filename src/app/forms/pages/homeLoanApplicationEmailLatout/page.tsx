export default function PDFPreview({ searchParams }: { searchParams: any }) {
  const { name, loanAmount, term } = searchParams;

  return (
    <html>
      <head>
        <title>Loan PDF</title>
        <style>{`
          body { font-family: Arial; padding: 40px; }
          h1 { font-size: 24px; }
          p { font-size: 16px; }
        `}</style>
      </head>
      <body>
        <h1>Loan Application Summary</h1>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Loan Amount:</strong> ₱{loanAmount}</p>
        <p><strong>Term:</strong> {term} months</p>
      </body>
    </html>
  );
}

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, text, cc, htmlContent } = body;

  if (!to || !subject || !text || !htmlContent) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  let pdfBuffer: Buffer;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Make sure to wrap HTML properly
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>body { font-family: Arial; }</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);

    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    pdfBuffer = Buffer.from(pdf);
    await browser.close();
  } catch (pdfError: any) {
    console.error('PDF Error:', pdfError);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"ML Loans Application" <${process.env.EMAIL_USER}>`,
      to,
      cc,
      subject,
      text,
      attachments: [
        {
          filename: 'application.pdf',
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ message: 'Email with PDF sent successfully' });
  } catch (emailError: any) {
    console.error('Email Error:', emailError);
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';
// import nodemailer from 'nodemailer';

// export async function POST(req: Request) {
//   const body = await req.json();
//   console.log('=====', body)
//   const {
//     name,
//     contactNumber,
//     email,
//     birthdate,
//     citizenship,
//     grossMonthlyIncome,
//     sourceOfIncome,
//     empOrBusiness,
//     designation,
//     yearsEmpOrBus,
//     applicationTimeStamp,
//     ref,
//     loanType,
//     propertyType,
//     downPayment,
//     monthlyPayment,
//     loanTerm,
//     ammountFinanced
//   } = body;

//   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/forms/pages/homeLoanApplicationEmailLatout/?name=${encodeURIComponent(
//     name
//   )}&contactNumber=${contactNumber}&email=${email}&birthdate=${birthdate}&citizenship=${citizenship}&grossMonthlyIncome=${grossMonthlyIncome}&sourceOfIncome=${sourceOfIncome}&empOrBusiness=${empOrBusiness}&designation=${designation}&yearsEmpOrBus=${yearsEmpOrBus}&applicationTimeStamp=${applicationTimeStamp}&ref=${ref}&loanType=${loanType}&propertyType=${propertyType}&downPayment=${downPayment}&monthlyPayment=${monthlyPayment}&loanTerm=${loanTerm}&ammountFinanced=${ammountFinanced}`;

//   console.log('url::::::', url)

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle0' });

//     const pdf = await page.pdf({ format: 'A4' });
//     await browser.close();

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"ML Loans" <${process.env.EMAIL_USER}>`,
//       to: 'kenneth88877@gmail.com',
//       subject: 'Loan Application PDF',
//       text: 'Attached is your loan summary.',
//       attachments: [{ filename: 'loan-summary.pdf', content: Buffer.from(pdf) }],
//     });

//     return NextResponse.json({ message: 'Email sent!' });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

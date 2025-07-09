import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, text, cc, htmlContent } = body;

  if (!to || !subject || !text || !htmlContent) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  let browser = null;
  let pdfBuffer: Buffer;

  try {
    const isProduction = process.env.NODE_ENV === 'production';

    // const browser = await puppeteer.launch({
    //   args: isProduction ? chromium.args : [],
    //   executablePath: isProduction
    //     ? await chromium.executablePath()
    //     : undefined,
    //   headless: true,
    // });

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });


    const page = await browser.newPage();

    // Inject HTML content
    await page.setContent(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>body { font-family: Arial, sans-serif; }</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>`, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    pdfBuffer = Buffer.from(pdf);

  } catch (err: any) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF', detail: err.message }, { status: 500 });
  } finally {
    if (browser) await browser.close();
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
    console.error('Email send error:', emailError);
    return NextResponse.json({ error: 'Failed to send email', detail: emailError.message }, { status: 500 });
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

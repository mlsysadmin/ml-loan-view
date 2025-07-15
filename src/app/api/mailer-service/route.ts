// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import puppeteer from 'puppeteer';

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { to, subject, text, cc, htmlContent } = body;

//   if (!to || !subject || !text || !htmlContent) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//   }

//   let pdfBuffer: Buffer;

//   try {
//     const browser = await puppeteer.launch({
//       headless: 'new', // safer for newer Puppeteer versions
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();
//     await page.setContent(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8" />
//           <style>body { font-family: Arial; }</style>
//         </head>
//         <body>${htmlContent}</body>
//       </html>
//     `, { waitUntil: 'networkidle0' });

//     pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
//     await browser.close();
//   } catch (err: any) {
//     console.error('PDF Generation Error:', err);
//     return NextResponse.json({ error: 'Failed to generate PDF', detail: err.message }, { status: 500 });
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: `"ML Loans" <${process.env.EMAIL_USER}>`,
//       to,
//       cc,
//       subject,
//       text,
//       attachments: [
//         {
//           filename: 'application.pdf',
//           content: pdfBuffer,
//         },
//       ],
//     });

//     return NextResponse.json({ message: 'Email sent successfully' });
//   } catch (emailError: any) {
//     console.error('Email Sending Error:', emailError);
//     return NextResponse.json({ error: emailError.message }, { status: 500 });
//   }
// }








import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    to,
    cc,
    subject,
    text,
    headerText,
    ref,
    loanData,
    unitOrPropertyType,
    firstName,
    middleName,
    lastName,
    suffix,
    contactNumber,
    email,
    birthdate,
    sourceOfIncome,
    empOrBusiness,
    designation,
    grossMonthlyIncome,
    streetNameAndSpecAddress,
    barrangay,
    cityOrTown,
    provinceOrState,
    country
  } = body;

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const color = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.95, 0.95, 0.95);

    let y = 800;
    const drawText = (label: string, value: string, x1 = 40, x2 = 300) => {
      page.drawText(label, { x: x1, y, size: 10, font, color });
      page.drawText(value, { x: x2, y, size: 10, font, color });
      y -= 18;
    };

    // Header
    page.drawText(`${headerText} LOAN APPLICATION`, { x: 40, y, size: 16, font: bold, color });
    y -= 24;
    drawText('Ref No', ref);
    drawText('Date', new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' }));
    // drawText('Date', Intl.DateTimeFormat().resolvedOptions().timeZone);

    y -= 10;
    page.drawRectangle({ x: 40, y: y - 10, width: 515, height: 1, color: rgb(0.8, 0.8, 0.8) });
    y -= 20;
    if (loanData) {
      // Loan Details
      page.drawText('Loan Details', { x: 40, y, size: 14, font: bold, color });
      y -= 20;
      drawText('Loan Type', loanData?.loanOption);
      drawText('Preferred Unit Type', unitOrPropertyType);
      drawText('Estimated Price', `PHP ${loanData?.ammountFinanced.toLocaleString()}`);
      drawText('Amount Borrow', `PHP ${loanData?.ammountFinanced.toLocaleString()}`);
      drawText('Term', `${Number(loanData?.loanTerm) / 12} years`);

      y -= 10;
      page.drawRectangle({ x: 40, y: y - 10, width: 515, height: 1, color: rgb(0.8, 0.8, 0.8) });
      y -= 20;

      // Summary
      page.drawText('Loan Summary', { x: 40, y, size: 14, font: bold, color });
      y -= 20;
      drawText('Amount Financed', `PHP ${loanData?.ammountFinanced.toLocaleString()}`);
      drawText('Down Payment', `PHP ${loanData?.downPayment.toLocaleString()}`);
      drawText('Monthly Payment', `PHP ${loanData?.monthlyPayment.toLocaleString()}`);
      drawText('Loan Term (months)', `${loanData?.loanTerm}`);
    } else {
      page.drawText('Loan Details', { x: 40, y, size: 14, font: bold, color });
      y -= 20;
      drawText('No loan data provided', '');
      y -= 10;
    }

    y -= 10;
    page.drawRectangle({ x: 40, y: y - 10, width: 515, height: 1, color: rgb(0.8, 0.8, 0.8) });
    y -= 20;

    // Applicant Details
    page.drawText('Applicant Details', { x: 40, y, size: 14, font: bold, color });
    y -= 20;
    drawText('Borrower', `${firstName} ${middleName || ''} ${lastName} ${suffix || ''}`);
    drawText('Mobile Number', contactNumber);
    drawText('Email Address', email);
    drawText('Birthday', `${birthdate?.month}/${birthdate?.day}/${birthdate?.year}`);
    drawText('Type of Income', sourceOfIncome || '---');
    drawText('Employer/Business', empOrBusiness || '---');
    drawText('Designation', designation || '---');
    drawText('Gross Monthly Income', grossMonthlyIncome ? `PHP ${grossMonthlyIncome}` : '---');
    drawText('Address', `${streetNameAndSpecAddress}, ${barrangay}, ${cityOrTown},`);
    drawText('', `${provinceOrState}, ${country}`);

    const loanOption = `${headerText.charAt(0).toUpperCase() + headerText.toLowerCase().slice(1)}`;
    const currentYear = new Date().getFullYear();

    // const customerEmailContent = `Hi ${firstName} ${lastName}! We have received your ${loanOption} Loan Application with ref.# ${ref}. We will contact you within 1 to 3 business days. Thank you.`;

    const filePath = path.join(process.cwd(), 'templates/LoanCutomerEmailTemplate.html');
    let htmlTemplate = fs.readFileSync(filePath, 'utf-8');

    function capitalizeName(name: string): string {
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    // Replace template variables
    htmlTemplate = htmlTemplate
      .replace('{{firstName}}', capitalizeName(firstName))
      .replace('{{loanOption}}', loanOption)
      .replace('{{ref}}', ref)
      .replace('{{year}}', currentYear.toString());


    const pdfBytes = await pdfDoc.save();

    // Send email with Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({ // ML emails []
      from: `"ML Loans" <${process.env.EMAIL_USER}>`,
      to: 'kenneth.simbulan@gmail.com',
      cc,
      subject: `${loanOption} Loan Application ${ref}`,
      text,
      attachments: [
        {
          filename: 'loan-application.pdf',
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    });

    await transporter.sendMail({ // Costumer email
      from: `"ML Loans" <${process.env.EMAIL_USER}>`,
      to: email,
      cc,
      subject: `${headerText.charAt(0).toUpperCase() + headerText.slice(1)} Loan Application`,
      html: htmlTemplate,
    });

    return NextResponse.json({ message: 'Email sent with PDF' });
  } catch (error: any) {
    console.error('PDF/Email Error:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to generate or send PDF', detail: error.message },
      { status: 500 }
    );
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

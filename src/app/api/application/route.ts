import { NextResponse } from 'next/server';
import { LoanApplication } from '@/models/LoanApplication';
import { sequelize } from '@/lib/sequelize';

export async function POST(req: Request) {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Optional: sync model to DB

    const body = await req.json();

    const newApp = await LoanApplication.create({
      ref: body.ref,
      loanType: body.loanData?.loanOption,
      unitType: body.unitOrPropertyType,
      amount: body.loanData?.ammountFinanced,
      downPayment: body.loanData?.downPayment,
      monthlyPayment: body.loanData?.monthlyPayment,
      term: body.loanData?.loanTerm,
      borrower: `${body.firstName} ${body.middleName ?? ''} ${body.lastName} ${body.suffix ?? ''}`,
      contactNumber: body.contactNumber,
      email: body.email,
      birthday: new Date(`${body.birthdate.year}-${body.birthdate.month}-${body.birthdate.day}`),
      incomeType: body.sourceOfIncome ?? null,
      employer: body.empOrBusiness ?? null,
      designation: body.designation ?? null,
      grossIncome: parseFloat(body.grossMonthlyIncome) || null,
      address: `${body.streetNameAndSpecAddress}, ${body.barrangay}, ${body.cityOrTown}, ${body.country}`,
    });

    return NextResponse.json({ message: 'Application saved', id: newApp.get('id') });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
  }
}



// src/app/api/test-db/route.ts
// import { NextResponse } from 'next/server';
// import { testDBConnection } from '@/lib/sequelize';

// export async function GET() {
//   try {
//     await testDBConnection();
//     return NextResponse.json({ success: true, message: 'DB connected successfully' });
//   } catch (err) {
//     return NextResponse.json({ success: false, message: 'DB connection failed', error: err }, { status: 500 });
//   }
// }

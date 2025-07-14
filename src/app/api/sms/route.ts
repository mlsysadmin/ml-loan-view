// import axios from 'axios';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     try {
//         const smsUsername = process.env.SMS_USERNAME;
//         const smsPassword = process.env.SMS_PASSWORD;
//         const smsSender = process.env.SMS_SENDER;
//         const sms_url = process.env.SMS_URL;

//         const body = await req.json();
//         const { mobileno, msg } = body;
//         console.log('+_++++___', mobileno, msg)

//         const response = await axios.post(`${sms_url}`, {
//             username: smsUsername,
//             password: smsPassword,
//             mobileno: mobileno,
//             msg: msg,
//             sender: smsSender,
//             service_type: 'ML LOANS',
//         });

//         const data = await response.data;

//         if (data && data?.code && data?.code != null) {
//             console.log('====', data)
//             NextResponse.json({ error: 'Failed to send SMS', details: data }, { status: 500 });
//         } else return NextResponse.json({ message: 'SMS SENT' }, { status: 200 });
//         return NextResponse.json({ message: 'SMS SENT' }, { status: 200 });
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const smsUsername = process.env.SMS_USERNAME;
    const smsPassword = process.env.SMS_PASSWORD;
    const smsSender = process.env.SMS_SENDER;
    const smsUrl = process.env.SMS_URL;

    const body = await req.json();
    const { mobileno, ref, firstName, lastName, loanType } = body;

    // Validate required fields
    if (!mobileno || !firstName || !lastName || !ref || !loanType) {
      console.warn('Missing fields:', { mobileno, firstName, lastName, ref, loanType });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Construct file path to SMS template
    const filePath = path.join(process.cwd(), 'templates', 'LoanCustomerSMSTemplate.txt');
    console.log('Reading SMS template from:', filePath);

    function capitalize(name: string): string {
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    // Read and format message template
    const rawTemplate = await readFile(filePath, 'utf8');
    const msg = rawTemplate
      .replace(/{{firstName}}/g, capitalize(firstName))
      .replace(/{{lastName}}/g, capitalize(lastName))
      .replace(/{{loanType}}/g, capitalize(loanType))
      .replace(/{{ref}}/g, ref)
      .split('\n')
      .map(line => line.trim())     
      .filter(line => line.length)
      .join('\n\n');
      
    console.log('Prepared SMS message:', msg);

    // Send SMS via external API
    const response = await axios.post(smsUrl!, {
      username: smsUsername,
      password: smsPassword,
      mobileno,
      msg,
      sender: smsSender,
      service_type: 'ML LOANS',
    });

    const data = response.data;
    console.log('SMS API response:', data);

    if (data?.code !== 1) {
      return NextResponse.json({ error: 'Failed to send SMS', details: data }, { status: 500 });
    }
    return NextResponse.json({ message: 'SMS sent successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('SMS API Error:', err);
    return NextResponse.json({ error: 'Failed to send SMS', details: err.message }, { status: 500 });
  }
}
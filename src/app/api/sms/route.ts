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



import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const smsUsername = process.env.SMS_USERNAME;
    const smsPassword = process.env.SMS_PASSWORD;
    const smsSender = process.env.SMS_SENDER;
    const sms_url = process.env.SMS_URL;

    const body = await req.json();
    const { mobileno, msg } = body;

    if (!mobileno || !msg) {
      return NextResponse.json({ error: 'Missing mobile number or message' }, { status: 400 });
    }

    const response = await axios.post(sms_url!, {
      username: smsUsername,
      password: smsPassword,
      mobileno,
      msg,
      sender: smsSender,
      service_type: 'ML LOANS',
    });

    const data = response.data;

    if (data?.code) {
      console.error('SMS Error:', data);
      return NextResponse.json({ error: 'Failed to send SMS', details: data }, { status: 500 });
    }

    return NextResponse.json({ message: 'SMS sent successfully' }, { status: 200 });

  } catch (err: any) {
    console.error('SMS Exception:', err.message || err);
    return NextResponse.json({ error: 'Failed to send SMS', detail: err.message }, { status: 500 });
  }
}

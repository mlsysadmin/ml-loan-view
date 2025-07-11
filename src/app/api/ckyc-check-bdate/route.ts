import { NextRequest, NextResponse } from 'next/server';
import PartnersAPI, { CKYCSearchResponse } from '../../../../lib/ckyc-connection';

const partnersAPI = new PartnersAPI();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const cellphoneNumber = url.searchParams.get('cellphoneNumber') ?? '';
    const bdateInput = url.searchParams.get('bdate') ?? '';

    const results: CKYCSearchResponse | string = await partnersAPI.exactSearchCKYC({ cellphoneNumber });

    type ResponseData = {
      birthDate: string;
    };

    let data = typeof results === 'object' && 'data' in results ? results.data.data as ResponseData : null;

    if (data?.birthDate === bdateInput) {
      return NextResponse.json(
        { match: true, data: typeof results === 'object' && 'data' in results ? data : null },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { match: false, data: null },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
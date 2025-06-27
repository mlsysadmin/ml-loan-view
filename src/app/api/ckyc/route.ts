import { NextRequest, NextResponse } from 'next/server';
import PartnersAPI, {CKYCSearchResponse} from '../../../../lib/ckyc-connection';

const partnersAPI = new PartnersAPI();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const cellphoneNumber = url.searchParams.get('cellphoneNumber') ?? '';

    const results: CKYCSearchResponse | string = await partnersAPI.exactSearchCKYC({ cellphoneNumber });

    return NextResponse.json(
      { success: true, data: typeof results === 'object' && 'data' in results ? results.data.data : null },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
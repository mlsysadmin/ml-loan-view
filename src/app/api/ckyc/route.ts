import { NextRequest, NextResponse } from 'next/server';
import PartnersAPI, { CKYCSearchResponse } from '../../../../lib/ckyc-connection';

const partnersAPI = new PartnersAPI();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const cellphoneNumber = url.searchParams.get('cellphoneNumber') ?? '';

    const results: CKYCSearchResponse | string = await partnersAPI.exactSearchCKYC({ cellphoneNumber });

    const maskStringExceptFirst = (str: string) => {
      if (!str || str.length === 0) return "";
      return str.charAt(0) + "*".repeat(str.length - 1);
    };

    type NameType = {
      firstName: string;
      middleName: string;
      lastName: string;
    };

    type ResponseData = {
      name: NameType;
      birthDate: string;
    };

    let data = typeof results === 'object' && 'data' in results ? results.data.data as ResponseData : null;

    let firstName = maskStringExceptFirst(data?.name.firstName || '');
    let middleName = maskStringExceptFirst(data?.name.middleName || '');
    let lastName = maskStringExceptFirst(data?.name.lastName || '');

    let resData = {
      name: {
        firstName,
        middleName,
        lastName,
      },
      cellphoneNumber
    };

    return NextResponse.json(
      { success: true, data: data !== null ? resData : null },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
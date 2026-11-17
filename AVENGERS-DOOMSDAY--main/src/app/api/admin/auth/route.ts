import { NextResponse } from 'next/server';

const VALID_PASSCODES = ['04062005', '040605'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const trimmed = String(passcode || '').trim();

    if (VALID_PASSCODES.includes(trimmed)) {
      const response = NextResponse.json({
        success: true,
        message: 'Access Granted. Level 9 Clearance Active.',
        role: 'admin',
      });

      // Set cookie for browser session
      response.cookies.set('marvel_admin_auth', '04062005', {
        path: '/',
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid Passcode. Access Denied.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

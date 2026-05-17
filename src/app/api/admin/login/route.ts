import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Email and password required' } },
        { status: 422 }
      );
    }

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } },
        { status: 401 }
      );
    }

    const token = await createAdminToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Login failed' } },
      { status: 500 }
    );
  }
}

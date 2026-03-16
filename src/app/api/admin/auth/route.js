import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;
    const secret    = process.env.ADMIN_SESSION_SECRET;

    if (username !== validUser || password !== validPass) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Set httpOnly cookie valid for 7 days
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', secret, {
      httpOnly: true,
      secure: false, // HTTP deployment — secure:true would silently block cookies
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}


export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return response;
}

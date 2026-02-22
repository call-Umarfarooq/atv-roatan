import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailSent = await sendContactEmail({ name, email, subject, message });

    if (!emailSent) {
      return NextResponse.json(
        { message: 'Failed to send contact emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error while processing request' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { sendClaimGiftEmail } from '@/lib/mail';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, reviewLink1, reviewLink2, storyLink } = body;

    if (!name || !email || !reviewLink1 || !reviewLink2 || !storyLink) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailSent = await sendClaimGiftEmail({ name, email, reviewLink1, reviewLink2, storyLink });

    if (!emailSent) {
      return NextResponse.json(
        { message: 'Failed to send verification emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Verification submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Submit verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error while processing verification' },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    if (body.status === 'published' && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    
    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    // Handle duplicate slug error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.slug) {
       return NextResponse.json({ success: false, error: 'A blog with this slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

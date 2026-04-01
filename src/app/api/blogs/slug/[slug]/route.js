import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const { slug } = await params;
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

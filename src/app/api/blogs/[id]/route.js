import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const { id } = await params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const body = await request.json();
    
    // Auto-set published date if changing from draft to published
    if (body.status === 'published') {
        const currentBlog = await Blog.findById(id);
        if (currentBlog && currentBlog.status !== 'published') {
            body.publishedAt = new Date();
        }
    }
    
    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
     if (error.code === 11000 && error.keyPattern && error.keyPattern.slug) {
       return NextResponse.json({ success: false, error: 'A blog with this slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Tour from '@/models/Tour';

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const category = await Category.findOne({ slug });

    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    // Fetch tours associated with this category
    const tours = await Tour.find({ categories: category._id }).lean();

    return NextResponse.json({ 
      success: true, 
      data: {
        ...category.toObject(),
        tours
      } 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const body = await request.json();
    const category = await Category.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

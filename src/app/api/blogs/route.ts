import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/blog.model';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error('Blogs GET error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch blogs' } },
      { status: 500 }
    );
  }
}

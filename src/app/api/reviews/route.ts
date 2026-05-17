import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Review } from '@/models/review.model';

export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    return NextResponse.json({ data: reviews });
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch reviews' } },
      { status: 500 }
    );
  }
}

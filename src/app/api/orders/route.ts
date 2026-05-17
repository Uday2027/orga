import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import { z } from 'zod';

const orderSchema = z.object({
  items: z.array(
    z.object({
      product: z.object({
        _id: z.string(),
        name: z.string(),
        slug: z.string(),
        images: z.array(z.object({ url: z.string(), publicId: z.string().optional() })).optional(),
      }),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  customer: z.object({
    name: z.string().min(1, 'নাম আবশ্যক'),
    phone: z.string().min(1, 'মোবাইল নম্বর আবশ্যক'),
    email: z.string().email().optional().or(z.literal('')),
    address: z.string().min(1, 'ঠিকানা আবশ্যক'),
  }),
  deliveryMethod: z.string(),
  deliveryCharge: z.number().min(0),
  total: z.number().min(0),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const result = orderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid order data',
            details: result.error.issues,
          },
        },
        { status: 422 }
      );
    }

    const order = await Order.create(result.data);

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to create order' } },
      { status: 500 }
    );
  }
}

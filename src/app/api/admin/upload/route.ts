import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated();
    if (!isAdmin) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Admin access required' } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { image } = body;

    if (!image || !image.startsWith('data:image')) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid image data' } },
        { status: 422 }
      );
    }

    // Extract base64 data
    const base64Data = image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Cloudinary
    const result = await new Promise<{ url: string; publicId: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'ma-bheshaj/products', resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'));
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id });
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Admin upload error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Upload failed' } },
      { status: 500 }
    );
  }
}

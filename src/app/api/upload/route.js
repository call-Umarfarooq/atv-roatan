
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');
    const mimeType = file.type;

    // Check if it's a video
    if (mimeType.startsWith('video/')) {
        // Upload to Cloudinary
        try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'video', folder: 'roatan-tours' },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              // Convert buffer to stream and pipe to cloudinary
              const stream = require('stream');
              const bufferStream = new stream.PassThrough();
              bufferStream.end(buffer);
              bufferStream.pipe(uploadStream);
            });

            return NextResponse.json({
                success: true,
                url: result.secure_url,
                public_id: result.public_id,
                type: 'video'
            });

        } catch (cloudinaryError) {
             console.error('Cloudinary Upload Error:', cloudinaryError);
             return NextResponse.json(
                { error: 'Failed to upload video to Cloudinary' },
                { status: 500 }
             );
        }

    } else {
        // Assume Image - Save Locally
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const finalFilename = uniqueSuffix + '-' + filename;
        const filePath = path.join(UPLOAD_DIR, finalFilename);

        fs.writeFileSync(filePath, buffer);

        const publicUrl = `/api/images/${finalFilename}`;

        return NextResponse.json({
          success: true,
          url: publicUrl,
          type: 'image'
        });
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


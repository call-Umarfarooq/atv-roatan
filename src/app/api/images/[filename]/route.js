import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request, { params }) {
  const { filename } = params;

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Construct the full path to the file in public/uploads
  const filePath = path.join(process.cwd(), 'public/uploads', filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type (basic check based on extension)
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    // Return the file as a response
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

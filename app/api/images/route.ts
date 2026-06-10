import { NextResponse } from 'next/server';
import imagesList from '@/public/data/images-list.json';

// Disable caching for this route so that updates to the image list take effect immediately
export const revalidate = 0;

export async function GET() {
  try {
    return NextResponse.json(imagesList);
  } catch (error) {
    console.error("Failed to serve images list:", error);
    return NextResponse.json({ error: "Failed to read images" }, { status: 500 });
  }
}

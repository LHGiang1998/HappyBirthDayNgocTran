import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(imagesDirectory);
    
    // Filter for valid image formats
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    const images = fileNames.filter(file => imageExtensions.test(file));
    
    // Sort them so that 1.jpg, 2.jpg, 3.jpg come first if available
    images.sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }
      if (!isNaN(aNum)) return -1;
      if (!isNaN(bNum)) return 1;
      return a.localeCompare(b);
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Failed to read images folder:", error);
    return NextResponse.json({ error: "Failed to read images" }, { status: 500 });
  }
}

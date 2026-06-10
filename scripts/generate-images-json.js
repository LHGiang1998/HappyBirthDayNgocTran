const fs = require('fs');
const path = require('path');

function generateImagesJson() {
  try {
    const imagesDir = path.join(__dirname, '../public/images');
    const outputDir = path.join(__dirname, '../public/data');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let images = [];
    if (fs.existsSync(imagesDir)) {
      images = fs.readdirSync(imagesDir).filter(file => 
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
      );
      
      // Sort them
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
    }

    fs.writeFileSync(
      path.join(outputDir, 'images-list.json'),
      JSON.stringify(images, null, 2)
    );
    console.log(`Successfully generated images-list.json with ${images.length} images.`);
  } catch (err) {
    console.error("Failed to generate images list:", err);
    process.exit(1);
  }
}

generateImagesJson();

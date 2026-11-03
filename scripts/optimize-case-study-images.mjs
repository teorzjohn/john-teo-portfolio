import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const caseStudiesDirectory = path.resolve('public/case-studies');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);
const targetWidths = [1280, 2560];

async function getRasterImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedImages = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getRasterImages(entryPath);
      }

      return entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())
        ? [entryPath]
        : [];
    }),
  );

  return nestedImages.flat();
}

const imagePaths = (await getRasterImages(caseStudiesDirectory)).sort();

for (const imagePath of imagePaths) {
  const metadata = await sharp(imagePath).metadata();

  if (!metadata.width) {
    continue;
  }

  const variantWidths = [...new Set(targetWidths.map((width) => Math.min(width, metadata.width)))];
  const extension = path.extname(imagePath);
  const basename = imagePath.slice(0, -extension.length);

  for (const width of variantWidths) {
    const outputPath = `${basename}-${width}.webp`;

    await sharp(imagePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6, smartSubsample: true, alphaQuality: 100 })
      .toFile(outputPath);
  }
}

console.log(`Generated responsive WebP variants for ${imagePaths.length} case study images.`);

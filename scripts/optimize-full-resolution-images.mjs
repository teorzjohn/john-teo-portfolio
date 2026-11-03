import { createHash } from 'node:crypto';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { once } from 'node:events';
import sharp from 'sharp';

const sourceDirectory = path.resolve('src');
const publicDirectory = path.resolve('public');
const rasterExtensions = /\.png$/i;

async function getSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? getSourceFiles(entryPath) : [entryPath];
  }));

  return nestedFiles.flat();
}

async function hashDecodedPixels(imagePath) {
  const image = sharp(imagePath).ensureAlpha().raw();
  const hash = createHash('sha256');
  image.on('data', (chunk) => hash.update(chunk));
  await once(image, 'end');
  return hash.digest('hex');
}

const sourceFiles = await getSourceFiles(sourceDirectory);
const referencedImages = new Set();

async function findLocalOriginal(basename) {
  const candidate = `${basename}.png`;
  try {
    await access(path.resolve(publicDirectory, `.${candidate}`));
    return candidate;
  } catch {
    // The original may not exist in a clean clone because local originals are ignored.
  }
  return undefined;
}

for (const sourceFile of sourceFiles) {
  const sourceText = await readFile(sourceFile, 'utf8');
  for (const match of sourceText.matchAll(/\/(?:[^\s'"`<>)]*?\.(?:png|jpe?g)|[^\s'"`<>)]*?-full\.webp)(?=[\s'"`<>)]|$)/gi)) {
    const reference = match[0];
    if (reference.toLowerCase().endsWith('-full.webp')) {
      const basename = reference.slice(0, -'-full.webp'.length);
      const sourcePath = await findLocalOriginal(basename);
      if (sourcePath) {
        referencedImages.add(sourcePath);
      }
    } else {
      if (/\.png$/i.test(reference)) {
        referencedImages.add(reference);
      }
    }
  }
}

if (referencedImages.size === 0) {
  console.log('No local original images were found to optimize.');
  process.exit(0);
}

let originalBytes = 0;
let webpBytes = 0;

for (const publicPath of [...referencedImages].sort()) {
  const inputPath = path.resolve(publicDirectory, `.${publicPath}`);
  const outputPath = inputPath.replace(rasterExtensions, '-full.webp');
  const inputMetadata = await sharp(inputPath).metadata();

  await sharp(inputPath)
    .keepMetadata()
    .webp({ lossless: true, effort: 6 })
    .toFile(outputPath);

  const outputMetadata = await sharp(outputPath).metadata();
  if (inputMetadata.width !== outputMetadata.width || inputMetadata.height !== outputMetadata.height) {
    throw new Error(`Dimensions changed while converting ${publicPath}.`);
  }

  const [inputPixels, outputPixels] = await Promise.all([
    hashDecodedPixels(inputPath),
    hashDecodedPixels(outputPath),
  ]);
  if (inputPixels !== outputPixels) {
    throw new Error(`Decoded pixels changed while converting ${publicPath}.`);
  }

  const [inputStats, outputStats] = await Promise.all([stat(inputPath), stat(outputPath)]);
  originalBytes += inputStats.size;
  webpBytes += outputStats.size;
  console.log(`${publicPath}: ${inputMetadata.width}×${inputMetadata.height}, ${(inputStats.size / 1024 / 1024).toFixed(2)} MB → ${(outputStats.size / 1024 / 1024).toFixed(2)} MB, pixel-identical`);
}

console.log(`Total: ${(originalBytes / 1024 / 1024).toFixed(1)} MB → ${(webpBytes / 1024 / 1024).toFixed(1)} MB (${referencedImages.size} images).`);

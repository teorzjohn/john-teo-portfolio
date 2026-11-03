import { readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const buildDirectory = path.resolve('dist');
const sourceImageExtensions = new Set(['.png']);

async function removeSourceImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  let removed = 0;

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      removed += await removeSourceImages(entryPath);
    } else if (sourceImageExtensions.has(path.extname(entry.name).toLowerCase())) {
      await rm(entryPath);
      removed += 1;
    }
  }

  return removed;
}

try {
  const removed = await removeSourceImages(buildDirectory);
  console.log(`Removed ${removed} local-only original image files from dist.`);
} catch (error) {
  if (error.code === 'ENOENT') {
    throw new Error('Build output directory dist/ was not found. Run the Vite build first.');
  }
  throw error;
}

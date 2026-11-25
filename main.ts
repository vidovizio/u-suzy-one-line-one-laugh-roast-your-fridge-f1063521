import { join } from 'node:path';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ENTRY_LINE = 'My fridge hums 24/7 guarding leftovers I\'ll forget — the only appliance with separation anxiety.';

function writeEntry(outputDir: string): string {
  const outputPath = join(outputDir, 'entry.txt');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, ENTRY_LINE, 'utf8');
  return outputPath;
}

function verifyEntry(outputPath: string): number {
  const written = readFileSync(outputPath, 'utf8');
  if (written !== ENTRY_LINE) {
    throw new Error('Output verification failed: content mismatch');
  }
  return written.length;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const outputPath = writeEntry(outputDir);
  const charCount = verifyEntry(outputPath);
  const hash = createHash('sha256').update(ENTRY_LINE).digest('hex').slice(0, 16);
  console.error(`Entry written: ${charCount} characters (SHA256: ${hash}...)`);
}

main();